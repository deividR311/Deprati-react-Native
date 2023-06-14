import React, { useMemo } from 'react';
//Libs
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet
} from 'react-native';
import ItemStar from './ItemStar';
import { fontFamilyOS } from '../../../../../../application/utils';

interface ComponentStarsProps {
  average?: number;
  style?: StyleProp<ViewStyle>;
  styleList?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  showStars?: boolean;
  showText?: boolean;
  colorStar?: string;
}

export default function ComponentStars({
  average = 0,
  showStars = false,
  showText = true,
  style = {},
  styleList = {},
  styleText = {},
  colorStar
}: ComponentStarsProps) {
  const rating = Math.trunc(average || 5);

  const arrayStar = useMemo(() => {
    let _starts = [];
    let k = 0;
    while (k < rating) {
      _starts.push(k);
      k++;
    }
    return _starts;
  }, [average]);

  if (average === 0 && !showStars) return null;

  return (
    <View style={style}>
      <View style={styleList}>
        {arrayStar?.length > 0 &&
          arrayStar.map((x: number) => {
            return (
              <ItemStar
                key={x.toString()}
                colorStar={average === 0 ? colorStar : undefined}
              />
            );
          })}
      </View>

      {showText && <Text style={[styles.text, styleText]}>{rating}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontFamily: fontFamilyOS('Regular') }
});
