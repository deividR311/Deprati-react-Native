import React from 'react';
//Libs
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform
} from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../application/common/layout';
import { IEntry } from '../../../../../infrastucture/apis/wishlist';

import ItemFavorite from './ItemFavorite';
//Styles

export default function ListFavorite({
  list,
  loading,
  addToCart,
  deleteFavorite,
  loadingDelete,
  disabledBtnAdd,
  testID
}: {
  list: IEntry[];
  loading: boolean;
  addToCart(productCode?: string): void;
  deleteFavorite(x: string): void;
  loadingDelete: boolean;
  disabledBtnAdd: boolean;
  testID?: string;
}) {
  return (
    <FlatList
      testID={testID}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={() => <View style={styles.header} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      scrollEventThrottle={1}
      numColumns={2}
      data={list}
      renderItem={({ item, index }) => (
        <View style={styles.item}>
          <ItemFavorite
            testID={`itemfavorite-${index}`}
            loading={loading}
            data={item.product}
            onPress={() => addToCart(item?.product.code)}
            onDelete={x => deleteFavorite(x)}
            loadingDelete={loadingDelete}
            disabledBtnAdd={disabledBtnAdd}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: layout.window.width,
    marginBottom: HEIGHT_TAB_BAR,
    backgroundColor: COLORS.WHITE
  },
  contentContainer: {
    paddingBottom: Platform.select({
      android: HEIGHT_TAB_BAR,
      ios: HEIGHT_TAB_BAR + 40
    })
  },
  header: { height: 20 },
  separator: { height: 30 },
  item: { width: layout.window.width / 2 - 3, paddingHorizontal: 10 }
});
