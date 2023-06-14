import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const TicketDetailSkeleton: React.FC = () => {
  return (
    <SkeletonContent
      isLoading={true}
      animationDirection="diagonalDownRight"
      animationType="pulse"
      containerStyle={{ flex: 1 }}
      layout={[
        { width: '100%', height: 100, marginBottom: 10 },
        { width: '100%', height: 100, marginBottom: 10 },
        { width: '100%', height: 100, marginBottom: 10 },
        { width: '100%', height: 100, marginBottom: 10 },
        { width: '100%', height: 100, marginBottom: 10 },
        { width: '100%', height: 100, marginBottom: 10 },
        { width: '100%', height: 100, marginBottom: 10 },
        { width: '100%', height: 100, marginBottom: 10 }
      ]}
    />
  );
};
