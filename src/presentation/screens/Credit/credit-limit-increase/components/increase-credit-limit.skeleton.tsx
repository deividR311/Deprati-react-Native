import React, { FC } from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const IncreaseCreditLimitSkeleton: FC = () => {
  return (
    <SkeletonContent
      containerStyle={{
        padding: 16
      }}
      layout={[
        {
          width: 340,
          height: 16,
          marginBottom: 18,
          alignSelf: 'flex-start'
        },
        { width: '100%', height: 92, marginBottom: 18 },
        { width: '100%', height: 312, marginBottom: 18 },
        {
          width: 340,
          height: 16,
          marginBottom: 18,
          alignSelf: 'flex-start'
        },
        { width: '100%', height: 40, marginBottom: 18 }
      ]}
      isLoading={true}
    />
  );
};
