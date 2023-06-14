import { createApi } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../../application/state-manager';
import { CustomBaseQuery } from './customBaseQuery';
import { CustomBaseQueryHybriss } from './customBaseQueryHybriss';

export const HYBRISS_API = createApi({
  reducerPath: 'HYBRISS_API',
  tagTypes: [
    'OrderDetails',
    'Wishlist',
    'ShoppingCart',
    'AddressList',
    'AddressPaymentList',
    'UserInfo',
    'PaymentezCardList',
    'SupportTickets',
    'SupportTicketsOrders',
    'SupportTicketsDetail',
    'ReturnableOrders',
    'AnonymousGetShoppingCart'
  ],
  baseQuery: CustomBaseQueryHybriss(),
  endpoints: () => ({})
});

export const HYBRISS_API_SELECTOR = (state: RootState) =>
  state.HYBRISS_API.queries;

export const SAP_API = createApi({
  reducerPath: 'SAP_API',
  tagTypes: ['NotificationsList'],
  baseQuery: CustomBaseQuery(),
  endpoints: () => ({})
});
