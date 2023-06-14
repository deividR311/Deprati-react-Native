import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { ProfileForm } from '../../../screens/account/MyProfile/components/profile-form';
import { HeaderNavigation } from '../../../common-components/header/headerNav';
import BackButton from '../../../common-components/backButton';
import { COLORS } from '../../../../application/common';
import { Profile } from '../../../screens/account/MyProfile';

export enum MyDataNavigationRoute {
  Home = 'MY_DATA@HOME',
  FormEdit = 'MY_DATA@FORM_EDIT_MY_DATA'
}

export type MyDataNavigationParams = {
  [MyDataNavigationRoute.Home]: undefined;
  [MyDataNavigationRoute.FormEdit]: undefined;
};

const Stack = createNativeStackNavigator<MyDataNavigationParams>();

export const MyDataNavigation = () => {
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
      initialRouteName={MyDataNavigationRoute.Home}>
      <Stack.Group
        screenOptions={{
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.WHITE }
        }}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Mis datos',
            headerTitle: 'Mis datos'
          }}
          name={MyDataNavigationRoute.Home}
          component={Profile}
        />
        <Stack.Screen
          options={{ headerTitle: 'Editar mis datos' }}
          name={MyDataNavigationRoute.FormEdit}
          component={ProfileForm}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
