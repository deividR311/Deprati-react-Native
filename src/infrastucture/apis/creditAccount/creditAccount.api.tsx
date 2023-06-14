import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { RequestBodyBase, ResponseBase } from '../common/request-response.type';
import {
  creditAccountBody,
  creditAccountResponse,
  ListServicesResponse
} from './creditAccount.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    creditAccount: builder.mutation<creditAccountResponse, creditAccountBody>({
      query: body => ({
        url: ApiConfig.endpoints.directCreditAccount.creditAccount,
        method: 'POST',
        body: body
      })
    }),
    servicesList: builder.mutation<ListServicesResponse, { email: string }>({
      query: ({ email }) => ({
        url: ApiConfig.endpoints.appBackend.services,
        method: 'POST',
        body: {
          email
        }
      })
    })
  })
});

export const {
  useCreditAccountMutation: useCreditAccountMutationRequest,
  useServicesListMutation: useServicesListMutationRequest
} = extendedApi;
