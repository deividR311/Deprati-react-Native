import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  reviewBody,
  reviewResponse,
  productBody,
  productResponse,
  producSearchBody
} from './product.type';
import { PAGE_SIZE } from '../../../application/utils';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    review: builder.mutation<reviewResponse, reviewBody>({
      query: ({ productCode, ...body }) => ({
        url: ApiConfig.endpoints.product.review(productCode),
        method: 'POST',
        body: body
      })
    }),
    product: builder.mutation<productResponse, productBody>({
      query: ({ productCode, ...body }) => ({
        url: ApiConfig.endpoints.product.product(productCode),
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    }),

    search: builder.mutation<productResponse, producSearchBody>({
      query: params => ({
        url: ApiConfig.endpoints.product.search,
        method: 'GET',
        params: { fields: 'FULL', pageSize: PAGE_SIZE, ...params }
      })
    }),

    products: builder.mutation<productResponse, producSearchBody>({
      query: params => ({
        url: ApiConfig.endpoints.product.search,
        method: 'GET',
        params: { fields: 'FULL', pageSize: PAGE_SIZE, ...params }
      })
    })
  })
});

export const {
  useReviewMutation: useReviewMutationRequest,
  useProductMutation: useProductMutationRequest,
  useSearchMutation: useSearchMutationRequest,
  useProductsMutation: useGetProductsRequest
} = extendedApi;
