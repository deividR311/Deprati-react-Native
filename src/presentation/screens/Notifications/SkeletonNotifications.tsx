import { View } from 'react-native';
import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export default function SkeletonNotifications() {
  const fakeListStory = Array(10).fill('');
  return (
    <View style={{ width: '100%' }}>
      {fakeListStory.map((value, index) => (
        <SkeletonContent
          key={`section-story-${index}`}
          isLoading={true}
          containerStyle={{
            flexDirection: 'column',
            width: '100%',
            marginRight: 12,
            marginTop: 2
          }}
          layout={[
            { key: 'notification', width: '100%', height: 88, paddingTop: 2 }
          ]}
        />
      ))}
    </View>
  );
}
