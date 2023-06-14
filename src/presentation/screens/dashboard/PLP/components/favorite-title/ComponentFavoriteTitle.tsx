import React from 'react';
//Libs
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { removeTags } from '../../../../../../application/utils/string-formater';
import { ILoadingFavorite } from '../../interfaces';
import ButtonFavorite from '../Buttons/ButtonFavorite';
import { FONTS_FAMILY } from '../../../../../../application/common';
//Styles

interface ComponentFavoriteTitleProps {
  title: string;
  codeProduct: string;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleFavorite?: StyleProp<ViewStyle>;
  // dataProduct: Product
  isFavorite?: boolean;
  onAddFavorite(code: string): void;
  loadingFavorite: ILoadingFavorite;
}

export default function ComponentFavoriteTitle({
  title,
  codeProduct,
  style = {},
  styleText = {},
  styleFavorite = {},
  isFavorite,
  onAddFavorite,
  loadingFavorite
}: ComponentFavoriteTitleProps) {
  return (
    <View style={style}>
      <Text
        style={[{ fontFamily: FONTS_FAMILY.Roboto }, styleText]}
        numberOfLines={2}>
        {removeTags(title)}
      </Text>
      <View style={styleFavorite}>
        <ButtonFavorite
          code={codeProduct}
          isFavorite={isFavorite}
          onAddFavorite={onAddFavorite}
          loadingFavorite={loadingFavorite}
        />
      </View>
    </View>
  );
}
