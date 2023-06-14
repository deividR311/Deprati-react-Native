import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';
import {
  DeferredRequestBody,
  RegisterTicketRequest,
  ResponseConfirm,
  ResponseDeferred
} from './precancellation.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    getDeferredList: builder.mutation<ResponseDeferred, DeferredRequestBody>({
      query: body => ({
        url: ApiConfig.endpoints.precancellation.getDeferredPendings,
        method: 'post',
        body: body
      })
    }),

    registerTicket: builder.mutation<ResponseDeferred, RegisterTicketRequest>({
      query: body => ({
        url: ApiConfig.endpoints.precancellation.registerSelectedTicket,
        method: 'post',
        body: body
      })
    }),

    getTotalsPayment: builder.mutation<ResponseDeferred, DeferredRequestBody>({
      query: body => ({
        url: ApiConfig.endpoints.precancellation.getTotalsPayment,
        method: 'post',
        body: body
      })
    }),

    confirmTickets: builder.mutation<ResponseConfirm, DeferredRequestBody>({
      query: body => ({
        url: ApiConfig.endpoints.precancellation.confirmSelectedTickets,
        method: 'post',
        body: body
      })
    })
  })
});

export const {
  useGetDeferredListMutation: useGetDeferredListRequest,
  useRegisterTicketMutation: useRegisterTicketRequest,
  useGetTotalsPaymentMutation: useGetTotalsPaymentRequest,
  useConfirmTicketsMutation: useConfirmTicketsRequest
} = extendedApi;
