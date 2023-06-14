import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, Platform } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  MARING_HORIZONTAL
} from '../../../../../application/common';
import TextInputMask, { createNumberMask } from 'react-native-mask-input';
interface Props {
  placeholder?: string;
  containerStyle?: ViewStyle;
  onSearch(x: string): void;
  numeric?: boolean;
}

export const SearchInput = ({
  placeholder = 'Buscar pedido',
  containerStyle,
  onSearch,
  numeric
}: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <View style={[styles.search, containerStyle]}>
      {numeric ? (
        <TextInputMask
          // focusable={true}
          // autoFocus={true}
          keyboardType={
            Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'
          }
          returnKeyType={'search'}
          style={[styles.search__input, styles.search__input__text]}
          mask={[
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/
          ]}
          placeholder={placeholder}
          value={searchValue}
          onChangeText={text => setSearchValue(text)}
          onSubmitEditing={event => {
            setSearchValue(event.nativeEvent.text);
            onSearch(event.nativeEvent.text);
          }}
        />
      ) : (
        <TextInput
          value={searchValue}
          placeholderTextColor={COLORS.GRAYDARK60}
          placeholder={placeholder}
          style={[styles.search__input, styles.search__input__text]}
          returnKeyType={'search'}
          onChangeText={text => setSearchValue(text)}
          onSubmitEditing={event => {
            setSearchValue(event.nativeEvent.text);
            onSearch(event.nativeEvent.text);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    display: 'flex',
    position: 'relative',
    backgroundColor: COLORS.WHITE,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: MARING_HORIZONTAL
  },
  search__input: {
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 3,
    color: COLORS.BRAND,
    backgroundColor: COLORS.DEPRATYGRAY,
    height: 40,
    fontSize: FONTS_SIZES.paragraph,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  search__input__fake: {
    justifyContent: 'center'
  },
  search__input__text: {
    flexGrow: 3,
    fontSize: FONTS_SIZES.paragraph,
    lineHeight: FONTS_SIZES.paragraph + 2,
    color: COLORS.DARK70,
    opacity: 0.7,
    fontFamily: FONTS_FAMILY.Roboto
  }
});
