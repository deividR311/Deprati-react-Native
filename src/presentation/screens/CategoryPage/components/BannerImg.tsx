import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getUrlImageHybris } from '../../../../application/utils/urls';
import { useLinkPress } from '../../../../application/common/hooksCommons/useLinkPress';

interface Props {
  media: any;
  styles: {
    banner__container: any;
    banner__container_img: any;
  };
  [key: string]: any;
}

const BannerImg = (props: Props) => {
  const { media, height, styles: stylesCustom, urlLink, headline } = props;
  const { goLink } = useLinkPress();

  const handleNavigateTo = () => {
    if (urlLink) goLink(urlLink, { title: headline ?? '' });
  };

  return (
    <TouchableOpacity
      onPress={handleNavigateTo}
      style={[
        styles.banner__container,
        { height },
        stylesCustom.banner__container
      ]}>
      <Image
        style={[styles.banner__container_img]}
        resizeMode="contain"
        source={{
          uri: getUrlImageHybris(media?.url)
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner__container: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1.76
  },
  banner__container_img: {
    width: '100%',
    height: '100%'
  }
});

export default BannerImg;
