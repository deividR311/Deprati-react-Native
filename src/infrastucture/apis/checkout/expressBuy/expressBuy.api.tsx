import { ApiConfig } from '../../common/config';
import { HYBRISS_API, SAP_API } from '../../common/hybriss.api';
import { directCreditResponse } from '../payment-methods';
import {
  balanceInquiryCheckOutResponse,
  balanceInquiryCheckOutResquest,
  expressBuyRequest,
  expressCheckoutRequest
} from './expressBuy.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    showExpressBuyButton: builder.mutation<string, expressBuyRequest>({
      query: ({ username, cartId, ...body }) => ({
        url: ApiConfig.endpoints.expressBuy.showExpressBuyButton(
          username,
          cartId
        ),
        method: 'GET'
      })
    }),
    directCreditBalance: builder.mutation<
      directCreditResponse,
      expressBuyRequest
    >({
      query: ({ username, cartId }) => ({
        url: ApiConfig.endpoints.expressBuy.directCreditBalance(
          username,
          cartId
        ),
        method: 'GET'
      })
    }),
    selectExpressDirectCredit: builder.mutation<any, expressCheckoutRequest>({
      query: ({ username, cartId, ...body }) => ({
        url: ApiConfig.endpoints.expressBuy.selectExpressDirectCredit(
          username,
          cartId
        ),
        body,
        method: 'POST'
      }),
      invalidatesTags: ['ShoppingCart']
    }),
    //@deprecated
    refreshExpressBuyCart: builder.mutation<any, expressBuyRequest>({
      query: ({ username, cartId }) => ({
        url: ApiConfig.endpoints.expressBuy.refreshExpressBuyCart(
          username,
          cartId
        ),
        method: 'GET'
      }),
      invalidatesTags: ['ShoppingCart']
    })
  })
});

const extendedApiSap = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    //@deprecated
    balanceInquiryCheckOut: builder.mutation<
      balanceInquiryCheckOutResponse,
      balanceInquiryCheckOutResquest
    >({
      query: body => ({
        url: ApiConfig.endpoints.expressBuy.balanceInquiryCheckOut,
        method: 'POST',
        body: body
      })
    })
  })
});

export const {
  useRefreshExpressBuyCartMutation: useRefreshExpressBuyCartRequest,
  useDirectCreditBalanceMutation: useDirectCreditBalanceRequest,
  useSelectExpressDirectCreditMutation:
    useSelectExpressDirectCreditBalanceRequest,
  useShowExpressBuyButtonMutation: useShowExpressBuyRequestRequest //@deprecated
} = extendedApi;

export const {
  useBalanceInquiryCheckOutMutation: useBalanceInquiryCheckOutRequest //@deprecated
} = extendedApiSap;
