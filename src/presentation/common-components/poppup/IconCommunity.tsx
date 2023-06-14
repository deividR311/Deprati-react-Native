import React from 'react';
import { TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function IconCommunity({
  name,
  size,
  onPress = () => {},
  style = {}
}: {
  name: string;
  size: number;
  onPress?(): void;
  style?: TextStyle | TextStyle[];
}) {
  return <Icon style={style} name={name} size={size} onPress={onPress} />;
}
