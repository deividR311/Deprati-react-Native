import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import RenderHTML from '../../../../common-components/renderHtml/RenderHTML';
import BannerVideoYoutubeThumbnails from '../../../CategoryPage/components/BannerVideoYoutubeThumbnails';
import BannerVideoThumbnails from '../../../../common-components/bannerVideoThumbnails/BannerVideoThumbnails';
import { fontFamilyOS, fontWeightOS } from '../../../../../application/utils';
import { CloudflareVideo } from '../../../../../infrastucture/apis/support-tickets/types';

interface Props {
  description: string;
  detailVideoMedia?: {
    youtubeLink: string;
    mediaFormat: string;
    videoID: string;
  };
  detailVideoMediaCloudflare?: CloudflareVideo;
}

export const ProductDetailsPageDetailsComponent = ({
  description,
  detailVideoMedia,
  detailVideoMediaCloudflare
}: Props) => {
  const { width } = useWindowDimensions();

  if (!description || description?.length === 0) return null;

  return (
    <View style={styles.root_container}>
      {detailVideoMediaCloudflare?.videoId ? (
        <BannerVideoThumbnails
          height={detailVideoMediaCloudflare?.height}
          width={detailVideoMediaCloudflare?.width}
          videoId={detailVideoMediaCloudflare?.videoId}
          aspectRatio={200 / 120}
          styles={{
            banner__container: styles.carousel_container,
            banner__container_img: styles.carousel_container_img
          }}
          cloudflareProps={detailVideoMediaCloudflare}
          resizeMode="contain"
        />
      ) : (
        detailVideoMedia?.youtubeLink && (
          <BannerVideoYoutubeThumbnails
            height={200}
            width={width - 32}
            videoId={detailVideoMedia?.videoID}
            aspectRatio={200 / 120}
            styles={{
              banner__container: styles.carousel_container,
              banner__container_img: styles.carousel_container_img
            }}
          />
        )
      )}

      <RenderHTML
        contentWidth={width}
        tagsStyles={tagsStyles}
        text={description}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root_container: {
    width: '90%',
    paddingVertical: 8,
    marginHorizontal: 16
  },
  carousel_container: {
    width: '100%'
  },
  carousel_container_img: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.GRAYBRAND
  }
});

const tagsStyles = StyleSheet.create({
  strong: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('bold')
  }
});
