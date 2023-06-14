import { useEffect } from 'react';
import { useCreditAccountBondingUpdateStateRequest } from '../../../../infrastucture/apis/creditAccountBonding';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { creditState } from '../../../../application/state-manager/services/credit';
import { useNavigation } from '@react-navigation/native';
import { signUpState } from '../../../../application/state-manager/services/signUp';
import { useSelector } from 'react-redux';
import { NAV } from '../../../../application/common';
import { UserCreditInformation } from '../components/modals/SelectModal/ModalSelectContent';

export default function useUpdateStateVinculation() {
  const navigation = useNavigation();
  const creditStateInfo = useSelector(creditState);
  const { creditSelected } = useSelector(signUpState);
  const { save: saveInLocalStoarge, localStorageData } = useLocalStorage();
  const [
    validateSMS,
    {
      data: dataSMS,
      isLoading: isLoadingSMS,
      isError: isErrorSMS,
      error: errorSMS,
      reset: clearErrorOnValidationRequest
    }
  ] = useCreditAccountBondingUpdateStateRequest();

  useEffect(() => {
    if (!isErrorSMS && dataSMS !== undefined && creditSelected >= 0) {
      try {
        if (!localStorageData[LocalStorageKey.IsSucessFirstLogin]) {
          navigation.navigate(NAV.DASHBOARD_NAVIGATION);
        }
        saveInLocalStoarge({
          [LocalStorageKey.IsSucessFirstLogin]: true,
          [LocalStorageKey.IsAccountAuthenticated]: true,
          [LocalStorageKey.AccountNumber]:
            creditStateInfo[creditSelected]?.numeroTarjeta,
          [LocalStorageKey.AccountDisplayNumber]:
            creditStateInfo[creditSelected]?.numeroTarjetaAdicionalDisplay,
          [LocalStorageKey.AccountAdditionalNumber]:
            creditStateInfo[creditSelected]?.adicional ?? '',
          [LocalStorageKey.AccountPhoneNumber]:
            creditStateInfo[creditSelected]?.celularCtaDisplay ?? ''
        });
        //hideModal()
      } catch (error) {}
    }
  }, [dataSMS]);

  const onValidateSMS = async (code: string) => {
    if (creditSelected >= 0) {
      await validateSMS({
        cuenta: creditStateInfo[creditSelected]?.numeroTarjeta,
        adicional: creditStateInfo[creditSelected]?.adicional ?? '',
        idDispositivo: localStorageData[LocalStorageKey.UID],
        pin: code
      });
    }
  };

  const validateVerificationCode = async (
    code: string,
    creditInfo: Pick<UserCreditInformation, 'adicional' | 'numeroTarjeta'>
  ) => {
    return await validateSMS({
      cuenta: creditInfo?.numeroTarjeta,
      adicional: creditInfo?.adicional ?? '',
      idDispositivo: localStorageData[LocalStorageKey.UID],
      pin: code
    });
  };

  return {
    onValidateSMS,
    validateVerificationCode,
    clearErrorOnValidationRequest,
    dataSMS,
    isLoadingSMS,
    isErrorSMS,
    errorSMS
  };
}
