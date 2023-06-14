import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardNavigation } from './dashboard/';
import { AuthNavigation } from './auth';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import { NAV } from '../../application/common/namesNav';
import SplashScreen from '../screens/Splash/SplashScreen';
import { ContactlessPaymentNavigator as ContactlessPayment } from './contactless-payment/payment-contactless.navigator';
import ModalProvider from '../common-components/modal/ModalProvider';
import useConfigModal from '../common-components/modal/hooks/useConfigModal';
import { EcommerceNavigation } from './ecommerce';
import { CheckoutNavigator } from './checkout';
import { CartData } from '../../infrastucture/apis/shopping-cart';
import { useAnalytics } from '../../infrastucture/firebase/analytics/useAnalytics';

export type RootNavigationProps = {
  [NAV.DASHBOARD_NAVIGATION]: undefined;
  [NAV.AUTH_NAVIGATION]: undefined;
  [NAV.SPLASH]: undefined;
  [NAV.WELCOME]: undefined;
  [NAV.ECOMMERCE]: undefined;
  [NAV.DELIVERY]: undefined;
  [NAV.CHECKOUT]: {
    dataCart: CartData;
  };
  [NAV.CONTACTLESS_PAYMENT]?: {};
};

const Stack = createNativeStackNavigator<RootNavigationProps>();

const RootNavigation = () => {
  const { trackScreen } = useAnalytics();
  const modals = useConfigModal();

  return (
    <ModalProvider modals={modals}>
      <Stack.Navigator
        initialRouteName={NAV.SPLASH}
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'left'
        }}>
        <Stack.Screen name={NAV.SPLASH} component={SplashScreen} />
        <Stack.Screen name={NAV.WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={NAV.AUTH_NAVIGATION} component={AuthNavigation} />
        <Stack.Screen
          name={NAV.DASHBOARD_NAVIGATION}
          component={DashboardNavigation}
        />
        <Stack.Screen name={NAV.ECOMMERCE} component={EcommerceNavigation} />

        <Stack.Screen
          name={NAV.CHECKOUT}
          component={CheckoutNavigator}
          initialParams={{ dataCart: undefined }}
        />
        <Stack.Screen
          name={NAV.CONTACTLESS_PAYMENT}
          component={ContactlessPayment}
        />
      </Stack.Navigator>
    </ModalProvider>
  );
};

export default RootNavigation;
