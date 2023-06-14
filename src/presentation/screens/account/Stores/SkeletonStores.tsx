import { View, Text } from 'react-native';
import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export default function SkeletonStores() {
  const storesMock = [
    { key: 'item1', width: '100%', height: 250, marginTop: 20 },
    { key: 'item2', width: '100%', height: 250, marginTop: 20 },
    { key: 'item3', width: '100%', height: 250, marginTop: 20 }
  ];
  return (
    <View>
      <SkeletonContent
        isLoading={true}
        containerStyle={{
          flexDirection: 'column',
          height: 57,

          marginHorizontal: 12
        }}
        layout={storesMock}
      />
    </View>
  );
}
