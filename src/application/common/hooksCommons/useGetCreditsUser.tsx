import { RequestRawResult } from '../../../infrastucture/apis/common/config';
import { useState } from 'react';
import { useLocalStorage } from '../../state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../state-manager/services/localstorage';
import {
  useGetAccountCreditUsersRequest,
  GetAccountCreditUsersResponse
} from '../../../infrastucture/apis/creditAccountBonding';
import { useDispatch } from 'react-redux';
import {
  setCreditInfo,
  setMessageCreditUser
} from '../../state-manager/services/credit';

export default function useGetCreditsUser() {
  const [isFirstRequestCredits] = useState(0);
  const {
    localStorageData: { [LocalStorageKey.User]: userData }
  } = useLocalStorage();

  const dispatch = useDispatch();

  const [getCreditAccountBondingAccount, { isError, data, isLoading }] =
    useGetAccountCreditUsersRequest();

  /* useEffect(() => {
    if (data?.data) {
      dispatch(setCreditInfo(data.data))
    }
  }, [data]) */

  /* useEffect(() => {
    if (isError && error?.data) {
      dispatch(setMessageCreditUser(error?.data?.Message))
    }
  }, [isError]) */

  const loadCreditsUser = async () => {
    if (userData?.documentTypeNumber) {
      const response = (await getCreditAccountBondingAccount({
        identificacion: userData?.documentTypeNumber
      })) as RequestRawResult<GetAccountCreditUsersResponse>;
      if (response?.error) {
        dispatch(setCreditInfo(null));
        dispatch(
          setMessageCreditUser({
            message: response?.error?.data?.Message,
            status: response?.error?.status
          })
        );
        return;
      }
      if (response?.data?.data) {
        dispatch(setCreditInfo(response?.data?.data));
        dispatch(setMessageCreditUser(null));
      }
    }
  };

  return {
    isError,
    isFirstRequestCredits,
    loadCreditsUser,
    data,
    isLoading
  };
}
