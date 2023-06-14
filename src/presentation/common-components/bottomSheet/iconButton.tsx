import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../application/common/colors';
import { FontStyles, SIZE_ICON_TAB } from '../../../application/common/fonts';
import { testProps } from '../../../application/utils/accessibleId';

export interface PropsIconButton {
  iconName: string;
  isFocused?: boolean;
  onPress?(): void;
  testID: string;
}

export const IconButton = (props: PropsIconButton) => {
  const { isFocused, onPress, iconName, testID = '' } = props;

  return (
    <TouchableOpacity
      accessible
      {...testProps(testID)}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
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
    borderRadius: 4
  }
});
