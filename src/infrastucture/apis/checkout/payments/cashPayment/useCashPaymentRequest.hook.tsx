import { useEffect, useState } from 'react';
import {
  IHtml,
  PaymentSelectRequest,
  useLazyGetCashPaymentRequest,
  useSetCashPaymentRequest
} from '.';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';

/**
 * @name useCashPaymentRequest
 * @description Cash Payment Request Hook
 */

const BANK_PAYMENT = 'netBankingPaymentGroup';
const CASH_IN_DELIVERY = 'cashInDeliveryPaymentGroup';
export const TEXT_MAKEPAYMENT =
  'Puedes efectuar el pago en cualquier agencia del ';

export const useCashPaymentRequest = (): CashPaymentServiceHook => {
  const [dataCashPayment, setDataCashPayment] = useState<IHtml>({ html: '' });

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();

  const [
    getCashPaymentService,
    {
      isLoading: isLoadingGetCashPayment,
      error: errorGetCashPayment,
      data,
      isSuccess: isSuccesGetCashPayment
    }
  ] = useLazyGetCashPaymentRequest();

  const [
    setPaymentService,
    {
      isLoading: isLoadingPayment,
      error: errorPayment,
      data: dataSelectPayment,
      isSuccess: isSuccessPayment
    }
  ] = useSetCashPaymentRequest();

  useEffect(() => {
    if (!isLoadingGetCashPayment && isSuccesGetCashPayment) {
      setDataCashPayment(handleEditContent(data?.component[0].content ?? ''));
    }
  }, [data]);

  const handleEditContent = (text: string): IHtml => {
    let newText = text.replaceAll('<ul>', '<strong><ul>');
    newText = newText.replaceAll('</ul> ', '</ul></strong>');
    newText = newText.replaceAll(' ; ', ';');
    // console.log('newText', newText)
    return { html: newText };
  };

  const getCashPayment = () => {
    getCashPaymentService({
      user: USER_EMAIL
    });
  };

  const handlePayment = (paymentType: string, cartId: string) => {
    let request: PaymentSelectRequest = {
      user: USER_EMAIL,
      cartId: cartId,
      selectedPaymentGroup: ''
    };
    if (paymentType === BANK_PAYMENT) {
      request.netBankingForm = {};
      request.selectedPaymentGroup = BANK_PAYMENT;
    } else if (paymentType === CASH_IN_DELIVERY) {
      request.cashInDeliveryForm = {};
      request.selectedPaymentGroup = CASH_IN_DELIVERY;
    }

    return request;
  };

  const setCashPayment = (cartId: string, paymentType: string) => {
    setPaymentService(handlePayment(paymentType, cartId));
  };

  return {
    getCashPayment,
    dataCashPayment,
    isLoading: isLoadingGetCashPayment,
    isSucces: isSuccesGetCashPayment,
    error: errorGetCashPayment,
    //SELECT POS
    setCashPayment,
    isLoadingPayment,
    errorPayment,
    isSuccessPayment,

    //PaymentType
    BANK_PAYMENT,
    CASH_IN_DELIVERY
  };
};

interface CashPaymentServiceHook {
  getCashPayment(): void;
  dataCashPayment: IHtml;

  isLoading: boolean;
  isSucces: boolean;
  error: any;
  //SELECT POS
  setCashPayment(x: string, paymentType: string): void;
  isLoadingPayment: boolean;
  errorPayment: any;
  isSuccessPayment: boolean;

  //PaymentType
  BANK_PAYMENT: string;
  CASH_IN_DELIVERY: string;
}

export default useCashPaymentRequest;
