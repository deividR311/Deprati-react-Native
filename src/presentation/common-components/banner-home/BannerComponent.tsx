import {
  View,
  Image,
  StyleSheet,
  Pressable,
  ViewStyle,
  ImageStyle
} from 'react-native';
import React from 'react';
import { SvgUri } from 'react-native-svg';
import type { ExtensionComponentProps } from '../extension-component';
import { getUrlImageHybris } from '../../../application/utils/urls';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';
import { useImageAspectRatio } from '../../../application/common/hooksCommons/useImageAspectRatio.hook';
import { ASPECT_RATIO } from '../../../application/utils';
import { COLORS } from '../../../application/common';

interface Props {
  customProps: customProp;
}

interface customProp extends ExtensionComponentProps {
  code: string;
  mime: string;
  altText: string;
  url: string;
  downloadUrl: string;
  height?: number;
  style?: {
    container?: ViewStyle;
    image?: ImageStyle;
  };
  customAspectRatio?: number;
}

const BannerComponent = (props: Props) => {
  const {
    customProps: { style: customStyle, media, urlLink, customAspectRatio }
  } = props;

  const { goLink } = useLinkPress();
  const { mime = 'png', url } = media ?? {};
  const aspectRatio = useImageAspectRatio(getUrlImageHybris(url));
  if (!media && !url) return null;

  return (
    <Pressable onPress={() => goLink(urlLink)}>
      <View style={[styles.container, customStyle?.container]}>
        {mime?.includes('svg') ? (
          <SvgUri width="100%" height="100%" uri={getUrlImageHybris(url)} />
        ) : (
          <Image
            resizeMode="contain"
            style={[
              styles.image,
              { aspectRatio: customAspectRatio ?? aspectRatio },
              customStyle?.image
            ]}
            source={{ uri: getUrlImageHybris(url) }}
          />
        )}
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    width: '100%',
    height: 'auto',
    aspectRatio: ASPECT_RATIO,
    backgroundColor: COLORS.GRAYBRAND
  },
  image: {
    width: '100%'
  }
});

export default BannerComponent;
