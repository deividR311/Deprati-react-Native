import React, { useMemo } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ExtensionComponentProps } from '../extension-component';
import BannerImg from './BannerImg';
import { MARING_HORIZONTAL } from '../../../../application/common/layout';
import { COLORS } from '../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common/fonts';

interface Props {
  customProps: customProp;
}
interface customProp extends ExtensionComponentProps {}

const HEIGHT_BANNER = 116;

const BannerCarousel = (props: Props) => {
  const { customProps } = props;

  const {
    childrenComponentsList,
    childrenComponents = {},
    title
  } = customProps;

  const banners = useMemo(() => {
    const result = childrenComponentsList.map(component => {
      return childrenComponents[component];
    });
    return result;
  }, [childrenComponentsList]);

  const width = Dimensions.get('screen').width;
  const widthBanner = width;
  const BANNER_CONFIG = {
    sliderWidth: width,
    itemWidth: widthBanner,
    inactiveSlideOpacity: 0.8,
    removeClippedSubviews: false
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <BannerImg
        key={'Carousel' + index.toString()}
        {...item}
        height={HEIGHT_BANNER}
        styles={styles}
      />
    );
  };

  if (banners?.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.container__title}>
        <Text style={styles.container__title_text}>{title ?? 'Novedades'}</Text>
      </View>
      <Carousel data={banners} renderItem={renderItem} {...BANNER_CONFIG} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: MARING_HORIZONTAL,
    marginLeft: MARING_HORIZONTAL,
    marginBottom: 10
  },
  container__title: {
    backgroundColor: COLORS.WHITE
  },
  container__title_text: {
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: '500',
    color: COLORS.DARK70
  },
  banner__container: {
    borderRadius: 4,
    overflow: 'hidden',
    width: '85%',
    backgroundColor: COLORS.WHITE,
    marginLeft: 2
  },
  banner__container_img: {
    width: '100%',
    height: '100%'
  }
});

export default BannerCarousel;
