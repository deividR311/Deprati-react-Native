import { useEffect } from 'react';
import { useRefreshTokenRequest } from './sigin.api';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { getStorage } from '../../../application/state-manager/storage/storage';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { mapSignInModelfromDTO } from './sign-in.model';
import { getExpiresAt } from '../../../application/utils/diferenceDays';

export const useRefreshToken = () => {
  const [
    refreshTokenRequest,
    { isLoading, isSuccess, data: rawDataResponse, isError }
  ] = useRefreshTokenRequest();
  const { save: saveInLocalStorage } = useLocalStorage();

  const getExpiresAtStorage = async () => {
    const expiresAt = await getStorage(LocalStorageKey.ExpiresAt);
    if (expiresAt) {
      let today = new Date();
      let expiresAtDate = new Date(expiresAt);
      if (today > expiresAtDate) {
        saveInLocalStorage({
          [LocalStorageKey.IsLogin]: false
        });
        const refreshToken = await getStorage(LocalStorageKey.RefreshToken);
        refreshToken && refreshTokenRequest({ refreshToken });
      }
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (!rawDataResponse) return;
      const {
        accessToken = '',
        expiresIn = 0,
        refreshToken = ''
      } = mapSignInModelfromDTO(rawDataResponse);

      saveInLocalStorage({
        [LocalStorageKey.IsLogin]: true,
        [LocalStorageKey.Token]: accessToken,
        [LocalStorageKey.RefreshToken]: refreshToken,
        [LocalStorageKey.ExpiresIn]: expiresIn,
        [LocalStorageKey.ExpiresAt]: getExpiresAt(`${expiresIn}`),
        [LocalStorageKey.GetTokenDate]: new Date().toISOString()
      });
    }
    if (!isLoading && isError) {
      saveInLocalStorage({
        [LocalStorageKey.IsLogin]: false
      });
    }
  }, [isLoading]);

  useEffect(() => {
    getExpiresAtStorage();
  }, []);
};
