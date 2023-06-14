import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';
import { getUrlImageHybris } from '../../../application/utils/urls';

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

  //const width = Dimensions.get('screen').width
  //const widthBanner = width

  const { goLink } = useLinkPress();

  const handleNavigateTo = () => {
    if (urlLink) goLink(urlLink, { title: headline ?? '' });
  };

  return (
    <View
      style={[
        styles.banner__container,
        { height },
        stylesCustom.banner__container
      ]}>
      <TouchableOpacity onPress={handleNavigateTo}>
        <Image
          style={[styles.banner__container_img]}
          source={{
            uri: getUrlImageHybris(media?.url)
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner__container: {
    marginTop: 16,
    width: '100%',
    height: '100%'
  },
  banner__container_img: {
    width: '100%',
    height: '100%'
  }
});

export default BannerImg;
