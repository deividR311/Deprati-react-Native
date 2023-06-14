import { useEffect, useState } from 'react';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { useLazyContactlesspaymentRequest } from './contactlesspayment.api';

export const useValidContactlesspaymentHook = () => {
  const [validContactlesspayment, { data, isLoading, isSuccess }] =
    useLazyContactlesspaymentRequest();
  const { localStorageData, save: saveInLocalStoarge } = useLocalStorage();
  const {
    [LocalStorageKey.UID]: deviceId,
    [LocalStorageKey.IsLogin]: IS_LOGIN,
    [LocalStorageKey.User]: LocalUserData
  } = localStorageData;

  const validVinculation = () => {
    validContactlesspayment({
      deviceId
    });
  };

  const validVinculationToken = (token: string) => {
    return validContactlesspayment({
      deviceId,
      token
    });
  };

  useEffect(() => {
    if (isSuccess) {
      if (data !== undefined && Object.keys(data).length > 0) {
        if (
          LocalUserData?.directCreditCodeCustomer ===
            data.directCreditCodeCustomer &&
          LocalUserData?.directCreditCodeAdditional ===
            data.directCreditCodeAdditional
        ) {
          saveInLocalStoarge({
            [LocalStorageKey.AccountNumber]: data.directCreditCodeCustomer,
            [LocalStorageKey.IsAccountAuthenticated]: true,
            [LocalStorageKey.IsSucessFirstLogin]: true,
            [LocalStorageKey.AccountAdditionalNumber]:
              data.directCreditCodeAdditional
          });
        }
      } else {
        // siempre tenerla en false
        saveInLocalStoarge({ [LocalStorageKey.IsAccountAuthenticated]: false });
      }
    }
  }, [IS_LOGIN, data, isLoading, isSuccess]);

  return {
    validVinculation,
    validVinculationToken,
    isLoading,
    isSuccess
  };
};
