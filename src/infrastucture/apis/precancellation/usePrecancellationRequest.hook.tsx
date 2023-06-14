//Libs
import { useEffect, useMemo } from 'react';
//hooks
import useErrorDescription from '../../../application/common/hooksCommons/useErrorDescription';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  useGetDeferredListRequest,
  useRegisterTicketRequest,
  useGetTotalsPaymentRequest,
  useConfirmTicketsRequest
} from './precancellation.api';
//utils
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import {
  IDataConfirmPrecancel,
  IDeferredList,
  IPrecancellationError,
  IselectedTickets,
  TotalPaymentResponse
} from './precancellation.type';
import { IErrorCredit } from '../../../presentation/screens/Credit/ErrorCredit.interface';

/**
 * @name usePrecancellationRequest
 * @description usePrecancellationRequest Hook
 */

const CHANNEL = 'App';
export const usePrecancellationRequest = (): IPrecancellationRequestHook => {
  const { handleModalErrorService } = useErrorDescription();

  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: EMAIL,
      [LocalStorageKey.IpAddress]: IP_ADDRESS,
      [LocalStorageKey.UID]: DEVICE_ID,
      [LocalStorageKey.User]: { documentTypeNumber: USER_ID },
      [LocalStorageKey.AccountNumber]: ACCOUNT_NUMBER
    }
  } = useLocalStorage();

  /////////// STEP 1
  const [
    getDeferredListService,
    {
      data: dataDeferredListResponse,
      isLoading: isLoadingDeferredList,
      isSuccess: isSuccessDeferredList,
      isError: isErrorDeferredList,
      error: errorDeferredList
    }
  ] = useGetDeferredListRequest();

  const dataDeferredList = useMemo(() => {
    if (
      !isLoadingDeferredList &&
      isSuccessDeferredList &&
      dataDeferredListResponse
    )
      return dataDeferredListResponse.data;
    return undefined;
  }, [dataDeferredListResponse]) as IDeferredList[] | undefined;

  /////////// STEP 2

  const [
    setRegisterTicketService,
    {
      data: dataRegisterTicketResponse,
      isLoading: isLoadingRegisterTicket,
      isSuccess: isSuccessRegisterTicket,
      isError: isErrorRegisterTicket,
      error: errorRegisterTicket
    }
  ] = useRegisterTicketRequest();

  const dataIsRegisterTicket = useMemo(() => {
    if (
      !isLoadingRegisterTicket &&
      isSuccessRegisterTicket &&
      dataRegisterTicketResponse
    )
      return dataRegisterTicketResponse.success;
    return false;
  }, [dataRegisterTicketResponse]) as boolean;

  /////////// STEP 3

  const [
    getTotalsPaymentService,
    {
      data: dataTotalsPaymentResponse,
      isLoading: isLoadingTotalsPayment,
      isSuccess: isSuccessTotalsPayment,
      isError: isErrorTotalsPayment,
      error: errorTotalsPayment
    }
  ] = useGetTotalsPaymentRequest();

  const dataTotalsPayment = useMemo(() => {
    if (
      !isLoadingTotalsPayment &&
      isSuccessTotalsPayment &&
      dataTotalsPaymentResponse
    )
      return dataTotalsPaymentResponse.data;
    return undefined;
  }, [dataTotalsPaymentResponse]) as TotalPaymentResponse | undefined;

  /////////// STEP 4

  const [
    setConfirmTicketsService,
    {
      data: dataConfirmTicketsResponse,
      isLoading: isLoadingConfirmTickets,
      isSuccess: isSuccessConfirmTickets,
      isError: isErrorConfirmTickets,
      error: errorConfirmTickets
    }
  ] = useConfirmTicketsRequest();

  const dataConfirmTickets = useMemo(() => {
    if (
      !isLoadingConfirmTickets &&
      isSuccessConfirmTickets &&
      dataConfirmTicketsResponse
    )
      return {
        success: dataConfirmTicketsResponse.success,
        result: dataConfirmTicketsResponse.data?.result
      };
    return undefined;
  }, [dataConfirmTicketsResponse]) as IDataConfirmPrecancel | undefined;

  ////////////////////////////
  ////////////////////////////
  //////ERRORS //////////////////
  useEffect(() => {
    if (isErrorDeferredList && errorDeferredList) {
      console.log('errorDeferredList', errorDeferredList);
      // handleCreateError(errorDeferredList)
    }

    if (isErrorRegisterTicket && errorRegisterTicket) {
      console.log('errorRegisterTicket', errorRegisterTicket);
      // handleCreateError(errorRegisterTicket)
    }
    if (isErrorTotalsPayment && errorTotalsPayment) {
      console.log('errorTotalsPayment', errorTotalsPayment);
      handleCreateError(errorTotalsPayment);
    }
    if (isErrorConfirmTickets && errorConfirmTickets) {
      console.log('errorConfirmTickets', errorConfirmTickets);
      // handleCreateError(errorConfirmTickets)
    }
  }, [
    isErrorDeferredList,
    isErrorRegisterTicket,
    isErrorTotalsPayment,
    isErrorConfirmTickets
  ]);

  const handleCreateError = (currentError: IPrecancellationError) => {
    console.log('handleCreateError', currentError);
    const error = {
      data: {
        errors: [{ message: currentError.data.message }]
      }
    };
    setTimeout(() => {
      handleModalErrorService(error);
    }, 1000);
  };
  const onGetDeferredList = () => {
    getDeferredListService({
      channel: CHANNEL,
      ip: IP_ADDRESS,
      email: EMAIL,
      deviceId: DEVICE_ID,
      // identification: '0921304309',
      identification: USER_ID
    });
  };

  const onSetRegisterTicket = (tickets: IselectedTickets[]) => {
    setRegisterTicketService({
      channel: CHANNEL,
      ip: IP_ADDRESS,
      email: EMAIL,
      deviceId: DEVICE_ID,
      identification: USER_ID,
      selectedTickets: tickets
    });
  };

  const onGetTotalsPayment = () => {
    getTotalsPaymentService({
      channel: CHANNEL,
      ip: IP_ADDRESS,
      email: EMAIL,
      deviceId: DEVICE_ID,
      identification: USER_ID
    });
  };
  const onSetConfirmTickets = () => {
    setConfirmTicketsService({
      channel: CHANNEL,
      ip: IP_ADDRESS,
      email: EMAIL,
      deviceId: DEVICE_ID,
      identification: USER_ID
    });
  };

  return {
    dataDeferredList,
    dataIsRegisterTicket,
    dataTotalsPayment,
    dataConfirmTickets,

    onGetDeferredList,
    onSetRegisterTicket,
    onGetTotalsPayment,
    onSetConfirmTickets,

    isLoadingDeferredList,
    isSuccessDeferredList,
    isErrorDeferredList,

    isLoadingRegisterTicket,
    isSuccessRegisterTicket,
    isErrorRegisterTicket,
    errorRegisterTicket,

    isLoadingTotalsPayment,
    isSuccessTotalsPayment,
    isErrorTotalsPayment,

    isLoadingConfirmTickets,
    isSuccessConfirmTickets,
    isErrorConfirmTickets,
    errorConfirmTickets
  };
};

interface IPrecancellationRequestHook {
  dataDeferredList: IDeferredList[] | undefined;
  dataIsRegisterTicket: boolean;
  dataTotalsPayment: TotalPaymentResponse | undefined;
  dataConfirmTickets: IDataConfirmPrecancel | undefined;

  onGetDeferredList(): void;
  onSetRegisterTicket(tickets: IselectedTickets[]): void;
  onGetTotalsPayment(): void;
  onSetConfirmTickets(): void;

  isLoadingDeferredList: boolean;
  isSuccessDeferredList: boolean;
  isErrorDeferredList: boolean;

  isLoadingRegisterTicket: boolean;
  isSuccessRegisterTicket: boolean;
  isErrorRegisterTicket: boolean;
  errorRegisterTicket: IErrorCredit;

  isLoadingTotalsPayment: boolean;
  isSuccessTotalsPayment: boolean;
  isErrorTotalsPayment: boolean;

  isLoadingConfirmTickets: boolean;
  isSuccessConfirmTickets: boolean;
  isErrorConfirmTickets: boolean;
  errorConfirmTickets: IErrorCredit;
}

export default usePrecancellationRequest;
