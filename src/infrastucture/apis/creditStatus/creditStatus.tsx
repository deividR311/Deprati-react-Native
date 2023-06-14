import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { RequestBodyBase, ResponseBase } from '../common/request-response.type';
import { creditStatusBody, creditStusResponse } from './creditStatus.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    dcStateCredit: builder.mutation<creditStusResponse, creditStatusBody>({
      query: body => ({
        url: ApiConfig.endpoints.creditStatus.dcStateCredit,
        method: 'POST',
        body: body
      })
    })
  })
});

export const { useDcStateCreditMutation: useDcStateCreditMutationrquest } =
  extendedApi;
