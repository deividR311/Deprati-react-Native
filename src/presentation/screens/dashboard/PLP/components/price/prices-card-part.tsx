import React from 'react';
//Libs
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS_FAMILY } from '../../../../../../application/common';
import { PriceProduct } from '../../interfaces/iProducts';
import { t } from 'i18next';
//Styles

interface PriceCardPartProps {
  unitPrice: Partial<PriceProduct>;
  price: Partial<PriceProduct>;
}

export default function PriceCardPart({
  unitPrice,
  price
}: PriceCardPartProps) {
  return (
    <View style={styles.container}>
      {!!unitPrice && (
        <Text style={[styles.price]}>
          {`${t('unitPrice')} ${unitPrice?.formattedValue}`}
        </Text>
      )}
      <Text style={[styles.price, { marginTop: 8 }]}>
        {`${t('totalWithoutIVA')} `}
        <Text style={[styles.bigPriceAmount]}>{price?.formattedValue}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 12
  },
  price: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: FONTS_FAMILY.Roboto
  },
  bigPriceAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.1,
    color: COLORS.DARK70
  }
});
