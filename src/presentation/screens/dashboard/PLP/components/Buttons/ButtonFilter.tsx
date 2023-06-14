import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { testProps } from '../../../../../../application/utils/accessibleId';
interface IButtonFilterProps {
  onPress(): void;
  size?: number;
}
export default function ButtonFilter(props: IButtonFilterProps) {
  const { onPress, size = 26 } = props;
  return (
    <TouchableOpacity
      {...testProps('button_filter')}
      activeOpacity={0.5}
      onPress={onPress}
      accessible>
      <Icon name="filter" size={size} style={{ transform: [{ scaleX: -1 }] }} />
    </TouchableOpacity>
  );
}
