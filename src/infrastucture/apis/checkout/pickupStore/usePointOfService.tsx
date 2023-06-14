import { useEffect, useState } from 'react';
import {
  ISelectPOSRequest,
  useLazyPickupStoreRequest,
  useSelectPOSRequest
} from '.';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { IPosGroup } from './interfaces/pointOfService.model.interfaces';
import useErrorDescription from '../../../../application/common/hooksCommons/useErrorDescription';

/**
 * @name usePointOfService
 * @description Shopping Cart Request Hook
 */
export const usePointOfService = (): PointOfServiceHook => {
  const [dataPickupStore, setDataPickupStore] = useState<IPosGroup[]>([]);
  const { handleModalErrorService } = useErrorDescription();

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();

  const [
    getPointOfService,
    {
      data,
      isLoading: isLoadingPickupStore,
      isSuccess: isSuccesPickupStore,
      error: ErrorPickupStore,
      isError: isErrorPickupStore
    }
  ] = useLazyPickupStoreRequest();

  const [
    setSelectPointOfService,
    {
      data: dataSelectPOS,
      isLoading: isLoadingSelectPOS,
      isSuccess: isSuccesSelectPOS,
      error: ErrorSelectPOS,
      isError: isErrorSelectPOS
    }
  ] = useSelectPOSRequest();

  useEffect(() => {
    if (!isLoadingPickupStore && isSuccesPickupStore) {
      setDataPickupStore(data?.posGroups ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (isErrorPickupStore) {
      handleModalErrorService(ErrorPickupStore);
    }

    if (isErrorSelectPOS) {
      handleModalErrorService(ErrorSelectPOS);
    }
  }, [isErrorPickupStore, isErrorSelectPOS]);

  const getPickupStore = () => {
    getPointOfService({
      user: USER_EMAIL
    });
  };

  const setSelectStore = ({
    cartId,
    posCode,
    retireId,
    retireName,
    deliveryMethodCode,
    selectedAddressCode
  }: ISelectPOSRequest) => {
    if (!deliveryMethodCode && !selectedAddressCode) {
      setSelectPointOfService({
        user: USER_EMAIL,
        cartId: cartId,
        posCode: posCode,
        retireId: retireId,
        retireName: retireName
      });
    } else {
      setSelectPointOfService({
        user: USER_EMAIL,
        cartId: cartId,
        posCode: posCode,
        retireId: retireId,
        retireName: retireName,
        deliveryMethodCode: deliveryMethodCode,
        selectedAddressCode: selectedAddressCode
      });
    }
  };

  return {
    getPickupStore,
    dataPickup: dataPickupStore,
    isLoading: isLoadingPickupStore,
    isSucces: isSuccesPickupStore,
    error: ErrorPickupStore,
    //SELECT POS
    setSelectStore,
    isLoadingSelectPOS,
    isSuccesSelectPOS
  };
};

interface PointOfServiceHook {
  getPickupStore: () => void;
  dataPickup: IPosGroup[];
  isLoading: boolean;
  isSucces: boolean;
  error: any;
  //SELECT POS
  setSelectStore: (x: ISelectPOSRequest) => void;
  isLoadingSelectPOS: boolean;
  isSuccesSelectPOS: boolean;
}

export default usePointOfService;
