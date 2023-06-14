import { ApiConfig } from '../../common/config';
import { HYBRISS_API } from '../../common/hybriss.api';
import {
  PointOfServiceRequest as POSRequest,
  PointOfServiceResponse as POSResponse,
  SelectPointOfServiceBody as SelectPOSRequestBody,
  SuccessSelectPointOfServiceResponse as SelectPOSResponse
} from './pointOfService.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    pickupStore: builder.query<POSResponse, POSRequest>({
      query: ({ user }) => ({
        url: ApiConfig.endpoints.pickupStore.pointOfService,
        method: 'GET'
      })
    }),
    selectPOS: builder.mutation<SelectPOSResponse, SelectPOSRequestBody>({
      query: ({ user, cartId, ...body }) => ({
        url: ApiConfig.endpoints.pickupStore.selectPointOfService(user, cartId),
        method: 'PUT',
        body
      })
    })
  })
});

export const {
  useLazyPickupStoreQuery: useLazyPickupStoreRequest,
  useSelectPOSMutation: useSelectPOSRequest
} = extendedApi;
