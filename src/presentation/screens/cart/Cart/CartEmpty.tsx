//Libs
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//components
import { SafeAreCustom } from '../../../common-components/safe-area/SafeAreCustom';
import { COLORS } from '../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common/fonts';
import { MainButton } from '../../../common-components/buttons/Button';
import { NAV } from '../../../../application/common/namesNav';
import CartTab from '../../../../../assets/icons/Tab/CartTab';
import layout from '../../../../application/common/layout';

const sizeCart = layout.window.width * 0.65;

export default function CartEmpty() {
  const navigation = useNavigation();
  return (
    <SafeAreCustom styleAndroid={{ paddingBottom: 22 }}>
      <View style={styles.container} testID="cart-empty">
        <View style={styles.contentCart}>
          <CartTab width={185} height={190} color={COLORS.BRAND} />
        </View>
        <Text style={styles.textEmpty}>
          No tienes productos agregados al carrito de compras. Puedes agregarlos
          desde cualquiera de las categorías
        </Text>
        <MainButton
          testID="cart_init_cart"
          title={'¡COMIENZA A COMPRAR AHORA!'}
          style={styles.button}
          onPress={() => navigation.navigate(NAV.HOME as never)}
        />
      </View>
    </SafeAreCustom>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, paddingHorizontal: 12 },
  contentCart: {
    alignSelf: 'center',
    backgroundColor: COLORS.GRAYBRAND,
    // width: 270,
    // height: 270,
    width: sizeCart,
    height: sizeCart,
    borderRadius: sizeCart / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  textEmpty: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: FONTS_SIZES.extra,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.2,
    color: COLORS.DARK70,
    paddingHorizontal: 10
  },
  button: { alignSelf: 'center', marginTop: 30 }
});
