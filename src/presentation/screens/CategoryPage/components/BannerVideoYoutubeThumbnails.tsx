import React, { useMemo, useState, useLayoutEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  Platform
} from 'react-native';
import { YoutubeMedia } from '../../../../infrastucture/apis/support-tickets/types';
import { COLORS } from '../../../../application/common';
import YoutubePlayer from 'react-native-youtube-iframe';

interface Props {
  videoId: string;
  youtubeMedia?: YoutubeMedia;
  styles: {
    banner__container: any;
    banner__container_img: any;
  };
  aspectRatio: number;
  height?: number;
  width?: number;
  [key: string]: any;
  focus: boolean;
}

const BannerVideoYoutubeThumbnails = (props: Props) => {
  const {
    videoId,
    height,
    width,
    styles: stylesCustom,
    cloudflareProps,
    focus = false
  } = props;
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const { width: widthScreen } = useWindowDimensions();

  const aspectRatio = useMemo(() => {
    return props?.aspectRatio ?? 515 / 772;
  }, [props?.aspectRatio]);

  const uriThumbnailVideo = useMemo(() => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }, [videoId]);

  useLayoutEffect(() => {
    setShowVideo(cloudflareProps?.autoplay);
  }, [cloudflareProps?.autoplay]);

  return (
    <View
      style={[
        styles.banner__container,
        stylesCustom.banner__container,
        { aspectRatio }
      ]}>
      {showVideo ? (
        <TouchableOpacity onPress={() => {}}>
          <YoutubePlayer
            height={height ?? 515}
            width={width ?? widthScreen}
            play={showVideo && focus}
            videoId={videoId}
            webViewStyle={styles.webView}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setShowVideo(true)}>
          <ImageBackground
            style={[
              styles.banner__container_img,
              stylesCustom.banner__container_img
            ]}
            onError={() => {
              console.log('An error occurred while loading the video');
            }}
            resizeMode="center"
            source={{
              uri: uriThumbnailVideo
            }}>
            <TouchableOpacity onPress={() => setShowVideo(true)}>
              <Image
                style={[styles.banner__container_play]}
                source={require('../../../../../assets/icons/play.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  webView: Platform.select({
    // Fix crash on Android devices that use overscroll.
    // The webview inside the youtubeplayer causes a crash when the
    // parent scrollview scrolled to the top or bottom and causes a
    // overscoll effect. Setting the opacity to 0.99 on Android
    // prevents this problem.
    // https://github.com/react-native-webview/react-native-webview/issues/1915#issuecomment-808869253
    android: { opacity: 0.99 },
    default: {}
  }),
  banner__container: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE
  },
  banner__container_img: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE
  },
  banner__container_play: {
    width: 48,
    height: 48,
    tintColor: '#C4C4C4CC',
    alignSelf: 'center',
    zIndex: 3
  },
  video_expand: {
    position: 'absolute',
    elevation: 4,
    zIndex: 40,
    right: 5,
    top: 5
  }
});

export default BannerVideoYoutubeThumbnails;
