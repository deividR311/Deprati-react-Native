import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../src/application/common';
import { ProvideWrapper } from './provider-wrapper';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const Stack = createNativeStackNavigator();

export const NavigationWrapper = ({ children, screen, initialParams }: any) => (
  <ProvideWrapper>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="default"
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'left',
          contentStyle: { backgroundColor: COLORS.WHITE }
        }}>
        {screen && (
          <Stack.Screen
            name="default"
            initialParams={initialParams ?? {}}
            component={screen}
          />
        )}
        {children && <Stack.Screen name="default" component={() => children} />}
      </Stack.Navigator>
    </NavigationContainer>
  </ProvideWrapper>
);
