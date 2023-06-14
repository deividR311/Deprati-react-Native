import { ApiConfig } from '../common/config';
import { HYBRISS_API } from '../common/hybriss.api';
import { MyOrder, OrdersResponse } from '../customer-orders';
import {
  CategorySupportTicketResponse,
  DetailSupportTickets,
  ReportSupportTicketBody,
  SupportTicket
} from './types';

const extendedApi = HYBRISS_API.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    supportTickets: builder.query<SupportTicket, { username: string }>({
      query: ({ username }) => ({
        url: ApiConfig.endpoints.supportTickets.tickets(username)
      }),
      providesTags: ['SupportTickets']
    }),

    detailSupportTickets: builder.query<
      DetailSupportTickets,
      { username: string; ticketId: string }
    >({
      query: ({ username, ticketId }) => ({
        url: ApiConfig.endpoints.supportTickets.detail(username, ticketId)
      }),
      providesTags: ['SupportTicketsDetail']
    }),

    ordersCanBeSupportTickets: builder.query<
      OrdersResponse,
      { username: string; currentPage?: number; pageSize?: number }
    >({
      query: ({ username, currentPage = 0, pageSize = 10 }) => ({
        url: ApiConfig.endpoints.supportTickets.orders(username, {
          currentPage,
          pageSize
        }),
        providesTags: ['SupportTicketsOrders']
      })
    }),

    findOrderThatCanBeSupportTicket: builder.query<
      MyOrder,
      { username: string; orderNumber: string }
    >({
      query: ({ username, orderNumber }) => ({
        url: ApiConfig.endpoints.supportTickets.find(username, orderNumber),
        providesTags: ['Orders']
      })
    }),

    categoriesSupportTicket: builder.query<
      CategorySupportTicketResponse,
      { username: string; currentPage?: number; pageSize?: number }
    >({
      query: ({ username, currentPage = 0, pageSize = 100 }) => ({
        url: ApiConfig.endpoints.supportTickets.categories(username, {
          currentPage,
          pageSize
        })
      })
    }),

    reportSupportTicket: builder.mutation<
      DetailSupportTickets,
      ReportSupportTicketBody & { username: string }
    >({
      query: ({ username, ticketRequest, image }) => {
        const formData = new FormData();
        formData.append('ticketRequest', {
          string: JSON.stringify(ticketRequest),
          type: 'application/json;charset=UTF-8'
        });
        image &&
          formData.append('files', {
            name: image.fileName,
            type: image.type,
            uri: image.uri
          });
        return {
          url: ApiConfig.endpoints.supportTickets.ticket(username),
          method: 'POST',
          headers: {
            'Content-Type':
              'multipart/form-data; boundary=someArbitraryUniqueString'
          },
          body: formData
        };
      },
      invalidatesTags: ['SupportTickets', 'SupportTicketsOrders']
    })
  })
});

export const {
  useSupportTicketsQuery: useSupportTicketsRequest,
  useCategoriesSupportTicketQuery: useCategoriesSupportTicketRequest,
  useDetailSupportTicketsQuery: useDetailSupportTicketsRequest,
  useLazyFindOrderThatCanBeSupportTicketQuery:
    useFindOrderThatCanBeSupportTicketRequest,
  useOrdersCanBeSupportTicketsQuery: useOrdersCanBeSupportTicketsRequest,
  useReportSupportTicketMutation: useReportSupportTicketRequest
} = extendedApi;
