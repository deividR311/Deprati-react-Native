import React from 'react';
//Libs
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../../../../application/common/colors';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../../application/common/layout';
import { ILoadingFavorite } from '../../interfaces';
import ItemGrid from './ItemGrid';
//Styles

export default function Grid({
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
  ListHeader?: React.ComponentType<any> | React.ReactElement | null | undefined;
}) {
  return (
    <FlatList
      style={styles.list}
      keyExtractor={(_, index) => index.toString()}
      columnWrapperStyle={styles.column}
      ListHeaderComponent={ListHeader}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      scrollEventThrottle={1}
      ListFooterComponent={
        <>
          {loading && <ActivityIndicator size="large" color={COLORS.DARK70} />}
        </>
      }
      onEndReached={() => {
        nextPage();
      }}
      numColumns={2}
      data={listProducts}
      renderItem={({ item, index }) => (
        <View style={styles.item}>
          <ItemGrid
            data={item}
            onAddFavorite={onAddFavorite}
            loadingFavorite={loadingFavorite}
            testId={`item${index}`}
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
  header: { height: 20 },
  separator: { height: 30 },
  item: { width: layout.window.width / 2 - 3, paddingHorizontal: 10 },
  column: { backgroundColor: COLORS.WHITE }
});
