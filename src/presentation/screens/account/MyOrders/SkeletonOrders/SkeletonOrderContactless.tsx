import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import layout, {
  HEIGHT_TAB_BAR
} from '../../../../../application/common/layout';

export const SkeletonOrderContactless = () => {
  return (
    <SkeletonContent
      containerStyle={{
        marginHorizontal: 16
      }}
      isLoading={true}
      animationDirection="horizontalLeft"
      layout={[
        {
          key: 'Image1',
          alignSelf: 'center',
          width: '100%',
          height: 120,
          marginBottom: 8
        },
        {
          key: 'Image2',
          alignSelf: 'center',
          width: '100%',
          height: 120,
          marginBottom: 8
        },
        {
          key: 'Image3',
          alignSelf: 'center',
          width: '100%',
          height: 120,
          marginBottom: 8
        }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: 10,
    paddingBottom: HEIGHT_TAB_BAR,
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
