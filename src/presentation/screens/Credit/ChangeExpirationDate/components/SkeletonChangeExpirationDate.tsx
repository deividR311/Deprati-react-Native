import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export function SkeletonMonthInfo() {
  return (
    <SkeletonContent
      isLoading={true}
      containerStyle={{
        width: '100%',
        marginVertical: 8
      }}
      layout={[{ key: 'PaymentNumber', width: '60%', height: 35 }]}
    />
  );
}
