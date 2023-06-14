import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { MainButton } from '../../../../common-components/buttons/Button';
import layout from '../../../../../application/common/layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const textDeferred = 'Actualmente no tienes\ndiferidos para precancelar';
const textButton = 'VOLVER A SERVICIOS DE CRÉDITO';
const sizeMarker = layout.window.width * 0.5;

export default function NoDeferred({ onPress }: { onPress(): void }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentIconNoReturn}>
        <Icon name="information-outline" size={110} color={COLORS.BRAND} />
      </View>

      <Text style={styles.textNoReturns}>{textDeferred}</Text>
      <MainButton title={textButton} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:'100%',
    // justifyContent: 'center',
    paddingTop: 50,
    alignItems: 'center',
    alignContent: 'center'
  },

  contentIconNoReturn: {
    alignSelf: 'center',
    backgroundColor: COLORS.GRAYBRAND,
    width: sizeMarker,
    height: sizeMarker,
    borderRadius: sizeMarker / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  textNoReturns: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: FONTS_SIZES.extra,
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: 0.2,
    color: COLORS.DARK70,
    marginBottom: 40,
    marginTop: 20
  }
});
