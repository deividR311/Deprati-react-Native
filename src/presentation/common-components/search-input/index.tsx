import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  StyleProp,
  ViewStyle
} from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../application/common/layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../application/common/namesNav';
import { EcommerceNavigationRoute } from '../../navigation/ecommerce';

interface Props {
  placeholder?: string;
  styleContainer?: StyleProp<ViewStyle>;
}

export const SearchInput = ({
  placeholder = 'Busca aquí',
  styleContainer
}: Props) => {
  const navigation = useNavigation();

  const onPressSearch = () => {
    navigation.navigate(NAV.ECOMMERCE, {
      screen: EcommerceNavigationRoute.Searchproduct
    });
  };
  const onPressEan = () => {
    navigation.push(NAV.ECOMMERCE, {
      screen: EcommerceNavigationRoute.Barcode
    });
  };

  return (
    <View style={[styles.search, styleContainer]}>
      <TouchableOpacity
        onPress={onPressSearch}
        activeOpacity={0.9}
        style={[styles.search__input, styles.search__input__fake]}>
        <Text style={[styles.search__input__text]}>{placeholder}</Text>
        <Pressable onPress={onPressEan}>
          <Icon name="barcode-scan" size={24} color={COLORS.DARK70} />
        </Pressable>
      </TouchableOpacity>
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
