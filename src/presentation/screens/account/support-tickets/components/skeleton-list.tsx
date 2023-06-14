import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
export const SkeletonList: React.FC = () => {
  return (
    <SkeletonContent
      isLoading={true}
      containerStyle={{ flex: 1, padding: 16, alignItems: 'center' }}
      layout={[
        { width: '100%', height: 32, marginHorizontal: 16 },
        { width: '100%', height: 98, margin: 16 },
        { width: '100%', height: 32, marginHorizontal: 16 },
        { width: '100%', height: 98, margin: 16 },
        { width: '100%', height: 32, marginHorizontal: 16 },
        { width: '100%', height: 98, margin: 16 },
        { width: '100%', height: 32, marginHorizontal: 16 },
        { width: '100%', height: 98, margin: 16 }
      ]}
    />
  );
};
