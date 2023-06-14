import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import { ReturnableordersResponse } from './myReturnableOrders.type';
import { MyReturnsRequest, MyReturnsResponse } from './myReturns.type';
import {
  DetailReturnRequest,
  DetailReturnResponse
} from './myReturnsDetail.type';
import { EnterReturnRequest, EnterReturnResponse } from './myReturnsEnter.type';
import {
  MyReturnSearchRequest as SearchRequest,
  MyReturnSearchResponse as SearchResponse
} from './myReturnsSearch.type';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    returnsList: builder.query<MyReturnsResponse, MyReturnsRequest>({
      query: ({ user, currentPage = 0, pageSize = 1000 }) => ({
        url: ApiConfig.endpoints.myReturns.getListMyReturns(user, {
          currentPage,
          pageSize
        }),
        method: 'GET'
      })
    }),
    returnableOrders: builder.query<ReturnableordersResponse, MyReturnsRequest>(
      {
        query: ({ user }) => ({
          url: ApiConfig.endpoints.myReturns.getReturnableOrders(user),
          method: 'GET'
        }),
        providesTags: ['ReturnableOrders']
      }
    ),
    searchReturnsOrders: builder.query<SearchResponse, SearchRequest>({
      query: ({ user, orderCode }) => ({
        url: ApiConfig.endpoints.myReturns.getSearchOrder(user, orderCode),
        method: 'GET'
      })
    }),
    detailReturn: builder.query<DetailReturnResponse, DetailReturnRequest>({
      query: ({ user, returnCode }) => ({
        url: ApiConfig.endpoints.myReturns.getDetailReturn(user, returnCode),
        method: 'GET'
      })
    }),
    enterReturn: builder.mutation<EnterReturnResponse, EnterReturnRequest>({
      query: ({ user, ...body }) => ({
        url: ApiConfig.endpoints.myReturns.setEnterReturn(
          user,
          body.order.code
        ),
        method: 'POST',
        body
      }),
      invalidatesTags: ['ReturnableOrders']
    })
  })
});

export const {
  useLazyReturnsListQuery: useLazyReturnsListRequest,
  useLazyReturnableOrdersQuery: useLazyReturnableOrdersRequest,
  useLazySearchReturnsOrdersQuery: useLazySearchReturnsOrdersRequest,
  useLazyDetailReturnQuery: useLazyDetailReturnRequest,
  useEnterReturnMutation: useEnterReturnRequest
} = extendedApi;
