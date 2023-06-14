import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  LocalStorageKey,
  localStorageStateSelector
} from '../../../../application/state-manager/services/localstorage';
import {
  useAccountBalanceByAccountNumberRequest,
  mapCreditBalanceModelfromDTO
} from '../../../../infrastucture/apis/credit-balance';
import { useAccountMovementsMutationRequest } from '../../../../infrastucture/apis/creditMovement';
import { CODE_ERROR_BLOCKED_ACCOUNT } from '../../../../application/common/constants';
import { sleep } from '../../../../application/utils';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { useNavigation } from '@react-navigation/native';

export const useCreditMovement = (): InfoHook => {
  const navigation = useNavigation();
  const { showModal } = useGenericModal();

  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [contentCard, setContentCard] = useState<string[]>([]);
  const [constentChart, setConstentChart] = useState<any>({});
  const localStorageData = useSelector(localStorageStateSelector);

  const [showModalError, setShowModalError] = useState(false);
  const [showModalTextError, setShowModalTextError] = useState('');

  const {
    [LocalStorageKey.User]: LocalUserData,
    [LocalStorageKey.AccountNumber]: GLOBAL_ACCOUNT_NUMBER,
    [LocalStorageKey.AccountAdditionalNumber]: ADDITIONAL_ACCOUNT_NUMBER,
    [LocalStorageKey.AccountDisplayNumber]: AccountDisplayNumber,
    [LocalStorageKey.UID]: DeviceId
  } = localStorageData;

  const [
    _getAccountBalance,
    {
      isLoading: loadingDataCard,
      isError: hasErrorDataCard,
      data: rawResponseDataCard
    }
  ] = useAccountBalanceByAccountNumberRequest();

  const [
    _getAccountMovements,
    {
      isLoading: loadingDataMovement,
      data: rawResponseDataMovement,
      isError: hasErrorMovement,
      error: errorMovement
    }
  ] = useAccountMovementsMutationRequest();

  useEffect(() => {
    if (errorMovement) {
      console.log('error consula saldo');
      if (errorMovement?.status === CODE_ERROR_BLOCKED_ACCOUNT) {
        setShowModalTextError(errorMovement?.data?.message);
      } else {
        showModal(ModalsType.ErrorSignUp, {
          textContent: errorMovement?.data?.message
        });
      }
    }
  }, [errorMovement]);

  const handleSetState = async () => {
    await sleep(1000);
    setShowModalError(true);
  };

  const closeModaError = () => {
    setShowModalError(false);
    setShowModalTextError('');
    navigation.goBack();
  };

  useEffect(() => {
    if (showModalTextError !== '') {
      handleSetState();
    }
  }, [showModalTextError, loading]);

  useEffect(() => {
    setHasError(hasErrorMovement || hasErrorDataCard);
  }, [hasErrorMovement, hasErrorDataCard]);

  const getDataContent = () => {
    setLoading(true);

    Promise.all([
      _getAccountBalance({
        numeroCuenta:
          GLOBAL_ACCOUNT_NUMBER || LocalUserData.directCreditCodeCustomer,
        adicional: ADDITIONAL_ACCOUNT_NUMBER,
        identificacion: LocalUserData?.documentTypeNumber,
        deviceId: DeviceId
      }),
      _getAccountMovements({
        accountNumber:
          GLOBAL_ACCOUNT_NUMBER || LocalUserData.directCreditCodeCustomer,
        additional: ADDITIONAL_ACCOUNT_NUMBER
      })
    ]).then(() => {
      setLoading(false);
    });
  };

  const contentMovement = useMemo(() => {
    if (!loadingDataMovement && !hasErrorMovement) {
      const { success, data } = rawResponseDataMovement ?? {};
      if (success) {
        return data;
      }
    }
    return [];
  }, [loadingDataMovement]);

  useEffect(() => {
    getDataContent();
  }, []);

  const contentPayment = useMemo(() => {
    if (!loadingDataCard && !hasErrorDataCard) {
      const { data, success } = rawResponseDataCard ?? {};
      if (success) {
        const _data = mapCreditBalanceModelfromDTO(data);
        if (_data?.affiliateDate) {
          setConstentChart(_data);
          let contentCardClone = [...contentCard];
          contentCardClone[0] = _data?.clientName;
          contentCardClone[1] = AccountDisplayNumber;
          contentCardClone[2] = _data?.affiliateDate
            ? `Cliente desde ${_data.affiliateDate}`
            : '';
          setContentCard(contentCardClone);
        }
        return _data;
      }
    }
    return null;
  }, [loadingDataCard]);

  return {
    hasError,
    loading,
    errorMovement,
    contentPayment,
    contentCard,
    constentChart,
    contentMovement,
    getDataContent,
    showModalError,
    showModalTextError,
    closeModaError
  };
};

export interface InfoHook<T> {
  loading: boolean;
  contentCard?: T;
  contentPayment?: T;
  constentChart: T;
  contentMovement?: T;
  getDataContent(): Promise<void>;
  showModalError: boolean;
  showModalTextError: string;
  closeModaError: () => void;
}
