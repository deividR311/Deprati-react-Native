import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  WishlistAddRemoveRequest as WishEntryRequest,
  WishlistAddRemoveResponse as WishEntryResponse,
  WishlistRequest,
  WishlistsResponse
} from './wishlist.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    customerWishlist: builder.query<WishlistsResponse, WishlistRequest>({
      query: ({ user }) => ({
        url: ApiConfig.endpoints.customerWishlist.wishlist(user),
        method: 'GET'
      }),
      providesTags: ['Wishlist']
    }),

    addWishlist: builder.mutation<WishEntryResponse, WishEntryRequest>({
      query: ({ user, productCode, ...body }) => ({
        url: ApiConfig.endpoints.customerWishlist.wishlistEntry(
          user,
          productCode
        ),
        method: 'POST',
        body
        // params: params,
      }),
      invalidatesTags: ['Wishlist']
    }),

    removeWishlist: builder.mutation<WishEntryResponse, WishEntryRequest>({
      query: ({ user, productCode }) => ({
        url: ApiConfig.endpoints.customerWishlist.wishlistEntry(
          user,
          productCode
        ),
        method: 'DELETE'
      }),
      invalidatesTags: ['Wishlist']
    })
  })
});

export const {
  // useCustomerWishlistMutation: useCustomerWishlistRequest,
  useLazyCustomerWishlistQuery: useLazyCustomerWishlistRequest,
  useAddWishlistMutation: useAddWishlistMutationRequest,
  useRemoveWishlistMutation: useRemoveWishlistMutationRequest
} = extendedApi;
