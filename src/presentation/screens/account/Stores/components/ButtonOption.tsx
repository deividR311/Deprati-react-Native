import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontStyles } from '../../../../../application/common/fonts';
interface IProps {
  title?: string;
  icon: string;
  onPress: () => void;
}
export default function ButtonOption({ title, icon, onPress }: IProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginHorizontal: 16, flexDirection: 'row' }}
      activeOpacity={0.5}>
      <Icon name={icon} size={18} style={{ marginRight: 14 }} />
      {title && <Text style={FontStyles.Button}>{title}</Text>}
    </TouchableOpacity>
  );
}
