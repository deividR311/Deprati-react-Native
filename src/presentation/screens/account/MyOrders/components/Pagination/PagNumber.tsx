import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../../../../application/common/colors';
import { FONTS_FAMILY } from '../../../../../../application/common';

export default function PagNumber({
  onPress,
  number,
  isActive
}: {
  onPress(): void;
  number: number;
  isActive: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive ? styles.colorSelected : styles.colorUnSelected
      ]}
      activeOpacity={0.5}
      onPress={() => onPress()}>
      <Text style={isActive ? styles.textSelected : styles.textUnselected}>
        {number}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30
  },
  colorSelected: {
    backgroundColor: COLORS.BRAND
  },
  colorUnSelected: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.ICONTRANSPARENT,
    borderWidth: 1
  },
  textSelected: {
    color: COLORS.WHITE,
    // textAlign: 'center',
    fontFamily: FONTS_FAMILY.Roboto
  },
  textUnselected: {
    color: COLORS.BRAND,
    fontFamily: FONTS_FAMILY.Roboto
  }
});
