import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../../application/common/layout';
export const SkeletonList = () => {
  // return null

  return (
    <FlatList
      testID="skeleton-list"
      style={{ width: '100%' }}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={() => <View style={styles.header} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      numColumns={1}
      data={[1, 2]}
      renderItem={() => (
        <View style={styles.list}>
          <View style={{ width: '50%' }}>
            <SkeletonContent
              containerStyle={{}}
              isLoading={true}
              animationDirection="horizontalLeft"
              layout={[
                {
                  key: 'Image',
                  alignSelf: 'center',
                  width: 150,
                  height: 200,
                  marginBottom: 6
                }
              ]}
            />
          </View>
          <View style={{ width: '50%' }}>
            <SkeletonContent
              containerStyle={{}}
              isLoading={true}
              animationDirection="horizontalLeft"
              layout={[
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
                  width: 90,
                  height: 25
                },

                {
                  key: 'color',
                  marginTop: 5,
                  marginLeft: 7,
                  borderRadius: 10,
                  width: 20,
                  height: 20
                },
                {
                  key: 'star',
                  marginTop: 5,
                  marginLeft: 7,
                  borderRadius: 10,
                  width: 20,
                  height: 20
                },
                {
                  key: 'text',
                  marginTop: 10,
                  marginLeft: 7,
                  width: 120,
                  height: 55
                }
              ]}
            />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: 30,
    paddingBottom: HEIGHT_TAB_BAR,
    flexDirection: 'row'
  },
  header: { height: 20 },
  separator: { height: 10 },
  containerPhoto: {
    width: layout.window.width * 0.97,
    // height: layout.window.height * 0.85,
    alignSelf: 'center'
  }
});
