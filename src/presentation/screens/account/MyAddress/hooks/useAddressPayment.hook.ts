import { useEffect, useState, useMemo } from 'react';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  AddressPaymentDto,
  useGetAddressPaymentRequest
} from '../../../../../infrastucture/apis/address';

export const useAddressPayment = (): InfoHook => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const filterAddressDefault = (address: AddressPaymentDto) =>
    address?.defaultAddress === true;
  const filterAddressOthers = (address: AddressPaymentDto) =>
    address?.defaultAddress === false;

  const [
    getAddressPayment,
    {
      isSuccess: isSuccessAddressPaymentList,
      isLoading: isLoadingAddressPaymentList,
      data: dataAddressPayment
    }
  ] = useGetAddressPaymentRequest();

  const addressPaymentList: ListAddressPayment = useMemo(() => {
    let response: ListAddressPayment = {
      default: null,
      others: [],
      existsAddress: false,
      loading: true
    };

    if (!isLoadingAddressPaymentList && isSuccessAddressPaymentList) {
      let defaultAddress =
        dataAddressPayment?.addresses?.find(filterAddressDefault);
      response.default = defaultAddress;

      const others = dataAddressPayment?.addresses?.filter(filterAddressOthers);
      response.others = others;

      if (defaultAddress || others?.length) response.existsAddress = true;

      response.loading = false;
    }
    return response;
  }, [isLoadingAddressPaymentList, dataAddressPayment]);

  useEffect(() => {
    if (username?.length > 0) {
      getAddressPayment({ username });
    }
  }, [username]);

  return {
    //list
    addressPaymentList,
    //states
    loading,
    error,
    isLoadingAddressPaymentList
  };
};

export interface ListAddressPayment {
  default?: AddressPaymentDto | null;
  others?: AddressPaymentDto[] | any[];
  existsAddress: boolean;
  loading: boolean;
}

export interface InfoHook {
  addressPaymentList: ListAddressPayment;
  //states
  loading: boolean;
  error: boolean;

  isLoadingAddressPaymentList: boolean;
}
