import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import React from 'react';
import { COLORS } from '../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common/fonts';
import { useNavigation } from '@react-navigation/native';
import { getUrlImageHybris } from '../../../../application/utils/urls';
import { NAV } from '../../../../application/common';
import { testProps } from '../../../../application/utils/accessibleId';
import { trackEventclick } from '../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEvents } from '../../../../infrastucture/native-modules/emma/clickEventMap';

interface Props {
  lastItem: boolean;
  content: any;
  testId?: string;
}
const CategoryItem = (props: Props) => {
  const navigation = useNavigation();
  const eventCategory = () => {
    try {
      trackEventclick(keyEvents.home_categorias, {
        Categoria: props?.content?.text
      });
    } catch (error) {}
  };

  const goToCategory = () => {
    try {
      const { content } = props;
      const { category } = content?.link;
      eventCategory();
      navigation.navigate(NAV.CATEGORYPAGE, {
        category,
        categoryData: content
      });
    } catch (error) {}
  };

  return (
    <View
      style={[styles.container, props.lastItem && styles.container_lastItem]}
      accessible>
      <TouchableOpacity onPress={goToCategory} {...testProps(props?.testId)}>
        <ImageBackground
          style={styles.container__background}
          source={{ uri: getUrlImageHybris(props?.content?.url) }}>
          <TouchableOpacity
            onPress={goToCategory}
            style={[
              styles.container__label,
              { borderColor: props?.content?.textColor ?? COLORS.WHITE }
            ]}>
            <Text
              style={[
                styles.container__label_title,
                { color: props?.content?.textColor ?? COLORS.WHITE }
              ]}
              numberOfLines={2}>
              {props?.content?.text}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 180
  },
  container_lastItem: {
    width: '100%',
    height: 180
  },
  container__background: {
    backgroundColor: COLORS.DARK,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container__label: {
    maxWidth: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.WHITE,
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 11,
    textTransform: 'capitalize',
    zIndex: 20
  },
  container__label_title: {
    color: COLORS.WHITE,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    fontSize: FONTS_SIZES.subtitle1,
    textAlign: 'center'
  }
});
