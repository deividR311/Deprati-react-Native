import React, { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../application/common/layout';
import ItemProductCarousel from './ItemProductCarousel';
import { useSearchMutationRequest } from '../../../infrastucture/apis/product';
import {
  IProductsCarousel,
  IResponseProductsCarousel,
  Props
} from './IProductsCarousel.interface';

const ProductCarouselComponent = (props: Props) => {
  const { customProps } = props;
  const { style: customStyle, productCodes } = customProps;
  const [product, setProduct] = useState<IProductsCarousel[]>([]);

  const [_getSearchProduct] = useSearchMutationRequest();

  useLayoutEffect(
    useCallback(() => {
      loadProductsCarousel();
    }, []),
    []
  );

  async function loadProductsCarousel() {
    try {
      // const _query = '115020004500184002 123020250002132001 123020307732862003'

      const result = (await _getSearchProduct({
        query: productCodes ?? '',
        currentPage: 0
      })) as unknown as IResponseProductsCarousel;
      setProduct(result?.data?.products ?? []);
    } catch (error) {
      console.log('error Get ProductsCarousel', error);
    }
  }
  if (!product.length) return null;
  return (
    <View style={styles.container}>
      <Divider
        style={[
          styles.container__divider_top,
          customStyle?.container__divider_top
        ]}
      />
      <View style={styles.container__title}>
        <Text style={styles.container__title_text}>{customProps?.title}</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        data={product}
        renderItem={({ item }) => <ItemProductCarousel item={item} />}
      />
      <Divider
        style={[
          styles.container__divider_bottom,
          customStyle?.container__divider_bottom
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    marginTop: 16
  },
  container__title: {
    paddingLeft: MARING_HORIZONTAL,
    marginTop: 15
  },
  container__title_text: {
    fontSize: FONTS_SIZES.subtitle1,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: '600',
    color: COLORS.DARK70,
    lineHeight: 24
  },
  container__categories: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container__divider_top: {
    height: 0
  },
  container__divider_bottom: {
    height: 0
  }
});

export default ProductCarouselComponent;
