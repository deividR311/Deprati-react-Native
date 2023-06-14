import {
  ConfigureParams,
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';
import 'moment/locale/es';
import React, { useCallback, useEffect, useRef } from 'react';
import { AppState, Modal, Platform, View } from 'react-native';
import { Settings as FacebookSettings } from 'react-native-fbsdk-next';
import 'react-native-gesture-handler';
import Splash from 'react-native-lottie-splash-screen';
import { enableLatestRenderer } from 'react-native-maps';
import {
  ActivityIndicator,
  Provider as PaperProvider
} from 'react-native-paper';
import { APP_THEME, COLORS } from './src/application/common';
import Paymentez, {
  IS_PAYMENTEZ_TEST_MODE
} from './src/infrastucture/native-modules/paymentez/paymentez';
import RootNavigation from './src/presentation/navigation';
import analytics from '@react-native-firebase/analytics';
import AnalyticsService from './src/infrastucture/firebase/analytics/analytics-service';
import useFirebase from './src/infrastucture/firebase/useFirebase';
import { useContactlessPaymentState } from './src/application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import { Provider } from 'react-redux';
import store, { useAppSelector } from './src/application/state-manager';
import useGetLocation from './src/presentation/screens/account/Stores/hooks/useGetLocation';
import { useLocalStorage } from './src/application/state-manager/services/localstorage/useLocalStorage';
import { CheckoutScreenStateSelector } from './src/application/state-manager/services/checkout';
import Crashes from 'appcenter-crashes';
import Config from './src/application/common/dotEnv';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App() {
  const { doEnableConfirmPurchaseButton } = useContactlessPaymentState();
  enableLatestRenderer();
  const appState = useRef(AppState.currentState);
  const routeNameRef = useRef<any>(null);
  const navigationRef = useNavigationContainerRef();
  const { readAndStorageInState } = useLocalStorage();
  const { loading: showLoadingScreen } = useAppSelector(
    CheckoutScreenStateSelector
  );
  const {
    status,
    loading: gettingCoors,
    requestLocation
    // checkEnableGPS,
  } = useGetLocation();

  const onMessageReceived = ({
    enable_confirm_purchase_btn,
    order_number
  }: any) => {
    if (enable_confirm_purchase_btn !== undefined) {
      const _valueMappedToBool = ['true', '1'].includes(
        `${enable_confirm_purchase_btn}`.toLowerCase()
      );
      doEnableConfirmPurchaseButton(
        _valueMappedToBool,
        _valueMappedToBool ? order_number : ''
      );
    }
  };

  const onAppIsForeground = useCallback(() => {
    console.log('>>> App has come to the foreground!', {
      status,
      gettingCoors
    });
    if (status === 'pending' && !gettingCoors) return requestLocation();
    // checkEnableGPS()
    readAndStorageInState();
  }, [status, gettingCoors]);

  useFirebase({ onMessage: onMessageReceived });

  useEffect(() => {
    const settings = Platform.select<ConfigureParams>({
      ios: {
        iosClientId: Config.AUTH_GOOGLE_IOS_CLIENT_ID,
        offlineAccess: false
      },
      android: {
        webClientId: Config.AUTH_GOOGLE_WEB_CLIENT_ID,
        offlineAccess: false
      },
      default: {}
    });

    GoogleSignin.configure(settings);
    FacebookSettings.initializeSDK();
    Paymentez.initializeSDK(
      IS_PAYMENTEZ_TEST_MODE,
      Config.PAYMENTEZ_CLIENT_CODE,
      Config.PAYMENTEZ_CLIENT_SECRET_KEY
    );
    onAppIsForeground();
  }, []);

  useEffect(() => {
    const appStateSubs = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      )
        onAppIsForeground();
      appState.current = nextAppState;
    });

    return () => {
      appStateSubs.remove();
    };
  }, [status, gettingCoors]);

  // const linking = {
  //   prefixes: ['deprati://app.example.com'],
  // }

  return (
    <NavigationContainer
      ref={navigationRef}
      // linking={linking}
      onReady={() => {
        Splash.hide();
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <PaperProvider theme={APP_THEME}>
        <Modal transparent visible={showLoadingScreen}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffffb3',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <ActivityIndicator size="large" color={COLORS.BRAND} />
          </View>
        </Modal>
        <AnalyticsService />
        <RootNavigation />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default function WrapperProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
