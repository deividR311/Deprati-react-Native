import { ApiConfig } from '../../common/config';
import { HYBRISS_API } from '../../common/hybriss.api';
import {
  AddBankCardRequest,
  AddBankCardResponse,
  BankCardsResponse,
  ChoosePaymentezPaymentMethodRequestBody,
  PaymentRequest,
  PaymentMethodsResponse,
  PaymentRequestGifCard,
  VerifyOTPCodeRequestBody,
  VerifyOTPCodeResponse,
  PaymentezByDinerOrderRequestBody,
  PaymentezOrderRequestBody,
  PaymentezOrderResponse,
  PaymentezByDinerOrderResponse,
  directCreditResponse,
  directCreditRequest
} from './payment.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    paymentMethods: builder.query<PaymentMethodsResponse, PaymentRequest>({
      query: ({ user, token, cartId }) => ({
        url: ApiConfig.endpoints.payment.paymentMethods(user, cartId),
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),

    selectPaymentMethod: builder.mutation<
      null,
      ChoosePaymentezPaymentMethodRequestBody
    >({
      query({ token, user, cartId, ...body }) {
        return {
          url: ApiConfig.endpoints.payment.selectPaymentMethod(user, cartId),
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body
        };
      }
    }),

    bankCards: builder.query<BankCardsResponse, { token: string }>({
      query: ({ token }) => ({
        url: ApiConfig.endpoints.payment.paymentez
      }),
      providesTags: ['PaymentezCardList']
    }),

    deleteBankCard: builder.mutation<any, { token: string; cardId: string }>({
      query: ({ token, cardId }) => ({
        url: ApiConfig.endpoints.payment.deletePaymentez(cardId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['PaymentezCardList']
    }),

    validateBankCardOTPCode: builder.mutation<
      any,
      { token: string; cardId: string; otpCode: string }
    >({
      query: ({ token, cardId, otpCode }) => ({
        url: ApiConfig.endpoints.payment.paymentezOTPValidation,
        method: 'POST',
        body: {
          cardId,
          otpCode
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['PaymentezCardList']
    }),

    addBankCard: builder.mutation<AddBankCardResponse, AddBankCardRequest>({
      query: ({ token_header, ...body }) => ({
        url: ApiConfig.endpoints.payment.paymentez,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token_header}`
        }
      }),
      invalidatesTags: ['PaymentezCardList']
    }),

    setDefaultBankCard: builder.mutation<
      any,
      { token: string; cardId: string }
    >({
      query: ({ token, cardId }) => ({
        url: ApiConfig.endpoints.payment.setDefaultBankCard(cardId),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      invalidatesTags: ['PaymentezCardList']
    }),

    paymentGifCard: builder.mutation<any, PaymentRequestGifCard>({
      query: ({ user, cartId, ...body }) => ({
        url: ApiConfig.endpoints.payment.paymentMethodsGiftCard(user, cartId),
        method: 'POST',
        body: body
      })
    }),

    verifyOTPBankCard: builder.mutation<
      VerifyOTPCodeResponse,
      VerifyOTPCodeRequestBody
    >({
      query: ({ token, otpCode, orderCode }) => ({
        url: ApiConfig.endpoints.payment.paymentezOTPVerify(otpCode, orderCode),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),

    paymentezOrder: builder.mutation<
      PaymentezOrderResponse,
      PaymentezOrderRequestBody
    >({
      query: ({ token, username, cartId, cvc }) => ({
        url: ApiConfig.endpoints.order.paymentez(username, cartId, cvc),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        invalidatesTags: ['ShoppingCart']
      })
    }),

    paymentezOrderByDiner: builder.mutation<
      PaymentezByDinerOrderResponse,
      PaymentezByDinerOrderRequestBody
    >({
      query: ({ token, username, cartId, ...body }) => ({
        url: ApiConfig.endpoints.order.paymentezByDiner(username, cartId),
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`
        },
        invalidatesTags: ['ShoppingCart']
      })
    }),
    paymentRemove: builder.mutation<any, PaymentRequest>({
      query: ({ cartId, user }) => ({
        url: ApiConfig.endpoints.payment.paymentRemove(user, cartId),
        method: 'DELETE'
      }),
      invalidatesTags: ['ShoppingCart']
      // invalidatesTags: (_, error) => {
      //   if (error?.status !== 200) {
      //     return []
      //   }
      //   return ['ShoppingCart']
      // },
    }),
    directCreditBalanceCustomer: builder.mutation<
      directCreditResponse,
      directCreditRequest
    >({
      query: ({ cartId, user, ...params }) => ({
        url: ApiConfig.endpoints.payment.directCreditBalanceCustomer(
          user,
          cartId
        ),
        params,
        method: 'GET'
      })
    })
  })
});

export const {
  useLazyPaymentMethodsQuery: useLazyPaymentMethodsRequest,
  usePaymentMethodsQuery: usePaymentMethodsRequest,
  useAddBankCardMutation: useAddBankCardRequest,
  useDeleteBankCardMutation: useDeleteBankCardRequest,
  useSetDefaultBankCardMutation: useSetDefaultBankCardRequest,
  useValidateBankCardOTPCodeMutation: useValidateBankCardOTPCodeRequest,
  useBankCardsQuery: useBankCardsRequest,
  useLazyBankCardsQuery: useLazyBankCardsRequest,
  useSelectPaymentMethodMutation: useSelectPaymentMethodRequest,
  usePaymentGifCardMutation: usePaymentGifCardRequest,
  useVerifyOTPBankCardMutation: useVerifyOTPBankCardRequest,
  usePaymentezOrderByDinerMutation: usePaymentezOrderByDinerRequest,
  usePaymentezOrderMutation: usePaymentezOrderRequest,
  usePaymentRemoveMutation: usePaymentRemoveRequest,
  useDirectCreditBalanceCustomerMutation: useDirectCreditBalanceCustomerRequest
} = extendedApi;
