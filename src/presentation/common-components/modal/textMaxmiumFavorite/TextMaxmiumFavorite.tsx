import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common/fonts';
import { handleChangeColorBold } from '../../../../application/utils/functionsChangeColor';

const textContent =
  'El genio de la lámpara tiene un máximo de 3 deseos, nosotros te damos hasta 30… \n';
const textBold = 'tu lista está llena.';

export default function TextMaxmiumFavorite() {
  return (
    <Text style={styles.text}>
      {textContent}
      {handleChangeColorBold(textBold, COLORS.DARK70)}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: FONTS_SIZES.title1,
    lineHeight: 24,
    textAlign: 'left',
    letterSpacing: 0.2,
    color: COLORS.DARK70,
    paddingHorizontal: 20
  }
});
