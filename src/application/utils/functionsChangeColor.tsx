import React from 'react';
import { Platform, StyleSheet, Text, TextStyle } from 'react-native';
import { FONTS_FAMILY } from '../common/fonts';
import { fontWeightOS } from './fontOS';

export const handleChangeColor = (
  text: string | number,
  styleText?: TextStyle
) => {
  return <Text style={[styles.changeBold, styleText]}>{text ?? ''}</Text>;
};

export const handleChangeColorBold = (text: string, color: string) => {
  return (
    <Text style={[styles.changeBold, { color: color }]}>{text ?? ''}</Text>
  );
};
export const handleChangeColorBoldSize = (
  text: string,
  color: string,
  size: number
) => {
  return (
    <Text style={[styles.changeBold, { color: color, fontSize: size }]}>
      {text ?? ''}
    </Text>
  );
};

const styles = StyleSheet.create({
  changeBold: {
    fontFamily:
      Platform.OS === 'ios' ? FONTS_FAMILY.Roboto : FONTS_FAMILY['Roboto-Bold'],
    fontStyle: 'normal',
    fontWeight: fontWeightOS('bold')
  }
});
