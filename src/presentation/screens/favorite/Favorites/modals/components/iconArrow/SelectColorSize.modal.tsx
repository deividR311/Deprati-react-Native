import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../../../../../application/common/colors';

//Styles

export default function IconArrow({ isOpened }: { isOpened: boolean }) {
  return (
    <Icon
      name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
      size={20}
      color={COLORS.DARK70}
    />
  );
}
