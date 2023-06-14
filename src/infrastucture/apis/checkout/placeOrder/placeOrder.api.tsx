import { ApiConfig } from '../../common/config';
import { HYBRISS_API } from '../../common/hybriss.api';
import {
  giftCardAuthorizeRequest,
  giftCardRequest,
  placeOrderAuthorizeRequest,
  placeOrderRequest,
  placeOrderResponse
} from './placeOrder.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    bankPayment: builder.mutation<placeOrderResponse, placeOrderRequest>({
      query: ({ username, cartId, ...body }) => ({
        url: ApiConfig.endpoints.placeOrder.bankPayment(username, cartId),
        method: 'POST'
      })
      //invalidatesTags: ['ShoppingCart'],
    }),
    giftCard: builder.mutation<string, giftCardRequest>({
      query: ({ username, cartId, ...body }) => ({
        url: ApiConfig.endpoints.placeOrder.giftCardToken(username, cartId),
        method: 'POST',
        body
      })
      //invalidatesTags: ['ShoppingCart'],
    }),
    giftCardAuthorize: builder.mutation<
      placeOrderResponse,
      giftCardAuthorizeRequest
    >({
      query: ({ username, cartId, ...body }) => ({
        url: ApiConfig.endpoints.placeOrder.giftCardAuthorize(username, cartId),
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          ...body
        }).toString()
      })
      //invalidatesTags: ['ShoppingCart'],
    }),
    cashInDelivery: builder.mutation<placeOrderResponse, placeOrderRequest>({
      query: ({ username, cartId, ...body }) => ({
        url: ApiConfig.endpoints.placeOrder.cashInDelivery(username, cartId),
        method: 'POST'
      })
      //invalidatesTags: ['ShoppingCart'],
    }),
    directCreditToken: builder.query<any, placeOrderRequest>({
      query: ({ username, cartId }) => ({
        url: ApiConfig.endpoints.placeOrder.directCreditToken(username, cartId),
        method: 'GET'
      })
    }),
    directCreditAuthorize: builder.mutation<any, placeOrderAuthorizeRequest>({
      query: ({ username, cartId, ...body }) => ({
        url: ApiConfig.endpoints.placeOrder.directCreditAuthorize(
          username,
          cartId
        ),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: new URLSearchParams({
          ...body
        }).toString()
      })
      //invalidatesTags: ['ShoppingCart'],
    })
  })
});

export const {
  useBankPaymentMutation: useBankPaymentRequest, //CashDeposit
  useLazyDirectCreditTokenQuery: useDirectCreditTokenRequest,
  useDirectCreditAuthorizeMutation: useDirectCreditAuthorizeRequest,
  useCashInDeliveryMutation: useCashInDeliveryRequest, //AgaintsDelivery
  useGiftCardMutation: useGiftCardRequest,
  useGiftCardAuthorizeMutation: useGiftCardAuthorizeRequest
} = extendedApi;
