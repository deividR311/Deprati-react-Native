import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useReturnsService from '../../../../../infrastucture/apis/myReturns/useReturnsService.hook';
import {
  DeliveryOrderGroupEntry,
  MyReturnSearchResponse
} from '../../../../../infrastucture/apis/myReturns/myReturnsSearch.type';
import {
  IHandleBottomSheet,
  IHandleGlobal,
  IValueForItem
} from '../interfaces/IMyReturnsSearch.interface';
import { IEnterReturnRequest } from '../../../../../infrastucture/apis/myReturns/myReturnsEnter.type';
import { NAV } from '../../../../../application/common';
import { useListenerAccount } from '../../../../../application/state-manager/services/listenerAccount/useListenerAccount.hook';
import { MyReturnsNavigationRoute } from '../../../../navigation/account';

export const useMyReturnsSearch = (): MyReturnsSearchHook => {
  const navigation = useNavigation();

  const { onIsComesFromPaying: onIsComesSuccess } = useListenerAccount();

  const [sumGlobal, setSumGlobal] = useState<number>(0);
  const [isAllItems, setIsAllItems] = useState<boolean>(false);
  const [isDisabledAll, setIsDisabledAll] = useState<boolean>(false);
  const [isPressButtonAll, setIsPressButtonAll] = useState<boolean>(false);
  const [valueForItem, setValueForItem] = useState<IValueForItem[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const {
    //search
    searchReturnOrders,
    dataSearchReturnOrders,
    isLoadingSearchReturn,
    isSuccesSearchReturn,
    isErrorSearchReturn,
    //EnterReturn
    setEnterReturn,
    isLoadingEnterReturn,
    isSuccesEnterReturn,
    isErrorEnterReturn,
    dataEnterReturn
  } = useReturnsService();

  useEffect(() => {
    if (dataEnterReturn && isSuccesEnterReturn) setShowSuccess(true);
  }, [dataEnterReturn]);

  useEffect(() => {
    if (dataSearchReturnOrders) {
      const _isDisabledAll = handleDisabledAll(dataSearchReturnOrders);
      setIsDisabledAll(_isDisabledAll);

      if (_isDisabledAll) handleReturnAll();
      else
        setValueForItem(handleValueForItem(dataSearchReturnOrders.entries, 0));
    }
  }, [dataSearchReturnOrders]);

  const totalQuantity = useMemo(() => {
    if (dataSearchReturnOrders) {
      let count = 0;
      dataSearchReturnOrders.entries?.forEach(x => (count += x.quantity));
      return count;
    }
    return 0;
  }, [dataSearchReturnOrders]);

  const codeEnterReturn = useMemo(() => {
    if (dataEnterReturn) {
      return dataEnterReturn.code;
    }
    return '';
  }, [dataEnterReturn]);

  const handleDisabledAll = (dataSearch: MyReturnSearchResponse): boolean => {
    if (
      dataSearch.paymentStatus === 'PENDING' ||
      (dataSearch.deliveryMode.code === 'thirdParty' &&
        (dataSearch.deliveryStatus === 'PENDING' ||
          dataSearch.deliveryStatus === 'READYFORSHIPP'))
    ) {
      return true;
    }
    return false;
  };
  const handleReturnAll = () => {
    setIsPressButtonAll(true);
    if (dataSearchReturnOrders) {
      if (isAllItems) {
        setSumGlobal(0);
        setValueForItem(handleValueForItem(dataSearchReturnOrders.entries, 0));
      } else {
        setSumGlobal(totalQuantity);
        setValueForItem(handleValueForItem(dataSearchReturnOrders.entries));
      }
      setIsAllItems(!isAllItems);
    }
  };

  const handleValueForItem = (
    entries: DeliveryOrderGroupEntry[],
    valueQuantity?: number
  ): IValueForItem[] => {
    return entries.map(x => ({
      // code: x.product.code,
      expectedQuantity: valueQuantity ?? x.quantity,
      orderEntry: {
        entryNumber: x.entryNumber
      }
    }));
  };

  const handleChangeValue = (entryNumber: number, value: number) => {
    let valueIndex = valueForItem.findIndex(
      x => x.orderEntry.entryNumber === entryNumber
    );
    valueForItem[valueIndex].expectedQuantity = value;

    setValueForItem([...valueForItem]);
  };

  const handleToAccept = () => {
    let returnEntriesFilter = valueForItem.filter(
      x => x.expectedQuantity !== 0
    );
    const request: IEnterReturnRequest = {
      order: { code: dataSearchReturnOrders?.code ?? '' },
      returnEntries: returnEntriesFilter
    };
    setEnterReturn(request);
  };

  //// BottomSheet
  const handleCloseBottomSheet = () => {
    setShowSuccess(false);
    onIsComesSuccess(true);
    navigation.navigate(NAV.HOME as never);
  };

  const handleGoSeeDetails = () => {
    console.log('handleGoSeeDetails', codeEnterReturn);
    navigation.replace(MyReturnsNavigationRoute.DetailReturn, {
      returnCode: codeEnterReturn
    });
    setShowSuccess(false);
  };

  return {
    searchReturnOrders,
    dataSearchReturnOrders,
    isLoadingSearchReturn,
    isErrorSearchReturn,
    //
    handleToAccept,

    handleGlobal: {
      isDisabledAll,
      sumGlobal,
      setSumGlobal,
      isAllItems,
      setIsAllItems,
      isPressButtonAll,
      setIsPressButtonAll,
      handleChangeValue
    },
    handleReturnAll,
    isAllItems,
    totalQuantity,

    //EnterReturn
    isLoadingEnterReturn,
    isDisabledAll,
    isSuccesEnterReturn,
    isErrorEnterReturn,

    //handleBottomSheet
    handleBottomSheet: {
      ticketNumber: codeEnterReturn,
      show: showSuccess,
      handleClose: handleCloseBottomSheet,
      handleGoSeeDetails
    }
  };
};

interface MyReturnsSearchHook {
  searchReturnOrders(orderCode: string): void;
  dataSearchReturnOrders: MyReturnSearchResponse | undefined;
  isLoadingSearchReturn: boolean;
  isErrorSearchReturn: boolean;
  //
  handleToAccept(): void;

  handleReturnAll(): void;
  handleGlobal: IHandleGlobal;
  isAllItems: boolean;

  totalQuantity: number;

  //
  isLoadingEnterReturn: boolean;
  isDisabledAll: boolean;
  isSuccesEnterReturn: boolean;
  isErrorEnterReturn: boolean;

  //handleBottomSheet
  handleBottomSheet: IHandleBottomSheet;
}
