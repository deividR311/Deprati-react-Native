import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  AddToCartResponse,
  CreateShoppingCartResponse,
  Cart,
  AnonymousAddItemToCartBody,
  MergeAnonymousShoppingCartBody
} from './types';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    createAnonymousShoppingCart: builder.mutation<
      CreateShoppingCartResponse,
      void
    >({
      query: () => ({
        url: ApiConfig.endpoints.shoppingCart.createShoppingCart('anonymous'),
        method: 'POST'
      }),
      invalidatesTags: ['AnonymousGetShoppingCart']
    }),

    anonymousShoppingCart: builder.query<Cart, { cartGuid: string }>({
      query: ({ cartGuid }) => ({
        url: ApiConfig.endpoints.shoppingCart.getShoppingCart(
          'anonymous',
          cartGuid
        ),
        method: 'GET'
      }),
      providesTags: ['AnonymousGetShoppingCart']
    }),

    addToAnonymousShoppingCart: builder.mutation<
      AddToCartResponse,
      AnonymousAddItemToCartBody
    >({
      query: ({ cartGuid, ...body }) => ({
        url: ApiConfig.endpoints.shoppingCart.addToShoppingCart(
          'anonymous',
          cartGuid
        ),
        method: 'POST',
        body
      }),
      invalidatesTags: ['AnonymousGetShoppingCart']
    }),

    mergeAnonymousShoppingCarts: builder.mutation<
      Cart,
      MergeAnonymousShoppingCartBody
    >({
      query: ({ username, anonymousCartGuid, toMergeCartGuid }) => ({
        url: ApiConfig.endpoints.shoppingCart.mergeShoppingCarts(
          username,
          anonymousCartGuid,
          toMergeCartGuid
        ),
        method: 'POST'
      })
    })
  })
});

export const {
  useAddToAnonymousShoppingCartMutation: useAddToAnonymousShoppingCartRequest,
  useCreateAnonymousShoppingCartMutation: useCreateAnonymousShoppingCartRequest,
  useLazyAnonymousShoppingCartQuery: useGetAnonymousShoppingCartDetailRequest,
  useMergeAnonymousShoppingCartsMutation: useMergeAnonymousShoppingCartRequest
} = extendedApi;
