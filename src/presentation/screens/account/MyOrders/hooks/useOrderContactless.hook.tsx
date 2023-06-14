import { useEffect, useMemo, useState } from 'react';
import {
  Ticket,
  useContactlessTicketsRequest
} from '../../../../../infrastucture/apis/contactless-payment';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import sleep from '../../../../../application/utils/sleep';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NAV } from '../../../../../application/common';

export const useOrderContactless = (): OrderContactlessHook => {
  const navigation = useNavigation();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [getTickets, { isLoading, isSuccess, data, isError }] =
    useContactlessTicketsRequest();

  const {
    localStorageData: {
      [LocalStorageKey.AccountNumber]: ACCOUNT_NUMBER,
      [LocalStorageKey.AccountAdditionalNumber]: ADDITIONAL_ACCOUNT_NUMBER,
      [LocalStorageKey.IsAccountAuthenticated]: IsAccountAuthenticated
    }
  } = useLocalStorage();

  useEffect(() => {
    if (!IsAccountAuthenticated) {
      sleep(500).then(() => {
        navigation.replace(NAV.DASHBOARD_NAVIGATION, {
          screen: NAV.DASHBOARD_CREDIT
        });
      });
    }
  }, [IsAccountAuthenticated]);

  const totalOrders = useMemo(() => {
    return data?.data?.paginacion?.totalRegistros ?? 0;
  }, [data?.data?.paginacion?.totalRegistros]);

  const showNextPage = useMemo(() => {
    const { paginacion } = data?.data ?? {};
    if (paginacion?.totalPagina > paginacion?.paginaActual) {
      return true;
    }
    return false;
  }, [data?.data?.paginacion]);

  const handleNextPage = async (page?: number) => {
    const { paginacion } = data?.data ?? {};
    const currentPage = page !== 0 ? paginacion?.paginaActual + 1 : 1;
    const response = await getTickets({
      additional: ADDITIONAL_ACCOUNT_NUMBER,
      account: ACCOUNT_NUMBER,
      currentPage: currentPage,
      pageSize: 5
    });
    setTickets(prevState => {
      return [...prevState, ...(response?.data?.data?.tickets ?? [])];
    });
  };

  const isLoadingComplete = useMemo(() => {
    if (!IsAccountAuthenticated) return true;
    if (isLoading && tickets?.length === 0) {
      return true;
    }
    return false;
  }, [isLoading, data]);

  const focused = useIsFocused();
  useEffect(() => {
    if (focused) {
      setTickets([]);
      handleNextPage(0);
    }
  }, [focused]);

  return {
    isLoadingComplete,
    isLoading,
    isSuccess,
    isError,
    tickets,
    totalOrders,
    showNextPage,
    handleNextPage
  };
};

interface OrderContactlessHook {
  isLoadingComplete: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  tickets?: Ticket[];
  totalOrders: number;
  handleNextPage(): void;
  showNextPage: boolean;
}
