import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../../application/common/layout';
export const SkeletonBigPhoto = () => {
  // return null

  return (
    <View testID="skeleton-big-photo" style={styles.list}>
      <View style={styles.containerPhoto}>
        <SkeletonContent
          containerStyle={[]}
          isLoading={true}
          animationDirection="horizontalLeft"
          layout={[
            {
              key: 'Image',
              alignSelf: 'center',
              width: 250,
              height: 400,
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
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: layout.window.height * 0.85,
    marginTop: 30,
    paddingBottom: HEIGHT_TAB_BAR
  },
  header: { height: 20 },
  separator: { height: 10 },
  containerPhoto: {
    width: layout.window.width * 0.97,
    // height: layout.window.height * 0.85,
    alignSelf: 'center'
  }
});
