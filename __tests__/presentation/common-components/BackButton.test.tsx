import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import BackButton from '../../../src/presentation/common-components/backButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { IRender } from '../../../__mocks__/IRender.interface';

let screenTest: IRender;
let navigationMock: NativeStackNavigationProp<ParamListBase>;

describe('backButton test', () => {
  it('renders correctly backButton in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <BackButton
            options={{
              title: undefined,
              header: undefined,
              headerBackVisible: undefined,
              headerBackTitle: undefined,
              headerBackTitleVisible: undefined,
              headerBackTitleStyle: undefined,
              headerBackImageSource: undefined,
              headerLargeStyle: undefined,
              headerLargeTitle: undefined,
              headerLargeTitleShadowVisible: undefined,
              headerLargeTitleStyle: undefined,
              headerShown: undefined,
              headerStyle: undefined,
              headerShadowVisible: undefined,
              headerTransparent: undefined,
              headerBlurEffect: undefined,
              headerTintColor: undefined,
              headerBackground: undefined,
              headerLeft: undefined,
              headerRight: undefined,
              headerTitle: undefined,
              headerTitleAlign: undefined,
              headerTitleStyle: undefined,
              headerSearchBarOptions: undefined,
              headerBackButtonMenuEnabled: undefined,
              autoHideHomeIndicator: undefined,
              navigationBarColor: undefined,
              navigationBarHidden: undefined,
              statusBarAnimation: undefined,
              statusBarColor: undefined,
              statusBarHidden: undefined,
              statusBarStyle: undefined,
              statusBarTranslucent: undefined,
              gestureDirection: undefined,
              contentStyle: undefined,
              customAnimationOnGesture: undefined,
              fullScreenGestureEnabled: undefined,
              gestureEnabled: undefined,
              animationTypeForReplace: undefined,
              animation: undefined,
              animationDuration: undefined,
              presentation: undefined,
              orientation: undefined
            }}
            route={{ key: '', name: 'string' }}
            navigation={navigationMock}
          />
        )}
      />
    );

    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
