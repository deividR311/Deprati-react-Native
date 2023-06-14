import { View, Text } from 'react-native';
import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export default function SkeletonRelated() {
  return (
    <View>
      <SkeletonContent
        isLoading={true}
        containerStyle={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          marginRight: 12
        }}
        layout={[
          {
            key: 'card',
            width: 236,
            height: 150,
            marginHorizontal: 70,
            marginTop: 32
          },
          {
            key: 'text',
            width: 343,
            height: 150,
            marginHorizontal: 16,
            marginTop: 24
          },
          {
            key: 'button',
            width: 343,
            height: 40,
            marginHorizontal: 16,
            marginTop: 24
          }
        ]}
      />
    </View>
  );
}
