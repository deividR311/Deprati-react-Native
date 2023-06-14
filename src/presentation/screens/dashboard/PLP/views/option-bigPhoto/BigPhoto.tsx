import React from 'react';
//Libs
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../../../../application/common/colors';
import { HEIGHT_TAB_BAR } from '../../../../../../application/common/layout';
import { ILoadingFavorite } from '../../interfaces';
import ItemBigPhoto from './ItemBigPhoto';
//Styles

const ItemSeparatorCustom = () => <View />;

export default function BigPhoto({
  listProducts,
  nextPage,
  loading,
  onAddFavorite,
  loadingFavorite,
  ListHeader
}: {
  listProducts: any;
  loading: boolean;
  nextPage(): void;
  onAddFavorite(code: string, fav?: boolean): void;
  loadingFavorite: ILoadingFavorite;
  ListHeader: React.ComponentType<any> | React.ReactElement | null | undefined;
}) {
  return (
    <FlatList
      style={styles.list}
      ListHeaderComponent={ListHeader}
      ItemSeparatorComponent={ItemSeparatorCustom}
      // numColumns={1}
      ListFooterComponent={
        <>
          {loading && <ActivityIndicator size="large" color={COLORS.DARK70} />}
        </>
      }
      onEndReached={() => nextPage()}
      data={listProducts}
      renderItem={({ item, index }) => (
        <ItemBigPhoto
          data={item}
          onAddFavorite={onAddFavorite}
          loadingFavorite={loadingFavorite}
          testId={`item${index}`}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    paddingBottom: HEIGHT_TAB_BAR,
    backgroundColor: COLORS.WHITE,
    marginBottom: 40
  },
  header: { height: 20 }
  // separator: { height: 30 },
  // item: { width: '100%', paddingHorizontal: 10 , backgroundColor:'red'},
});
