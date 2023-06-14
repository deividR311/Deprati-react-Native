import { ApiConfig } from '../../../common/config';
import { HYBRISS_API } from '../../../common/hybriss.api';
import {
  GetBankingResponse,
  PaymentSelectRequest,
  SuccessPaymentResponse as PaymentSelectRes
} from './cashPayment.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    getCashPayment: builder.query<GetBankingResponse, any>({
      query: ({ user }) => ({
        url: ApiConfig.endpoints.paymentMethod.getCashPayment,
        method: 'GET'
      })
    }),
    setCashPayment: builder.mutation<PaymentSelectRes, PaymentSelectRequest>({
      query: ({ user, cartId, ...body }) => ({
        url: ApiConfig.endpoints.paymentMethod.setCashPayment(user, cartId),
        method: 'POST',
        body
      })
    })
  })
});

export const {
  useLazyGetCashPaymentQuery: useLazyGetCashPaymentRequest,
  useSetCashPaymentMutation: useSetCashPaymentRequest
} = extendedApi;
