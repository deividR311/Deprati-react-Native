import React from 'react';
//Libs
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Platform
} from 'react-native';
import { COLORS } from '../../../../../../application/common';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../../application/common/fonts';

interface ComponentQuantityProductsProps {
  quantity: number;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
}

export default function ComponentQuantityProducts({
  quantity,
  style = {},
  styleText = {}
}: ComponentQuantityProductsProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, styleText]}>{quantity} Productos</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: Platform.select({
      ios: -38,
      android: 0
    }),
    backgroundColor: COLORS.WHITE
  },
  text: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: FONTS_SIZES.label,
    lineHeight: 20,
    color: COLORS.DARK70TRANSPARENT,
    letterSpacing: 0.8
  }
});
