import React from 'react';
//Libs
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../../application/common';
import { Category } from '../../../../../../infrastucture/apis/shopping-cart';

interface ComponentSizeColorProps {
  style?: ViewStyle;
  styleText?: TextStyle;
  category?: Category[];
}
export const ProductCategoryProperties: React.FC<ComponentSizeColorProps> = ({
  style = {},
  styleText = {},
  category = []
}) => {
  return (
    <View style={[styles.container, style]}>
      {category
        .filter(({ parentCategoryName }) => parentCategoryName)
        .map(({ parentCategoryName, name }: Category, index) =>
          name ? (
            <Text
              key={`ProductCategoryProperties-${index}`}
              style={[styles.text, styleText]}>
              {`${parentCategoryName ? `${parentCategoryName}: ` : ''}${name}`}
            </Text>
          ) : null
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5
  },
  text: {
    fontWeight: '400',
    fontSize: FONTS_SIZES.legal,
    lineHeight: 16,
    color: COLORS.DARK70,
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal'
  }
});

export default ProductCategoryProperties;
