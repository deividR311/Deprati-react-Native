import { Text, StyleSheet, TextStyle } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common/fonts';

interface IProps {
  text: string;
  text2?: string;
  textLink: string;
  textAlign?: 'left' | 'center' | 'right';
  onPress: () => void;
  containerTextStyle?: TextStyle | TextStyle[];
  textStyle?: TextStyle | TextStyle[];
  textStyle2?: TextStyle | TextStyle[];
  textLinkStyle?: TextStyle | TextStyle[];
}
export default function TextAndLink({
  text,
  text2,
  textLink,
  onPress,
  containerTextStyle = {},
  textStyle = {},
  textStyle2 = {},
  textLinkStyle = {},
  textAlign = 'left'
}: IProps) {
  return (
    <Text style={[{ textAlign: textAlign }, containerTextStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>

      <Text onPress={onPress} style={[styles.textLink, textLinkStyle]}>
        {textLink}
      </Text>

      {text2 && <Text style={[styles.text, textStyle2]}>{text2}</Text>}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Regular']
  },

  textLink: {
    marginHorizontal: 5,
    fontFamily: FONTS_FAMILY['Roboto-Regular']
  }
});
