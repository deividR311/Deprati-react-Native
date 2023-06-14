import React from 'react';
import { Platform, View } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import BackButton from '../common-components/backButton';
import { COLORS } from '../../application/common/colors';
import { NAV } from '../../application/common/namesNav';
import SignIn, { SignInScreenType } from '../screens/SignIn/SignIn';
import SignUp, { SignUpScreenType } from '../screens/SignUp';
import RecoveryPass from '../screens/RecoveryPass';
import RelatedCreditScreen from '../screens/Credit/RelatedCreditScreen';
import ModalMessageForgot from '../screens/RecoveryPass/components/ModalMessage';
import { HeaderNavigation } from '../common-components/header/headerNav';

export type AuthNavigationParams = {
  SignIn: SignInScreenType;
  RecoveryPass: undefined;
  SignUp: SignUpScreenType;
  [NAV.RELATED_CREDIT]: undefined;
  ModalMessageForgot: undefined;
};

const Stack = createNativeStackNavigator<AuthNavigationParams>();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={NAV.SIGNIN}
      screenOptions={{
        headerLeft: props =>
          Platform.select({
            android: null,
            ios: <BackButton {...props} />
          }),
        header: (props: NativeStackHeaderProps) => (
          <HeaderNavigation {...props} />
        ),
        headerShown: true,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: COLORS.WHITE }
      }}>
      <Stack.Screen
        name={NAV.SIGNIN}
        options={{
          headerTitle: 'Inicio de sesión',
          headerTitleAlign: 'left'
        }}
        component={SignIn}
      />
      <Stack.Screen
        name={NAV.SIGNUP}
        options={{ headerTitle: 'Datos personales' }}
        component={SignUp}
      />
      <Stack.Screen
        name={NAV.FORGOT_PASSWORD}
        options={{ headerTitle: 'Nueva contraseña' }}
        component={RecoveryPass}
      />
      <Stack.Screen
        options={{ headerTitle: '¿Tienes tu crédito De Prati?' }}
        name={NAV.RELATED_CREDIT}
        component={RelatedCreditScreen}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerShown: false
        }}>
        <Stack.Screen
          options={{
            presentation: 'transparentModal',
            animation: 'slide_from_bottom',
            contentStyle: { backgroundColor: '#40404040' }
          }}
          name="ModalMessageForgot"
          component={ModalMessageForgot}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
