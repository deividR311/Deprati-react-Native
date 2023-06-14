import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FontStyles, SIZE_ICON_TAB } from '../../../application/common';

export interface PropsIconButton {
  iconName: string;
  isFocused?: boolean;
  onPress?(): void;
  options?: {
    accessibilityLabel?: string;
    testID?: string;
  };
}

export const IconButtonClose = (props: PropsIconButton) => {
  const { isFocused, onPress, iconName, options } = props;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options?.accessibilityLabel}
      testID={options?.testID}
      onPress={onPress}
      style={[Styles.iconButtom]}>
      <Icon
        name={iconName}
        size={18}
        color={
          isFocused ? FontStyles.PrimaryColor.color : FontStyles.DarkColor.color
        }
      />
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  iconButtom: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZE_ICON_TAB,
    height: SIZE_ICON_TAB,
    backgroundColor: COLORS.GRAYBRAND,
    borderBottomStartRadius: 4
  }
});
