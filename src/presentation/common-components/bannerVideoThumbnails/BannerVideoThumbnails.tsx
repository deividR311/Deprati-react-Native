import React, { useMemo, useState, useRef, useLayoutEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StyleProp,
  ViewStyle
} from 'react-native';
import { CloudflareServices } from '../../../infrastucture/apis/cloudflare/services';
//@ts-ignore
import Video from 'react-native-video';
import { CloudflareVideo } from '../../../infrastucture/apis/support-tickets/types';
import { COLORS } from '../../../application/common';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';

interface Props {
  resizeMode: 'cover' | 'contain';
  videoId: string;
  cloudflareProps: CloudflareVideo;
  styles: {
    banner__container: StyleProp<ViewStyle>;
    banner__container_img: StyleProp<ViewStyle>;
  };
  focus?: boolean;
  aspectRatio?: number;
  customAspectRatio?: number;
  [key: string]: any;
}

const BannerVideoThumbnails = (props: Props) => {
  const {
    videoId,
    height,
    styles: stylesCustom,
    cloudflareProps,
    aspectRatio,
    customAspectRatio,
    focus = false,
    resizeMode = 'cover'
  } = props;
  const [showVideo, setShowVideo] = useState<boolean>(
    cloudflareProps?.autoplay ?? false
  );
  const videoRef = useRef<Video>();
  const { goLink } = useLinkPress();
  const uriThumbnailVideo = useMemo(() => {
    return CloudflareServices.getThumbnailUrl(videoId, {
      height,
      time: `${cloudflareProps?.thumbnailTime ?? 1}s`
    });
  }, [videoId]);

  useLayoutEffect(() => {
    setShowVideo(cloudflareProps?.autoplay || focus);
  }, [cloudflareProps?.autoplay, focus]);

  const handleAction = () => {
    if (cloudflareProps?.urlLink) {
      goLink(cloudflareProps.urlLink);
    } else {
      setShowVideo(false);
    }
  };

  const uriVideo = useMemo(() => {
    return CloudflareServices.getVideoUrl(videoId);
  }, [videoId]);

  const isMuted = useMemo(() => {
    if (!cloudflareProps?.muted && focus) return false;
    return true;
  }, [focus]);

  if (!videoId) return null;

  return (
    <View
      style={[
        styles.banner__container,
        stylesCustom.banner__container,
        { aspectRatio: customAspectRatio ?? aspectRatio }
      ]}>
      {showVideo ? (
        <TouchableOpacity onPress={handleAction}>
          <Video
            fullscreen={false}
            ref={videoRef}
            onEnd={() => {
              if (!cloudflareProps?.loop) {
                setShowVideo(false);
              }
            }}
            repeat={cloudflareProps?.loop ? true : false}
            //onPress={() => setShowVideo(true)}
            source={{
              uri: uriVideo
            }} // Can be a URL or a local file.
            style={[
              styles.banner__container_img,
              stylesCustom.banner__container_img
            ]}
            poster={uriThumbnailVideo}
            posterResizeMode={resizeMode}
            resizeMode={resizeMode} // cover - contain
            muted={isMuted}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleAction}>
          <ImageBackground
            style={[
              styles.banner__container_img,
              stylesCustom.banner__container_img
            ]}
            onError={() => {
              console.log('An error occurred while loading the video');
            }}
            resizeMode={resizeMode}
            source={{
              uri: uriThumbnailVideo
            }}>
            <TouchableOpacity onPress={() => setShowVideo(true)}>
              <Image
                style={[styles.banner__container_play]}
                source={require('../../../../assets/icons/play.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  banner__container: {
    marginTop: 16,
    width: '100%',
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

export default BannerVideoThumbnails;
