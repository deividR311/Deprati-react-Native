import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import {
  useLocalStorage,
  LocalStorageKey
} from '../../../../../application/state-manager/services/localstorage';
import {
  DeliveryStatusDisplay,
  ErrorResponse,
  IMyOrder,
  PaymentStatusDisplay,
  TypeErrorCustomerOrders,
  // useCustomerOrdersRequest,
  useLazyCustomerOrdersRequest
} from '../../../../../infrastucture/apis/customer-orders';
import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../../../application/common';
import { t } from 'i18next';

const MAXORDER_ACTIVE = 2;
const MAXORDER_MADE = 5;
const VALUE_INITIAL = 0;

const TEXT_SHOW_MORE = t('APP_BOTON_LABEL.seeMore');
const TEXT_SHOW_LESS = t('APP_BOTON_LABEL.seeLess');

export const useCustomerOrders = () => {
  const navigation = useNavigation();
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();
  const [ordersActive, setOrdersActive] = useState<IMyOrder[]>([]);
  const [ordersMade, setOrdersMade] = useState<IMyOrder[]>([]);
  const [isErrorResult, setIsErrorResult] = useState<boolean>(false);
  const [sizeDataActive, setSizeDataActive] = useState<number>(MAXORDER_ACTIVE);
  const [currentPage, setCurrentPage] = useState<number>(VALUE_INITIAL);
  const [enableValidation, setEnableValidation] = useState(false);

  const [
    getCustomerOrdersService,
    { isError, error, isLoading, data, isSuccess }
  ] = useLazyCustomerOrdersRequest();

  const handleGetCustomerOrders = () => {
    getCustomerOrdersService({ user: USER_EMAIL });
  };

  useEffect(() => {
    if (!data && !isSuccess) return;
    filterOrders(data?.orders);
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) handleError(error);
  }, [error]);

  const handleError = (err: ErrorResponse) => {
    if (
      err.status === 401 &&
      err.data.errors[0].type === TypeErrorCustomerOrders.INVALID_TOKEN_ERROR
    )
      navigation.navigate(NAV.AUTH_NAVIGATION as never);
    else if (err.status === 503) {
      setIsErrorResult(true);
    }
  };

  const filterOrders = (orders: IMyOrder[]) => {
    let ordersActiveTemp: IMyOrder[] = [];
    let ordersMadeTemp: IMyOrder[] = [];

    orders?.forEach(order => {
      if (
        (order.paymentStatusDisplay === PaymentStatusDisplay.SLOPE ||
          order.paymentStatusDisplay === PaymentStatusDisplay.PAID) &&
        order.deliveryStatusDisplay !== DeliveryStatusDisplay.DELIVERED
      ) {
        ordersActiveTemp.push(order);
      } else {
        ordersMadeTemp.push(order);
      }
    });

    setOrdersActive(ordersActiveTemp);
    setOrdersMade(ordersMadeTemp);
    setEnableValidation(true);
  };

  const handleSliceOrdersMade = () => {
    return ordersMade
      .sort((a, b) => {
        if (moment(a.placed) < moment(b.placed)) return 1;
        else return -1;
      })
      .slice(currentPage, currentPage + MAXORDER_MADE);
  };

  const filteredOrdersMade = () => {
    let auxMade = handleSliceOrdersMade();
    let month: null | number = null;
    const _auxMade = auxMade.map(x => {
      const dateConvert = moment(x.placed).format();
      let auxMonth = new Date(dateConvert).getMonth() + 1;
      if (auxMonth !== month) {
        month = auxMonth;
        return { ...x, month: true };
      }
      return x;
    });
    return _auxMade;
  };

  const nextPage = () => {
    if (handleSliceOrdersMade().length >= 5)
      setCurrentPage(currentPage + MAXORDER_MADE);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - MAXORDER_MADE);
  };

  const changePage = (value: number) => {
    setCurrentPage((value - 1) * MAXORDER_MADE);
  };

  const handleMaxPage = () => {
    return Math.ceil(ordersMade.length / MAXORDER_MADE);
  };

  const handleShowMoreLess = () => {
    if (sizeDataActive !== ordersActive.length)
      return setSizeDataActive(ordersActive.length);
    return setSizeDataActive(MAXORDER_ACTIVE);
  };

  const titleMoreLess = useMemo(() => {
    if (sizeDataActive !== ordersActive.length) return TEXT_SHOW_MORE;
    return TEXT_SHOW_LESS;
  }, [sizeDataActive]);

  return {
    handleGetCustomerOrders,
    isErrorResult,
    isLoading,
    isSuccess,
    enableValidation,
    VALUE_INITIAL,
    MAXORDER_ACTIVE,
    MAXORDER_MADE,
    ordersActive,
    ordersMade,
    filteredOrdersMade,
    nextPage,
    prevPage,
    changePage,
    handleMaxPage,
    currentPage,
    sizeDataActive,
    setSizeDataActive,
    handleShow: {
      handleShowMoreLess,
      titleMoreLess
    }
  };
};
