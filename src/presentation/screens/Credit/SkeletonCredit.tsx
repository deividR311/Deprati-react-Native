import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { MARING_HORIZONTAL } from '../../../application/common/layout';

export default function SkeletonCredit() {
  const fakeCarousel = Array(2).fill('');
  const { width } = Dimensions.get('window');
  return (
    <View
      style={{ paddingHorizontal: MARING_HORIZONTAL, flexDirection: 'column' }}>
      <View style={{ width: '100%' }}>
        <SkeletonContent
          isLoading={true}
          containerStyle={{
            flexDirection: 'column',
            height: 57,
            width: '100%',
            marginRight: 12
          }}
          layout={[
            { key: 'title', width: '100%', height: 80 },
            {
              key: 'subtitle',
              marginTop: 8,
              width: '100%',
              height: 45
            }
          ]}
        />
      </View>

      <View style={{ flexDirection: 'row', width: '100%' }}>
        {fakeCarousel.map((value, index) => (
          <SkeletonContent
            key={`section-story-${index}`}
            isLoading={true}
            containerStyle={{
              flexDirection: 'row',
              marginRight: 8,
              width: width / 2 - 18
            }}
            layout={[
              {
                key: 'carouselitem',
                width: '100%',
                height: 140,
                marginTop: 100
              }
            ]}
          />
        ))}
      </View>

      <SkeletonContent
        isLoading={true}
        containerStyle={{
          flexDirection: 'column',
          height: 57,
          width: '100%',
          marginRight: 12,
          marginTop: 12
        }}
        layout={[{ key: 'section servicios', width: '100%', height: 80 }]}
      />

      <SkeletonContent
        isLoading={true}
        containerStyle={{
          flexDirection: 'column',
          height: 57,
          width: '100%',
          marginRight: 12,
          marginTop: 45
        }}
        layout={[{ key: 'section servicios', width: '100%', height: 200 }]}
      />
    </View>
  );
}
