import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { NAV } from '../../../../../application/common/namesNav';
import { MainButton } from '../../../../common-components/buttons/Button';
import { t } from 'i18next';

const textNoOrders = t('emptyHistory');
const textButton = t('APP_BOTON_LABEL.startShopping');

export default function NoOrders() {
  const imageNoOrders = require('../../../../../../assets/images/myOrders/no-orders.png');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentImage}>
        <Image source={imageNoOrders} />
      </View>

      <Text style={styles.textNoOrders}>{textNoOrders}</Text>
      <MainButton
        title={textButton}
        onPress={() => navigation.navigate(NAV.HOME as never)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  contentImage: {
    marginBottom: 20
  },
  textNoOrders: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: FONTS_SIZES.title2,
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: 0.2,
    color: COLORS.DARK70,
    marginBottom: 25
  }
});
