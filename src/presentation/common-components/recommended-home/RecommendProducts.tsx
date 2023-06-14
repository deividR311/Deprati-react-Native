import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../application/common/layout';
import { ExtensionComponentProps } from '../extension-component';
import RecommendedItem from '../recommended-item';
import { useRecommendProducts } from './useRecommendProducts.hook';

interface Props {
  customProps: customProp;
}

interface customProp extends ExtensionComponentProps {}

const RecommendedProducts = (props: Props) => {
  const { customProps } = props;
  const { style: customStyle } = customProps;
  const { productsEmarsys } = useRecommendProducts(customProps);
  if (productsEmarsys?.length <= 0) return null;

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
        keyExtractor={(item, index) => index.toString()}
        data={productsEmarsys}
        renderItem={item => {
          return <RecommendedItem item={item.item} />;
        }}
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
    fontWeight: '500',
    color: COLORS.DARK70
  },
  container__categories: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container__divider_top: {
    alignSelf: 'center',
    height: 1,
    backgroundColor: COLORS.DARK,
    opacity: 0.1,
    width: '90%',
    marginTop: 16,
    marginBottom: 10
  },
  container__divider_bottom: {
    height: 0
  }
});

export default RecommendedProducts;
