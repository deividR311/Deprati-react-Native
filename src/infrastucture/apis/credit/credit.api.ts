import { SAP_API } from '../common/hybriss.api';

import { ApiConfig } from '../common/config';
import {
  CurrentCreditLimitBody,
  CurrentCreditLimitResponse,
  IncreaseCreditLimitBody,
  IncreaseCreditLimitResponse,
  PreRelatedBodyAPI,
  PreRelatedResponseApi,
  QuotaConsultationBodyAPI,
  QuotaConsultationResponseAPI,
  QuotasListResponse
} from './credit.interface';
import { RequestBodyBase } from '../common/request-response.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,

  endpoints: builder => ({
    preRelatedAccountCredit: builder.mutation<
      PreRelatedResponseApi,
      PreRelatedBodyAPI
    >({
      query: body => ({
        url: ApiConfig.endpoints.preRelatedAccount,
        method: 'POST',
        body: body
      })
    }),
    QuotasList: builder.query<QuotasListResponse, RequestBodyBase>({
      query: body => ({
        url: ApiConfig.endpoints.quotasRequest.quotasList,
        method: 'POST',
        body: body
      })
    }),
    QuotaConsultation: builder.mutation<
      QuotaConsultationResponseAPI,
      QuotaConsultationBodyAPI
    >({
      query: body => ({
        url: ApiConfig.endpoints.quotasRequest.quotaConsultation,
        method: 'POST',
        body: body
      })
    }),
    CurrentCreditLimit: builder.mutation<
      CurrentCreditLimitResponse,
      CurrentCreditLimitBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.creditLimit.current,
        method: 'POST',
        body: body
      })
    }),
    IncreaseCreditLimit: builder.mutation<
      IncreaseCreditLimitResponse,
      IncreaseCreditLimitBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.creditLimit.increase,
        method: 'POST',
        body: body
      })
    })
  })
});

export const {
  usePreRelatedAccountCreditMutation: usePreRelatedAccountCreditRequest,
  useQuotaConsultationMutation: useQuotaConsultationRequest,
  useQuotasListQuery: useQuotasListRequest,
  useCurrentCreditLimitMutation: useCurrentCreditLimitRequest,
  useIncreaseCreditLimitMutation: useIncreaseCreditLimitRequest
} = extendedApi;
