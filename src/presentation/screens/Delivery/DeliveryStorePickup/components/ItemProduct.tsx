import React from 'react';
//Libs
import { StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  MARING_HORIZONTAL
} from '../../../../../application/common';
import { capitalize } from '../../../../../application/utils/string-formater';

import { Entry } from '../../../../../infrastucture/apis/shopping-cart';
import ComponentImageProduct from '../../../dashboard/PLP/components/imageProduct/ComponentImageProduct';

export interface ItemProductProps {
  data: Entry;
}

export const ItemProduct: React.FC<ItemProductProps> = ({ data }) => {
  const { product } = data;
  return (
    <View style={styles.container}>
      {/* <Image
        resizeMode="stretch"
        source={{ uri: getUrlImageHybris(product.images[1].url) }}
        style={styles.container__image}
      /> */}
      <ComponentImageProduct
        styleImage={styles.container__image}
        dataImages={{ images: product.images, labelNew: product?.tagUrl }}
        disabled={true}
      />
      <View style={styles.container__description}>
        <Text style={styles.container__description_text} numberOfLines={3}>
          {capitalize(product.name)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 260,
    marginTop: 20,
    marginHorizontal: MARING_HORIZONTAL - 6
  },
  container__image: {
    width: '100%',
    height: 200,
    borderRadius: 5
  },
  container__description: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container__description_text: {
    width: '100%',
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.small,
    lineHeight: 16,
    color: COLORS.DARK70,
    // opacity: 0.6,
    fontWeight: '300'
  },
  container__description_price: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.small,
    color: COLORS.BRAND
  }
});

export default ItemProduct;
