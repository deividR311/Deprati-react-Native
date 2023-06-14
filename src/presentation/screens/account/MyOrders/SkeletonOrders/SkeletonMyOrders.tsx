import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../application/common/layout';

export const SkeletonMyOrders = () => {
  return (
    <FlatList
      style={{ width: '100%' }}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={() => <View style={styles.header} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      numColumns={1}
      data={[1, 2]}
      renderItem={item => (
        <View style={styles.list}>
          <View style={{ width: '50%' }}>
            <SkeletonContent
              isLoading={true}
              animationDirection="horizontalLeft"
              layout={[
                {
                  key: 'Image2',
                  alignSelf: 'center',
                  width: 150,
                  height: 180
                }
              ]}
            />
          </View>
          <View style={{ width: '50%' }}>
            <SkeletonContent
              key={'item'}
              isLoading={true}
              animationDirection="horizontalLeft"
              layout={[
                {
                  key: 'title',
                  marginTop: 5,
                  alignSelf: 'auto',
                  marginLeft: 7,
                  width: 120,
                  height: 20
                },
                {
                  key: 'date',
                  marginTop: 5,
                  marginLeft: 7,
                  width: 90,
                  height: 20
                },

                {
                  key: 'code',
                  marginTop: 10,
                  marginLeft: 7,
                  width: 150,
                  height: 20
                },
                {
                  key: 'article',
                  marginTop: 10,
                  marginLeft: 7,
                  width: 90,
                  height: 20
                },
                {
                  key: 'total',
                  marginTop: 30,
                  marginRight: 12,
                  alignSelf: 'flex-end',
                  width: 80,
                  height: 20
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
    marginTop: 5,
    flexDirection: 'row'
  },
  header: { height: 10 },
  separator: { height: 5 },
  containerPhoto: {
    width: layout.window.width * 0.97,
    // height: layout.window.height * 0.85,
    alignSelf: 'center'
  }
});
