import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import Home from '../screens/home';
import CornerScreen from '../screens/Corner';
import CategoryPage from '../screens/CategoryPage';
import SearchListProduct from '../screens/dashboard/SLP/SearchListProduct';
import BackButton from '../common-components/backButton';
import { HeaderNavigation } from '../common-components/header/headerNav';
import { PLPScreen, PLPScreenProps } from '../screens/dashboard/PLP';
import { MenuScreen } from '../common-components/modal-menu';
import { COLORS, NAV } from '../../application/common';
import { CartScreen } from '../screens/cart/Cart';
import { LABEL_TAB } from '../../application/utils';

export type NavigationProps = {
  [NAV.HOME]: {
    relatedAction: false;
  };
  [NAV.PLP]: PLPScreenProps;
  Slp: undefined;
  ModalFilter: any;
  ModalMenu: {
    category?: string;
  };
  CategoryPage: {
    category: string;
    categoryData: any;
  };
  [NAV.MENU]: undefined;
  [NAV.CORNER]: undefined;
  [NAV.CART]: undefined;
};

const Stack = createNativeStackNavigator<NavigationProps>();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={NAV.HOME}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.WHITE },
          headerTitleAlign: 'left',
          header: (props: NativeStackHeaderProps) => (
            <HeaderNavigation {...props} />
          ),
          headerLeft: props =>
            Platform.select({
              android: null,
              ios: <BackButton {...props} />
            })
        }}>
        <Stack.Screen name={NAV.HOME} component={Home} />
        <Stack.Screen
          name={NAV.PLP}
          options={{ gestureEnabled: false }}
          component={PLPScreen}
        />
        <Stack.Screen name={NAV.SLP} component={SearchListProduct} />
        <Stack.Screen name={NAV.CATEGORYPAGE} component={CategoryPage} />
        <Stack.Screen name={NAV.CORNER} component={CornerScreen} />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: LABEL_TAB.CART,
            animation: 'slide_from_bottom'
          }}
          name={NAV.CART}
          component={CartScreen}
        />
        <Stack.Screen
          options={{
            //@ts-ignore
            // headerStyle: styles.headerStyle,
            animation: 'slide_from_bottom'
          }}
          name={NAV.MENU}
          component={MenuScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1.1,
    borderBottomColor: COLORS.BORDERCOLOR
  }
});
