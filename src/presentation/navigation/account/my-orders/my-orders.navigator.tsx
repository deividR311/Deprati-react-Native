import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { HeaderNavigation } from '../../../common-components/header/headerNav';
import BackButton from '../../../common-components/backButton';
import { COLORS } from '../../../../application/common';
import MyOrdersScreen, {
  TypeOrder,
  TypeOrderEnum
} from '../../../screens/account/MyOrders/MyOrdersScreen';
import { OrderDetails } from '../../../screens/account/order-details';
import { TicketDetail } from '../../../screens/contactless-payment/ticket-detail';

export enum OrdersNavigationRoute {
  MyOrders = 'ORDERS@MY_ORDERS',
  OrderDetails = 'ORDERS@ORDER_DETAIL',
  TicketDetail = 'ORDERS@TICKET_DETAIL'
}

export type OrdersNavigationParams = {
  [OrdersNavigationRoute.TicketDetail]: undefined;
  [OrdersNavigationRoute.MyOrders]: {
    selectTypeOrder?: TypeOrder;
  };
  [OrdersNavigationRoute.OrderDetails]: {
    orderId: string;
    userEmail: string;
    isFrom?: string;
  };
};

const Stack = createNativeStackNavigator<OrdersNavigationParams>();

export const OrdersNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: false,
        headerTitleAlign: 'left',
        headerShown: false,
        header: (props: NativeStackHeaderProps) => (
          <HeaderNavigation {...props} />
        ),
        headerLeft: props =>
          Platform.select({
            android: null,
            ios: <BackButton {...props} />
          })
      }}
      initialRouteName={OrdersNavigationRoute.MyOrders}>
      <Stack.Group
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.WHITE }
        }}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Mis Compras',
            headerTitle: 'Mis Compras'
          }}
          initialParams={{
            selectTypeOrder: TypeOrderEnum.TIENDA
          }}
          name={OrdersNavigationRoute.MyOrders}
          component={MyOrdersScreen}
        />
        <Stack.Screen
          options={{ headerTitle: 'Datos pedido', headerShown: true }}
          name={OrdersNavigationRoute.OrderDetails}
          initialParams={{ orderId: '' }}
          component={OrderDetails}
        />
        <Stack.Screen
          options={{ headerTitle: 'Detalle de compra', headerShown: true }}
          name={OrdersNavigationRoute.TicketDetail}
          component={TicketDetail}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
