import { View, Text } from 'react-native';
import React from 'react';
import { useCreditAccountBondingResendCodeRequest } from '../../../../infrastucture/apis/creditAccountBonding';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { useSelector } from 'react-redux';
import { creditState } from '../../../../application/state-manager/services/credit';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { signUpState } from '../../../../application/state-manager/services/signUp';
import { UserCreditInformation } from '../components/modals/SelectModal/ModalSelectContent';

export default function useResendSMSCredit() {
  const creditStateInfo = useSelector(creditState);
  const { localStorageData } = useLocalStorage();
  const [reSendSMS, { data, isLoading, isError, error }] =
    useCreditAccountBondingResendCodeRequest();
  const { creditSelected } = useSelector(signUpState);

  const onResendSMS = async () => {
    if (creditSelected >= 0) {
      reSendSMS({
        cuenta: creditStateInfo[creditSelected]?.numeroTarjeta,
        adicional: creditStateInfo[creditSelected]?.adicional ?? '',
        idDispositivo: localStorageData[LocalStorageKey.UID]
      });
    }
  };

  const resendVerificationCode = async (
    accountInfo: Pick<UserCreditInformation, 'adicional' | 'numeroTarjeta'>
  ) => {
    return await reSendSMS({
      cuenta: accountInfo.numeroTarjeta,
      adicional: accountInfo.adicional ?? '',
      idDispositivo: localStorageData[LocalStorageKey.UID]
    });
  };

  return {
    onResendSMS,
    resendVerificationCode,
    data,
    isLoading,
    isError
  };
}
