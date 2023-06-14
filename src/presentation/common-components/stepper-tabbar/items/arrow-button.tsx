import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  FontStyles,
  SIZE_ICON_TAB
} from '../../../../application/common/fonts';
import { PropsButtonTab } from '../interface';
import { Styles } from '../stepper-tabbar.stylesheet';

export const ArrowButtonTab = (props: PropsButtonTab) => {
  const { options, isFocused, onPress, onLongPress, arrowIconDirection } =
    props;

  const getText = (): string =>
    arrowIconDirection === 'left' ? 'Atrás' : 'Siguiente';
  const getIcon = (): string =>
    arrowIconDirection === 'left' ? 'arrow-back-ios' : 'arrow-forward-ios';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options?.tabBarAccessibilityLabel}
      testID={options?.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[Styles.tab__button]}>
      <Icon
        name={getIcon()}
        size={SIZE_ICON_TAB}
        color={
          isFocused ? FontStyles.PrimaryColor.color : FontStyles.DarkColor.color
        }
      />
      <Text
        style={[
          FontStyles.ProductDescription,
          isFocused && FontStyles.PrimaryColor
        ]}>
        {getText()}
      </Text>
    </TouchableOpacity>
  );
};
