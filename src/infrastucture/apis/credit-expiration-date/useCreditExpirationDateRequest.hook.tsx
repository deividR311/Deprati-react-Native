import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import useErrorDescription from '../../../application/common/hooksCommons/useErrorDescription';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  useExpirationChangeDateRequest,
  useExpirationCurrentDateRequest
} from './credit-expiration-date.api';
import {
  ChangeDateResponse,
  IDataCurrentDate,
  IExpirationDayError
} from './credit-expiration-date.type';
import { IErrorCredit } from '../../../presentation/screens/Credit/ErrorCredit.interface';
import { sleep } from '../../../application/utils';
import { useNavigation } from '@react-navigation/native';
import { useGenericModal } from '../../../presentation/common-components/modal/ModalProvider';
import { ModalsType } from '../../../presentation/common-components/modal/modal.interfaces';
import { CODE_ERROR_BLOCKED_ACCOUNT } from '../../../application/common/constants';

/**
 * @name useCreditExpirationDateRequest
 * @description useCreditExpirationDateRequest Hook
 */

export const useCreditExpirationDateRequest =
  (): useCreditExpirationDateHook => {
    const navigation = useNavigation();
    const { showModal } = useGenericModal();
    const { handleModalErrorService } = useErrorDescription();

    const [showModalChangeDate, setShowModalChangeDate] = useState(false);
    // const [dataCurrentDate, setDataCurrentDate] = useState<
    //   CurrentDateResponse | undefined
    // >()
    const [dataChangeDate, setDataChangeDate] = useState<
      ChangeDateResponse | undefined
    >();
    const {
      localStorageData: {
        [LocalStorageKey.UserEmail]: EMAIL,
        [LocalStorageKey.IpAddress]: IP_ADDRESS,
        [LocalStorageKey.UID]: DEVICE_ID,
        [LocalStorageKey.User]: { documentTypeNumber: USER_ID }
      }
    } = useLocalStorage();

    const [
      getCurrentDateService,
      {
        data: dataCurrentDateResponse,
        isLoading: isLoadingCurrentDate,
        isSuccess: isSuccessCurrentDate,
        isError: isErrorCurrentDate,
        error: errorCurrentDate
      }
    ] = useExpirationCurrentDateRequest();

    const [
      setChangeDateService,
      {
        data: dataChangeDateResponse,
        isLoading: isLoadingChangeDate,
        isSuccess: isSuccessChangeDate,
        isError: isErrorChangeDate,
        error: errorChangeDate
      }
    ] = useExpirationChangeDateRequest();

    const dataCurrentDate = useMemo(() => {
      if (
        !isLoadingCurrentDate &&
        isSuccessCurrentDate &&
        dataCurrentDateResponse
      )
        return {
          cuttingDay: dataCurrentDateResponse.data?.cuttingDay,
          dueDate: dataCurrentDateResponse.data?.dueDate,
          day: moment(dataCurrentDateResponse.data?.dueDate).format('DD')
        };
      return null;
    }, [dataCurrentDateResponse]);

    const handleSetState = async () => {
      await sleep(1000);
      setShowModalChangeDate(true);
    };

    const handleCloseModal = () => {
      setShowModalChangeDate(false);
      navigation.goBack();
    };

    const handleShowModal = async () => {
      await sleep(1000);
      showModal(ModalsType.ErrorSignUp, {
        textContent:
          errorChangeDate?.data?.message ?? errorChangeDate?.data?.Message
      });
    };

    useEffect(() => {
      if (isErrorChangeDate) {
        if (errorChangeDate?.status === CODE_ERROR_BLOCKED_ACCOUNT) {
          handleSetState();
        } else {
          handleShowModal();
        }
      }
    }, [isErrorChangeDate, errorChangeDate]);

    useEffect(() => {
      if (!isLoadingChangeDate && isSuccessChangeDate) {
        setDataChangeDate(dataChangeDateResponse);
      }
    }, [dataChangeDateResponse]);

    useEffect(() => {
      if (isErrorCurrentDate && errorCurrentDate) {
        handleCreateError(errorCurrentDate);
      }
    }, [isErrorCurrentDate, isErrorChangeDate]);

    const handleCreateError = (currentError: IExpirationDayError) => {
      const error = {
        data: {
          errors: [{ message: currentError.data.Message }]
        }
      };
      setTimeout(() => {
        handleModalErrorService(error);
      }, 1000);
    };
    const getCurrentDate = () => {
      getCurrentDateService({
        channel: 'App',
        ip: IP_ADDRESS,
        email: EMAIL,
        deviceId: DEVICE_ID,
        identification: USER_ID
      });
    };

    const setChangeDate = (day: number) => {
      setChangeDateService({
        channel: 'App',
        ip: IP_ADDRESS,
        email: EMAIL,
        deviceId: DEVICE_ID,
        identification: USER_ID,
        cuttingDay: day
      });
    };

    return {
      dataCurrentDate,
      dataChangeDate,

      getCurrentDate,
      setChangeDate,

      isLoadingCurrentDate,
      isSuccessCurrentDate,
      isErrorCurrentDate,
      errorCurrentDate,

      isLoadingChangeDate,
      isSuccessChangeDate,
      isErrorChangeDate,
      errorChangeDate,
      showModalChangeDate,
      handleCloseModal
    };
  };

interface useCreditExpirationDateHook {
  dataCurrentDate: IDataCurrentDate | undefined | null;
  dataChangeDate: ChangeDateResponse | undefined;

  getCurrentDate(): void;
  setChangeDate(day: number): void;

  isLoadingCurrentDate: boolean;
  isSuccessCurrentDate: boolean;
  isErrorCurrentDate: boolean;
  errorCurrentDate: IErrorCredit;

  isLoadingChangeDate: boolean;
  isSuccessChangeDate: boolean;
  isErrorChangeDate: boolean;
  errorChangeDate: IErrorCredit;
  showModalChangeDate: boolean;
  handleCloseModal: () => void;
}

export default useCreditExpirationDateRequest;
