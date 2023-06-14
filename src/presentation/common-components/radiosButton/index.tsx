import { View, Text, TextStyle, StyleProp, StyleSheet } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';
import { COLORS, FONTS_FAMILY } from '../../../application/common';

interface IProps {
  value: any;
  status: 'checked' | 'unchecked' | undefined;
  label: string;
  onPress: () => void;
  color: string;
  uncheckedColor?: string;
  textStyle?: StyleProp<TextStyle>;
  onFocus?: () => void;
  onBlur?: () => void;
}
export default function RadioButtonComp({
  value,
  label,
  onPress,
  color,
  status,
  textStyle,
  uncheckedColor,
  onFocus,
  onBlur
}: IProps) {
  return (
    <View style={styles.container}>
      <RadioButton.Android
        style={styles.radioButton}
        color={color}
        uncheckedColor={uncheckedColor}
        value={value}
        onPress={onPress}
        status={status}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <Text style={[styles.label, textStyle]}>{label}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  radioButton: { borderWidth: 1, borderColor: COLORS.ACCENTBRAND },
  label: { fontFamily: FONTS_FAMILY.Roboto }
});
