import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ExtensionComponentProps } from '../extension-component';
//import { getUrlImageHybris } from '../../../../application/utils/urls'
import BannerVideoThumbnails from '../../../common-components/bannerVideoThumbnails/BannerVideoThumbnails';
import BannerImg from './BannerImg';

interface Props {
  customProps: customProp;
}
interface customProp extends ExtensionComponentProps {}

const HEIGHT_BANNER = 200;

const CategoryCarousel = (props: Props) => {
  const refCarousel = useRef(null);
  const { customProps } = props;
  const { childrenComponentsList, childrenComponents } = customProps;
  const [activeDot, setActiveDot] = useState<number>(0);
  const banners = useMemo(() => {
    const result = childrenComponentsList
      .map(component => {
        return childrenComponents[component];
      })
      .filter(item => {
        if (!item?.media?.url && !item?.videoId) {
          return false;
        }
        return true;
      });
    return result;
  }, [childrenComponentsList]);

  const width = Dimensions.get('screen').width;
  const widthBanner = width;
  const BANNER_CONFIG = {
    sliderWidth: width,
    itemWidth: widthBanner,
    inactiveSlideOpacity: 0.8,
    removeClippedSubviews: false,
    autoplay: true,
    //autoplayDelay: 9000,
    autoplayInterval: 9000
    //loop: true,
    //loopClonesPerSide: banners?.length,
  };

  useEffect(() => {
    if (activeDot + 1 === banners?.length) {
      setTimeout(() => {
        refCarousel?.current?.snapToItem?.(0);
      }, BANNER_CONFIG.autoplayInterval);
    }
  }, [activeDot, banners]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const { typeCode = '' } = item;
    if (typeCode === 'BannerComponent') {
      return (
        <BannerImg
          key={'Carousel' + index.toString()}
          {...item}
          //height={HEIGHT_BANNER}
          styles={styles}
        />
      );
    } else if (typeCode === 'DepratiCloudflareVideoStreamBannerComponent') {
      return (
        <BannerVideoThumbnails
          key={'Carousel' + index.toString()}
          {...item}
          cloudflareProps={item}
          aspectRatio={1.76}
          height={HEIGHT_BANNER}
          styles={styles}
          focus={index === activeDot}
        />
      );
    }
    return null;
  };

  return (
    <Carousel
      ref={refCarousel}
      data={banners}
      renderItem={renderItem}
      onSnapToItem={index => setActiveDot(index)}
      firstItem={0}
      {...BANNER_CONFIG}
    />
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
  }
});

export default CategoryCarousel;
