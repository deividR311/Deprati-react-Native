import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import { RequestBodyBase } from '../common/request-response.type';
import { MessageResponse } from './messagesApp.interfaces';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    messageApp: builder.query<MessageResponse, RequestBodyBase>({
      query: body => ({
        url: ApiConfig.endpoints.appBackend.messagesApp,
        method: 'POST',
        body: body
      })
    })
  })
});

export const { useMessageAppQuery: useMessageAppRequest } = extendedApi;
