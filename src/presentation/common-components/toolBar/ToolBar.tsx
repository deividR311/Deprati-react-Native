import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import React, { useRef, useState, useLayoutEffect, useMemo } from 'react';
import { COLORS } from '../../../application/common/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SvgUri } from 'react-native-svg';
import { Menu } from '../menu';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { getUrlImageHybris } from '../../../application/utils/urls';
import { NAV } from '../../../application/common';
import { ShoppingCartIcon } from '../shopping-cart';
import AnimatedSearchInput from './AnimatedSearchInput';
import SearchIcon from './SearchIcon';

interface Props {
  logo?: any;
  onPressSearch?: () => void;
  showGoBack?: boolean;
  title?: string;
  titleAlign?: 'left' | 'center' | 'right';
}

const ToolBar = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { logo, showGoBack = false, title, textAlign } = props;
  const [colapse, setColapse] = useState(true);
  const HiddenInOutRef = useRef(new Animated.Value(0)).current;
  const showInputSearch = () => {
    setColapse(!colapse);
  };

  useLayoutEffect(() => {
    Animated.timing(HiddenInOutRef, {
      toValue: colapse ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [HiddenInOutRef, colapse]);

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };
  const isHome = useMemo(() => {
    return route.name === NAV.HOME;
  }, [route.name]);

  return (
    <>
      <View style={[styles.toolbar, isHome && styles.toolbarMenu]}>
        {showGoBack && (
          <View style={styles.toolbar__goBack}>
            <TouchableOpacity onPress={() => goBack()}>
              <Icon name="arrow-back" size={24} color={COLORS.DARK70} />
            </TouchableOpacity>
          </View>
        )}
        {isHome || logo?.media ? (
          <View style={styles.toolbar__icons}>
            {isHome && <Menu />}
            {logo?.media && (
              <View style={styles.toolbar__logo}>
                <SvgUri
                  width="100%"
                  height="100%"
                  uri={getUrlImageHybris(logo?.media?.url)}
                />
              </View>
            )}
          </View>
        ) : null}
        {title && (
          <Text style={[styles.toolbar__title_text, { textAlign }]}>
            {title}
          </Text>
        )}
        <View style={styles.toolbar__icons}>
          <SearchIcon
            iconStyle={styles.toolbar__icons_icon}
            onPress={showInputSearch}
          />
          <ShoppingCartIcon />
        </View>
      </View>
      <AnimatedSearchInput collapse={colapse} />
    </>
  );
};

export default ToolBar;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 50,
    alignContent: 'center'
  },
  toolbarMenu: {
    paddingHorizontal: undefined,
    paddingLeft: 5,
    paddingRight: 15
  },
  toolbar__logo: {
    width: 150,
    height: '100%',
    marginLeft: 15
  },
  toolbar__goBack: {},
  toolbar__title_text: {
    flexGrow: 3,
    flex: 1,
    marginLeft: 24,
    alignItems: 'center',
    color: COLORS.DARK70,
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    lineHeight: FONTS_SIZES.subtitle1 + 10,
    letterSpacing: 0.5
  },
  toolbar__logo_img: {},
  toolbar__icons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center'
  },
  toolbar__icons_icon: {
    marginHorizontal: 5
  }
});
