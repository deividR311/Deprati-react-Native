import { useEffect } from 'react';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { useGetLazyInfoUserRequest } from './user.api';

export const useUserSave = () => {
  const {
    save: saveInStorage,
    localStorageData: {
      [LocalStorageKey.LastCustomerId]: LAST_CUSTOMER_ID,
      [LocalStorageKey.IsLogin]: IS_LOGIN,
      [LocalStorageKey.UserEmail]: USER_EMAIL
    }
  } = useLocalStorage();

  const [getUserInfo, { data: dataUser, isLoading: loadingUser }] =
    useGetLazyInfoUserRequest();

  const loadDataUser = async () => {
    if (IS_LOGIN && USER_EMAIL) {
      await getUserInfo({
        email: USER_EMAIL?.toLowerCase()
      });
    }
  };

  useEffect(() => {
    try {
      if (dataUser && !loadingUser) {
        const isTheLastCustomer = LAST_CUSTOMER_ID === dataUser.customerId;
        saveInStorage({
          [LocalStorageKey.User]: dataUser,
          ...(isTheLastCustomer
            ? {}
            : {
                [LocalStorageKey.IsAccountAuthenticated]: false,
                [LocalStorageKey.AccountNumber]: '',
                [LocalStorageKey.AccountDisplayNumber]: '',
                [LocalStorageKey.AccountAdditionalNumber]: ''
              })
        });
      }
    } catch (error) {}
  }, [dataUser, loadingUser]);

  return loadDataUser;
};
