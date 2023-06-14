import React from 'react';
import { View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { COLORS } from '../../../application/common/colors';

export const SkeletonPage = () => {
  const fakeListCategories = Array(10).fill('');

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
          marginVertical: 8
        }}
        layout={[{ key: 'text-1', width: '100%', height: 200 }]}
      />
      <SkeletonContent
        isLoading={true}
        containerStyle={{
          width: '100%',
          marginVertical: 8
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
              width: '100%',
              paddingVertical: 2,
              paddingHorizontal: 2
            }}
            layout={[{ key: 'cateogry-1', width: '100%', height: 60 }]}
          />
        ))}
      </View>
    </View>
  );
};
