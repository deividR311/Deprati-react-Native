import React, { useMemo } from 'react';
import { StyleSheet, FlatList, View, Image, Text } from 'react-native';
import { COLORS, FontStyles } from '../../../../application/common';
import { useAppSelector } from '../../../../application/state-manager';
import { ShoppingCartStateSelector } from '../../../../application/state-manager/services/checkout';
import { getUrlImageHybris } from '../../../../application/utils/urls';
import { PickupTimeRanges } from '../../../../infrastucture/apis/delivery-thirdparty';
import { Product } from '../../../../infrastucture/apis/shopping-cart';

interface Props {
  items: PickupTimeRanges['items'];
}

export default function ItemsDelivery(props: Props) {
  const { items } = props;
  const { entries: productsCart = [] } = useAppSelector(
    ShoppingCartStateSelector
  );

  const itemsDelivery: Product[] = useMemo(() => {
    if (!items?.length || !productsCart?.length) return [];
    return productsCart
      .filter(
        item => items?.findIndex(i => i.code === item?.product?.code) >= 0
      )
      .map(item => item.product);
  }, [items, productsCart]);

  const renderItem = (item: { item: Product }) => {
    const { item: product } = item;
    const [image] = product?.images ?? [null];

    return (
      <View style={styles.itemsDeliveryThirdParty_item}>
        {image?.url ? (
          <Image
            resizeMode="stretch"
            source={{ uri: getUrlImageHybris(image?.url) }}
            style={styles.item_img}
          />
        ) : (
          <Image
            style={styles.item_img}
            source={require('../../../../../assets/images/imagenNofound.png')}
          />
        )}

        <Text style={styles.item_description} numberOfLines={3}>
          {product?.name}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={itemsDelivery}
      renderItem={renderItem}
      style={styles.scroll}
      contentContainerStyle={styles.itemsDeliveryThirdParty}
    />
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%'
  },
  itemsDeliveryThirdParty: {},
  itemsDeliveryThirdParty_item: {
    width: 104,
    marginHorizontal: 8,
    marginVertical: 16,
    borderRadius: 4
  },
  item_img: {
    width: '100%',
    height: 160,
    borderRadius: 4
  },
  item_description: {
    ...FontStyles.Caption,
    width: '80%',
    color: COLORS.DARK70
  }
});
