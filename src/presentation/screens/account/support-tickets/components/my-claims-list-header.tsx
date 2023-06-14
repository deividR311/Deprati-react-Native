import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTS_FAMILY, FontStyles } from '../../../../../application/common';
import { fontWeightOS } from '../../../../../application/utils';

export const MyClaimsListHeader: FC = () => {
  return (
    <View style={styles.header}>
      <Text
        style={[
          FontStyles.H1_Headline,
          FontStyles.Justify,
          styles.littleSpace
        ]}>
        Selecciona uno de tus{`\n`}pedidos más recientes
      </Text>
      <Text style={[FontStyles.Body_1, FontStyles.Justify]}>
        *No se puede generar reclamos sobre pedidos cancelados
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20
  },
  littleSpace: {
    marginBottom: 10,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('700')
  }
});
