import * as React from 'react';

import {
  ContactLessPaymentNavigationParams,
  ContactLessPaymentSteps,
  ContactlessPaymentNavigatorID
} from './interfaces';
import {
  CreditBalance,
  PurchaseConfirmation
} from '../../screens/contactless-payment';
import { ScreenBackButton } from '../../common-components/backButton';
import { useContactlessPaymentState } from '../../../application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../application/common/namesNav';
import { QRShareScreen } from '../../screens/contactless-payment/qr-confirmation';
import { SuccessPaymentBottomSheet } from '../../screens/contactless-payment/bottomsheets/success-payment';
import { HeaderNavigation } from '../../common-components/header/headerNav';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { CreditVinculationNavigator } from '../../screens/contactless-payment/credit-vinculation/credit-vinculation.navigator';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../application/common';

const StackNavigator =
  createStackNavigator<ContactLessPaymentNavigationParams>();

export const ContactlessPaymentNavigator: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    successBuyIsOpen,
    successBuyText,
    successBuyTicketId,
    showSuccessBuy
  } = useContactlessPaymentState();

  const {
    localStorageData: {
      [LocalStorageKey.IsAccountAuthenticated]: IS_ACCOUNT_AUTHENTICATED
    }
  } = useLocalStorage();

  const _onCloseRequestSuccessBuy = () => {
    showSuccessBuy(false);
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: NAV.DASHBOARD_NAVIGATION as never }]
      });
    }, 200);
  };

  const { top } = useSafeAreaInsets();
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: COLORS.WHITE, flex: 1, marginTop: top }}>
          <StackNavigator.Navigator
            backBehavior="none"
            id={ContactlessPaymentNavigatorID}
            initialRouteName={
              IS_ACCOUNT_AUTHENTICATED
                ? ContactLessPaymentSteps.QRShare
                : ContactLessPaymentSteps.CreditVinculation
            }
            tabBar={() => <></>}
            screenOptions={{
              headerLeft: () => <ScreenBackButton />,
              header: (props: NativeStackHeaderProps) => (
                <HeaderNavigation {...props} />
              ),
              headerShown: true,
              headerShadowVisible: false
            }}>
            <StackNavigator.Screen
              name={ContactLessPaymentSteps.CreditVinculation}
              component={CreditVinculationNavigator}
              options={{
                headerTitle: `${t('contactlessPayment')}`,
                headerShown: false
              }}
            />
            <StackNavigator.Screen
              name={ContactLessPaymentSteps.QRShare}
              component={QRShareScreen}
              options={{
                headerTitle: `${t('contactlessPayment')}`
              }}
            />
            <StackNavigator.Screen
              name={ContactLessPaymentSteps.PurchaseConfirmation}
              component={PurchaseConfirmation}
              options={{
                headerTitle: 'Detalle de compra'
              }}
            />
          </StackNavigator.Navigator>
      </SafeAreaView>
      <SuccessPaymentBottomSheet
        onCloseRequest={_onCloseRequestSuccessBuy}
        show={successBuyIsOpen}
        text={successBuyText ?? ''}
        ticketId={successBuyTicketId ?? ''}
      />
    </>
  );
};
