import { useAppDispatch } from '../../../application/state-manager';
import { loadIndicationsKeys } from '../../../application/state-manager/services/indications/indications.slice';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  useAddToAnonymousShoppingCartRequest,
  useCreateAnonymousShoppingCartRequest,
  useGetAnonymousShoppingCartDetailRequest,
  useMergeAnonymousShoppingCartRequest
} from './anonymous-shopping-cart.api';
import { useLazyGetShoppingCartRequest } from './shopping-cart.api';
import { Cart, CreateShoppingCartResponse } from './types';

export const useAnonymousCart = () => {
  const {
    save: saveLocalStorage,
    remove: removeLocalStorage,
    localStorageData: {
      [LocalStorageKey.IsLogin]: IS_LOGGED,
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.AnonymousCartGuid]: ANONYMOUS_CART_GUID
    }
  } = useLocalStorage();

  const dispatch = useAppDispatch();

  const [
    getShoppingCart,
    { error: errorByGetShoppingCart, isLoading: loadingByGetShoppingCart }
  ] = useLazyGetShoppingCartRequest();

  const [
    createCart,
    {
      isLoading: isLoadingByCreateAnonymousCart,
      error: errorByCreateAnonymousCart
    }
  ] = useCreateAnonymousShoppingCartRequest();

  const [getAnonymousShoppingCart] = useGetAnonymousShoppingCartDetailRequest();

  const [addToCart, { error: errorByAdd, isLoading: loadingByAdd }] =
    useAddToAnonymousShoppingCartRequest();

  const [mergeCarts, { error: errorByMerge, isLoading: loadingByMerge }] =
    useMergeAnonymousShoppingCartRequest();

  const _mapErrors = (error: any): Error => {
    const text = error?.data?.errors
      ?.map(({ message = '' }) => message)
      .join('\n');
    return new Error(text || error?.message || error);
  };

  const _getAnonymousCartGuid = async (): Promise<string> => {
    if (ANONYMOUS_CART_GUID) return ANONYMOUS_CART_GUID;

    const { error, data } = (await createCart()) as any;
    if (error) throw _mapErrors(error);

    const { guid } = data as CreateShoppingCartResponse;
    saveLocalStorage({
      [LocalStorageKey.AnonymousCartGuid]: guid
    });
    return guid;
  };

  const _getUserCartGuid = async (): Promise<string> => {
    const { data, error } = (await getShoppingCart({
      username: USER_EMAIL
    })) as any;
    if (error) throw new Error(error);
    const { guid } = data;
    return guid;
  };

  const addToAnonymousCart = async ({ productId = '', quantity = 0 }) => {
    if (IS_LOGGED) return;
    const cartGuid = await _getAnonymousCartGuid();
    const { error, data } = (await addToCart({
      cartGuid,
      quantity,
      product: { code: productId }
    })) as any;

    if (data) {
      const { data: anonymousCartData } = await getAnonymousShoppingCart({
        cartGuid
      });
      const totalUnitCount = anonymousCartData?.totalUnitCount ?? 0;
      dispatch(
        loadIndicationsKeys({
          cart: totalUnitCount
        })
      );
      return data;
    }
    throw _mapErrors(error);
  };

  const mergeAnonymousCart = async () => {
    if (!ANONYMOUS_CART_GUID || !IS_LOGGED) return;
    const toMergeCartGuid = await _getUserCartGuid();
    const { error, data } = (await mergeCarts({
      anonymousCartGuid: ANONYMOUS_CART_GUID,
      username: USER_EMAIL,
      toMergeCartGuid
    })) as any;
    if (error) throw _mapErrors(error);
    await removeLocalStorage([LocalStorageKey.AnonymousCartGuid]);
    return data as Cart;
  };

  return {
    canUseAnonymousCart: !IS_LOGGED,
    addToAnonymousCart,
    mergeAnonymousCart,
    errors: {
      adding: errorByCreateAnonymousCart || errorByAdd,
      merging: errorByGetShoppingCart || errorByMerge
    },
    loading: {
      byAdd: isLoadingByCreateAnonymousCart || loadingByAdd,
      byMerge: loadingByGetShoppingCart || loadingByMerge
    }
  };
};
