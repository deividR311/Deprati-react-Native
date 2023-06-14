import React from 'react';
import { View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const AddressPaymentSkeleton = () => {
  return (
    <View style={{ width: '100%', marginTop: 20 }}>
      <SkeletonContent
        isLoading={true}
        animationDirection="horizontalLeft"
        layout={[
          {
            key: 'title',
            marginTop: 30,
            alignSelf: 'flex-start',
            marginLeft: 7,
            width: 200,
            height: 25
          },
          {
            key: 'row1',
            marginTop: 10,
            alignSelf: 'flex-start',
            marginLeft: 32,
            width: 200,
            height: 20
          },
          {
            key: 'row2',
            marginTop: 10,
            alignSelf: 'flex-start',
            marginLeft: 32,
            width: 180,
            height: 20
          },
          {
            key: 'row3',
            marginTop: 10,
            alignSelf: 'flex-start',
            marginLeft: 32,
            width: 190,
            height: 20
          },
          {
            key: 'row4',
            marginTop: 10,
            alignSelf: 'flex-start',
            marginLeft: 32,
            width: 160,
            height: 20
          },
          {
            key: 'row5',
            marginTop: 10,
            alignSelf: 'flex-start',
            marginLeft: 32,
            width: 150,
            height: 20
          },
          {
            key: 'buttons',
            marginTop: 15,
            alignSelf: 'center',
            marginLeft: 7,
            width: 300,
            height: 30
          },
          {
            key: 'add',
            marginTop: 20,
            alignSelf: 'center',
            marginLeft: 7,
            width: 200,
            height: 35
          }
        ]}
      />
    </View>
  );
};
