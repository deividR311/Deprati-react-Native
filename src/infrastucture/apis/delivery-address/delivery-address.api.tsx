import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  baseDeliveryAddressBody,
  DeliveryAddressResponse,
  DeliveryOptionsResponse,
  setDeliveryAddressBody,
  setDeliveryModeBody
} from './delivery-address.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    getDeliveryTimes: builder.query<
      DeliveryAddressResponse[],
      baseDeliveryAddressBody
    >({
      query: ({ username, cartId }) => ({
        url: ApiConfig.endpoints.delivery.address.getDeliveryTimes(
          username,
          cartId
        ),
        method: 'GET'
      })
    }),
    deliveryOptions: builder.mutation<
      DeliveryOptionsResponse,
      { username: string; cartId: string }
    >({
      query: ({ username, cartId }) => ({
        url: ApiConfig.endpoints.delivery.deliveryOptions(username, cartId),
        method: 'GET'
      })
    }),
    setDeliveryAddress: builder.mutation<any, setDeliveryAddressBody>({
      query: ({ username, cartId, addressId }) => ({
        url: ApiConfig.endpoints.delivery.address.setDeliveryAddress(
          username,
          cartId,
          addressId
        ),
        method: 'PUT'
      })
    }),
    setDeliveryMode: builder.mutation<any, setDeliveryModeBody>({
      query: ({ username, cartId, deliveryModeId }) => ({
        url: ApiConfig.endpoints.delivery.address.setDeliveryMode(
          username,
          cartId,
          deliveryModeId
        ),
        method: 'PUT'
      })
    }),
    addressRemoveCart: builder.mutation<any, baseDeliveryAddressBody>({
      query: ({ username, cartId }) => ({
        url: ApiConfig.endpoints.delivery.addressRemoveCart(username, cartId),
        method: 'DELETE'
      })
    })
  })
});

export const {
  useLazyGetDeliveryTimesQuery,
  useSetDeliveryAddressMutation,
  useSetDeliveryModeMutation,
  useAddressRemoveCartMutation: useAddressRemoveCartRequest,
  useDeliveryOptionsMutation: useDeliveryOptionsRequest
} = extendedApi;
