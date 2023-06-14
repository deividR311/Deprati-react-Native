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

export default function FavoritesEmpty() {
  const navigation = useNavigation();

  return (
    <SafeAreCustom styleAndroid={{ paddingBottom: 22 }}>
      <View style={styles.container}>
        <Text testID="textEmpty" style={styles.textEmpty}>
          Tu lista de favoritos está vacía 🙁, agrega productos a tus favoritos
          tocando el corazón ❤.
        </Text>
        <MainButton
          title={'Regresar a inicio'}
          style={styles.button}
          onPress={() => navigation.navigate(NAV.HOME as never)}
        />
      </View>
    </SafeAreCustom>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 60, paddingHorizontal: 12 },
  textEmpty: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: FONTS_SIZES.extra,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.2,
    color: COLORS.DARK70
  },
  button: { alignSelf: 'center', marginTop: 30 }
});
