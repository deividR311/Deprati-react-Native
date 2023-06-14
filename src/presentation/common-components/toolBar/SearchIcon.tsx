import React from 'react';
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../application/common';

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  sizeIcon?: number;
}

const SearchIcon = (props: Props) => {
  const { style, iconStyle, sizeIcon = 28, onPress } = props;

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon
        name="search"
        size={sizeIcon}
        style={iconStyle}
        color={COLORS.DARK70}
      />
    </TouchableOpacity>
  );
};

export default SearchIcon;
