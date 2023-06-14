import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query';
import Config from '../../../application/common/dotEnv';

import { RootState } from '../../../application/state-manager';
import {
  LocalStorageKey,
  localStorageStateSelector
} from '../../../application/state-manager/services/localstorage';
import { AnalyticEvent } from '../../firebase/analytics/analitics.interfaces';
import { rawAnalyticsLogger } from '../../firebase/analytics/useAnalytics';
import { ApiConfig } from './config';
import { updateTokenFunc } from './updateTokenfunc';

const baseQuery = fetchBaseQuery({
  baseUrl: ApiConfig.hybrisUrl,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  prepareHeaders: (headers, { getState, endpoint }) => {
    const state = getState() as RootState;
    const { [LocalStorageKey.Token]: token } = localStorageStateSelector(state);
    if (
      [
        'signIn',
        'signInWithSocialNetworks',
        'countries',
        'regions',
        'cities',
        'product',
        'search',
        'page',
        'components',
        '/users/anonymous/carts',
        'verifySiteEnabled'
      ].includes(endpoint)
    ) {
      return headers;
    }
    if (token) headers.set('Authorization', `Bearer ${token}`);
    headers.set('authorizationToken', Config.API_KEY_AWS);
    return headers;
  }
});

export const CustomBaseQueryHybriss =
  (): BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    extraOptions = {
      ...extraOptions,
      maxRetries: 3
    };
    try {
      // console.log(`👉 ${args.method?.toUpperCase()} ${args.url}`)
      const timeStart = new Date().getTime();
      const currentState = api.getState() as RootState;
      const {
        [LocalStorageKey.RefreshToken]: refreshToken,
        [LocalStorageKey.User]: UserInfo,
        [LocalStorageKey.UID]: DeviceId
      } = localStorageStateSelector(currentState);

      const requestDataToAnalitys = {
        event: AnalyticEvent.requests,
        deviceId: DeviceId,
        customerId: UserInfo.customerId,
        username: UserInfo.displayUid
      };
      const result = await baseQuery(args, api, extraOptions);

      if (result.meta?.response?.status === 401) {
        await updateTokenFunc(currentState, refreshToken);
        const _result = await baseQuery(args, api, extraOptions);

        const timeEnd = new Date().getTime();
        rawAnalyticsLogger({
          ...requestDataToAnalitys,
          attributes: {
            endpoint: args.url,
            method: args.method,
            body: args.body,
            response: _result.meta?.response,
            requestTime: timeEnd - timeStart
          }
        });
        // console.log('👉 Time Request: ', timeEnd - timeStart, args.url)
        return { ..._result };
      }

      const timeEnd = new Date().getTime();
      rawAnalyticsLogger({
        ...requestDataToAnalitys,
        attributes: {
          endpoint: args.url,
          method: args.method,
          body: args.body,
          response: result.meta?.response,
          requestTime: timeEnd - timeStart
        }
      });

      // console.log('👉 Time Request: ', timeEnd - timeStart, args.url)
      return { ...result };
    } catch (e) {
      console.log('>>> error: ', e);
      return {
        error: {
          status: 0,
          data: ''
        }
      };
    }
  };
