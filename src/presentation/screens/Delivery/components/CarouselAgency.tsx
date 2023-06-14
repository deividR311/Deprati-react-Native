import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SvgCssUri } from 'react-native-svg';
import { COLORS } from '../../../../application/common';

export default function CarouselAgency() {
  const images = [
    'https://imagesdevapp.deprati.com.ec/checkout/courier1.svg',
    'https://imagesdevapp.deprati.com.ec/checkout/courier2.svg'
  ];

  const width = Dimensions.get('screen').width;
  const widthBanner = width / 3.2;

  const BANNER_CONFIG = {
    autoplay: true,
    //autoplayDelay: 2000,
    autoplayInterval: 2000,
    sliderWidth: widthBanner,
    itemWidth: widthBanner,
    removeClippedSubviews: false,
    loop: true,
    loopClonesPerSide: images.length
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (item?.endsWith('.svg')) {
      return <SvgCssUri width={widthBanner} height={40} uri={item} />;
    }
    return (
      <Image
        resizeMode="contain"
        key={index}
        style={[
          styles.container_img,
          {
            width: widthBanner
          }
        ]}
        source={{
          uri: item
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Carousel data={images} renderItem={renderItem} {...BANNER_CONFIG} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.WHITE
  },
  container_img: {
    width: '100%',
    height: '100%'
  }
});
