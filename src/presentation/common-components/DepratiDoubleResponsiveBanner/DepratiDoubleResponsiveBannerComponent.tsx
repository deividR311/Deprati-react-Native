import React, { useMemo } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {
  COLORS,
  FontStyles,
  MARING_HORIZONTAL
} from '../../../application/common';
import { ExtensionComponentProps } from '../extension-component';
import BannerImg from './BannerImg';
import { fontWeightOS } from '../../../application/utils';

interface Props {
  customProps: customProp;
}
interface customProp extends ExtensionComponentProps {}

const HEIGHT_BANNER = 116;

const DepratiDoubleResponsiveBanner = (props: Props) => {
  const { customProps } = props;

  const {
    childrenComponentsList,
    childrenComponents = {},
    title,
    style: customStyle,
    width: widthCustom
  } = customProps;

  const banners = useMemo(() => {
    const result = childrenComponentsList.map(component => {
      return childrenComponents[component];
    });
    return result;
  }, [childrenComponentsList]);

  const width = Dimensions.get('screen').width;
  const widthBanner = widthCustom ? width / widthCustom : width;
  const widthItem = widthBanner * 0.8;
  const BANNER_CONFIG = {
    sliderWidth: widthBanner,
    itemWidth: widthItem
  };
  const bannerContainerCompose = StyleSheet.compose(
    styles.banner__container,
    customStyle?.banner__container
  );
  const bannerContainerImgCompose = StyleSheet.compose(
    styles.banner__container_img,
    customStyle?.banner__container_img
  );
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <BannerImg
        key={'Carousel' + index.toString()}
        {...item}
        height={HEIGHT_BANNER}
        styles={{
          banner__container: bannerContainerCompose,
          banner__container_img: bannerContainerImgCompose
        }}
      />
    );
  };

  if (banners?.length === 0) return null;

  return (
    <View style={[styles.container, customStyle?.container]}>
      <Divider
        style={[
          styles.container__divider_top,
          customStyle?.container__divider_top
        ]}
      />
      {title && (
        <View style={[styles.container__title, customStyle?.container__title]}>
          <Text
            style={[
              styles.container__title_text,
              customStyle?.container__title_text
            ]}>
            {title}
          </Text>
        </View>
      )}
      <Carousel
        {...BANNER_CONFIG}
        data={banners}
        renderItem={renderItem}
        contentContainerCustomStyle={styles.content__carousel}
      />
      <Divider
        style={[
          styles.container__divider_bottom,
          customStyle?.container__divider_bottom
        ]}
      />
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
  content__carousel: {
    paddingLeft: 0
  },
  container__title: {
    backgroundColor: COLORS.WHITE
  },
  container__title_text: {
    ...FontStyles.Body_2,
    fontWeight: fontWeightOS('700'),
    color: COLORS.DARK70
  },
  banner__container: {
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: COLORS.WHITE,
    marginLeft: 2
  },
  banner__container_img: {
    width: '100%',
    height: '100%'
  },
  container__divider_top: {
    height: 0
  },
  container__divider_bottom: {
    height: 0
  }
});

export default DepratiDoubleResponsiveBanner;
