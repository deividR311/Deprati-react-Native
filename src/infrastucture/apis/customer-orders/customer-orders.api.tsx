import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import {
  CustomerOrdersRequest,
  OrderDetailsRequest,
  OrdersResponse
} from './customer-orders.type';
import { CustomerOrderDetail } from './interfaces/customer-order-detail.type';
import {
  ProductReviewBody,
  ProductReviewResponse
} from './interfaces/product-review.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    customerOrders: builder.query<OrdersResponse, CustomerOrdersRequest>({
      query: ({ user }) => ({
        url: ApiConfig.endpoints.customerOrders.orders(user),
        method: 'GET',
        params: { pageSize: 100, currentPage: 0 }
      })
    }),

    orderDetails: builder.query<CustomerOrderDetail, OrderDetailsRequest>({
      query: ({ user, orderCode }) => ({
        url: orderCode
          ? ApiConfig.endpoints.customerOrders.orderDetails(user, orderCode)
          : ApiConfig.endpoints.customerOrders.orders(user),
        method: 'GET'
        // params: params,
      }),
      providesTags: ['OrderDetails']
    }),

    orderProductReview: builder.mutation<
      ProductReviewResponse,
      ProductReviewBody
    >({
      query: ({ productId, ...body }) => ({
        url: ApiConfig.endpoints.customerOrders.productReview(productId),
        method: 'POST',
        body
        // params: params,
      }),
      invalidatesTags: ['OrderDetails']
    })
  })
});

export const {
  // useCustomerOrdersQuery: useCustomerOrdersRequest,
  useLazyCustomerOrdersQuery: useLazyCustomerOrdersRequest,
  useOrderDetailsQuery: useOrderDetailsRequest,
  useOrderProductReviewMutation: useOrderProductReviewRequest
} = extendedApi;
