import React from 'react';
//Libs
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../../application/common';
import { handleChangeColor } from '../../../../../../application/utils/functionsChangeColor';

interface ComponentDiscountProps {
  style?: ViewStyle;
  styleText?: TextStyle;
  styleNormalText?: TextStyle;
  styleBoldText?: TextStyle;
  normalText?: string;
  boldText?: string;
}
export default function ComponentDiscount({
  style = {},
  styleText = {},
  styleNormalText = {},
  styleBoldText = {},
  boldText,
  normalText
}: ComponentDiscountProps) {
  if (!normalText && !boldText) return null;
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, styleText]}>
        {boldText && handleChangeColor(` ${boldText} `, styleBoldText)}
        {normalText && handleChangeColor(` ${normalText} `, styleNormalText)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2
  },
  text: {
    fontWeight: '400',
    fontSize: FONTS_SIZES.legal,
    lineHeight: 16,
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal'
  }
});
