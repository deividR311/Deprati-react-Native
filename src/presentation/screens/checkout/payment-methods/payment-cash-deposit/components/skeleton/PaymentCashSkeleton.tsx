import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const PaymentCashSkeleton = () => {
  return (
    <View style={styles.list}>
      <SkeletonContent
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'title',
            // marginTop: 20,
            alignSelf: 'center',
            marginLeft: 7,
            width: 220,
            height: 25
          },
          {
            key: 'paragraph1',
            marginTop: 30,
            alignSelf: 'center',
            marginLeft: 7,
            width: 300,
            height: 40
          },
          {
            key: 'bank1',
            marginTop: 30,
            alignSelf: 'flex-start',
            marginLeft: 35,
            width: 150,
            height: 20
          },
          {
            key: 'bank2',
            marginTop: 5,
            alignSelf: 'flex-start',
            marginLeft: 35,
            width: 150,
            height: 20
          },
          {
            key: 'bank3',
            marginTop: 5,
            alignSelf: 'flex-start',
            marginLeft: 35,
            width: 150,
            height: 20
          },
          {
            key: 'bank4',
            marginTop: 5,
            alignSelf: 'flex-start',
            marginLeft: 35,
            width: 150,
            height: 20
          },
          {
            key: 'paragraph2',
            marginTop: 30,
            alignSelf: 'center',
            marginLeft: 7,
            width: 300,
            height: 60
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    // flex: 1,
    // justifyContent:'flex-start',
    // alignContent:'flex-start',
    // alignItems:'flex-start',
    // alignSelf:'flex-start'
    marginTop: 180
    // flexDirection: 'row',
  }
});
