import { ApiConfig } from '../common/config';
import { SAP_API } from '../common/hybriss.api';

import {
  TicketByAccountBody,
  TicketByIdBody,
  TicketResponse,
  TicketsBody,
  TicketsResponse
} from './contactless-payment.type';

import {
  PurchaseCancelBody,
  PurchaseCancelResponse,
  PurchaseConfirmationBody,
  PurchaseConfirmationResponse,
  RegisteTokenBody,
  RegisteTokenResponse
} from './purchase.type';

const extendedApi = SAP_API.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({
    contactlessTicket: builder.mutation<TicketResponse, TicketByAccountBody>({
      query: body => ({
        url: ApiConfig.endpoints.contactlessPayment.ticket,
        method: 'POST',
        body: body,
        keepUnusedDataFor: 1
      })
    }),

    contactlessTickets: builder.mutation<TicketsResponse, TicketsBody>({
      query: body => ({
        url: ApiConfig.endpoints.contactlessPayment.tickets,
        method: 'POST',
        body: body
      })
    }),

    contactlessTicketById: builder.mutation<TicketResponse, TicketByIdBody>({
      query: body => ({
        url: ApiConfig.endpoints.contactlessPayment.ticketById,
        method: 'POST',
        body: body
      })
    }),

    contactlessPurchaseConfirm: builder.mutation<
      PurchaseConfirmationResponse,
      PurchaseConfirmationBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.contactlessPayment.confirmPurchase,
        method: 'POST',
        body: body
      })
    }),

    contactlessPurchaseCancel: builder.mutation<
      PurchaseCancelResponse,
      PurchaseCancelBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.contactlessPayment.cancelPurchase,
        method: 'POST',
        body: body
      })
    }),
    registeTokenTicket: builder.mutation<
      RegisteTokenResponse,
      RegisteTokenBody
    >({
      query: body => ({
        url: ApiConfig.endpoints.contactlessPayment.registeToken,
        method: 'POST',
        body: body
      })
    })
  })
});

export const {
  useContactlessTicketMutation: useContactlessTicketRequest,
  useContactlessTicketsMutation: useContactlessTicketsRequest,
  useContactlessTicketByIdMutation: useContactlessTicketByIdRequest,
  useContactlessPurchaseConfirmMutation: useContactlessPurchaseConfirmRequest,
  useContactlessPurchaseCancelMutation: useContactlessPurchaseCancelRequest,
  useRegisteTokenTicketMutation: useRegisteTokenTicketRequest
} = extendedApi;
