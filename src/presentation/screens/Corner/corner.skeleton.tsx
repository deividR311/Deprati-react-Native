import React from 'react';
import { View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { COLORS } from '../../../application/common/colors';

export const SkeletonScreen = () => {
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
        layout={[{ key: 'text-1', width: '100%', height: 150 }]}
      />
      <View style={{ flexDirection: 'row', width: '100%', marginVertical: 10 }}>
        {fakeListStory.map((value, index) => (
          <SkeletonContent
            key={`section-story-${index}`}
            isLoading={true}
            containerStyle={{
              flexDirection: 'row',
              width: '31%',
              marginRight: 12
            }}
            layout={[{ key: 'story', width: '100%', height: 200 }]}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', width: '100%', marginVertical: 10 }}>
        {fakeListStory.map((value, index) => (
          <SkeletonContent
            key={`section-story-${index}`}
            isLoading={true}
            containerStyle={{
              flexDirection: 'row',
              width: '31%',
              marginRight: 12
            }}
            layout={[{ key: 'story', width: '100%', height: 200 }]}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', width: '100%', marginVertical: 10 }}>
        {fakeListStory.map((value, index) => (
          <SkeletonContent
            key={`section-story-${index}`}
            isLoading={true}
            containerStyle={{
              flexDirection: 'row',
              width: '31%',
              marginRight: 12
            }}
            layout={[{ key: 'story', width: '100%', height: 200 }]}
          />
        ))}
      </View>
    </View>
  );
};
