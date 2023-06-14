import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  AddressDeliveryResponse,
  AddressDeliveryBody,
  AddressDto,
  AddressDtoBody,
  AddressPaymentResponse,
  AddressPaymentDtoBody,
  AddressPaymentDto,
  AddressDeleteRequest
} from './address.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    getAddressDelivery: builder.query<
      AddressDeliveryResponse,
      AddressDeliveryBody
    >({
      query: ({ username, ...params }) => ({
        url: ApiConfig.endpoints.address.addressDelivery(username),
        method: 'GET',
        params: params
      }),
      providesTags: ['AddressList']
    }),
    createAddressDelivery: builder.mutation<AddressDto, AddressDtoBody>({
      invalidatesTags: ['AddressList'],
      query: ({ username, ...body }) => ({
        url: ApiConfig.endpoints.address.addressDelivery(username),
        method: 'POST',
        body: body
      })
    }),
    updateAddressDelivery: builder.mutation<any, AddressDtoBody>({
      invalidatesTags: ['AddressList'],
      query: ({ username, id, ...body }) => ({
        url: ApiConfig.endpoints.address.updateAddressDelivery(username, id),
        method: 'PUT',
        body: body
      })
    }),
    defaultAddressDelivery: builder.mutation<any, AddressDtoBody>({
      invalidatesTags: ['AddressList'],
      query: ({ username, id, ...body }) => ({
        url: ApiConfig.endpoints.address.defaultAddressDelivery(username, id),
        method: 'POST',
        body: body
      })
    }),
    deleteAddress: builder.mutation<any, AddressDeleteRequest>({
      query: ({ username, id, ...body }) => ({
        url: ApiConfig.endpoints.address.updateAddressDelivery(username, id),
        method: 'DELETE'
      }),
      invalidatesTags: ['AddressPaymentList', 'AddressList']
    }),

    getAddressPayment: builder.query<
      AddressPaymentResponse,
      AddressDeliveryBody
    >({
      providesTags: ['AddressPaymentList'],
      query: ({ username, ...params }) => ({
        url: ApiConfig.endpoints.address.addressPayment(username),
        method: 'GET',
        params: params
      })
    }),
    createAddressPayment: builder.mutation<
      AddressPaymentDto,
      AddressPaymentDtoBody
    >({
      query: ({ username, ...body }) => ({
        url: ApiConfig.endpoints.address.addressPayment(username),
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['AddressPaymentList']
    }),
    updateAddressPayment: builder.mutation<any, AddressPaymentDtoBody>({
      invalidatesTags: ['AddressPaymentList', 'ShoppingCart'],
      query: ({ username, id, ...body }) => ({
        url: ApiConfig.endpoints.address.updateAddresspayment(username, id),
        method: 'PUT',
        body: body
      })
    })
  })
});

export const {
  //Address Delivery
  useCreateAddressDeliveryMutation,
  useLazyGetAddressDeliveryQuery: useGetAddressDeliveryRequest,
  useDefaultAddressDeliveryMutation,
  useUpdateAddressDeliveryMutation,
  useDeleteAddressMutation,
  //Address Payment
  useCreateAddressPaymentMutation,
  useLazyGetAddressPaymentQuery: useGetAddressPaymentRequest,
  useUpdateAddressPaymentMutation
} = extendedApi;
