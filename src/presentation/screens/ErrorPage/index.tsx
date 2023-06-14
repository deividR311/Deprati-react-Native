import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { COLORS, FONTS_FAMILY, FONTS_SIZES } from '../../../application/common';
import { fontWeightOS } from '../../../application/utils';

interface Props {
  isTab?: boolean;
  isMaintenance?: boolean;
}

const ErrorPage = ({ isTab = false, isMaintenance = false }: Props) => {
  return (
    <View
      style={[styles.container, isTab && styles.containerIsTab]}
      testID="errorPage">
      <ImageBackground
        style={[styles.background, isTab && styles.backgroundIsTab]}
        source={require('../../../../assets/images/errorPage.png')}>
        <Text style={[styles.container__title, isTab && styles.titleIsTab]}>
          {isMaintenance
            ? '¡Lo sentimos! En este momento no podemos cargar esta sección.'
            : '¡Lo sentimos, tenemos problemas técnicos!'}
        </Text>
      </ImageBackground>
      <Text style={styles.container__subtitle}>
        {isMaintenance
          ? 'Estamos realizando actualizaciones para mejorar tu experiencia.'
          : 'Estamos haciendo mejoras en nuestra tienda en línea'}
      </Text>
      <Text style={styles.container__text}>
        {isMaintenance
          ? 'Intenta en refrescar en unos minutos.'
          : ' Es posible que algunos de los servicios de la app no estén disponibles.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingVertical: 90,
    paddingBottom: 180,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  containerIsTab: {
    paddingVertical: 30,
    paddingBottom: 120
  },
  background: {
    flex: 1,
    width: '100%',
    height: 270,
    alignItems: 'center'
  },
  backgroundIsTab: {
    height: 290
  },
  container__title: {
    color: COLORS.DARK,
    fontSize: FONTS_SIZES.super + 9,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: FONTS_SIZES.super + 4,
    fontWeight: fontWeightOS('500'),
    width: 300,
    textAlign: 'center',
    paddingTop: 5
  },
  titleIsTab: {
    paddingVertical: 7
  },
  container__subtitle: {
    color: COLORS.DARK,
    fontSize: FONTS_SIZES.super,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    lineHeight: FONTS_SIZES.super + 4,
    fontWeight: fontWeightOS('700'),
    width: 300,
    textAlign: 'center',
    paddingBottom: 21
  },
  container__text: {
    color: COLORS.DARK,
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    lineHeight: FONTS_SIZES.subtitle1 + 8,
    fontWeight: fontWeightOS('400'),
    width: 300,
    textAlign: 'center'
  }
});

export default ErrorPage;
