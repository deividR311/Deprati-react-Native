import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../application/common/colors';

interface ButtonProps {
  onPress: () => void;
  icon: JSX.Element;
  disabled?: boolean;
}
export default function ButtonSocial({ onPress, icon, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.buttonSocial}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSocial: {
    borderRadius: 4,
    marginHorizontal: 8,
    borderColor: COLORS.BORDERCOLOR,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8
  }
});
