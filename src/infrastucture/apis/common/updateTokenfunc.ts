import { FetchArgs } from '@reduxjs/toolkit/dist/query';
import { Platform } from 'react-native';
import store from '../../../application/state-manager';
import {
  LocalStorageKey,
  save
} from '../../../application/state-manager/services/localstorage';
import { ApiConfig } from './config';
import Config from '../../../application/common/dotEnv';

export const updateTokenFunc = async (currentState, refreshToken) => {
  const clientID = Platform.select({
    android: Config.HYBRIS_CLIENT_ID_ANDROID,
    ios: Config.HYBRIS_CLIENT_ID_IOS
  });

  if (refreshToken) {
    const refreshResult = await fetch(
      `${ApiConfig.hybrisUrl}/authorizationserver/oauth/token`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          refresh_token: refreshToken,
          scope: 'basic',
          client_id: clientID?.toString() ?? '',
          grant_type: 'refresh_token',
          client_secret: Config.HYBRIS_CLIENT_SECRET
        }).toString(),
        method: 'POST'
      }
    );
    const resultRefresh = await refreshResult.json();
    //console.log('refresh endpoint', resultRefresh)
    if (resultRefresh.access_token) {
      store.dispatch(
        save({
          [LocalStorageKey.IsLogin]: true,
          [LocalStorageKey.Token]: resultRefresh.access_token,
          [LocalStorageKey.RefreshToken]: resultRefresh.refresh_token,
          [LocalStorageKey.ExpiresIn]: resultRefresh.expires_in,
          [LocalStorageKey.GetTokenDate]: new Date().toString()
        })
      );
    } else {
      /* store.dispatch(
        save({
          [LocalStorageKey.IsLogin]: false,
        }),
      ) */
    }
  }
};
