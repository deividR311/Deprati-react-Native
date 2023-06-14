import React, { useMemo } from 'react';
//Libs
import {
  View,
  Image,
  ImageBackground,
  StyleProp,
  ViewStyle,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ImageResizeMode
} from 'react-native';
import { testProps } from '../../../../../../application/utils/accessibleId';
import {
  ImageFormat,
  ImageType
} from '../../../../../../application/utils/type-format-Image';
import { getUrlImageHybris } from '../../../../../../application/utils/urls';
import { IImageWishlist } from '../../../../../../infrastucture/apis/wishlist';
import { ImageProduct } from '../../interfaces/iProducts';

interface ComponentImageProductProps {
  style?: StyleProp<ViewStyle>;
  styleImage?: StyleProp<ImageStyle>;
  styleContentImage?: StyleProp<ImageStyle>;
  styleViewLabel?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<ImageStyle>;
  dataImages: { images: ImageProduct[] | IImageWishlist[]; labelNew?: string };
  goToPdp?(): void;
  disabled?: boolean;
  resizeMode?: ImageResizeMode;
  testId: string;
}

export default function ComponentImageProduct({
  style = {},
  styleImage = {},
  styleContentImage = {},
  styleViewLabel = {},
  styleLabel = {},
  dataImages,
  goToPdp,
  disabled = false,
  resizeMode = 'contain',
  testId = ''
}: ComponentImageProductProps) {
  const handleOnPress = () => {
    if (goToPdp) goToPdp();
  };

  const imageUrl = useMemo(() => {
    if (dataImages?.images?.length > 0) {
      const image = dataImages?.images?.find(
        img =>
          img?.format === ImageFormat.PRODUCT &&
          img?.imageType === ImageType.PRIMARY
      );
      return image?.url ?? null;
    }

    return null;
  }, [dataImages?.images]);

  return (
    <View style={style}>
      <TouchableOpacity
        {...testProps(testId)}
        onPress={handleOnPress}
        disabled={disabled}
        accessible>
        {imageUrl ? (
          <ImageBackground
            style={styleImage}
            imageStyle={styleContentImage}
            resizeMode={resizeMode}
            source={{ uri: getUrlImageHybris(imageUrl) }}>
            <View style={styleViewLabel}>
              {dataImages?.labelNew && (
                <Image
                  style={[styles.image, styleLabel]}
                  source={{ uri: getUrlImageHybris(dataImages.labelNew) }}
                />
              )}
            </View>
          </ImageBackground>
        ) : (
          <Image
            style={styleImage}
            source={require('../../../../../../../assets/images/imagenNofound.png')}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%' }
});
