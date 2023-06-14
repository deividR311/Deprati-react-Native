import { useEffect } from 'react';
import {
  PaymentBodyGIFCard,
  usePaymentGifCardRequest
} from '../../../../../../infrastucture/apis/checkout/payment-methods';
import { useCheckoutState } from '../../../../../../application/state-manager/services/checkout/useCheckout.hook';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';

interface ParamsQuery {
  cartId: string;
  gifCardData: PaymentBodyGIFCard;
  setLoading: (bool: boolean) => void;
}
export default function usePaymentGifCard({
  cartId,
  gifCardData,
  setLoading
}: ParamsQuery) {
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();
  const { onContinueButtonTrigger } = useCheckoutState();

  const [paymentGifCard, { data, isLoading, isSuccess, error }] =
    usePaymentGifCardRequest();

  useEffect(() => {
    if (!onContinueButtonTrigger) return;
    paymentGifCard({
      cartId,
      ...gifCardData,
      user: USER_EMAIL
    });
  }, [onContinueButtonTrigger]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return {
    data,
    isSuccess,
    error
  };
}
