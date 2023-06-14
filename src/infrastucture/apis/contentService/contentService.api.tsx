import {
  ContentRequest,
  CheckoutResponse as CheckoutRes,
  CustomerServiceResponse as CustomerRes,
  ContentExpirationDateResponse as ExpirationDateRes
} from '.';
import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    contentService: builder.mutation<
      CustomerRes | CheckoutRes | ExpirationDateRes,
      ContentRequest
    >({
      query: ({ content }) => ({
        url: ApiConfig.endpoints.appBackend.content,
        method: 'POST',
        body: {
          content
        }
      })
    })
  })
});

export const { useContentServiceMutation } = extendedApi;
