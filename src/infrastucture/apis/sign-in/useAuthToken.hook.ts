import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../application/state-manager';
import {
  setCartInfo,
  setShowLoadingScreen
} from '../../../application/state-manager/services/checkout';
import {
  LocalStorageKey,
  LocalStorageType
} from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { getExpiresAt } from '../../../application/utils/diferenceDays';
import sleep from '../../../application/utils/sleep';
import { ModalsType } from '../../../presentation/common-components/modal/modal.interfaces';
import { useGenericModal } from '../../../presentation/common-components/modal/ModalProvider';
import { AnalyticEvent } from '../../firebase/analytics/analitics.interfaces';
import { useAnalytics } from '../../firebase/analytics/useAnalytics';
import { useValidContactlesspaymentHook } from '../creditAccountBonding/validContactlesspayment.hook';
import { useLazyGetShoppingCartRequest } from '../shopping-cart';
import { useMergeAnonymousShoppingCartRequest } from '../shopping-cart/anonymous-shopping-cart.api';
import { useGetLazyInfoUserRequest } from '../user/user.api';
import { useSignInRequest } from './sigin.api';

export const useAuthToken = () => {
  const { trackEvent } = useAnalytics();
  const { validVinculationToken } = useValidContactlesspaymentHook();
  const [onLinkedCreditAuth, setLinkedCreditAuth] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { showModal, hideModal } = useGenericModal();
  const {
    save: saveInLocalStoarge,
    remove: removeLocalStorage,
    localStorageData: {
      [LocalStorageKey.LastCustomerId]: LAST_CUSTOMER_ID,
      [LocalStorageKey.AnonymousCartGuid]: ANONYMOUS_CART_GUID
    }
  } = useLocalStorage();
  const [onSuccess, setSuccess] = useState<boolean>(false);

  const [
    doSignInWithDePrati,
    {
      isLoading: isLoadingBySignInWithDePrati,
      isSuccess: isSuccessBySignInWithDePrati,
      data: responseSigInWithDePrati,
      error: errorSignInWithDePrati,
      originalArgs: argsSignIn
    }
  ] = useSignInRequest();

  const [getUserInfo] = useGetLazyInfoUserRequest();
  const [getShoppingCart] = useLazyGetShoppingCartRequest();
  const [mergeCarts] = useMergeAnonymousShoppingCartRequest();

  useEffect(() => {
    if (!isLoadingBySignInWithDePrati && isSuccessBySignInWithDePrati) {
      const credentials = { ...responseSigInWithDePrati, ...argsSignIn };
      trackEvent(AnalyticEvent.login, {
        singInBy: 'de-prati-credentials',
        username: credentials.email
      });
      saveCredential(credentials);
    }
  }, [isLoadingBySignInWithDePrati, isSuccessBySignInWithDePrati]);

  const onValidVinculation = async (access_token: string) => {
    const response = await validVinculationToken(access_token);
    const data = response?.data;
    const validLinkedCredit =
      data !== undefined && Object.keys(data).length > 0;
    setLinkedCreditAuth(!validLinkedCredit);
  };

  const saveUserInfo = async (access_token: string, email: string) => {
    const { data: userInfo, error } = await getUserInfo({
      token: access_token,
      email
    });
    if (error || !userInfo) {
      console.log('>>> Error getUser: ', { error, userInfo });
      throw error;
    }
    const dataToSave: Partial<LocalStorageType> = {
      [LocalStorageKey.User]: userInfo
    };

    if (LAST_CUSTOMER_ID !== userInfo.customerId) {
      dataToSave[LocalStorageKey.IsAccountAuthenticated] = false;
      dataToSave[LocalStorageKey.AccountNumber] = '';
      dataToSave[LocalStorageKey.AccountDisplayNumber] = '';
      dataToSave[LocalStorageKey.AccountAdditionalNumber] = '';
    }
    await saveInLocalStoarge(dataToSave);
    return userInfo;
  };

  const saveCredential = async (credential: any) => {
    dispatch(setShowLoadingScreen(true));
    const { access_token, refresh_token, expires_in, email } = credential;
    const dataToSave: Partial<LocalStorageType> = {
      [LocalStorageKey.Token]: access_token,
      [LocalStorageKey.RefreshToken]: refresh_token,
      [LocalStorageKey.ExpiresIn]: Number(expires_in),
      [LocalStorageKey.ExpiresAt]: getExpiresAt(expires_in),
      [LocalStorageKey.GetTokenDate]: new Date().toISOString(),
      [LocalStorageKey.IsLogin]: true,
      [LocalStorageKey.UserEmail]: email?.toLocaleLowerCase()
    };
    await saveInLocalStoarge(dataToSave);

    try {
      await onValidVinculation(access_token);
      await saveUserInfo(access_token, email);
      const { data: shoppingCart, error } = await getShoppingCart({
        username: email
      });

      if (!shoppingCart || error) {
        throw _mapErrors(error || new Error('Not Data'));
      }

      if (!ANONYMOUS_CART_GUID) {
        dispatch(setCartInfo(shoppingCart));
        dispatch(setShowLoadingScreen(false));
        setSuccess(true);
        return;
      }

      const toMergeCartGuid = shoppingCart.guid;
      const { data: mergedShoppingCart, error: errorMerging } =
        (await mergeCarts({
          anonymousCartGuid: ANONYMOUS_CART_GUID,
          username: email,
          toMergeCartGuid
        })) as any;

      if (!errorMerging && !!mergedShoppingCart) {
        dispatch(setCartInfo(mergedShoppingCart));
        dispatch(setShowLoadingScreen(false));
        setSuccess(true);
        removeLocalStorage([LocalStorageKey.AnonymousCartGuid]);
        return;
      }

      setSuccess(false);
      dispatch(setShowLoadingScreen(false));
      dispatch(setCartInfo(shoppingCart));

      const errorToMap =
        'com.deprati.core.interceptors.impl.GiftCardValidateInterceptor'.toLowerCase();
      const errorMessageTextToMap =
        'Las tarjetas de regalo y otros tipos de productos no pueden coexistir en el mismo pedido o carrito.';
      const errorText = errorMerging?.data.errors
        ?.map(({ message = '' }) => {
          return message.toLowerCase().includes(errorToMap)
            ? `Lo sentimos, no fue posible unir los datos de su carrito con los guardados anteriormente.\n${errorMessageTextToMap}`
            : message;
        })
        .join('\n');

      await Promise.all([
        sleep(400),
        removeLocalStorage([LocalStorageKey.AnonymousCartGuid])
      ]);

      showModal(ModalsType.ErrorService, {
        buttonType: 'full',
        buttonText: 'CONTINUAR',
        textContent: errorText,
        showCloseButton: false,
        hideButton: false,
        async buttonAction() {
          hideModal();
          await sleep(1000);
          setSuccess(true);
        }
      });
    } catch (error) {
      dispatch(setShowLoadingScreen(false));
      console.log('>>> Merging error: ', error);
      setSuccess(false);
    }
  };

  const _mapErrors = (error: any): Error => {
    const text = error?.data?.errors
      ?.map(({ message = '' }) => message)
      .join('\n');
    return new Error(text || error?.message || error);
  };

  const handledSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values;
    doSignInWithDePrati({ email: email.toLowerCase(), password });
  };

  return {
    handledSubmit,
    isLoadingBySignInWithDePrati,
    isSuccessBySignInWithDePrati,
    errorSignInWithDePrati,
    loadingUser: false,
    onSuccess,
    saveCredential,
    onLinkedCreditAuth
  };
};
