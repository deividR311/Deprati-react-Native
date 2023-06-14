import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../../../../application/common/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BORDER_ARROW = 4;

export default function PagButtonArrow({
  onPress,
  left = false
}: {
  onPress(): void;
  left?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.container, left ? styles.borderLeft : styles.borderRight]}
      activeOpacity={0.6}
      onPress={() => onPress()}>
      <Icon
        name={left ? 'menu-left' : 'menu-right'}
        size={30}
        color={COLORS.BRAND}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.ICONTRANSPARENT,
    borderWidth: 1
  },
  borderRight: {
    borderTopRightRadius: BORDER_ARROW,
    borderBottomRightRadius: BORDER_ARROW
  },
  borderLeft: {
    borderTopLeftRadius: BORDER_ARROW,
    borderBottomLeftRadius: BORDER_ARROW
  }
});
