import { View, Text } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  AddressDto,
  AddressDtoBody,
  useCreateAddressDeliveryMutation,
  useDefaultAddressDeliveryMutation,
  useDeleteAddressMutation,
  useGetAddressDeliveryRequest,
  useUpdateAddressDeliveryMutation
} from '../../../../../infrastucture/apis/address';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { ListAddressDelivery } from './interfaces';

export default function useAddressDelivery() {
  const { localStorageData } = useLocalStorage();
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();
  const [setDefaultAddressApi, { isLoading: defaultLoading }] =
    useDefaultAddressDeliveryMutation();

  // getAddressDelivery address
  const [deleteAddressDelivery] = useDeleteAddressMutation();
  const [
    getAddressDelivery,
    {
      data: addressList,

      isLoading: isLoadingAdressDelivery
    }
  ] = useGetAddressDeliveryRequest();

  const [
    updateAddressApi,
    {
      isLoading: isLoadUpdateAddressDelivery,
      isSuccess: isSuccessUpdateAddressDelivery,
      isError: isErrorUpdateAddressDelivery
    }
  ] = useUpdateAddressDeliveryMutation();

  const [
    createAddressApi,
    {
      data: responseCreateAddress,
      isLoading: isLoadCreateAddressDelivery,
      isSuccess: isSuccessCreateAddressDelivery,
      error: isErrorCreateAddressDelivery
    }
  ] = useCreateAddressDeliveryMutation();
  const filterAddressDefault = address => address?.defaultAddress === true;
  const filterAddressOthers = address => address?.defaultAddress === false;

  const addressDeliveryList: ListAddressDelivery = useMemo(() => {
    let response = {
      default: null,
      others: []
    };

    let defaultAddress = addressList?.addresses?.find(filterAddressDefault);
    response.default = defaultAddress;
    const others = addressList?.addresses?.filter(filterAddressOthers);
    response.others = others;

    return response;
  }, [isLoadingAdressDelivery, addressList]);

  useEffect(() => {
    if (!username) return;
    getAddressDelivery({ username });
  }, [username]);

  const createAddressDelivery = (values: any) => {
    createAddressApi({
      cellphoneNumber: values.cellPhone,
      cellphonePreffix: values.prefffixCellNumber,
      city: values.city,
      country: {
        isocode: 'EC'
      },
      defaultAddress: values.checkDefault,
      firstName: values.names,

      line1: values.address,
      line2: values.numberHouse,
      otherInfo: values.infoAdress,
      phonePreffix: values.prefffixPhoneNumber,
      phone: values.phone,
      region: {
        isocode: values.province
      },
      town: values.city,
      username: username
    });
  };

  const updateAddressDelivery = (values: any) => {
    updateAddressApi({
      cellphoneNumber: values.cellPhone,
      cellphonePreffix: values.prefffixCellNumber,
      country: {
        isocode: 'EC'
      },
      defaultAddress: values.checkDefault,
      firstName: values.names,
      id: values.id,
      line1: values.address,
      line2: values.numberHouse,
      otherInfo: values.infoAdress,
      phonePreffix: values.prefffixPhoneNumber,
      phone: values.phone,
      region: {
        isocode: values.province
      },
      city: values.city,
      town: values.city,
      username: username
    });
  };

  const setDefaultAddress = (item: AddressDtoBody) => {
    setDefaultAddressApi(item);
  };
  return {
    addressDeliveryList,
    createAddressDelivery,
    responseCreateAddress,
    isSuccessCreateAddressDelivery,
    isSuccessUpdateAddressDelivery,
    isLoadUpdateAddressDelivery,
    isLoadCreateAddressDelivery,
    isErrorCreateAddressDelivery,
    isErrorUpdateAddressDelivery,
    defaultLoading,
    updateAddressDelivery,
    setDefaultAddress,
    deleteAddressDelivery
  };
}
