import React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { COLORS } from '../../../application/common/colors';
import { testProps } from '../../../application/utils/accessibleId';
import { IndicatorProps } from '../buttons/Button';
import { FONTS_FAMILY } from '../../../application/common';

interface IProps {
  status: 'checked' | 'unchecked' | 'indeterminate';
  label: string | JSX.Element;
  onPress: () => void;
  color: string;
  uncheckedColor?: string;
  styleContainer?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  showActivityIndicator?: boolean;
  activityIndicator?: IndicatorProps;
  activityIndicatorStyle?: StyleProp<ViewStyle>;
  testId?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function CheckboxComp({
  label,
  onPress,
  color,
  uncheckedColor = COLORS.DARK,
  status,
  textStyle,
  styleContainer,
  disabled,
  showActivityIndicator = false,
  activityIndicator,
  activityIndicatorStyle = {},
  testId = '',
  onFocus,
  onBlur
}: IProps) {
  return (
    <View
      style={[styles.container, styleContainer]}
      {...testProps(`view_${testId}`)}
      accessible>
      {showActivityIndicator ? (
        <ActivityIndicator
          style={activityIndicatorStyle}
          size={activityIndicator?.size ?? 'small'}
          color={activityIndicator?.color ?? COLORS.BRAND}
        />
      ) : (
        <Checkbox.Android
          accessible
          {...testProps(testId)}
          status={status}
          color={color}
          uncheckedColor={uncheckedColor}
          onPress={onPress}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}
      {typeof label === 'string' ? (
        <Text style={[styles.label, textStyle]}>{label}</Text>
      ) : (
        label
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  label: { fontFamily: FONTS_FAMILY.Roboto }
});
