import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const sizeImage = 100;
export const AgainstDeliverySkeleton = () => {
  return (
    <>
      <View style={styles.contentTop}>
        <SkeletonContent
          isLoading={true}
          animationDirection="diagonalDownRight"
          layout={[
            {
              key: 'img1',
              alignSelf: 'center',
              marginLeft: 7,
              width: sizeImage,
              height: sizeImage,
              borderRadius: sizeImage / 2
            },
            {
              key: 'text1',
              marginTop: 20,
              alignSelf: 'center',
              marginLeft: 7,
              width: sizeImage,
              height: 40
            }
          ]}
        />
        <SkeletonContent
          isLoading={true}
          animationDirection="diagonalDownRight"
          layout={[
            {
              key: 'img2',
              alignSelf: 'center',
              marginLeft: 7,
              width: sizeImage,
              height: sizeImage,
              borderRadius: sizeImage / 2
            },
            {
              key: 'text2',
              marginTop: 20,
              alignSelf: 'center',
              marginLeft: 7,
              width: sizeImage,
              height: 40
            }
          ]}
        />
        <SkeletonContent
          isLoading={true}
          animationDirection="diagonalDownRight"
          layout={[
            {
              key: 'img3',
              alignSelf: 'center',
              marginLeft: 7,
              width: sizeImage,
              height: sizeImage,
              borderRadius: sizeImage / 2
            },
            {
              key: 'text3',
              marginTop: 20,
              alignSelf: 'center',
              marginLeft: 7,
              width: sizeImage,
              height: 40
            }
          ]}
        />
      </View>
      <View style={styles.contentDown}>
        <SkeletonContent
          isLoading={true}
          animationDirection="verticalDown"
          layout={[
            {
              key: 'addresss payment',
              alignSelf: 'center',
              marginTop: -80,
              width: 280,
              height: 150
            }
          ]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentTop: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  contentDown: {
    width: '100%',
    marginTop: 180
  }
});
