import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ExtensionComponent, {
  ExtensionComponentProps
} from '../extension-component';
import { COLORS } from '../../../application/common';
import { IChildrenComponent } from './IChildrenComponent.interface';
import { useIsFocused } from '@react-navigation/native';
import { ASPECT_RATIO } from '../../../application/utils';
/* import BannerImg from '../../screens/CategoryPage/components/BannerImg'
import BannerVideoThumbnails from '../bannerVideoThumbnails/BannerVideoThumbnails' */

interface Props {
  customProps: customProp;
}
interface customProp extends ExtensionComponentProps {}

const HEIGHT_BANNER = 200;

const DepratiHomeRotatingImagesComponent = (props: Props) => {
  const refCarousel = useRef<Carousel<any>>(null);
  const componentsList = props?.customProps?.childrenComponentsList ?? [];
  const [childrenName] = componentsList;
  const customProps =
    //@ts-ignore
    props?.customProps?.childrenComponents[childrenName ?? ''] ?? {};
  const { childrenComponentsList, childrenComponents } = customProps;

  const [activeDot, setActiveDot] = useState<number>(0);

  const banners = useMemo(() => {
    const result = childrenComponentsList
      ?.map((component: string) => {
        return childrenComponents[component];
      })
      ?.filter((item: IChildrenComponent) => {
        if (!item?.media?.url && !item?.videoId) {
          return false;
        }
        return true;
      });
    return result ?? [];
  }, [childrenComponentsList]);

  const width = Dimensions.get('screen').width;
  const widthBanner = width;
  const BANNER_CONFIG = {
    sliderWidth: width,
    itemWidth: widthBanner,
    inactiveSlideOpacity: 0.8,
    removeClippedSubviews: false,
    autoplay: true,
    autoplayInterval: 9000,
    autoplayDelay: 9000,
    lockScrollWhileSnapping: true,
    enableMomentum: true
  };

  const focused = useIsFocused();
  useLayoutEffect(() => {
    if (activeDot + 1 === banners?.length && focused) {
      setTimeout(() => {
        refCarousel?.current?.snapToItem?.(0);
      }, BANNER_CONFIG.autoplayInterval);
    }
  }, [activeDot, banners, focused]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    /* <BannerVideoThumbnails
          key={'Carousel' + index.toString()}
          {...item}
          cloudflareProps={item}
          aspectRatio={1.76}
          height={HEIGHT_BANNER}
          styles={styles}
          focus={index === activeDot}
        /> */
    return (
      <ExtensionComponent
        key={'Carousel' + index.toString()}
        style={{ ...styles, ...props?.customProps?.style }}
        {...item}
        cloudflareProps={item}
        height={HEIGHT_BANNER}
        customAspectRatio={ASPECT_RATIO}
        focus={item.uid === banners[activeDot]?.uid}
      />
    );
  };

  return (
    <View>
      <Carousel
        ref={refCarousel}
        data={banners}
        renderItem={renderItem}
        onSnapToItem={index => setActiveDot(index)}
        firstItem={0}
        {...BANNER_CONFIG}
      />
      <View style={styles.container_carousel__pagination}>
        <Pagination
          activeDotIndex={activeDot}
          dotsLength={banners.length ?? 0}
          dotContainerStyle={[styles.carousel_container_Pagination]}
          dotStyle={[styles.carousel_dotStyle]}
          inactiveDotOpacity={1}
          inactiveDotScale={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner__container: {
    marginTop: 8,
    width: '100%'
  },
  banner__container_img: {
    width: '100%',
    height: '100%'
  },
  container_carousel__pagination: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 2,
    bottom: -20
  },
  carousel_dotStyle: {
    backgroundColor: COLORS.WHITE,
    width: 14,
    height: 14
  },
  carousel_container_Pagination: {
    alignSelf: 'flex-end',
    elevation: 0,
    zIndex: 2,
    width: 14,
    height: 14,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: COLORS.WHITE,
    borderWidth: 1
  }
});

export default DepratiHomeRotatingImagesComponent;
