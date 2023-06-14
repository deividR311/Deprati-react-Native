import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export function SkeletonPaymentNumber() {
  return (
    <SkeletonContent
      isLoading={true}
      containerStyle={{
        width: '100%',
        marginVertical: 8
      }}
      layout={[
        { key: 'PaymentNumber', alignSelf: 'center', width: '65%', height: 30 }
      ]}
    />
  );
}

export function SkeletonPayUpTo() {
  return (
    <SkeletonContent
      isLoading={true}
      containerStyle={{
        width: '100%',
        marginVertical: 8
      }}
      layout={[
        { key: 'PayUpTo', alignSelf: 'center', width: '100%', height: 40 }
      ]}
    />
  );
}

export function SkeletonListBanks() {
  return (
    <SkeletonContent
      isLoading={true}
      containerStyle={{
        width: '100%',
        marginVertical: 8
      }}
      layout={[
        { key: 'ListBanks', alignSelf: 'center', width: '100%', height: 95 }
      ]}
    />
  );
}
