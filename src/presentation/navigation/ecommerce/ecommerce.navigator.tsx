import React, { useCallback } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import {
  EcommerceNavigationParams,
  EcommerceNavigationRoute
} from './interfaces';
import { COLORS } from '../../../application/common';
import { StyleSheet } from 'react-native';
import { PurchaseItemReview } from '../../screens/account/purchase-item-review';
import { SearchProduct } from '../../screens/dashboard/SearchProduct';
import Stories from '../../screens/Stories';
import Barcode from '../../screens/Barcode';
import PDPScreen from '../../screens/dashboard/PDP/PDPScreen';
import CaruselProductPage from '../../screens/dashboard/PDP/screen/CaruselProductPage';
import { HeaderNavigation } from '../../common-components/header/headerNav';
import ProductPageSAP from '../../screens/dashboard/PDPSap';
import { ShoppingCartIcon } from '../../common-components/shopping-cart';

const Stack = createNativeStackNavigator<EcommerceNavigationParams>();

export const EcommerceNavigation = () => {
  const headerRightSearch = useCallback(() => {
    return <ShoppingCartIcon style={styles.cartIcon} />;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props: NativeStackHeaderProps) => (
          <HeaderNavigation {...props} />
        )
      }}>
      <Stack.Group
        screenOptions={{
          headerShadowVisible: false,
          contentStyle: styles.content
        }}>
        <Stack.Screen
          name={EcommerceNavigationRoute.ProductPage}
          options={{ headerTitle: '', headerShown: false }}
          component={PDPScreen}
        />

        <Stack.Screen
          name={EcommerceNavigationRoute.ProductPageSAP}
          options={{ headerTitle: '', headerShown: false }}
          component={ProductPageSAP}
        />

        <Stack.Screen
          options={{ headerTitle: 'Escribir reseña' }}
          name={EcommerceNavigationRoute.PurchaseItemReview}
          initialParams={{
            // @ts-ignore
            review: {
              comment: '',
              score: 0,
              title: ''
            }
          }}
          component={PurchaseItemReview}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ contentStyle: styles.content }}>
        <Stack.Screen
          name={EcommerceNavigationRoute.Stories}
          component={Stories}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Buscador',
            headerRight: headerRightSearch,
            contentStyle: styles.content
          }}
          name={EcommerceNavigationRoute.Searchproduct}
          component={SearchProduct}
        />
        <Stack.Screen
          name={EcommerceNavigationRoute.Barcode}
          component={Barcode}
        />
        <Stack.Screen
          name={EcommerceNavigationRoute.CaruselProductPage}
          component={CaruselProductPage}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  content: { backgroundColor: COLORS.WHITE },
  headerTitleStyle: {
    fontFamily: 'Roboto-Bold'
  },
  cartIcon: { marginRight: 10 }
});
