import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  MARING_HORIZONTAL
} from '../../../../application/common';
import { getUrlImageHybris, fontWeightOS } from '../../../../application/utils';
import { useLinkPress } from '../../../../application/common/hooksCommons/useLinkPress';
import { IContentCategory } from './interfaces';

interface Props {
  customProps: IContentCategory;
}

const CategoryFeature = (props: Props) => {
  const { customProps: content } = props;

  const { goLink, goToPlp } = useLinkPress();
  const goToCategory = () => {
    try {
      const { url, category } = content;
      if (category) goToPlp({ category }, { title: content?.title ?? '' });
      else if (url) goLink(url, { title: content?.title ?? '' });
    } catch (err) {}
  };

  if (!content?.media?.url) return null;

  return (
    <TouchableOpacity style={[styles.container]} onPress={goToCategory}>
      <View style={[styles.container__img]}>
        <Image
          style={[styles.container__img_image]}
          source={{
            uri: getUrlImageHybris(content?.media?.url)
          }}
        />
      </View>
      <Text style={[styles.container__title]} numberOfLines={2}>
        {content?.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginStart: MARING_HORIZONTAL,
    marginEnd: 2
  },
  container__img: {
    width: 156,
    aspectRatio: 230 / 260, // 0.88:1
    borderRadius: 4,
    overflow: 'hidden'
  },
  container__img_image: {
    width: '100%',
    height: '100%'
  },
  container__title: {
    paddingTop: 8,
    width: 144,
    fontSize: FONTS_SIZES.legal,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    lineHeight: FONTS_SIZES.legal + 4,
    fontWeight: fontWeightOS('700'),
    color: COLORS.DARK,
    textAlign: 'center'
  }
});

export default CategoryFeature;
