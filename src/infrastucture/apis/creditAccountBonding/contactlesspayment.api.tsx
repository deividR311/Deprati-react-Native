import Config from '../../../application/common/dotEnv';
import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    contactlesspayment: builder.query<any, any>({
      query: ({ deviceId, token }) => {
        let response = {
          url: `${Config.API_URL_ECCOMMERCE}${ApiConfig.endpoints.creditAccountBonding.contactlesspayment}?deviceId=${deviceId}`,
          method: 'GET'
        };
        if (token) {
          response.headers = {
            Authorization: `Bearer ${token}`
          };
        }
        return response;
      }
    })
  })
});

export const {
  useContactlesspaymentQuery: useContactlesspaymentRequest,
  useLazyContactlesspaymentQuery: useLazyContactlesspaymentRequest
} = extendedApi;
