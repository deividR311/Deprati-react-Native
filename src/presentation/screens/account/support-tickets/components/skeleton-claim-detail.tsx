import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
export const SkeletonClaimDetail: React.FC = () => {
  return (
    <SkeletonContent
      isLoading={true}
      containerStyle={{
        flex: 1,
        padding: 16,
        marginTop: 16,
        alignItems: 'flex-start'
      }}
      layout={[
        { width: 100, height: 20 },
        { width: 150, height: 20, marginTop: 8 },

        { width: 150, height: 20, marginTop: 24 },
        { width: 170, height: 20, marginTop: 8 },
        { width: 130, height: 20, marginTop: 8 },
        { width: 120, height: 20, marginTop: 8 },

        { width: 100, height: 20, marginTop: 24 },
        { width: 150, height: 20, marginTop: 8 },

        { width: 150, height: 20, marginTop: 24 },
        { width: 170, height: 20, marginTop: 8 },

        { width: 150, height: 20, marginTop: 24 },
        { width: 250, height: 20, marginTop: 8 },

        { width: '100%', height: 42, marginTop: 24 }
      ]}
    />
  );
};
