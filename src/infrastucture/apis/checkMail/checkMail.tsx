import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    checkMail: builder.mutation<any, any>({
      query: body => ({
        url: ApiConfig.endpoints.mail.checkMail,
        method: 'POST',
        body: body
      })
    })
  })
});

export const { useCheckMailMutation: useCheckMailMutationRequest } =
  extendedApi;
