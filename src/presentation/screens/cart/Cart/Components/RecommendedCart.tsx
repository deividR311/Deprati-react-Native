import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { productToCartItem } from '../../../../../infrastucture/native-modules/emarsys/emarsys';
import { Entry } from '../../../../../infrastucture/apis/shopping-cart';
import { useRecommendProducts } from '../../../../common-components/recommended-home';
import { stylesRecommend as styles } from '../../../../common-components/recommended-home/RecommendProducts.styles';
import RecommendedItem from '../../../../common-components/recommended-item';

interface Props {
  shoppingCartItems: Entry[];
}

const RecommendedCart = ({ shoppingCartItems = [] }: Props) => {
  const cartItems = useMemo(() => {
    return shoppingCartItems.map(productToCartItem);
  }, [shoppingCartItems]);

  const customProps = useMemo(() => {
    return {
      title: 'Recomendados para ti',
      logic: 'CART',
      cartItems: cartItems
    };
  }, [cartItems]);

  const { productsEmarsys } = useRecommendProducts(customProps);
  if (productsEmarsys?.length <= 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.container__title}>
        <Text style={styles.container__title_text}>{customProps?.title}</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={index => index.toString()}
        data={productsEmarsys || []}
        renderItem={({ item }) => {
          return <RecommendedItem item={item} />;
        }}
      />
    </View>
  );
};

export default RecommendedCart;
