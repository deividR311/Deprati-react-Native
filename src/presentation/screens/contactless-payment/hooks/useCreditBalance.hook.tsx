import { useEffect, useState } from 'react';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  BalanceByAccountNumberBody,
  useAccountBalanceByAccountNumberRequest
} from '../../../../infrastucture/apis/credit-balance';
import {
  CreditBalanceModel,
  mapCreditBalanceModelfromDTO
} from '../../../../infrastucture/apis/credit-balance/credit-balance.model';
import credicardMask from '../../../../application/utils/creditCardMask';
import { useInfoCreditBalance } from '../../../../application/state-manager/services/credit/useInfoCreditBalance.hook';
import { useSelector } from 'react-redux';
import { creditState } from '../../../../application/state-manager/services/credit';
import { useIsFocused } from '@react-navigation/native';

export const useCreditBalance = (): CreditBalanceHook => {
  const [hasError, setHasError] = useState(false);
  const [infoCreditBalance, setInfoCreditBalance] = useState<
    Partial<
      CreditBalanceModel & {
        clientFirstName: string;
        numeroTarjetaAdicionalDisplay?: string;
        celularCtaDisplay?: string;
      }
    >
  >(DEFAULT_CREDIT_BALANCE_MODEL);
  const creditStateInfo = useSelector(creditState);
  const { onSaveInfoCreditBalance } = useInfoCreditBalance();

  const {
    save: saveInLocalStoarge,
    localStorageData: {
      [LocalStorageKey.IsLogin]: IS_LOGIN,
      [LocalStorageKey.User]: LocalUserData,
      [LocalStorageKey.AccountDisplayNumber]: AccountDisplayNumber,
      [LocalStorageKey.AccountNumber]: GLOBAL_ACCOUNT_NUMBER,
      [LocalStorageKey.AccountAdditionalNumber]: ADDITIONAL_ACCOUNT_NUMBER,
      [LocalStorageKey.IsAccountAuthenticated]: IsAccountAuthenticated,
      [LocalStorageKey.UID]: DeviceId
    }
  } = useLocalStorage();

  useEffect(() => {
    try {
      if (!AccountDisplayNumber && GLOBAL_ACCOUNT_NUMBER) {
        const creditData = creditStateInfo.find(credit => {
          return (
            credit.numeroTarjeta === GLOBAL_ACCOUNT_NUMBER &&
            credit.adicional === ADDITIONAL_ACCOUNT_NUMBER
          );
        });
        if (creditData) {
          saveInLocalStoarge({
            [LocalStorageKey.AccountDisplayNumber]:
              creditData?.numeroTarjetaAdicionalDisplay ?? '',
            [LocalStorageKey.AccountPhoneNumber]:
              creditData?.celularCtaDisplay ?? ''
          });
        }
      }
    } catch (error) {}
  }, [AccountDisplayNumber, GLOBAL_ACCOUNT_NUMBER, creditStateInfo]);

  const [
    _getAccountBalance,
    {
      isLoading,
      isError: requestHasError,
      error: requestError,
      data: rawResponseData
    }
  ] = useAccountBalanceByAccountNumberRequest();

  const focused = useIsFocused();
  useEffect(() => {
    if (!rawResponseData) return;
    const { data: creditInfo, success, errors = [], message } = rawResponseData;
    if (!success) {
      setInfoCreditBalance(DEFAULT_CREDIT_BALANCE_MODEL);
      setHasError(true);
      return;
    }
    const _creditInfo = mapCreditBalanceModelfromDTO(creditInfo);
    setInfoCreditBalance({
      ..._creditInfo,
      cardNumber: credicardMask(_creditInfo.cardNumber),
      numeroTarjetaAdicionalDisplay: AccountDisplayNumber,
      clientFirstName: LocalUserData.firstName
    });
    setHasError(false);
  }, [rawResponseData]);

  useEffect(() => {
    if (!infoCreditBalance?.cardNumber?.length) return;
    onSaveInfoCreditBalance(infoCreditBalance);
  }, [infoCreditBalance]);

  useEffect(() => {
    if (!requestHasError) return;
    setInfoCreditBalance(DEFAULT_CREDIT_BALANCE_MODEL);
    setHasError(true);
  }, [requestHasError]);

  useEffect(() => {
    setHasError(false);
    if (IsAccountAuthenticated && IS_LOGIN && focused) {
      if (GLOBAL_ACCOUNT_NUMBER)
        _getAccountBalance({
          numeroCuenta: GLOBAL_ACCOUNT_NUMBER,
          adicional: ADDITIONAL_ACCOUNT_NUMBER,
          identificacion: LocalUserData?.documentTypeNumber,
          deviceId: DeviceId
        });
    }
  }, [
    LocalUserData?.directCreditCodeCustomer,
    IsAccountAuthenticated,
    IS_LOGIN,
    focused
  ]);

  return {
    isLoading,
    hasError,
    infoCreditBalance,
    getAccountBalance: _getAccountBalance
  };
};

export interface CreditBalanceHook {
  isLoading: boolean;
  hasError: boolean;
  infoCreditBalance?: Partial<
    CreditBalanceModel & { clientFirstName: string; celularCtaDisplay?: string }
  >;
  getAccountBalance(data: BalanceByAccountNumberBody): void;
}

const DEFAULT_CREDIT_BALANCE_MODEL = {
  clientFirstName: '',
  clientName: '',
  cardNumber: '',
  affiliateDate: '',
  totalAmount: 1,
  amountSpent: 0,
  celularCtaDisplay: ''
};
