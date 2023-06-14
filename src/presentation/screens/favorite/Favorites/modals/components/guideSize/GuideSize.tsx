import React from 'react';
import { Image, View } from 'react-native';

export default function GuideSize() {
  return (
    <View style={{ alignSelf: 'center', marginTop: 20 }}>
      <Image
        testID="guide-size-image"
        // style={{ width: '100%', height: '100%', resizeMode:'cover' }}
        source={require('../../../../../../../../assets/images/favorites/GuideSize.png')}
      />
    </View>
  );
}
