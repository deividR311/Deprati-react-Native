import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import useReturnsService from '../../../../../infrastucture/apis/myReturns/useReturnsService.hook';
import { Order } from '../../../../../infrastucture/apis/myReturns/myReturnableOrders.type';
import { MyReturnsNavigationRoute } from '../../../../navigation/account';
import { Keyboard, Platform } from 'react-native';

const MAX_ORDER = 5;
const VALUE_INITIAL = 0;

export const useMyReturnsSolicit = (): MyReturnsSolicitHook => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState<number>(VALUE_INITIAL);
  const [ordersReturns, setOrdersReturns] = useState<Order[]>([]);
  const [padding, setpadding] = useState<number>(0);

  const {
    //Get
    getReturnableOrders,
    dataMyReturnableOrders,
    isLoadingReturnableOrders,
    isErrorReturnableOrders
  } = useReturnsService();
  // const dataMyReturnableOrders = []
  useEffect(() => {
    if (!dataMyReturnableOrders) return;
    filterOrders(dataMyReturnableOrders);
  }, [dataMyReturnableOrders]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setpadding(Platform.OS === 'ios' ? 180 : 0);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setpadding(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const filterOrders = (orders: Order[]) => {
    let ordersMadeTemp: Order[] = [];

    orders?.forEach(order => ordersMadeTemp.push(order));

    setOrdersReturns(ordersMadeTemp);
  };

  const handleSliceOrders = () => {
    return ordersReturns
      .sort((a, b) => {
        if (moment(a.placed) < moment(b.placed)) return 1;
        else return -1;
      })
      .slice(currentPage, currentPage + MAX_ORDER);
  };

  const filteredOrdersMade = () => {
    let auxMade = handleSliceOrders();
    // console.log('auxMade', auxMade)
    let month: null | number = null;

    let _listNew = auxMade.map(item => {
      let auxMonth = moment(item.placed).get('month');
      if (auxMonth !== month) {
        month = auxMonth;
        return { ...item, month: true };
      }
      return { ...item, month: false };
    });
    // console.log('listNew', _listNew)
    return _listNew;
  };

  const nextPage = () => {
    if (handleSliceOrders().length >= 5)
      setCurrentPage(currentPage + MAX_ORDER);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - MAX_ORDER);
  };

  const changePage = (value: number) => {
    setCurrentPage((value - 1) * MAX_ORDER);
  };

  const handleMaxPage = () => {
    return Math.ceil(ordersReturns.length / MAX_ORDER);
  };

  const handleGoEnterReturn = (orderCode: string) => {
    navigation.navigate(MyReturnsNavigationRoute.EnterReturn, {
      orderCode: orderCode
    });
  };

  return {
    getReturnableOrders,
    isLoadingReturnableOrders,
    isErrorReturnableOrders,
    VALUE_INITIAL,
    MAX_ORDER,
    ordersReturns,
    filteredOrdersMade,
    nextPage,
    prevPage,
    changePage,
    handleMaxPage,
    currentPage,

    //
    handleGoEnterReturn,

    padding
  };
};

interface MyReturnsSolicitHook {
  getReturnableOrders(): void;
  isLoadingReturnableOrders: boolean;
  isErrorReturnableOrders: boolean;
  VALUE_INITIAL: number;
  MAX_ORDER: number;
  filteredOrdersMade(): Order[];
  ordersReturns: Order[];
  nextPage(): void;
  prevPage(): void;
  changePage(value: number): void;
  handleMaxPage(): number;
  currentPage: number;
  //
  handleGoEnterReturn(orderCode: string): void;

  padding: number;
}
