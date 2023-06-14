import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../../application/common/layout';
export const SkeletonGrid = () => {
  // return null

  return (
    <>
      <FlatList
        testID="skeleton-grid"
        style={styles.list}
        ListHeaderComponent={() => <View style={styles.header} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        numColumns={2}
        data={[1, 2, 3, 4]}
        renderItem={() => (
          <View style={styles.item}>
            <View style={styles.containerGrid}>
              <SkeletonContent
                containerStyle={[]}
                isLoading={true}
                animationDirection="horizontalLeft"
                layout={[
                  {
                    key: 'Image',
                    alignSelf: 'center',
                    width: 150,
                    height: 200,
                    marginBottom: 6
                  },
                  {
                    key: 'title',
                    marginTop: 5,
                    alignSelf: 'auto',
                    marginLeft: 7,
                    width: 120,
                    height: 25
                  },
                  {
                    key: 'price',
                    marginTop: 5,
                    marginLeft: 7,
                    width: 70,
                    height: 25
                  },
                  {
                    key: 'color',
                    marginTop: 5,
                    marginLeft: 7,
                    borderRadius: 10,
                    width: 20,
                    height: 20
                  }
                ]}
              />
            </View>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: { width: layout.window.width, marginBottom: HEIGHT_TAB_BAR },
  header: { height: 20 },
  separator: { height: 30 },
  item: { width: layout.window.width / 2 - 3, paddingHorizontal: 10 },
  containerGrid: { width: layout.window.width / 2 - 15 }
});
