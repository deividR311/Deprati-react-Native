import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { useRecommendProducts } from '../../../../common-components/recommended-home';
import RecommendedItem from '../../../../common-components/recommended-item';

interface Props {
  customProps: any;
}

export const SimilarReferencesComponent = (props: Props) => {
  const { customProps } = props;
  const { productsEmarsys } = useRecommendProducts(customProps);

  return (
    <View style={styles.container}>
      <View style={styles.container__title}>
        <Text style={styles.container__title_text}>
          {customProps?.title ?? 'Productos similares'}
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={productsEmarsys}
        renderItem={item => {
          return <RecommendedItem item={item.item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    marginTop: MARING_HORIZONTAL
  },
  container__title: {
    paddingLeft: MARING_HORIZONTAL,
    marginTop: MARING_HORIZONTAL
  },
  container__title_text: {
    ...FontStyles.H3_Headline,
    textAlign: 'left'
  },
  container__categories: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default SimilarReferencesComponent;
