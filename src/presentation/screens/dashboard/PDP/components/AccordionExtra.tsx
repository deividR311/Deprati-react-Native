import React, { useMemo } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES,
  FontStyles
} from '../../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { List } from 'react-native-paper';
import { getUrlImageHybris } from '../../../../../application/utils/urls';
import { RightIconAccordion } from '../../../../common-components/RightIconAccordion/RightIconAccordion';
import { productResponse } from '../../../../../infrastucture/apis/product';
import RenderHTML from '../../../../common-components/renderHtml/RenderHTML';
import { useImageAspectRatio } from '../../../../../application/common/hooksCommons/useImageAspectRatio.hook';

interface Props {
  contentProduct: productResponse;
}
const SIZE_GUIDE = 'Guía de tallas';

export const AccordionExtra = ({ contentProduct }: Props) => {
  const { technicalCharacteristics, sizeChartImage } = contentProduct ?? {};

  const titleAccordion: string = useMemo(() => {
    if (technicalCharacteristics) return 'Características técnicas';
    if (sizeChartImage) return SIZE_GUIDE;
    return '';
  }, [technicalCharacteristics]);
  const uriImage = getUrlImageHybris(sizeChartImage?.url ?? '') ?? '';
  const aspectRatio = useImageAspectRatio(uriImage);

  if (!titleAccordion) return null;

  return (
    <List.Accordion
      right={RightIconAccordion}
      title={titleAccordion}
      id="2"
      titleStyle={[
        styles.container__accordion_text,
        {
          textTransform: titleAccordion === SIZE_GUIDE ? 'none' : 'capitalize'
        }
      ]}
      style={styles.container__accordion}>
      {technicalCharacteristics && (
        <View style={styles.root_container}>
          <RenderHTML text={technicalCharacteristics} />
        </View>
      )}
      {sizeChartImage?.url && (
        <Image
          style={[styles.container__image, { aspectRatio }]}
          resizeMode="contain"
          source={{ uri: uriImage }}
        />
      )}
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: MARING_HORIZONTAL
  },
  container__accordion: {
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderTopWidth: 0.5,
    borderColor: COLORS.GRAYDARK60,
    height: 50,
    justifyContent: 'center'
  },
  container__accordion_text: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.subtitle1,
    color: COLORS.DARK70,
    fontWeight: '500'
  },
  container__image: {
    marginVertical: MARING_HORIZONTAL,
    marginHorizontal: MARING_HORIZONTAL,
    aspectRatio: 0.5
  },
  root_container: {
    paddingVertical: 8,
    marginLeft: 16,
    marginRight: 64
  },
  p: {
    ...FontStyles.Body_2,
    lineHeight: 20,
    paddingBottom: 0,
    marginBottom: -50
  },
  ul: {
    flexDirection: 'column',
    paddingLeft: 8,
    paddingVertical: 8,
    width: '100%'
  },
  li_ul: {
    paddingLeft: 8
  },
  li: {
    ...FontStyles.Body_2,
    paddingLeft: 16
  }
});
