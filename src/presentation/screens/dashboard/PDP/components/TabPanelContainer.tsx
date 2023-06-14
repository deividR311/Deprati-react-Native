import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { List } from 'react-native-paper';
import { ProductDetailsPageDetailsComponent } from './ProductDetailsPageDetailsComponent';
import { ProductDetailsPageReviewsComponent } from './ProductDetailsPageReviewsComponent';
import { AccordionExtra } from './AccordionExtra';
import type { productResponse } from '../../../../../infrastucture/apis/product';
import { RightIconAccordion } from '../../../../common-components/RightIconAccordion/RightIconAccordion';

interface Props {
  contentProduct: productResponse;
}

export const TabPanelContainer = ({ contentProduct }: Props) => {
  return (
    <View style={styles.container}>
      <List.AccordionGroup>
        <List.Accordion
          title="Detalle de producto"
          id="1"
          style={[
            styles.container__accordion,
            styles.container__accordion_borderTop
          ]}
          titleStyle={styles.container__accordion_text}
          right={RightIconAccordion}>
          <ProductDetailsPageDetailsComponent
            description={contentProduct?.description}
            detailVideoMedia={contentProduct?.detailVideoMedia}
            detailVideoMediaCloudflare={
              contentProduct?.detailVideoMediaCloudflare
            }
          />
        </List.Accordion>
        <List.Accordion
          right={RightIconAccordion}
          title="Reseñas"
          id="3"
          titleStyle={styles.container__accordion_text}
          style={styles.container__accordion}>
          <ProductDetailsPageReviewsComponent
            reviews={contentProduct?.reviews}
            numberOfReviews={contentProduct?.numberOfReviews}
            code={contentProduct?.code}
          />
        </List.Accordion>
        <AccordionExtra contentProduct={contentProduct} />
      </List.AccordionGroup>
    </View>
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
  container__accordion_borderTop: {
    borderTopWidth: 1
  },
  container__accordion_text: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.subtitle1,
    color: COLORS.DARK70,
    //textTransform: 'capitalize',
    fontWeight: '500'
  }
});
