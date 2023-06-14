import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Pressable
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../../../../../application/common/colors';
import { getUrlImageHybris } from '../../../../../application/utils/urls';
import {
  CloudflareVideo,
  YoutubeMedia
} from '../../../../../infrastucture/apis/support-tickets/types';
import { EcommerceNavigationRoute } from '../../../../navigation/ecommerce';
import BannerVideoThumbnails from '../../../../common-components/bannerVideoThumbnails/BannerVideoThumbnails';
import BannerVideoYoutubeThumbnails from '../../../CategoryPage/components/BannerVideoYoutubeThumbnails';
import { imageFilterCaruosel, imageSortCaruosel } from '../utils/images';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

interface Props {
  images: ImageCaruselProp[];
  tagUrl?: string;
  cloudflareVideo?: CloudflareVideo;
  youtubeMedia?: YoutubeMedia;
}

export interface ImageCaruselProp {
  altText: string;
  format: string | 'zoom' | 'product' | 'thumbnail';
  imageType: string;
  url: string;
}

export const ProductDetailsPageCarouselComponent = (_props: Props) => {
  const { contentProduct: props, loadingProduct } = _props ?? {};

  const aspectRatio = 515 / 772;

  const navigation = useNavigation();
  const [activeDot, setActiveDot] = useState<number>(0);
  const imageCarusel = useMemo(() => {
    let images = props?.images
      ?.filter(imageFilterCaruosel)
      .sort(imageSortCaruosel);

    if (props?.cloudflareVideo) {
      images = [...images, props.cloudflareVideo];
    }
    if (props?.youtubeMedia && !props?.cloudflareVideo) {
      images = [...images, props.youtubeMedia];
    }
    return images ?? [];
  }, [props?.images, props?.cloudflareVideo, props?.youtubeMedia]);

  const width = Dimensions.get('screen').width;
  const BANNER_CONFIG = {
    sliderWidth: width,
    itemWidth: width,
    inactiveSlideOpacity: 0.8,
    removeClippedSubviews: false,
    enableMomentum: true
  };

  const goToPage = indexItem => {
    navigation.navigate(EcommerceNavigationRoute.CaruselProductPage, {
      imageCarusel: imageCarusel,
      indexItem
    });
  };

  const renderItem = ({
    item,
    index
  }: {
    item: ImageProp | any;
    index: number;
  }) => {
    return (
      <Pressable
        key={index}
        style={[styles.carousel_container]}
        onPress={() => goToPage(index)}>
        <>
          {item?.videoId && (
            <BannerVideoThumbnails
              height={500}
              videoId={item?.videoId}
              cloudflareProps={item}
              aspectRatio={515 / 772}
              styles={{
                banner__container: styles.carousel_container,
                banner__container_img: styles.carousel_container_img
              }}
              focus={index === activeDot}
            />
          )}
          {item?.videoID && item?.youtubeLink && (
            <BannerVideoYoutubeThumbnails
              height={233}
              videoId={item?.videoID}
              youtubeMedia={item}
              styles={{
                banner__container: styles.carousel_container,
                banner__container_img: styles.carousel_container_img
              }}
              focus={index === activeDot}
            />
          )}
          {item?.url && (
            <ImageBackground
              style={[styles.carousel_container_img, { aspectRatio }]}
              resizeMode={'contain'}
              source={{
                uri: getUrlImageHybris(item?.url)
              }}>
              <View style={[styles.carousel_tag]}>
                {props?.tagUrl && (
                  <Image
                    resizeMode={'stretch'}
                    style={[styles.carousel_tag_img]}
                    source={{ uri: getUrlImageHybris(props?.tagUrl) }}
                  />
                )}
              </View>
            </ImageBackground>
          )}
        </>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {loadingProduct && (
        <View style={[styles.container_loading]}>
          <SkeletonContent
            key={'loadingProduct'}
            isLoading={loadingProduct}
            animationDirection="horizontalRight"
            containerStyle={[styles.container_loading, { aspectRatio }]}
            layout={[
              {
                width: '100%',
                height: '100%'
              }
            ]}
          />
        </View>
      )}
      {imageCarusel?.length > 0 && (
        <>
          <Carousel
            layout={'stack'}
            data={imageCarusel}
            renderItem={renderItem}
            firstItem={0}
            onSnapToItem={index => setActiveDot(index)}
            {...BANNER_CONFIG}
          />
          <View style={styles.container_carousel__pagination}>
            <Pagination
              activeDotIndex={activeDot}
              dotsLength={imageCarusel.length ?? 0}
              dotStyle={[styles.carousel_container_Pagination]}
              inactiveDotOpacity={0.3}
              inactiveDotScale={1}
            />
          </View>
        </>
      )}

      {imageCarusel?.length === 0 && !loadingProduct && (
        <View style={[styles.container_no_image]}>
          <Image
            style={[styles.container_no_image_img]}
            source={require('../../../../../../assets/images/imagenNofound.png')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  carousel_container: {
    width: '100%'
  },
  carousel_container_img: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.GRAYBRAND
  },
  container_carousel__pagination: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 2,
    bottom: 0
  },
  carousel_container_Pagination: {
    alignSelf: 'flex-end',
    elevation: 2,
    zIndex: 2,
    width: 10,
    height: 10,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: COLORS.DARK70,
    marginTop: 140
  },
  carousel_tag: {
    alignSelf: 'flex-end',
    width: 100,
    height: 40
  },
  carousel_tag_img: {
    width: '100%',
    height: '100%'
  },
  container_loading: {},
  container_no_image: {
    width: '100%',
    height: 480
  },
  container_no_image_img: {
    width: '100%',
    height: '100%'
  }
});
