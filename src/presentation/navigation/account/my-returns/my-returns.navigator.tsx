import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { HeaderNavigation } from '../../../common-components/header/headerNav';
import BackButton from '../../../common-components/backButton';
import { COLORS } from '../../../../application/common';
import {
  MyReturnsDetailScreen,
  MyReturnsListScreen,
  MyReturnsSolicitScreen
} from '../../../screens/account/MyReturns';
import EnterReturnScreen from '../../../screens/account/MyReturns/screens/EnterReturnScreen';

export enum MyReturnsNavigationRoute {
  ListReturn = 'MY_RETURNS@LIST_RETURN',
  SolicitReturn = 'MY_RETURNS@SOLICIT_RETURN',
  EnterReturn = 'MY_RETURNS@ENTER_RETURN',
  DetailReturn = 'MY_RETURNS@DETAIL_RETURN'
}

export type MyReturnsNavigationParams = {
  [MyReturnsNavigationRoute.ListReturn]: undefined;
  [MyReturnsNavigationRoute.SolicitReturn]: undefined;
  [MyReturnsNavigationRoute.EnterReturn]: { orderCode: string };
  [MyReturnsNavigationRoute.DetailReturn]: { returnCode: string };
};

const Stack = createNativeStackNavigator<MyReturnsNavigationParams>();

export const MyReturnsNavigation = () => {
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
      initialRouteName={MyReturnsNavigationRoute.ListReturn}>
      <Stack.Group
        screenOptions={{
          contentStyle: { backgroundColor: COLORS.WHITE }
        }}>
        <Stack.Screen
          options={{ headerTitle: 'Mis devoluciones' }}
          name={MyReturnsNavigationRoute.ListReturn}
          component={MyReturnsListScreen}
        />
        <Stack.Screen
          options={{ headerTitle: 'Detalle devolución' }}
          name={MyReturnsNavigationRoute.DetailReturn}
          component={MyReturnsDetailScreen}
        />
        <Stack.Screen
          options={{ headerTitle: 'Mis devoluciones' }}
          name={MyReturnsNavigationRoute.SolicitReturn}
          component={MyReturnsSolicitScreen}
        />
        <Stack.Screen
          options={{ headerTitle: 'Ingresar devolución' }}
          name={MyReturnsNavigationRoute.EnterReturn}
          component={EnterReturnScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
