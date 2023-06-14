import {
  View,
  Image,
  StyleSheet,
  Pressable,
  ViewStyle,
  ImageStyle
} from 'react-native';
import React, { useState } from 'react';
import { SvgUri } from 'react-native-svg';
import type { ExtensionComponentProps } from '../extension-component';
import { getUrlImageHybris, sleep } from '../../../application/utils';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';
import { useImageAspectRatio } from '../../../application/common/hooksCommons/useImageAspectRatio.hook';

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

const SimpleBanner = (props: Props) => {
  const {
    customProps: { style: customStyle, media, urlLink, customAspectRatio }
  } = props;

  const [isProcessing, setIsProcessing] = useState(false);
  const { goLink } = useLinkPress();
  const { mime = 'png', url } = media ?? {};

  const aspectRatio = useImageAspectRatio(getUrlImageHybris(url), mime);

  const handleBannerPress = async () => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    goLink(urlLink);

    await sleep(3000);
    setIsProcessing(false);
  };

  if (!media && !url) return null;

  return (
    <Pressable onPress={handleBannerPress}>
      <View style={[styles.container, customStyle?.container]}>
        {mime?.includes('svg') ? (
          <SvgUri
            width="100%"
            height="100%"
            testID="simple-banner"
            uri={getUrlImageHybris(url)}
          />
        ) : (
          <Image
            resizeMode="contain"
            testID="simple-banner"
            source={{ uri: getUrlImageHybris(url) }}
            style={[
              styles.image,
              { aspectRatio: customAspectRatio ?? aspectRatio },
              customStyle?.image
            ]}
          />
        )}
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: '100%',
    height: 'auto'
  },
  image: {
    width: '100%'
  }
});

export default SimpleBanner;
