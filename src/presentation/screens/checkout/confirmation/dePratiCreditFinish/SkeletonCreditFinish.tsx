import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export function SkeletonCreditFinish() {
  return (
    <SkeletonContent
      isLoading={true}
      containerStyle={{
        width: '100%',
        marginVertical: 8
      }}
      layout={[
        { key: 'creditfinish', alignSelf: 'center', width: '95%', height: 70 }
      ]}
    />
  );
}
