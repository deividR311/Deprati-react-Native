import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export function SkeletonHeaderInfo() {
  return (
    <SkeletonContent
      isLoading={true}
      containerStyle={{
        width: '100%',
        marginVertical: 8
      }}
      layout={[
        { key: 'PaymentNumber', alignSelf: 'center', width: '60%', height: 25 }
      ]}
    />
  );
}
