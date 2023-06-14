import React, { useMemo } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';
import { MARING_HORIZONTAL } from '../../../application/common/layout';
import { IProductsCarousel } from '.';
import { ImageFormat, ImageType } from '../../../application/utils';

interface Props {
  item: IProductsCarousel;
}

const ItemProductCarousel = (props: Props) => {
  const { item } = props;
  const { goToPdp } = useLinkPress();

  const imageUrl = useMemo(() => {
    if (item?.images?.length > 0) {
      const image = item?.images?.find(
        img =>
          img?.format === ImageFormat.PRODUCT &&
          img?.imageType === ImageType.PRIMARY
      );
      return image?.url ?? '';
    }

    return '';
  }, [item?.images]);

  const handlePress = () => {
    goToPdp(item.code, true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          resizeMode="stretch"
          source={{ uri: imageUrl }}
          style={styles.container__image}
        />
        <View style={styles.container__description}>
          <Text style={styles.container__description_text} numberOfLines={3}>
            {item?.name}
          </Text>
          <Text style={styles.container__description_price}>
            {item?.price?.formattedValue}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 400,
    marginTop: 20,
    marginHorizontal: MARING_HORIZONTAL
  },
  container__image: {
    width: '100%',
    height: 240,
    borderRadius: 4
  },
  container__description: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container__description_text: {
    width: '60%',
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    fontSize: FONTS_SIZES.legal,
    // opacity: 0.6,
    letterSpacing: 0.01,
    lineHeight: 16,
    color: COLORS.DARK70
  },
  container__description_price: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.legal,
    color: COLORS.BRAND
  }
});

export default ItemProductCarousel;
