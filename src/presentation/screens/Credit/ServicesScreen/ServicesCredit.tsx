import { View, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useLayoutEffect, useState, useMemo } from 'react';
import {
  HEIGHT_TAB_BAR,
  MARING_HORIZONTAL
} from '../../../../application/common/layout';
import { COLORS } from '../../../../application/common/colors';
import _keyBy from 'lodash/keyBy';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { NAV } from '../../../../application/common/namesNav';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import { useServicesListMutationRequest } from '../../../../infrastucture/apis/creditAccount';
import {
  DataCustomerService,
  useContentServiceMutation
} from '../../../../infrastucture/apis/contentService';
import TemplatePage from '../../../common-components/template-page';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import ButtonRelatedCredit from '../components/ButtonRelatedCredit';
import { Popup } from '../../../common-components/poppup';
import usePrecancellationRequest from '../../../../infrastucture/apis/precancellation/usePrecancellationRequest.hook';
import ModalForWp from '../PreCancelCredit/components/ModalForWp';
import BottomSheetCreditLock from '../components/Buttonsheets/BottomSheetCreditLock';
import ListCardButton from '../../../common-components/ListCardButton/ListCardButton';
import { useLinkPress } from '../../../../application/common/hooksCommons/useLinkPress';
import { trackEventclick } from '../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEvents } from '../../../../infrastucture/native-modules/emma/clickEventMap';
import { useServicesCreditRedux } from '../../../../application/state-manager/services/credit/useServicesCredit.redux.hook';
import { useAppDispatch } from '../../../../application/state-manager';
import { clearCreditInfo } from '../../../../application/state-manager/services/credit';
import useGetCreditsUser from '../../../../application/common/hooksCommons/useGetCreditsUser';
import sleep from '../../../../application/utils/sleep';
import { useCurrentCreditLimitRequest } from '../../../../infrastucture/apis/credit/credit.api';
import { setShowLoadingScreen } from '../../../../application/state-manager/services/checkout';
import { CurrentCreditLimitResponse } from '../../../../infrastucture/apis/credit/credit.interface';
import { useWhatsapp } from '../../../../application/common/hooksCommons/useOpenLinkInApp';
import { useContactlessPaymentState } from '../../../../application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import { PopupWhatsapp } from '../../../common-components/poppup/poppupWhatsapp';
import { useTranslation } from 'react-i18next';
import {
  CODE_ERROR_BLOCKED_ACCOUNT,
  CODE_ERROR_EXPIRED_ACCOUNT
} from '../../../../application/common/constants';

