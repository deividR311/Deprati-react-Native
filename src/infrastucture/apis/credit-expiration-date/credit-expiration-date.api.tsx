import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import {
  CurrentDateRequestBody,
  ChangeDateRequestBody,
  CurrentDateResponse,
  ChangeDateResponse
} from './credit-expiration-date.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    currentDate: builder.mutation<CurrentDateResponse, CurrentDateRequestBody>({
      query: body => ({
        url: ApiConfig.endpoints.creditExpirationDate.currentDate,
        method: 'POST',
        body: body
      })
    }),

    changeDate: builder.mutation<ChangeDateResponse, ChangeDateRequestBody>({
      query: body => ({
        url: ApiConfig.endpoints.creditExpirationDate.changeDate,
        method: 'POST',
        body: body
      })
    })
  })
});

export const {
  useCurrentDateMutation: useExpirationCurrentDateRequest,
  useChangeDateMutation: useExpirationChangeDateRequest
} = extendedApi;
