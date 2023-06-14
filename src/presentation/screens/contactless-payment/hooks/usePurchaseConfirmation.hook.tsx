import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { NAV } from '../../../../application/common/namesNav';
import { useContactlessPaymentState } from '../../../../application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  mapTicketModelfromDTO,
  PurchaseConfirmationResponse,
  PurchaseTicketModel,
  Ticket,
  useContactlessPurchaseCancelRequest,
  useContactlessPurchaseConfirmRequest,
  useContactlessTicketRequest
} from '../../../../infrastucture/apis/contactless-payment';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { ContactLessPaymentSteps } from '../../../navigation/contactless-payment';

export const usePurchaseConfirmation = (): PurchaseConfirmationHook => {
  const [hasError, setHasError] = useState(false);
  const [ticket, seTicketData] = useState<Ticket>();
  const navigation = useNavigation();
  const { showModal, hideModal } = useGenericModal();

  const { showSuccessBuy, doEnableConfirmPurchaseButton } =
    useContactlessPaymentState();

  const {
    localStorageData: {
      [LocalStorageKey.AccountNumber]: ACCOUNT_NUMBER,
      [LocalStorageKey.AccountAdditionalNumber]: ADDITIONAL_ACCOUNT_NUMBER,
      [LocalStorageKey.TokenFCM]: tokenFCM,
      [LocalStorageKey.UID]: DEVICE_ID
    }
  } = useLocalStorage();

  const [
    getTicketById,
    {
      isLoading: isLoadingByTicket,
      data: ticketRawDataResponse,
      isError: ticketRequestHasError,
      error: ticketRequestError
    }
  ] = useContactlessTicketRequest();

  const [
    doRejectBuy,
    {
      isLoading: isLoadingByReject,
      data: rejectRawDataResponse,
      isError: rejectRequestHasError,
      error: rejectRequestError
    }
  ] = useContactlessPurchaseCancelRequest();

  const [
    doBuy,
    {
      isLoading: isLoadingByAccept,
      data: confirmRawDataResponse,
      isError: confirmRequestHasError,
      error: confirmRequestError
    }
  ] = useContactlessPurchaseConfirmRequest();

  const doRejectPurchase = async () => {
    doRejectBuy({
      idTicket: ticket?.uniqueIdTicket ?? '',
      account: ticket?.account || ACCOUNT_NUMBER,
      additional: ticket?.additionalNumber || ADDITIONAL_ACCOUNT_NUMBER,
      deviceId: DEVICE_ID
    });
  };

  const doAcceptPurchase = async () => {
    doBuy({
      idTicket: ticket?.uniqueIdTicket ?? '',
      account: ACCOUNT_NUMBER,
      additional: ADDITIONAL_ACCOUNT_NUMBER,
      deviceId: DEVICE_ID
    });
    //showSuccessBuy(true, '012', '1-1-606-63663809290728-00-20230412141253')
  };

  const onCloseSuccessBuy = () => {
    showSuccessBuy(false);
    doEnableConfirmPurchaseButton(false);
    navigation.reset({
      index: 0,
      routes: [{ name: NAV.DASHBOARD_NAVIGATION as never }]
    });
  };

  useEffect(() => {
    if (!confirmRequestHasError) return;
    const { message, errors } = (confirmRequestError as FetchBaseQueryError)
      .data as PurchaseConfirmationResponse;
    const errorText = message || errors?.join('\n');
    if (!errorText) {
      setHasError(true);
      return;
    }
    showModal(ModalsType.ErrorService, {
      buttonText: 'ACEPTAR',
      buttonType: 'full',
      closeAction: hideModal,
      buttonAction: hideModal,
      title: errorText
    });
  }, [confirmRequestError, confirmRequestHasError]);

  useEffect(() => {
    if (
      !ticketRequestHasError &&
      !confirmRequestHasError &&
      !rejectRequestHasError
    )
      return;
    setHasError(true);
  }, [ticketRequestHasError, rejectRequestHasError]);

  useEffect(() => {
    if (!rejectRawDataResponse) return;
    const { success, errors, message } = rejectRawDataResponse;
    if (!success) {
      console.log('>>> Reject Purchase not success: ', errors, message);
      setHasError(true);
      return;
    }
    doEnableConfirmPurchaseButton(false);
    Alert.alert('Compra Cancelada', message, [
      {
        text: 'ACEPTAR',
        onPress: () => navigation.navigate(NAV.DASHBOARD_INICIO as never)
      }
    ]);
  }, [rejectRawDataResponse]);

  useEffect(() => {
    try {
      if (!confirmRawDataResponse) return;
      const { data, success, errors, message } = confirmRawDataResponse ?? {};
      if (!success) {
        console.log('>>> Confirmation Purchase not success: ', errors, message);
        setHasError(true);
        return;
      }
      console.log('>>> Purchase rejection was success: ', data);
      showSuccessBuy(true, data?.numeroTicket ?? message, data?.uniqueIdTicket);
    } catch (error) {}
  }, [confirmRawDataResponse]);

  useEffect(() => {
    if (!ticketRawDataResponse) return;
    const { data, success, errors, message } = ticketRawDataResponse;
    if (!success) {
      console.log('>>> Get Ticket not success: ', errors, message);
      setHasError(true);
      return;
    }
    //const ticketData = mapTicketModelfromDTO(data)
    setHasError(false);
    seTicketData(data);
  }, [ticketRawDataResponse]);

  useFocusEffect(
    useCallback(() => {
      getTicketById({
        account: ACCOUNT_NUMBER,
        additional: ADDITIONAL_ACCOUNT_NUMBER,
        token: tokenFCM,
        deviceId: DEVICE_ID,
        timestamp: Date.now()
      });
    }, [])
  );

  return {
    ticket,
    doAcceptPurchase,
    doRejectPurchase,
    onCloseSuccessBuy,
    isLoadingByReject,
    isLoadingByAccept,
    isLoadingByTicket,
    hasError
  };
};

export interface PurchaseConfirmationHook {
  ticket?: Ticket;
  doAcceptPurchase: () => void;
  doRejectPurchase: () => void;
  onCloseSuccessBuy: () => void;
  isLoadingByReject: boolean;
  isLoadingByAccept: boolean;
  isLoadingByTicket: boolean;
  hasError: boolean;
}
