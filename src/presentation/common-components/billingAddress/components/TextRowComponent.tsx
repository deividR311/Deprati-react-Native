import React from 'react';
import { Platform, Text } from 'react-native';
import { stylesTextRowComponent as styles, TextRowComponentProps } from '.';
import { handleChangeColor } from '../../../../application/utils/functionsChangeColor';

export default function TextRowComponent({
  title,
  text = '',
  textStyle = {}
}: TextRowComponentProps) {
  return (
    <Text style={[textStyle, styles.text]}>
      {handleChangeColor(
        title,
        Platform.OS === 'android' ? styles.title : styles.titleIos
      )}
      {text}
    </Text>
  );
}
