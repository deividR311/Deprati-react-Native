import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  MARING_HORIZONTAL
} from '../../../../application/common';
import { getUrlImageHybris } from '../../../../application/utils';
import { useLinkPress } from '../../../../application/common/hooksCommons/useLinkPress';
import { testProps } from '../../../../application/utils/accessibleId';
import { useImageAspectRatio } from '../../../../application/common/hooksCommons/useImageAspectRatio.hook';
import { IContentCategory } from './interfaces';

interface Props {
  content: IContentCategory;
  testId: string;
}

const CategoryMainItem = (props: Props) => {
  const { content, testId = '' } = props;
  const { goLink, goToPlp } = useLinkPress();
  const goToCategory = () => {
    try {
      const { category, title, urlLink, url } = content ?? {};
      const path = urlLink ?? url ?? '';
      if (category) goToPlp({ category }, { title: title ?? '' });
      else if (path) goLink(path, { title: title ?? '' });
    } catch (err) {}
  };
  const aspectRatio =
    useImageAspectRatio(getUrlImageHybris(content?.media?.url)) ?? 163 / 243;

  if (!content?.media?.url) return null;

  return (
    <View style={[styles.container]} {...testProps(testId)} accessible>
      <TouchableOpacity
        onPress={goToCategory}
        {...testProps(testId)}
        accessible>
        <Image
          style={[styles.container__img, { aspectRatio }]}
          resizeMode={'contain'}
          source={{
            uri: getUrlImageHybris(content?.media?.url)
          }}
        />
      </TouchableOpacity>
      <Text style={[styles.container__label_title]}>{content?.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 163,
    marginEnd: 8,
    borderRadius: 4,
    overflow: 'hidden'
    //backgroundColor: 'blue',
  },
  container__img: {
    aspectRatio: 163 / 243 // .74:1
  },
  container__title: {
    paddingLeft: MARING_HORIZONTAL,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: COLORS.WHITE
  },
  container__title_text: {
    fontSize: FONTS_SIZES.legal,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: '500',
    color: COLORS.DARK70
  },
  container__categories: {
    paddingLeft: MARING_HORIZONTAL,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container__label_title: {
    width: '100%',
    color: COLORS.DARK70,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    fontSize: FONTS_SIZES.legal,
    fontWeight: '500',
    paddingTop: 4,
    textAlign: 'center'
  }
});

export default CategoryMainItem;
