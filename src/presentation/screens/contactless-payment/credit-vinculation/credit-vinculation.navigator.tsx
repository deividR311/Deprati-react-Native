import React, { useCallback, useEffect } from 'react';
import {
  NativeStackHeaderProps,
  NativeStackScreenProps,
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import {
  ContactLessPaymentNavigationParams,
  ContactLessPaymentSteps
} from '../../../navigation/contactless-payment';
import { COLORS } from '../../../../application/common';
import { HeaderNavigation } from '../../../common-components/header/headerNav';
import { Platform, SafeAreaView } from 'react-native';
import BackButton from '../../../common-components/backButton';
import { SelectCreditAccountScreen } from './select-credit-accont';
import { VinculationCodeConfirmation } from './confirmation-vinculation-code';
import { UserCreditInformation } from '../../Credit/components/modals/SelectModal/ModalSelectContent';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export enum CreditVinculationNavigationRoutes {
  SelectAccount = 'CREDIT_VINCULATION@SELECT_ACCOUNT',
  ConfirmationCode = 'CREDIT_VINCULATION@CONFIRMATION_CODE'
}

export interface CreditVinculationNavigationProps
  extends NativeStackScreenProps<
    ContactLessPaymentNavigationParams,
    ContactLessPaymentSteps.CreditVinculation
  > {}

export type CreditVinculationNavigataionParentType =
  CreditVinculationNavigationProps['navigation'];

export type CreditVinculationNavigationParams = {
  [CreditVinculationNavigationRoutes.SelectAccount]: undefined;
  [CreditVinculationNavigationRoutes.ConfirmationCode]: {
    creditAccountInfo?: UserCreditInformation;
    userPhoneNumber?: string;
  };
};

export const CreditVinculationNavigatorID = 'CreditVinculationNavigator';
const CreditVinculationStack =
  createNativeStackNavigator<CreditVinculationNavigationParams>();

export const CreditVinculationNavigator: React.FC<
  CreditVinculationNavigationProps
> = ({ route, navigation }) => {
  const { t } = useTranslation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
      header: undefined
    });
    // return () => {
    //   navigation.getParent()?.setOptions({
    //     headerShown: true,
    //   })
    // }
  }, []);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: false,
        header: undefined
      });
    }, [navigation])
  );

  return (
    <CreditVinculationStack.Navigator
      id={CreditVinculationNavigatorID}
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: `${t('contactlessPayment')}`,
        contentStyle: { backgroundColor: COLORS.WHITE },
        header: (props: NativeStackHeaderProps) => (
          <HeaderNavigation {...props} />
        ),
        headerLeft: props =>
          Platform.select({
            android: null,
            ios: <BackButton {...props} />
          })
      }}
      initialRouteName={CreditVinculationNavigationRoutes.SelectAccount}>
      <CreditVinculationStack.Screen
        name={CreditVinculationNavigationRoutes.SelectAccount}
        component={SelectCreditAccountScreen}
      />
      <CreditVinculationStack.Screen
        name={CreditVinculationNavigationRoutes.ConfirmationCode}
        component={VinculationCodeConfirmation}
        initialParams={{
          creditAccountInfo: undefined
        }}
      />
    </CreditVinculationStack.Navigator>
  );
};
