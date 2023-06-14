import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { productResponse } from '../../../../../infrastucture/apis/product';

interface Props {
  contentProduct: productResponse;
}

export const ProductDetailsPageDeliveryModesComponent = (_props: Props) => {
  const { contentProduct } = _props ?? {};

  const deliveryHome = useMemo(() => {
    if (contentProduct?.deliveryModes) {
      const deliveryHomeModes = [
        'standard',
        'free-standard-shipping',
        'express'
      ];
      const index = contentProduct?.deliveryModes?.findIndex(mod => {
        return deliveryHomeModes.includes(mod?.code);
      });
      return index >= 0;
    }

    return false;
  }, [contentProduct?.deliveryModes]);

  const pickupStore = useMemo(() => {
    if (contentProduct?.deliveryModes) {
      const index = contentProduct?.deliveryModes?.findIndex(mod => {
        const { code } = mod;
        return mod?.code === 'pickup';
      });
      return index >= 0;
    }

    return false;
  }, [contentProduct?.deliveryModes]);

  return (
    <View style={styles.container}>
      <View style={styles.container_item}>
        <Icon
          name="truck"
          size={24}
          color={deliveryHome ? COLORS.DARKBRAND : COLORS.GRAYBRAND}
        />
        <Text
          style={[
            styles.container__title,
            {
              color: deliveryHome ? COLORS.DARK : COLORS.GRAYBRAND
            }
          ]}>
          Envío a domicilio
        </Text>
      </View>
      <View style={styles.container_item}>
        <Icon
          name="store"
          size={24}
          color={pickupStore ? COLORS.DARKBRAND : COLORS.GRAYBRAND}
        />
        <Text
          style={[
            styles.container__title,
            {
              color: pickupStore ? COLORS.DARK : COLORS.GRAYBRAND
            }
          ]}>
          Retiro en tienda
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: MARING_HORIZONTAL,
    marginHorizontal: MARING_HORIZONTAL,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },
  container_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container__title: {
    ...FontStyles.Body_2,
    paddingLeft: 16
  }
});
