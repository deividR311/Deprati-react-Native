import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import ComponentStars from '../../PLP/components/stars/ComponentStars';
import { fontFamilyOS, fontWeightOS } from '../../../../../application/utils';

interface Props {
  price: Price;
  previousPrice?: Price;
  averageRating?: number;
  ean?: string;
}

interface Price {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

export const ProductDetailsPagePricesComponent = (_props: Props) => {
  const { contentProduct: props } = _props ?? {};
  const {
    averageRating = 0,
    previousPrice,
    price,
    ean,
    stock = {},
    name
  } = props ?? {};
  const [sizeSelected] = _props?.useSizeSelected;
  const withoutStock = stock?.stockLevel === 0;

  return (
    <View testID="detail-pdp" style={styles.container}>
      <ComponentStars
        style={styles.container_start}
        styleList={styles.container_start_list}
        styleText={styles.container_start_text}
        average={averageRating}
        showText={false}
        showStars={true}
        colorStar={COLORS.GRAYBRAND}
      />
      <Text style={styles.container_code}>Código: {ean}</Text>
      {name && <Text style={styles.container_name}>{name}</Text>}
      <View style={styles.container_prices}>
        {previousPrice?.formattedValue && (
          <Text style={styles.container_lastPrice}>
            {previousPrice?.formattedValue}
          </Text>
        )}
        <Text style={styles.container_price}>{price?.formattedValue}</Text>
      </View>
      {withoutStock && sizeSelected && (
        <Text style={styles.container_withoutStock}>
          El producto que buscas no cuenta con stock disponible
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 28,
    marginHorizontal: MARING_HORIZONTAL,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  container_code: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontSize: FONTS_SIZES.legal,
    color: COLORS.DARK,
    textTransform: 'uppercase',
    fontWeight: fontWeightOS('400'),
    letterSpacing: 1,
    lineHeight: 16,
    marginTop: 4
  },
  container_name: {
    marginTop: 4,
    flexDirection: 'row',
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.extra,
    lineHeight: 23
  },
  container_prices: {
    marginTop: 4,
    flexDirection: 'row'
  },
  container_price: {
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    fontSize: FONTS_SIZES.subtitle1,
    color: COLORS.DARK,
    textTransform: 'uppercase',
    fontWeight: fontWeightOS('700')
  },
  container_withoutStock: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.small,
    color: COLORS.BRAND,
    fontWeight: '400',
    marginTop: 8
  },
  container_lastPrice: {
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontSize: FONTS_SIZES.subtitle1,
    color: COLORS.DARK,
    textTransform: 'uppercase',
    fontWeight: '400',
    marginRight: 8,
    textDecorationLine: 'line-through'
  },
  container_start: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  container_start_list: { flexDirection: 'row', backgroundColor: 'white' },
  container_start_text: {}
});
