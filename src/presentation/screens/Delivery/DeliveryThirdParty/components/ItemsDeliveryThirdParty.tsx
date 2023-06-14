import React, { useEffect, useMemo } from 'react';
import { StyleSheet, FlatList, View, Image, Text } from 'react-native';
import { COLORS, FontStyles } from '../../../../../application/common';
import { getUrlImageHybris } from '../../../../../application/utils/urls';
import { selectThirdPartyAgencyResponse } from '../../../../../infrastucture/apis/delivery-thirdparty';
import { productResponse } from '../../../../../infrastucture/apis/product';

interface Props {
  data: selectThirdPartyAgencyResponse;
}

export default function ItemsDeliveryThirdParty(props: Props) {
  const { data } = props;

  const itemsDeliveryThirdParty = useMemo(() => {
    if (data?.deliveryTimeRanges?.length > 0) {
      const [deliveryTime] = data?.deliveryTimeRanges;
      return deliveryTime?.items;
    }
    return [];
  }, [data]);

  const renderItem = item => {
    const { item: product } = item;

    const [image] = product?.images;

    return (
      <View style={styles.itemsDeliveryThirdParty_item}>
        <Image
          resizeMode="stretch"
          source={{ uri: getUrlImageHybris(image?.url) }}
          style={styles.item_img}
        />

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
      horizontal
      data={itemsDeliveryThirdParty}
      renderItem={renderItem}
      style={styles.scroll}
      contentContainerStyle={styles.itemsDeliveryThirdParty}
    />
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    marginLeft: 8
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
    height: 160
  },
  item_description: {
    ...FontStyles.Caption,
    width: '80%',
    color: COLORS.DARK70
  }
});
