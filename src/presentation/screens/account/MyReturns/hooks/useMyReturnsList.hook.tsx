import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MyReturnsNavigationRoute } from '../../../../navigation/account';
import useReturnsService from '../../../../../infrastucture/apis/myReturns/useReturnsService.hook';
import { Return } from '../../../../../infrastucture/apis/myReturns/myReturns.type';

const MAX_RETURS = 5;
export const useMyReturnsList = (): MyReturnsHook => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [returnsList, setReturnsList] = useState([]);
  const {
    //Get
    getMyReturnsList,
    dataMyReturnsList,
    isLoadingMyReturnsList,
    isErrorMyReturnsList
  } = useReturnsService();

  const handleGoDetails = (codeTicket: string) => {
    navigation.navigate(MyReturnsNavigationRoute.DetailReturn, {
      returnCode: codeTicket
    });
  };

  const handleGoSolicit = () => {
    navigation.navigate(MyReturnsNavigationRoute.SolicitReturn);
  };
  const filterOrders = (returns: []) => {
    const returnsMadeTemp = [];

    returns.forEach(returnItem => returnsMadeTemp.push(returnItem));

    setReturnsList(returnsMadeTemp);
  };
  const handleSliceOrders = () => {
    return returnsList.slice(currentPage, currentPage + MAX_RETURS);
  };
  const filteredReturnsMade = () => {
    let auxMade = handleSliceOrders();
    return auxMade;
  };
  const nextPage = () => {
    setCurrentPage(currentPage + MAX_RETURS);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - MAX_RETURS);
  };

  const changePage = (value: number) => {
    setCurrentPage((value - 1) * MAX_RETURS);
  };

  const handleMaxPage = () => {
    return Math.ceil(returnsList.length / MAX_RETURS);
  };

  useEffect(() => {
    if (!dataMyReturnsList) return;
    filterOrders(dataMyReturnsList);
  }, [dataMyReturnsList]);

  return {
    MAX_RETURS,
    getMyReturnsList,
    returnsList,
    dataMyReturnsList,
    isLoadingMyReturnsList,
    isErrorMyReturnsList,
    //
    handleGoDetails,
    handleGoSolicit,
    filteredReturnsMade,
    nextPage,
    prevPage,
    changePage,
    handleMaxPage,
    currentPage
  };
};

interface MyReturnsHook {
  MAX_RETURS: number;
  getMyReturnsList(): void;
  dataMyReturnsList: Return[] | null;
  isLoadingMyReturnsList: boolean;
  isErrorMyReturnsList: boolean;
  returnsList: any;
  nextPage(): void;
  prevPage(): void;
  filteredReturnsMade(): any[];
  changePage(value: number): void;
  handleMaxPage(): number;
  currentPage: number;
  //
  handleGoDetails(returnCode: string): void;
  handleGoSolicit(): void;
}
