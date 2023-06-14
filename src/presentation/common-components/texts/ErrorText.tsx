import { View, Text, StyleProp, TextStyle } from 'react-native';
import React from 'react';
import { commonsStyles } from '../styles-commons';
import { capitalize } from '../../../application/utils/string-formater';

interface ErrorTextProps {
  text: string | undefined;
  textStyle?: StyleProp<TextStyle>;
  isCapitalize?: boolean;
}
export default function ErrorText({
  text,
  textStyle,
  isCapitalize = false
}: ErrorTextProps) {
  return (
    <Text style={[commonsStyles.textError, textStyle]}>
      {!isCapitalize ? text : capitalize(text)}
    </Text>
  );
}
