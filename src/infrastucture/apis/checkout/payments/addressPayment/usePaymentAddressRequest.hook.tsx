import { useEffect } from 'react';
import { useSetPaymentAddressRequest } from '.';
import useErrorDescription from '../../../../../application/common/hooksCommons/useErrorDescription';

import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';

/**
 * @name usePaymentAddressRequest
 * @description Payment Address Request Hook
 */

export const usePaymentAddressRequest = (): PaymentAddressServiceHook => {
  const { handleModalErrorService } = useErrorDescription();

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();

  const [
    setPaymentAddressService,
    { isLoading, error, data, isError, isSuccess }
  ] = useSetPaymentAddressRequest();

  useEffect(() => {
    if (isError && error) {
      handleModalErrorService(error);
    }
  }, [isError]);

  const setPaymentAddress = async (cartId: string, addressId: string) => {
    await setPaymentAddressService({
      user: USER_EMAIL,
      cartId: cartId,
      addressId: addressId
    });
  };

  return {
    setPaymentAddress,
    isLoadingPaymentAddress: isLoading,
    isSuccessPaymentAddress: isSuccess,
    isErrorPaymentAddress: isError
  };
};

interface PaymentAddressServiceHook {
  setPaymentAddress(cartId: string, addressId: string): void;
  isLoadingPaymentAddress: boolean;
  isSuccessPaymentAddress: boolean;
  isErrorPaymentAddress: boolean;
}

export default usePaymentAddressRequest;
