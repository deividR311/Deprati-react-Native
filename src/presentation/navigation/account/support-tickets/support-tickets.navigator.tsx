import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { HeaderNavigation } from '../../../common-components/header/headerNav';
import BackButton from '../../../common-components/backButton';
import { COLORS } from '../../../../application/common';
import { SupportTicketsScreen } from '../../../screens/account/support-tickets/tickets.screen';
import { TicketDetailsScreen } from '../../../screens/account/support-tickets/ticket-detail.screen';
import { OrdersScreen } from '../../../screens/account/support-tickets/orders.screens';
import { SupportTicketFormScreen } from '../../../screens/account/support-tickets/support-ticket-form.screen';
import { BaseTicket } from '../../../../infrastucture/apis/support-tickets/types';
import { MyOrder } from '../../../../infrastucture/apis/customer-orders';

const Stack = createNativeStackNavigator<SupportTicketsNavigationParams>();

export const SupportTicketsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        header: (props: NativeStackHeaderProps) => (
          <HeaderNavigation {...props} />
        ),
        headerLeft: props =>
          Platform.select({
            android: null,
            ios: <BackButton {...props} />
          })
      }}
      initialRouteName={SupportTicketsNavigationRoute.Tickets}>
      <Stack.Group
        screenOptions={{
          contentStyle: { backgroundColor: COLORS.WHITE }
        }}>
        <Stack.Screen
          options={{
            headerTitle: 'Mis Reclamos'
          }}
          name={SupportTicketsNavigationRoute.Tickets}
          component={SupportTicketsScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Detalle reclamo'
          }}
          name={SupportTicketsNavigationRoute.TicketDetails}
          component={TicketDetailsScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Mis reclamos'
          }}
          name={SupportTicketsNavigationRoute.Orders}
          component={OrdersScreen}
        />
        <Stack.Screen
          options={{ headerTitle: 'Ingresar un nuevo reclamo' }}
          name={SupportTicketsNavigationRoute.SupportTicketForm}
          component={SupportTicketFormScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export enum SupportTicketsNavigationRoute {
  Tickets = 'MY_ACCOUNT@SUPPORT_TICKETS@TICKETS',
  TicketDetails = 'MY_ACCOUNT@SUPPORT_TICKETS@TICKET_DETAILS',
  Orders = 'MY_ACCOUNT@SUPPORT_TICKETS@ORDERS',
  SupportTicketForm = 'MY_ACCOUNT@SUPPORT_TICKETS@SUPPORT_TICKET_FORM'
}

export type SupportTicketsNavigationParams = {
  [SupportTicketsNavigationRoute.Tickets]: undefined;
  [SupportTicketsNavigationRoute.TicketDetails]: {
    ticket?: BaseTicket;
  };
  [SupportTicketsNavigationRoute.Orders]: {
    totalTickets?: number;
  };
  [SupportTicketsNavigationRoute.SupportTicketForm]: {
    order?: MyOrder;
  };
};
