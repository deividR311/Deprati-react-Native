import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import { AccountNavigationParams, AccountNavigationRoute } from './interfaces';
import { COLORS } from '../../../application/common/colors';
import { MyReturnsNavigation } from './';
import { PurchaseItemReview } from '../../screens/account/purchase-item-review';
import StoreList from '../../screens/account/Stores';
import { Platform } from 'react-native';
import BackButton from '../../common-components/backButton';
import StoreDetail from '../../screens/account/Stores/StoreDetail';
import NotificationList from '../../screens/Notifications/NotificationList';
import DetailNotification from '../../screens/Notifications/DetailNotification/DetailNotification';
import { HeaderNavigation } from '../../common-components/header/headerNav';
import { MyDataNavigation } from './my-data/my-data.navigator';
import AddressForm from '../../screens/account/MyAddress/AddressForm';
import { Address } from '../../screens/account/MyAddress/Address';
import AdressPaymentForm from '../../screens/account/MyAddress/AdressPaymentForm';
import CustomerService from '../../screens/customerService/CustomerService';
import { SupportTicketsNavigation } from './support-tickets/support-tickets.navigator';
import MyAccount from '../../screens/account/Account/MyAccount';
import { OrdersNavigation } from './my-orders/my-orders.navigator';

const Stack = createNativeStackNavigator<AccountNavigationParams>();

export const AccountNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: false,
        headerTitleAlign: 'left',
        headerShown: true,
        header: (props: NativeStackHeaderProps) => (
          <HeaderNavigation {...props} />
        ),
        headerLeft: props =>
          Platform.select({
            android: null,
            ios: <BackButton {...props} />
          })
      }}
      initialRouteName={AccountNavigationRoute.Home}>
      <Stack.Group
        screenOptions={{
          headerShadowVisible: true,
          contentStyle: { backgroundColor: COLORS.WHITE },
          headerLeft: props =>
            Platform.select({
              android: null,
              ios: <BackButton {...props} />
            })
        }}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Mi cuenta',
            headerTitle: 'Mi Cuenta'
          }}
          name={AccountNavigationRoute.Home}
          component={MyAccount}
        />
        <Stack.Screen
          options={{ headerTitle: 'Nuestras tiendas' }}
          name={AccountNavigationRoute.StoresList}
          component={StoreList}
        />
        <Stack.Screen
          options={{ headerTitle: '' }}
          name={AccountNavigationRoute.StoreDetail}
          component={StoreDetail}
        />
        <Stack.Screen
          options={{ headerTitle: 'Mis notificaciones' }}
          name={AccountNavigationRoute.Notifications}
          component={NotificationList}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={AccountNavigationRoute.SupportTickets}
          component={SupportTicketsNavigation}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name={AccountNavigationRoute.MyData}
          component={MyDataNavigation}
        />
        <Stack.Screen
          options={{ headerTitle: 'Mis direcciones' }}
          name={AccountNavigationRoute.AddressDelivery}
          component={Address}
        />
        <Stack.Screen
          options={{ headerTitle: 'Agregar dirección' }}
          name={AccountNavigationRoute.AdressForm}
          component={AddressForm}
        />
        <Stack.Screen
          options={{ headerTitle: 'Nueva dirección facturación' }}
          name={AccountNavigationRoute.AddressPaymentForm}
          component={AdressPaymentForm}
        />
        <Stack.Screen
          options={{ headerTitle: '' }}
          name={AccountNavigationRoute.Detail_Notification}
          component={DetailNotification}
        />
        <Stack.Screen
          options={{ headerTitle: 'Servicio al cliente' }}
          name={AccountNavigationRoute.CostumerService}
          component={CustomerService}
        />
        <Stack.Screen
          options={{ headerShown: false, headerTitle: 'Mis devoluciones' }}
          name={AccountNavigationRoute.MyReturns}
          component={MyReturnsNavigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={AccountNavigationRoute.Orders}
          component={OrdersNavigation}
        />
        <Stack.Screen
          options={{ headerTitle: 'Escribir reseña' }}
          name={AccountNavigationRoute.PurchaseItemReview}
          /**
           * @todo !! put here the correspondly value OrderEntry Data,
           * @todo !! I gonna need extract the review key */
          // initialParams={{
          //   review: {
          //     comment: '',
          //     score: 0,
          //     title: '',
          //   },
          // }}
          component={PurchaseItemReview}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
