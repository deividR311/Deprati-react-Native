import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../../application/common/layout';
export const CartSkeleton = () => {
  // return null

  return (
    <FlatList
      style={{ width: '100%' }}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={() => <View style={styles.header} />}
      numColumns={1}
      data={[1, 2, 3]}
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
                },
                {
                  key: 'cont',
                  marginTop: 10,
                  marginLeft: 40,
                  width: 120,
                  height: 50
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
                  marginTop: 0,
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
                  width: 50,
                  height: 20
                },
                {
                  key: 'talla',
                  marginTop: 5,
                  marginLeft: 7,
                  width: 50,
                  height: 20
                },
                {
                  key: 'employee',
                  marginTop: 5,
                  marginLeft: 7,
                  width: 100,
                  height: 23
                },
                {
                  key: 'temporada',
                  marginTop: 5,
                  marginLeft: 7,
                  width: 100,
                  height: 23
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
    marginTop: 20,
    paddingBottom: 20,
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
