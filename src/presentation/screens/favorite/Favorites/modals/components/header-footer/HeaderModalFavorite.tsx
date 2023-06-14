import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../../../application/common/fonts';
import { IconButton } from '../../../../../../common-components/bottomSheet';

const textHeader = 'Confirma talla y color';

export default function HeaderModalFavorite({ onClose }: { onClose(): void }) {
  return (
    <>
      <View style={styles.header}>
        <IconButton iconName="close" onPress={() => onClose()} />
      </View>
      <Text style={styles.header__text}>{textHeader}</Text>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    width: '100%'
  },
  header__text: {
    marginTop: -15,
    marginBottom: 25,
    alignSelf: 'center',
    color: COLORS.DARK70,
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.8,
    fontSize: FONTS_SIZES.label
    // lineHeight: 16,
  }
});