export default function ServicesCredit() {
  const focused = useIsFocused();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { goLink } = useLinkPress();
  const { showModal, hideModal } = useGenericModal();
  const { onSetTitleScreenService } = useServicesCreditRedux();
  const [openWhatsapp] = useWhatsapp();

  const [showModaCreditLock, setShowModaCreditLock] = useState<boolean>(false);
  const [showModaPasswordError, setShowModaPasswordError] =
    useState<boolean>(false);
  const [showCheckQuoteError, setShowCheckQuoteError] =
    useState<boolean>(false);
  const [showErrorCreditPrecancel, setShowErrorCreditPrecancel] =
    useState<boolean>(false);
  const [textErrorByMaxQuoteZero, setTextErrorByMaxQuoteZero] =
    useState<string>();
  const { showIdentityValidation: setShowLoginBottomSheet } =
    useContactlessPaymentState();
  const [doGetServicesList, { data: dataRequest, isError, isLoading, error }] =
    useServicesListMutationRequest();

  const { onGetDeferredList, isSuccessDeferredList, isErrorDeferredList } =
    usePrecancellationRequest();

  const [
    doGetContentList,
    {
      data: dataContentRequest,
      isError: isErrorContent,
      isLoading: isLoadingContent,
      error: errorContent
    }
  ] = useContentServiceMutation();

  const [
    getCurrentCreditLimit,
    { isError: isCreditIncreaseError, error: CreditIncreaseError }
  ] = useCurrentCreditLimitRequest();

  const {
    loadCreditsUser,
    isLoading: isLoadingByGetCreditUserInfo,
    isError: hasErrorGetCreditUser
  } = useGetCreditsUser();

  const [showModalWhatsApp, setShowModalWhatsApp] = useState(false);

  const handleShowModal = async (type: any) => {
    await sleep(1000);
    showModal(type, {
      textContent:
        CreditIncreaseError?.data?.message ?? CreditIncreaseError?.data?.Message
    });
  };

  useEffect(() => {
    if (isCreditIncreaseError && CreditIncreaseError) {
      if (CreditIncreaseError?.status === CODE_ERROR_BLOCKED_ACCOUNT) {
        setShowModalWhatsApp(true);
      } else if (CreditIncreaseError?.status === CODE_ERROR_EXPIRED_ACCOUNT) {
        handleShowModal(ModalsType.ErrorSignUp);
      } else {
        handleShowModal(ModalsType.modalInformations);
      }
    }
  }, [isCreditIncreaseError, CreditIncreaseError]);

  const {
    localStorageData: {
      [LocalStorageKey.IsAccountAuthenticated]: IsAccountAuthenticated,
      [LocalStorageKey.IsLogin]: IS_LOGIN,
      [LocalStorageKey.AccountAdditionalNumber]: aditionalAccount,
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.UID]: DeviceId,
      [LocalStorageKey.User]: { documentTypeNumber: USER_ID },
      [LocalStorageKey.Whatsapp]: {
        message: WhatsappMessage,
        phone: WhatsappPhone
      }
    },
    save: saveInLocalStoarge
  } = useLocalStorage();

  const SERVICES_APP: Record<
    string,
    {
      link?: string;
      actionLink?: () => void;
    }
  > = {
    consulta_saldos: {
      actionLink: () => showModal(ModalsType.CreditMovement)
    },
    aumento_cupo: {
      actionLink: () => {
        onPressIncreaseCreditLimit();
      }
    },
    precancelar_credito: {
      actionLink: () => handleValidatePrecancel()
    },
    bloqueo_credito: {
      actionLink: () => onPressCreditLock()
    },
    pago_sin_contacto: {
      actionLink: () => setShowLoginBottomSheet(true) // navigation.navigate(NAV.CONTACTLESS_PAYMENT as never),
    }
  };

  const onPressSendMessage = () => {
    openWhatsapp(WhatsappPhone, WhatsappMessage).catch(() => {
      Alert.alert(`${t('error.installWhatsApp')}`);
    });
    setShowCheckQuoteError(false);
    setTextErrorByMaxQuoteZero(undefined);
  };

  const onPressIncreaseCreditLimit = async () => {
    dispatch(setShowLoadingScreen(true));
    await sleep(400);
    try {
      //@ts-ignore
      const { data: creditLimitInfo } = await getCurrentCreditLimit({
        deviceId: DeviceId,
        identification: USER_ID
      }).unwrap();

      if (creditLimitInfo.maxQuota <= 0) {
        setTextErrorByMaxQuoteZero(creditLimitInfo.description);
        dispatch(setShowLoadingScreen(false));
        await sleep(400);
        setShowCheckQuoteError(true);
        return;
      }
      dispatch(setShowLoadingScreen(false));
      await sleep(400);
      navigation.navigate(NAV.CreditLimitIncrease as never);
    } catch (e: any) {
      dispatch(setShowLoadingScreen(false));
      const { Code, code } = e.data as CurrentCreditLimitResponse;
      await sleep(400);
      switch (Code || code) {
        case '0002':
        case '0003':
        case '0004':
          setShowCheckQuoteError(true);
          break;
        default:
          setShowModaPasswordError(true);
      }
    }
  };

  const contentMaxQuotePopupError = useMemo(() => {
    let response: { title: string; textContent?: string } = { title: '' };

    const { Message = '', message = '' } = CreditIncreaseError?.data ?? {};
    const _message = textErrorByMaxQuoteZero;

    const content = (Message || message || _message)?.split('\\n');
    response.title = content?.[0] ?? `${t('error.cannotIncreaseQuota')}`;
    if (content?.[1]) {
      response.textContent = content?.[1];
    }

    return response;
  }, [textErrorByMaxQuoteZero, CreditIncreaseError?.data]);

  const isLoggedAndAuthenticate = useMemo(
    () => IsAccountAuthenticated && IS_LOGIN,
    [IsAccountAuthenticated, IS_LOGIN]
  );
  const titleCard = (_text: string) => _text.split('\n').join(' ');

  const dataFilted = useMemo(() => {
    if (!dataRequest?.success || !dataContentRequest?.success) return [];

    const { creditServices } = dataContentRequest?.data as DataCustomerService;
    const creditServiceContent = [...(creditServices?.content ?? [])];
    const listServices = [...(dataRequest?.data ?? [])];
    const listContent = _keyBy(creditServiceContent, 'id');

    return listServices
      ?.map(item => {
        const content = listContent[item.id] ?? {};
        const content_app = SERVICES_APP[item.id] ?? {};
        return {
          ...item,
          ...content,
          title: content.title ?? item.id,
          link: item?.link || content?.link || content_app?.link,
          actionLink: content_app.actionLink
        };
      })
      ?.filter(item => {
        if (!item?.isVisibleForUser) return item?.isVisibleForUser;
        if (!item?.isActive) return item?.isActive;
        if (item?.isLoggedIn && !IS_LOGIN) return false;
        if (item?.isLinkedToDirectCredit && !IsAccountAuthenticated)
          return false;

        if (IsAccountAuthenticated) {
          const isPrincipal = aditionalAccount === '00';
          if (item?.showForPrincipal && isPrincipal) return true;
          else if (item?.showForAdditional && !isPrincipal) return true;
          else return false;
        }

        return true;
      });
  }, [
    dataRequest,
    dataContentRequest,
    IsAccountAuthenticated,
    isLoggedAndAuthenticate
  ]);

  const onPressCardItem = (item: {
    title: string;
    link?: string;
    actionLink?: () => void;
  }) => {
    onSetTitleScreenService(titleCard(item.title));
    if (item.actionLink) return item.actionLink?.();
    if (!item.link?.startsWith('http'))
      return navigation.navigate(item.link as never);
    if (item.link) return goLink(item.link);
  };

  const handleValidatePrecancel = () => {
    onGetDeferredList();
    showModal(ModalsType.ModalLoading);
  };

  const onPressCreditLock = () => {
    setShowModaCreditLock(true);
  };

  const onClosePopUpSuccessCreditLock = () => {
    setShowModaPasswordError(false);
  };

  const onCloseBottomSheetCreditLock = (isLocked?: boolean) => {
    if (!isLocked) {
      setShowModaCreditLock(false);
      return;
    }
    saveInLocalStoarge({
      [LocalStorageKey.IsAccountAuthenticated]: false,
      [LocalStorageKey.AccountNumber]: '',
      [LocalStorageKey.AccountAdditionalNumber]: ''
    });
    dispatch(clearCreditInfo());
    sleep(200).then(() => loadCreditsUser());
  };

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: `${t('headerTitle.creditServices')}`
    });
  }, [focused, IS_LOGIN]);

  useEffect(() => {
    Promise.all([
      doGetServicesList({
        email: USER_EMAIL || 'guest'
      }),
      doGetContentList({
        content: 'creditServices'
      })
    ]);
  }, [IS_LOGIN, IsAccountAuthenticated]);

  useEffect(() => {
    if (!isError && !isErrorContent && !hasErrorGetCreditUser) return;
    if (isError || isErrorContent || hasErrorGetCreditUser)
      setShowModaPasswordError(true);
  }, [isError, isErrorContent, hasErrorGetCreditUser]);

  useEffect(() => {
    if (isSuccessDeferredList) {
      hideModal();
      setTimeout(() => navigation.navigate(NAV.CreditPreCancel as never), 900);
    }
  }, [isSuccessDeferredList]);

  useEffect(() => {
    if (isErrorDeferredList) {
      hideModal();
      setTimeout(() => setShowErrorCreditPrecancel(true), 1000);
    }
  }, [isErrorDeferredList]);

  useEffect(() => {
    setShowModaCreditLock(false);
    return () => {
      setShowModaCreditLock(false);
    };
  }, []);

  return (
    <TemplatePage
      error={isError || isErrorContent || hasErrorGetCreditUser}
      loading={isLoading || isLoadingContent || isLoadingByGetCreditUserInfo}
      skeleton={
        <SkeletonContent
          isLoading={isLoading || isLoadingContent}
          layout={[{ width: '100%', height: 200 }]}
        />
      }>
      <View style={{ paddingHorizontal: MARING_HORIZONTAL }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={dataFilted.sort(
            (a, b) => a.presentationOrder - b.presentationOrder
          )}
          contentContainerStyle={{
            paddingBottom: HEIGHT_TAB_BAR + 60,
            alignSelf: 'center'
          }}
          renderItem={({ item }) => {
            return (
              <ListCardButton
                text={item.title}
                onPress={() => onPressCardItem(item)}
                flagVisible={item.showFlag}
                image={item.image1}
              />
            );
          }}
          ListFooterComponent={
            <View style={{ marginTop: 24, width: '100%' }}>
              {(!IS_LOGIN || !IsAccountAuthenticated) && (
                <ButtonRelatedCredit
                  trackEmma={() => {
                    trackEventclick(keyEvents.credito_vincular_service);
                  }}
                />
              )}
            </View>
          }
        />
        <BottomSheetCreditLock
          showModaCreditLock={showModaCreditLock}
          onCloseRequest={onCloseBottomSheetCreditLock}
          setShowModaCreditLock={setShowModaCreditLock}
        />
        <PopupWhatsapp
          visible={showModalWhatsApp}
          title={contentMaxQuotePopupError.title}
          onClose={onClosePopUpSuccessCreditLock}
        />
        <Popup
          visible={showModaPasswordError && !isCreditIncreaseError}
          title={`${
            error || errorContent
              ? error || errorContent
              : contentMaxQuotePopupError.title ?? ''
          }`}
          icon="error"
          hideButton={true}
          iconColor={COLORS.REDICON}
          closeAction={onClosePopUpSuccessCreditLock}
          showCloseButton={true}
        />
        <Popup
          visible={showCheckQuoteError}
          {...contentMaxQuotePopupError}
          icon="error"
          hideButton={false}
          iconColor={COLORS.REDICON}
          closeAction={() => {
            setShowCheckQuoteError(false);
            sleep(400).then(() => {
              setTextErrorByMaxQuoteZero(undefined);
            });
          }}
          buttonAction={onPressSendMessage}
          showCloseButton={true}
          buttonText={`${t('APP_BOTON_LABEL.typeUsByWhatsapp2')}`}
          buttonType="full"
          textContentStyle={{ marginBottom: 16, textAlign: 'center' }}
          bodyComponent={() => <View style={{ height: 20, width: '100%' }} />}
          iconButton={
            <Icon
              style={{ marginRight: 10 }}
              name="whatsapp"
              size={22}
              color={COLORS.WHITE}
            />
          }
        />
        <ModalForWp
          visible={showErrorCreditPrecancel}
          onClose={() => setShowErrorCreditPrecancel(false)}
        />
      </View>
    </TemplatePage>
  );
}
