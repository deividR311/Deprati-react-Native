import React from 'react';
import { View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { COLORS } from '../../../../../application/common/colors';

export const SkeletonPage = () => {
  const fakeListStory = Array(3).fill('');

  return (
    <View
      style={{
        flexDirection: 'column',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: COLORS.WHITE
      }}>
      <SkeletonContent
        isLoading={true}
        containerStyle={{
          width: '100%',
          marginVertical: 10
        }}
        layout={[{ key: 'text-1', width: '100%', height: 400 }]}
      />
      <View style={{ flexDirection: 'column', width: '100%' }}>
        {fakeListStory.map((value, index) => (
          <SkeletonContent
            key={`section-story-${index}`}
            isLoading={true}
            containerStyle={{
              flexDirection: 'column',
              width: '100%',
              marginVertical: 6
            }}
            layout={[{ key: 'story', width: '100%', height: 80 }]}
          />
        ))}
      </View>
    </View>
  );
};
