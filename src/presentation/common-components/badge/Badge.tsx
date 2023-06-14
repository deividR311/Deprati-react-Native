import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { styles } from './styles';

interface Props {
  score: number;
  lastText?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Badge = ({ score = 0, style, textStyle, lastText }: Props) => {
  if (!score || score <= 0) return null;
  return (
    <View style={[styles.badge, style]}>
      <Text style={[styles.badge_text, textStyle]}>
        {score}
        {lastText}
      </Text>
    </View>
  );
};
