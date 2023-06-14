import { useEffect, useState } from 'react';
import {
  useEnterReturnRequest,
  useLazyDetailReturnRequest,
  useLazyReturnableOrdersRequest,
  useLazyReturnsListRequest,
  useLazySearchReturnsOrdersRequest
} from './returns.api';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import useErrorDescription, {
  IErrorService
} from '../../../application/common/hooksCommons/useErrorDescription';
import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { FetchBaseQueryError as FetchError } from '@reduxjs/toolkit/dist/query';
import { Return } from './myReturns.type';
import { Order } from './myReturnableOrders.type';
import { MyReturnSearchResponse } from './myReturnsSearch.type';
import { DetailReturnResponse } from './myReturnsDetail.type';
import {
  EnterReturnRequest,
  EnterReturnResponse,
  IEnterReturnRequest
} from './myReturnsEnter.type';
import { useNavigation } from '@react-navigation/native';

/**
 * @name useReturnsService
 * @description Solicit Return Request Hook
 */
export const useReturnsService = (): ReturnsServiceHook => {
  const navigation = useNavigation();
  const [dataMyReturnsList, setDataMyReturnsList] = useState<Return[] | null>(
    null
  );

  const [dataMyReturnableOrders, setDataMyReturnableOrders] = useState<Order[]>(
    []
  );
  const [dataSearchReturnOrders, setDataSearchReturnOrders] =
    useState<MyReturnSearchResponse>();

  const [dataDetailReturn, setDataDetailReturn] =
    useState<DetailReturnResponse>();

  const [dataEnterReturn, setDataEnterReturn] = useState<EnterReturnResponse>();

  const { handleModalErrorService } = useErrorDescription();

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();

  ///////////////////SERVICES///////////////////////////////
  ////////////////////////////////////////////////////////////////

  const [
    getMyReturnsListService,
    {
      data: dataReturnList,
      isLoading: isLoadingMyReturnsList,
      isSuccess: isSuccesMyReturnsList,
      isError: isErrorMyReturnsList,
      error: errorMyReturnsList
    }
  ] = useLazyReturnsListRequest();

  const [
    getReturnableOrdersService,
    {
      data: dataReturnableOrders,
      isLoading: isLoadingReturnableOrders,
      isSuccess: isSuccesReturnableOrders,
      isError: isErrorReturnableOrders,
      error: errorReturnableOrders
    }
  ] = useLazyReturnableOrdersRequest();

  const [
    searchReturnOrdersService,
    {
      data: dataSearchReturn,
      isLoading: isLoadingSearchReturn,
      isSuccess: isSuccesSearchReturn,
      isError: isErrorSearchReturn,
      error: errorSearchReturn
    }
  ] = useLazySearchReturnsOrdersRequest();

  const [
    getDetailReturnService,
    {
      data: dataDetailReturnOrder,
      isLoading: isLoadingDetailReturn,
      isSuccess: isSuccesDetailReturn,
      isError: isErrorDetailReturn,
      error: errorDetailReturn
    }
  ] = useLazyDetailReturnRequest();

  const [
    setEnterReturnService,
    {
      data: dataEnterReturnService,
      isLoading: isLoadingEnterReturn,
      isSuccess: isSuccesEnterReturn,
      isError: isErrorEnterReturn,
      error: errorEnterReturn
    }
  ] = useEnterReturnRequest();

  ///////////////////DATA///////////////////////////////
  ////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!isLoadingMyReturnsList && isSuccesMyReturnsList) {
      setDataMyReturnsList(dataReturnList?.returns ?? []);
    }
  }, [dataReturnList]);

  useEffect(() => {
    if (!isLoadingReturnableOrders && isSuccesReturnableOrders) {
      setDataMyReturnableOrders(dataReturnableOrders?.orders ?? []);
    }
  }, [dataReturnableOrders]);

  useEffect(() => {
    if (!isLoadingSearchReturn && isSuccesSearchReturn) {
      setDataSearchReturnOrders(dataSearchReturn);
    }
  }, [dataSearchReturn]);
  useEffect(() => {
    if (!isLoadingDetailReturn && isSuccesDetailReturn) {
      setDataDetailReturn(dataDetailReturnOrder);
    }
  }, [dataDetailReturnOrder]);
  useEffect(() => {
    if (!isLoadingEnterReturn && isSuccesEnterReturn) {
      setDataEnterReturn(dataEnterReturnService);
    }
  }, [dataEnterReturnService]);

  const goToBack = () => navigation.goBack();
  useEffect(() => {
    if (isErrorMyReturnsList) {
      handleModalErrorService(errorMyReturnsList);
    }
    if (isErrorReturnableOrders) {
      handleModalErrorService(errorReturnableOrders);
    }
    if (isErrorSearchReturn) {
      handleModalErrorService(errorSearchReturn, goToBack);
    }
    if (isErrorDetailReturn) {
      handleModalErrorService(errorDetailReturn);
    }
    if (isErrorEnterReturn) {
      handleModalErrorService(errorEnterReturn);
    }
  }, [
    isErrorMyReturnsList,
    isErrorReturnableOrders,
    isErrorSearchReturn,
    isErrorDetailReturn,
    isErrorEnterReturn
  ]);

  ///////////////////HANDLES SERVICES///////////////////////////////
  ////////////////////////////////////////////////////////////////

  const getMyReturnsList = () => {
    getMyReturnsListService({
      user: USER_EMAIL
    });
  };
  const getReturnableOrders = () => {
    getReturnableOrdersService({
      user: USER_EMAIL
    });
  };
  const searchReturnOrders = (orderCode: string) => {
    searchReturnOrdersService({
      user: USER_EMAIL,
      orderCode: orderCode
    });
  };

  const getDetailReturn = (returnCode: string) => {
    getDetailReturnService({
      user: USER_EMAIL,
      returnCode: returnCode
    });
  };

  const setEnterReturn = (req: IEnterReturnRequest) => {
    let request: EnterReturnRequest = {
      user: USER_EMAIL,
      // orderCode: req.order.code,
      order: { code: req.order.code },
      returnEntries: req.returnEntries
    };
    setEnterReturnService(request);
  };

  ///////////////////RETURN///////////////////////////////
  ////////////////////////////////////////////////////////////////
  return {
    getMyReturnsList,
    dataMyReturnsList,
    isLoadingMyReturnsList,
    isSuccesMyReturnsList,
    isErrorMyReturnsList,
    errorMyReturnsList,

    //ReturnableOrders
    getReturnableOrders,
    dataMyReturnableOrders,
    isLoadingReturnableOrders,
    isSuccesReturnableOrders,
    isErrorReturnableOrders,
    errorReturnableOrders,

    //SearchReturnOrders
    searchReturnOrders,
    dataSearchReturnOrders,
    isLoadingSearchReturn,
    isSuccesSearchReturn,
    isErrorSearchReturn,
    errorSearchReturn,

    //DetailReturnOrder
    getDetailReturn,
    dataDetailReturn,
    isLoadingDetailReturn,
    isSuccesDetailReturn,
    isErrorDetailReturn,
    errorDetailReturn,

    //EnterReturn
    setEnterReturn,
    dataEnterReturn,
    isLoadingEnterReturn,
    isSuccesEnterReturn,
    isErrorEnterReturn,
    errorEnterReturn
  };
};

