import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { RequestBodyBase } from '../common/request-response.type';
import {
  AccountBondingResentCodeBody,
  AccountBondingResentCodeResponse,
  AccountBondingSummaryBody,
  AccountBondingUnlinkBody,
  AccountBondingUnlinkResponse,
  AccountBondingUpdateStateBody,
  AccountBondingUpdateStateResponse,
  AccountBondingVinculateBody,
  AccountBondingVinculateResponse,
  GetAccountCreditUsersBody,
  GetAccountCreditUsersResponse
} from './credit-account-bonding.types';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    creditAccountBondingVinculation: builder.mutation<
      AccountBondingVinculateResponse,
      AccountBondingVinculateBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.creditAccountBonding.accountVinculation,
        method: 'POST',
        body: body
      })
    }),

    getAccountCreditUsers: builder.mutation<
      GetAccountCreditUsersResponse,
      GetAccountCreditUsersBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.creditAccountBonding.getCreditAccountBonding,
        method: 'POST',
        body: body
      })
    }),
    creditAccountBondingUpdateState: builder.mutation<
      AccountBondingUpdateStateResponse,
      AccountBondingUpdateStateBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.creditAccountBonding.accountVinculation,
        method: 'PUT',
        body: body
      })
    }),
    creditAccountBondingUnlinkAccount: builder.mutation<
      AccountBondingUnlinkResponse,
      AccountBondingUnlinkBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.creditAccountBonding
          .unlinkCreditAccountBonding,
        method: 'PUT',
        body: body
      })
    }),
    creditAccountBondingResendCode: builder.mutation<
      AccountBondingResentCodeResponse,
      AccountBondingResentCodeBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.creditAccountBonding.resendCode,
        method: 'POST',
        body: body
      })
    }),
    linkedCreditAccountBonding: builder.mutation<
      AccountBondingResentCodeResponse,
      AccountBondingVinculateBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.creditAccountBonding
          .linkedCreditAccountBonding,
        method: 'POST',
        body: body
      }),
      transformResponse: (response, meta) => ({
        ...response,
        status: meta?.response?.status
      })
    }),
    summaryCreditAccountBonding: builder.mutation<
      any,
      AccountBondingSummaryBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.creditAccountBonding.summary,
        method: 'PUT',
        body: body
      })
    })
  })
});

export const {
  useGetAccountCreditUsersMutation: useGetAccountCreditUsersRequest,
  useCreditAccountBondingVinculationMutation:
    useCreditAccountBondingVinculationRequest,
  useCreditAccountBondingUpdateStateMutation:
    useCreditAccountBondingUpdateStateRequest,
  useCreditAccountBondingUnlinkAccountMutation:
    useCreditAccountBondingUnlinkAccountRequest,
  useCreditAccountBondingResendCodeMutation:
    useCreditAccountBondingResendCodeRequest,
  useLinkedCreditAccountBondingMutation: useLinkedCreditAccountRequest,
  useSummaryCreditAccountBondingMutation: useSummaryCreditAccountRequest
} = extendedApi;
