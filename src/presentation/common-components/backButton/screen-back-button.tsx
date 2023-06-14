import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SIZE_ICON_TAB } from '../../../application/common/fonts';

export const ScreenBackButton: React.FC = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    const navigationState = navigation.getState();

    if (navigationState.index === 0) {
      navigation.canGoBack() && navigation.goBack();
      return;
    }

    const routeData = navigationState.routes[navigationState.index - 1];
    navigation.navigate(routeData);
  };

  return navigation.canGoBack() ? (
    <Icon name="arrow-left" size={SIZE_ICON_TAB} onPress={handleBack} />
  ) : (
    <View />
  );
};
