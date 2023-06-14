import React from 'react';
//Libs
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet
} from 'react-native';
import { COLORS, FONTS_FAMILY } from '../../../../../../application/common';
import { PriceProduct } from '../../interfaces/iProducts';
//Styles

interface AvailableLabelCardPartProps {
  text: string;
}

export default function AvailableLabelCardPart({
  text
}: AvailableLabelCardPartProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
    marginRight: 18,
    justifyContent: 'flex-end'
  },
  text: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    color: COLORS.BRAND,
    fontFamily: FONTS_FAMILY.Roboto
  }
});
