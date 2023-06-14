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
import {
  fontFamilyOS,
  fontWeightOS
} from '../../../../../../application/utils';
//Styles

interface ComponentPriceProps {
  style?: StyleProp<ViewStyle>;
  styleAux?: StyleProp<ViewStyle>;
  stylePrevPrice?: StyleProp<TextStyle>;
  styleCurrentPrice?: StyleProp<TextStyle>;
  title?: string;
  prevPrice?: Partial<PriceProduct>;
  price?: Partial<PriceProduct>;
}

const minLength = 26;
export default function ComponentPrice({
  style = {},
  stylePrevPrice = {},
  styleCurrentPrice = {},
  styleAux,
  prevPrice,
  price,
  title = ''
}: ComponentPriceProps) {
  const handleStyle = () => {
    if (styleAux && title.length > minLength) {
      return styleAux;
    }
    return style;
  };
  function isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  return (
    <View style={handleStyle()}>
      {!isObjEmpty(prevPrice) ? (
        <Text style={[styles.prevPrice, stylePrevPrice]}>
          {prevPrice?.formattedValue}
        </Text>
      ) : null}
      <Text style={[styles.currentPrice, styleCurrentPrice]}>
        {price?.formattedValue}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  prevPrice: {
    textDecorationLine: 'line-through',
    marginRight: 5,
    fontFamily: FONTS_FAMILY.Roboto
  },
  currentPrice: {
    fontWeight: fontWeightOS('bold'),
    fontSize: 17,
    color: COLORS.DARK70,
    fontFamily: fontFamilyOS('Bold')
  }
});
