import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout from '../../../../../../application/common/layout';

export const StorePickupSkeleton = () => {
  // return null

  return (
    <View style={styles.list}>
      <SkeletonContent
        containerStyle={{}}
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'title',
            marginTop: 20,
            alignSelf: 'center',
            marginLeft: 7,
            width: 220,
            height: 25
          },
          {
            key: 'dropDown1',
            marginTop: 30,
            alignSelf: 'center',
            marginLeft: 7,
            width: 300,
            height: 40
          },
          {
            key: 'dropDown2',
            marginTop: 10,
            alignSelf: 'center',
            marginLeft: 7,
            width: 300,
            height: 40
          },
          {
            key: 'address',
            marginTop: 20,
            alignSelf: 'center',
            marginLeft: 7,
            width: 300,
            height: 120
          },
          {
            key: 'btn-clean',
            marginTop: 20,
            alignSelf: 'auto',
            marginLeft: 35,
            width: 120,
            height: 40
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: 20
    // flexDirection: 'row',
  },
  header: { height: 20 },
  separator: { height: 10 },
  containerPhoto: {
    width: layout.window.width * 0.97,
    // height: layout.window.height * 0.85,
    alignSelf: 'center'
  }
});
