import { View, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { SvgUri } from 'react-native-svg';
import type { ExtensionComponentProps } from '../extension-component';
import { getUrlImageHybris } from '../../../application/utils/urls';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';

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
}

const BannerHome = (props: Props) => {
  const {
    customProps: { style: customStyle, media, urlLink }
  } = props;
  const { goLink } = useLinkPress();
  const { mime, url } = media ?? {};
  if (!media && !url) return null;

  return (
    <Pressable onPress={() => goLink(urlLink)}>
      <View style={[styles.container, customStyle]}>
        {mime?.includes('svg') ? (
          <SvgUri width="100%" height="100%" uri={getUrlImageHybris(url)} />
        ) : (
          <Image
            style={[styles.image]}
            source={{ uri: getUrlImageHybris(url) }}
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
    height: 120
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default BannerHome;
