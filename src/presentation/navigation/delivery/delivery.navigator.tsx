import React, { useMemo } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import {
  DeliveryNavigationParams,
  DeliveryNavigationRoute
} from './interfaces';
import { COLORS } from '../../../application/common/colors';
import DeliveryThirdParty from '../../screens/Delivery/DeliveryThirdParty/DeliveryThirdParty';
import DeliverySelect from '../../screens/Delivery/DeliverySelect/DeliverySelect';
import DeliveryAddress from '../../screens/Delivery/DeliveryAddress/DeliveryAddress';
import StorePickupScreen from '../../screens/Delivery/DeliveryStorePickup/StorePickupScreen';
import { findItemStorePickup } from '../../screens/Delivery/utils/findItemStorePickup';
import { useAppSelector } from '../../../application/state-manager';
import {
  DeliveryStateSelector,
  ShoppingCartStateSelector
} from '../../../application/state-manager/services/checkout';
import { HeaderNavigation } from '../../common-components/header/headerNav';
import { Platform } from 'react-native';
import BackButton from '../../common-components/backButton';

const Stack = createNativeStackNavigator<DeliveryNavigationParams>();

export const DeliveryNavigation = props => {
  const deliveryOptions = useAppSelector(DeliveryStateSelector);
  const dataCart = useAppSelector(ShoppingCartStateSelector);

  const initialRouteName = useMemo(() => {
    const everyPickup = dataCart?.entries?.every(findItemStorePickup);

    if (everyPickup) {
      return DeliveryNavigationRoute.DeliveryStorePickup;
    }

    if (deliveryOptions?.showThirdParty === false) {
      return DeliveryNavigationRoute.DeliveryAddress;
    }

    if (deliveryOptions?.isCartPickupOnly) {
      return DeliveryNavigationRoute.DeliveryAddress;
    }

    return DeliveryNavigationRoute.DeliverySelect;
  }, [deliveryOptions, dataCart]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: false,
        headerTitleAlign: 'left',
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: COLORS.GRAYBRAND },
        contentStyle: { backgroundColor: COLORS.WHITE },
        title: '1. Dirección de envío',
        headerTitle: '1. Dirección de envío',
        header: (props: NativeStackHeaderProps) => (
          <HeaderNavigation {...props} />
        ),
        headerLeft: () =>
          Platform.select({
            android: null,
            ios: <BackButton {...props} />
          })
      }}
      initialRouteName={initialRouteName}>
      <Stack.Screen
        name={DeliveryNavigationRoute.DeliverySelect}
        component={DeliverySelect}
        initialParams={{ ...props?.route?.params }}
      />
      <Stack.Screen
        name={DeliveryNavigationRoute.DeliveryThirdParty}
        component={DeliveryThirdParty}
        initialParams={{ ...props?.route?.params }}
      />
      <Stack.Screen
        name={DeliveryNavigationRoute.DeliveryAddress}
        component={DeliveryAddress}
        initialParams={{ ...props?.route?.params }}
      />
      <Stack.Screen
        name={DeliveryNavigationRoute.DeliveryStorePickup}
        component={StorePickupScreen}
        initialParams={{ ...props?.route?.params }}
      />
    </Stack.Navigator>
  );
};