interface ReturnsServiceHook {
  getMyReturnsList(): void;
  dataMyReturnsList: Return[] | null;
  isLoadingMyReturnsList: boolean;
  isSuccesMyReturnsList: boolean;
  isErrorMyReturnsList: boolean;
  errorMyReturnsList: IErrorService | FetchError | SerializedError | undefined;

  //ReturnableOrders
  getReturnableOrders(): void;
  dataMyReturnableOrders: Order[];
  isLoadingReturnableOrders: boolean;
  isSuccesReturnableOrders: boolean;
  isErrorReturnableOrders: boolean;
  errorReturnableOrders:
    | IErrorService
    | FetchError
    | SerializedError
    | undefined;

  //SearchReturnOrders
  searchReturnOrders(orderCode: string): void;
  dataSearchReturnOrders: MyReturnSearchResponse | undefined;
  isLoadingSearchReturn: boolean;
  isSuccesSearchReturn: boolean;
  isErrorSearchReturn: boolean;
  errorSearchReturn: IErrorService | FetchError | SerializedError | undefined;

  //DetailReturnOrder
  getDetailReturn(returnCode: string): void;
  dataDetailReturn: DetailReturnResponse | undefined;
  isLoadingDetailReturn: boolean;
  isSuccesDetailReturn: boolean;
  isErrorDetailReturn: boolean;
  errorDetailReturn: IErrorService | FetchError | SerializedError | undefined;

  //EnterReturn
  setEnterReturn(req: IEnterReturnRequest): void;
  dataEnterReturn: DetailReturnResponse | undefined;
  isLoadingEnterReturn: boolean;
  isSuccesEnterReturn: boolean;
  isErrorEnterReturn: boolean;
  errorEnterReturn: IErrorService | FetchError | SerializedError | undefined;
}

export default useReturnsService;
