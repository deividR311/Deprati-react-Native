import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { COLORS } from '../../application/common/colors';
import { NAV } from '../../application/common/namesNav';
import CreditScreen from '../screens/Credit';
import CreditMovement from '../screens/CreditMovement';
import ServicesCredit from '../screens/Credit/ServicesScreen/ServicesCredit';
import MoreServices from '../screens/Credit/MoreServicesScreen';
import BackButton from '../common-components/backButton';
import QuotaConsultation from '../screens/Credit/QuotaConsultation/QuotaConsultation';
import { HeaderNavigation } from '../common-components/header/headerNav';
import { CreditLimitIncrease } from '../screens/Credit/credit-limit-increase/credit-limit-increase';
import CertificateCredit from '../screens/Credit/MoreServicesScreen/content/CertificateCredit/CertificateCredit';
import CreditStatus from '../screens/Credit/MoreServicesScreen/content/CreditStatus/CreditStatus';
import { ChangeExpirationDateScreen } from '../screens/Credit/ChangeExpirationDate/ChangeExpirationDateScreen';
import { PreCancelCreditScreen } from '../screens/Credit/PreCancelCredit/PreCancelCreditScreen';
import { SolicitPreCancelCreditScreen } from '../screens/Credit/PreCancelCredit/SolicitPreCancelCreditScreen';
import { useServicesCreditRedux } from '../../application/state-manager/services/credit/useServicesCredit.redux.hook';

export type CreditNavigationProps = {
  [NAV.CREDIT_SCREEN]: undefined;
  [NAV.CREDIT_SERVICES]: undefined;
  [NAV.CREDIT_MOVEMENTS]: undefined;
  [NAV.MORE_SERVICES_CREDIT]: undefined;
  [NAV.QUOTA_CONSULTATION]: undefined;
  [NAV.CREDIT_MOVEMENTS]: undefined;
  [NAV.CreditLimitIncrease]: undefined;
  [NAV.CreditChangeExpirationDate]: undefined;
  [NAV.CreditPreCancel]: undefined;
  [NAV.CreditSolicitPreCancel]: undefined;
  [NAV.CERTIFICATE_CREDIT]: undefined;
  [NAV.CREDIT_STATUS]: undefined;
};

const Stack = createNativeStackNavigator<CreditNavigationProps>();

export const CreditNavigation = () => {
  const { titleScreen } = useServicesCreditRedux();
  return (
    <Stack.Navigator initialRouteName={NAV.CREDIT_SCREEN}>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'left',
          contentStyle: { backgroundColor: COLORS.WHITE },
          header: (props: NativeStackHeaderProps) => (
            <HeaderNavigation {...props} />
          ),
          headerLeft: props =>
            Platform.select({
              android: null,
              ios: <BackButton {...props} />
            })
        }}>
        <Stack.Screen
          options={{
            headerTitle: 'Crédito De Prati',
            headerTitleAlign: 'left'
          }}
          name={NAV.CREDIT_SCREEN}
          component={CreditScreen}
        />

        <Stack.Screen name={NAV.CREDIT_SERVICES} component={ServicesCredit} />

        <Stack.Screen
          options={{ headerTitle: 'Servicios de crédito' }}
          name={NAV.MORE_SERVICES_CREDIT}
          component={MoreServices}
        />
        <Stack.Screen
          options={{ headerTitle: titleScreen }}
          name={NAV.CERTIFICATE_CREDIT}
          component={CertificateCredit}
        />
        <Stack.Screen
          options={{ headerTitle: titleScreen }}
          name={NAV.CREDIT_STATUS}
          component={CreditStatus}
        />

        <Stack.Screen
          options={{ headerTitle: titleScreen }}
          name={NAV.QUOTA_CONSULTATION}
          component={QuotaConsultation}
        />

        <Stack.Screen
          options={{ headerTitle: titleScreen }}
          name={NAV.CREDIT_MOVEMENTS}
          component={CreditMovement}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: titleScreen,
            animation: 'fade'
          }}
          name={NAV.CreditLimitIncrease}
          component={CreditLimitIncrease}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: titleScreen,
            animation: 'fade'
          }}
          name={NAV.CreditChangeExpirationDate}
          component={ChangeExpirationDateScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: titleScreen,
            animation: 'fade'
          }}
          name={NAV.CreditPreCancel}
          component={PreCancelCreditScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: titleScreen,
            animation: 'slide_from_bottom'
            // animation: 'fade',
          }}
          name={NAV.CreditSolicitPreCancel}
          component={SolicitPreCancelCreditScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
