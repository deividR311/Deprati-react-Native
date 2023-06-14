import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { creditState } from '../../../../application/state-manager/services/credit';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { signUpState } from '../../../../application/state-manager/services/signUp';
import { useCreditAccountBondingVinculationRequest } from '../../../../infrastucture/apis/creditAccountBonding';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { UserCreditInformation } from '../components/modals/SelectModal/ModalSelectContent';

export default function usePreBondingAccount() {
  const { hideModal } = useGenericModal();
  const [isSelectedCredit, setisSelectedCredit] = useState(false);
  const creditStateInfo = useSelector(creditState);
  const { localStorageData } = useLocalStorage();
  const { creditSelected } = useSelector(signUpState);
  const [
    preBonding,
    {
      data: dataPreBonding,
      isLoading: isLoadingPreBonding,
      isSuccess: isSuccessPreBonding,
      isError: isErrorPreBonding
    }
  ] = useCreditAccountBondingVinculationRequest();

  /// vinculationAccount
  const onPressPreBonding = async () => {
    if (creditSelected >= 0) {
      preBonding({
        cuenta: creditStateInfo[creditSelected]?.numeroTarjeta,
        adicional: creditStateInfo[creditSelected]?.adicional ?? '',
        idDispositivo: localStorageData[LocalStorageKey.UID],
        identificacion:
          localStorageData[LocalStorageKey.User]?.documentTypeNumber
      });
    }
  };

  const onPressPreBondingWithCreditInfo = async (
    creditInfo: Pick<UserCreditInformation, 'adicional' | 'numeroTarjeta'>
  ) => {
    return await preBonding({
      cuenta: creditInfo?.numeroTarjeta,
      adicional: creditInfo?.adicional ?? '',
      idDispositivo: localStorageData[LocalStorageKey.UID],
      identificacion: localStorageData[LocalStorageKey.User]?.documentTypeNumber
    });
  };

  useEffect(() => {
    if (!isErrorPreBonding && dataPreBonding?.success) {
      //hideModal()
    }
  }, [dataPreBonding]);

  return {
    onPressPreBonding,
    onPressPreBondingWithCreditInfo,
    dataPreBonding,
    isLoadingPreBonding,
    isErrorPreBonding,
    isSelectedCredit,
    isSuccessPreBonding
  };
}
