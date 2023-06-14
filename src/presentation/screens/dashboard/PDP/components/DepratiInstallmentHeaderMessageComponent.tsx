import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';

interface Props {
  installments: Installment[];
}

interface Installment {
  description: string;
  factor: string;
  finalPrice: string;
  instalments: number;
}

export const DepratiInstallmentHeaderMessageComponent = (_props: Props) => {
  const { contentProduct: props } = _props ?? {};
  const { installments } = props ?? {};

  const ItemInstallment = ({ description, factor }: Installment) => {
    return (
      <View style={styles.item}>
        <Text style={styles.item_price}>{factor}</Text>
        <Text style={styles.item_description}>{description}</Text>
      </View>
    );
  };

  const options = useMemo(() => {
    if (installments?.length > 0) {
      return installments.map((installment, index) => (
        <ItemInstallment key={index} {...installment} />
      ));
    }
    return null;
  }, [installments]);

  if (installments && installments?.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.container__title}>
        Difiérelo con tu Crédito De Prati
      </Text>
      <View style={styles.container__options}>{options}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: MARING_HORIZONTAL,
    marginHorizontal: MARING_HORIZONTAL,
    alignItems: 'center'
  },
  container__title: {
    ...FontStyles.Body_2
  },
  container__options: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    paddingTop: 8
  },
  item: {
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  item_price: {
    textAlign: 'center',
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    fontWeight: '700',
    fontSize: FONTS_SIZES.legal,
    color: COLORS.BRAND,
    backgroundColor: COLORS.GRAYBRAND,
    paddingVertical: 4
  },
  item_description: {
    ...FontStyles.ProductDescription,
    fontSize: FONTS_SIZES.legal,
    textTransform: 'lowercase',
    letterSpacing: 0,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4
  }
});
