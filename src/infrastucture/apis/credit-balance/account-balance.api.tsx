import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import {
  BalanceByAccountNumberBody,
  BalanceByIdentificationBody,
  BalanceResponse
} from './credict-balance.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    accountBalanceByAccountNumber: builder.mutation<
      BalanceResponse,
      BalanceByAccountNumberBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.accountBalance.accountNumber,
        method: 'POST',
        body: body
      })
    }),

    accountBalanceByUserId: builder.mutation<
      BalanceResponse,
      BalanceByIdentificationBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.accountBalance.identification,
        method: 'POST',
        body: body
      })
    })
  })
});

export const {
  useAccountBalanceByAccountNumberMutation:
    useAccountBalanceByAccountNumberRequest,
  useAccountBalanceByUserIdMutation: useAccountBalanceByUserIdRequest
} = extendedApi;
