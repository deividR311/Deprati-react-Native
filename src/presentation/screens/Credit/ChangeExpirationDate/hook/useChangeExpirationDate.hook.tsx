import { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { ICreditBalancePayload } from '../../../../../application/state-manager/services/credit/creditBalance.redux';
import { useInfoCreditBalance } from '../../../../../application/state-manager/services/credit/useInfoCreditBalance.hook';
import {
  ChangeDateResponse,
  IDataCurrentDate
} from '../../../../../infrastucture/apis/credit-expiration-date/credit-expiration-date.type';
import useCreditExpirationDateRequest from '../../../../../infrastucture/apis/credit-expiration-date/useCreditExpirationDateRequest.hook';
import useContentServiceRequest from '../../../../../infrastucture/apis/contentService/useContentServiceRequest.hook';
import { ExpirationDateContent } from '../../../../../infrastucture/apis/contentService';
import { trackEventView } from '../../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEventsViewModal } from '../../../../../infrastucture/native-modules/emma';
import { IErrorCredit } from '../../ErrorCredit.interface';

/**
 * @name useChangeExpirationDate
 * @description useChangeExpirationDate Hook
 */

const TEXT_NEWDATE = 'Selecciona el día';
export const useChangeExpirationDate = (): IChangeExpirationDateHook => {
  const navigation = useNavigation();
  const selectRef = useRef<SelectDropdown>();
  const { infoCreditBalance } = useInfoCreditBalance();
  const { expirationDateContent, getContentExpirationDate } =
    useContentServiceRequest();

  const {
    getCurrentDate,
    dataCurrentDate,
    setChangeDate,
    isLoadingCurrentDate,
    dataChangeDate,
    isLoadingChangeDate,
    isSuccessChangeDate,
    isErrorChangeDate,
    errorChangeDate,
    isErrorCurrentDate,
    errorCurrentDate,
    showModalChangeDate,
    handleCloseModal
  } = useCreditExpirationDateRequest();

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showSucces, setShowSucces] = useState<boolean>(false);
  const [showErrorSucces, setShowErrorSucces] = useState<boolean>(false);
  const [isAcceptTerms, setIsAcceptTerms] = useState<boolean>(false);

  const [selectedDay, setSelectedDay] = useState<string | Number>(TEXT_NEWDATE);

  useEffect(() => {
    getCurrentDate();
    getContentExpirationDate();
  }, []);

  useEffect(() => {
    if (isSuccessChangeDate && dataChangeDate?.success) return handleSuccess();
    if (isSuccessChangeDate && !dataChangeDate?.success) handleErrorSuccess();
  }, [dataChangeDate]);

  const handleSuccess = () => {
    trackEventView(keyEventsViewModal.credito_fechavencimiento_ok);
    setTimeout(() => {
      setShowSucces(true);
    }, 1000);
  };
  const handleErrorSuccess = () => {
    setTimeout(() => {
      setShowErrorSucces(true);
    }, 1000);
  };
  const handleChangeDate = () => {
    setShowWarning(false);
    const dayNumber = parseInt(selectedDay?.toString(), 10);
    setChangeDate(dayNumber);
  };

  const handleCloseSuccess = () => {
    setShowSucces(false);
    navigation.goBack();
  };

  const handleCloseError = () => {
    setShowErrorSucces(false);
    handleCloseWarning();
  };

  const handleCloseWarning = () => {
    setShowWarning(false);
    selectRef.current?.reset();
    setSelectedDay(TEXT_NEWDATE);
    setIsAcceptTerms(false);
  };

  const getNextMonthDays = (
    fecha: Date = new Date()
  ): { label: string; value: Date }[] => {
    const currentMonth = fecha.getMonth();
    let nextMonth = currentMonth + 1;

    if (nextMonth > 11) {
      nextMonth = 0;
      fecha.setFullYear(fecha.getFullYear() + 1);
    }

    const nextMonthFirstDay = new Date(fecha.getFullYear(), nextMonth, 1);
    const currentMonthLastDay = new Date(
      nextMonthFirstDay.getTime() - 86400000
    ).getDate();

    const result = [];
    const currentFullYear = fecha.getFullYear();
    for (let i = 1; i <= currentMonthLastDay; i++) {
      result.push({
        label: i.toString(),
        value: new Date(currentFullYear, nextMonth, i)
      });
    }

    return result;
  };

  return {
    TEXT_NEWDATE,
    infoCreditBalance,
    dataCurrentDate,
    dataChangeDate,
    showCalendar,
    setShowCalendar,
    selectedDay,
    setSelectedDay,
    isAcceptTerms,
    setIsAcceptTerms,
    handleChangeDate,

    showWarning,
    setShowWarning,

    showSucces,
    handleCloseSuccess,

    showErrorSucces,
    handleCloseError,

    isLoadingChangeDate,
    isLoadingCurrentDate,

    expirationDateContent,
    getNextMonthDays,

    handleCloseWarning,
    selectRef,

    isErrorChangeDate,
    errorChangeDate,
    isErrorCurrentDate,
    errorCurrentDate,
    handleCloseModal,
    showModalChangeDate
  };
};

interface IChangeExpirationDateHook {
  TEXT_NEWDATE: string;
  infoCreditBalance: ICreditBalancePayload;
  dataCurrentDate: IDataCurrentDate | null | undefined;
  dataChangeDate: ChangeDateResponse | undefined;
  showCalendar: boolean;
  setShowCalendar(show: boolean): void;
  selectedDay: string | Number;
  setSelectedDay(day: string | Number): void;
  isAcceptTerms: boolean;
  setIsAcceptTerms(show: boolean): void;
  handleChangeDate(): void;

  showWarning: boolean;
  setShowWarning(show: boolean): void;

  showSucces: boolean;
  handleCloseSuccess(): void;

  showErrorSucces: boolean;
  handleCloseError(): void;

  isLoadingChangeDate: boolean;
  isLoadingCurrentDate: boolean;

  expirationDateContent: ExpirationDateContent | undefined;

  getNextMonthDays(fecha?: Date): { label: string; value: Date }[];

  handleCloseWarning(): void;
  selectRef: React.MutableRefObject<SelectDropdown | undefined>;

  isErrorChangeDate: boolean;
  errorChangeDate: IErrorCredit;
  isErrorCurrentDate: boolean;
  errorCurrentDate: IErrorCredit;
  handleCloseModal: () => void;
  showModalChangeDate: boolean;
}

export default useChangeExpirationDate;
