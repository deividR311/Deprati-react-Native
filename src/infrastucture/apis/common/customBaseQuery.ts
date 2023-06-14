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
import { ApiConfig } from './config';
import { updateTokenFunc } from './updateTokenfunc';

const baseQuery = fetchBaseQuery({
  baseUrl: ApiConfig.sapUrl,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const { [LocalStorageKey.Token]: token } = localStorageStateSelector(state);
    token && headers.set('token', token);
    headers.set('authorizationToken', Config.API_KEY_AWS);
    return headers;
  }
});

export const CustomBaseQuery =
  (): BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    try {
      const currentState = api.getState() as RootState;
      const {
        [LocalStorageKey.UserEmail]: email,
        [LocalStorageKey.IpAddress]: ip,
        [LocalStorageKey.RefreshToken]: refreshToken,
        [LocalStorageKey.UID]: deviceId,
        [LocalStorageKey.User]: { documentTypeNumber: UserDocumentNumber }
      } = localStorageStateSelector(currentState);

      args.body = {
        channel: 'App',
        ip,
        email: email || 'guest',
        deviceId,
        ...args.body
      };

      const vinculationEndopointsToInjectId: string[] = [
        'linkedCreditAccountBonding',
        'creditAccountBondingVinculation',
        'creditAccountBondingUpdateState',
        'creditAccountBondingUnlinkAccount',
        'creditAccountBondingResendCode',
        'notificationsList',
        'contactlessTickets'
      ];

      if (vinculationEndopointsToInjectId.includes(api.endpoint)) {
        args.body = {
          ...args.body,
          identificacion: UserDocumentNumber,
          identification: UserDocumentNumber
        };
      }
      // console.log(`👉 ${args.method?.toUpperCase()} ${args.url}`)
      const result = await baseQuery(args, api, extraOptions);

      if (result.meta?.response?.status === 401) {
        await updateTokenFunc(currentState, refreshToken);
        const _result = await baseQuery(args, api, extraOptions);
        return { ..._result };
      }
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
