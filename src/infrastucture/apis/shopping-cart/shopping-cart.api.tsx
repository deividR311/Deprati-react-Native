import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  AddToCartResponse,
  CartsResponse,
  CreateShoppingCartResponse,
  GetShoppingCartRequestBody,
  ShoppingCartRequestBody,
  Cart
} from './types';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getShoppingCart: builder.query<Cart, GetShoppingCartRequestBody>({
      // async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
      //   let shoppingCartsResult = await fetchWithBQ({
      //     url: ApiConfig.endpoints.shoppingCart.getShoppingCart(_arg.username),
      //     method: 'GET',
      //   })
      //   if (shoppingCartsResult.error) {
      //     console.log('Error 1 in getShoppingCart...')
      //     await sleep(2000)
      //     shoppingCartsResult = await fetchWithBQ({
      //       url: ApiConfig.endpoints.shoppingCart.getShoppingCart(
      //         _arg.username,
      //       ),
      //       method: 'GET',
      //     })
      //     if (shoppingCartsResult.error) {
      //       console.log('Error Fatal in getShoppingCart...')
      //       return { error: shoppingCartsResult.error as FetchBaseQueryError }
      //     }
      //   }
      //   const {
      //     carts: [currentCart],
      //   } = shoppingCartsResult.data as CartsResponse

      //   let currentCartResult = await fetchWithBQ({
      //     url: ApiConfig.endpoints.shoppingCart.getShoppingCart(
      //       _arg.username,
      //       currentCart.code,
      //     ),
      //     method: 'GET',
      //   })

      //   if (currentCartResult.error) {
      //     console.log('Error 1 in getCurrentShoppingCart...')
      //     await sleep(2000)
      //     currentCartResult = await fetchWithBQ({
      //       url: ApiConfig.endpoints.shoppingCart.getShoppingCart(
      //         _arg.username,
      //         currentCart.code,
      //       ),
      //       method: 'GET',
      //     })
      //     if (currentCartResult.error) {
      //       console.log('Error Fatal in getCurrentShoppingCart...')
      //       return { error: currentCartResult.error as FetchBaseQueryError }
      //     }
      //   }

      //   return {
      //     data: currentCartResult.data,
      //   }
      // },
      query: ({ username, cartId }) => ({
        url: ApiConfig.endpoints.shoppingCart.getShoppingCart(username),
        method: 'GET'
      }),
      transformResponse: (response: CartsResponse | Cart): Cart => {
        return response?.carts?.[0] ?? {};
      },
      providesTags: ['ShoppingCart']
    }),
    createShoppingCart: builder.mutation<
      CreateShoppingCartResponse,
      ShoppingCartRequestBody
    >({
      query: ({ username, token }) => ({
        url: ApiConfig.endpoints.shoppingCart.createShoppingCart(username),
        method: 'POST'
      }),
      invalidatesTags: ['ShoppingCart']
    }),

    addToShoppingCart: builder.mutation<
      AddToCartResponse,
      Omit<ShoppingCartRequestBody, 'entryNumber' | 'voucherId'>
    >({
      query: ({ cartId = '', productCode, quantity, username }) => ({
        url: ApiConfig.endpoints.shoppingCart.addToShoppingCart(
          username,
          cartId
        ),
        method: 'POST',
        body: {
          quantity,
          product: {
            code: productCode
          }
        }
      })
    }),

    updateShoppingCart: builder.mutation<
      any,
      Omit<ShoppingCartRequestBody, 'productCode' | 'voucherId'>
    >({
      query: ({
        cartId = '',
        entryNumber = '',
        quantity,
        token,
        username
      }) => ({
        url: ApiConfig.endpoints.shoppingCart.entryInShoppingCart(
          username,
          cartId,
          entryNumber
        ),
        method: 'PUT',
        body: { quantity }
      })
    }),

    pickUpShoppingCart: builder.mutation<
      any,
      Omit<
        ShoppingCartRequestBody,
        'productCode' | 'voucherId' | 'quantity'
      > & {
        enablePickUpInStore: boolean;
      }
    >({
      query: ({
        cartId = '',
        entryNumber = '',
        enablePickUpInStore,
        token,
        username
      }) => ({
        url: ApiConfig.endpoints.shoppingCart.pickUpShoppingCart(
          username,
          cartId,
          entryNumber,
          enablePickUpInStore
        ),
        method: 'PUT'
      })
    }),
    gifPackageShoppingCart: builder.mutation<
      any,
      Omit<
        ShoppingCartRequestBody,
        'productCode' | 'voucherId' | 'quantity'
      > & {
        enableGiftPackage: boolean;
      }
    >({
      query: ({
        cartId = '',
        entryNumber = '',
        enableGiftPackage,
        token,
        username
      }) => ({
        url: ApiConfig.endpoints.shoppingCart.giftPackingShoppingCart(
          username,
          cartId,
          entryNumber,
          enableGiftPackage
        ),
        method: 'PUT'
      })
    }),

    deleteShoppingCart: builder.mutation<
      any,
      Omit<ShoppingCartRequestBody, 'productCode' | 'voucherId' | 'quantity'>
    >({
      query: ({ cartId = '', entryNumber = '', token, username }) => ({
        url: ApiConfig.endpoints.shoppingCart.entryInShoppingCart(
          username,
          cartId,
          entryNumber
        ),
        method: 'delete'
      })
    }),

    addCoupon: builder.mutation<
      any,
      Pick<
        ShoppingCartRequestBody,
        'voucherId' | 'cartId' | 'username' | 'token'
      >
    >({
      query: ({ cartId = '', voucherId = '', token, username }) => ({
        url: ApiConfig.endpoints.shoppingCart.coupon.addCoupon(
          username,
          cartId,
          voucherId
        ),
        method: 'POST'
      })
    }),

    removeCoupon: builder.mutation<
      any,
      Pick<
        ShoppingCartRequestBody,
        'voucherId' | 'cartId' | 'username' | 'token'
      >
    >({
      query: ({ cartId = '', voucherId = '', token, username }) => ({
        url: ApiConfig.endpoints.shoppingCart.coupon.removeCoupon(
          username,
          cartId,
          voucherId
        ),
        method: 'delete'
      })
    })
  })
});

export const {
  useLazyGetShoppingCartQuery: useLazyGetShoppingCartRequest, //@recommended
  useGetShoppingCartQuery: useGetShoppingCartRequest, //@recommended
  useCreateShoppingCartMutation: useCreateShoppingCartRequest,
  useAddToShoppingCartMutation: useAddToShoppingCartRequest,
  useUpdateShoppingCartMutation: useUpdateShoppingCartRequest,
  useDeleteShoppingCartMutation: useDeleteShoppingCartRequest,
  useAddCouponMutation: useAddCouponRequest,
  useRemoveCouponMutation: useRemoveCouponRequest,
  useGifPackageShoppingCartMutation: useGifPackageShoppingCartRequest,
  usePickUpShoppingCartMutation: usePickUpShoppingCartRequest
} = extendedApi;
