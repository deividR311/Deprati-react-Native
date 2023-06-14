import React from 'react';
import { View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { COLORS } from '../../../application/common/colors';

export const SkeletonHome = () => {
  const fakeListStory = Array(3).fill('');
  const fakeListCategories = Array(10).fill('');

  return (
    <View
      testID="skeleton_home"
      style={{
        flexDirection: 'column',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: COLORS.WHITE
      }}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        {fakeListStory.map((value, index) => (
          <SkeletonContent
            key={`section-story-${index}`}
            isLoading={true}
            containerStyle={{
              flexDirection: 'row',
              width: '31%',
              marginRight: 12
            }}
            layout={[{ key: 'story', width: '100%', height: 140 }]}
          />
        ))}
      </View>
      <SkeletonContent
        isLoading={true}
        containerStyle={{
          width: '100%',
          marginVertical: 10
        }}
        layout={[{ key: 'text-1', width: '100%', height: 100 }]}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
        {fakeListCategories.map((value, index) => (
          <SkeletonContent
            key={`section-cateogry-${index}`}
            isLoading={true}
            containerStyle={{
              width: '50%',
              paddingVertical: 2,
              paddingHorizontal: 2
            }}
            layout={[{ key: 'cateogry-1', width: '100%', height: 180 }]}
          />
        ))}
      </View>
    </View>
  );
};
