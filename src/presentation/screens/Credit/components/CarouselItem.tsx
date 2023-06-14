import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import { stylesCredit } from '../stylesCredit';
import { getUrlImageHybris } from '../../../../application/utils/urls';
import { SvgCssUri } from 'react-native-svg';
import { FONTS_FAMILY } from '../../../../application/common';

interface Iprops {
  item: {
    title: string;
    image: string;
  };
}

export default function CarouselItem({ item }: Iprops) {
  const widthCard = Dimensions.get('screen').width / 2 - 32;

  return (
    <View
      style={{
        ...stylesCredit.card_carousel,
        width: widthCard,
        maxWidth: 157
      }}>
      <View
        style={{
          marginVertical: 8,
          backgroundColor: '#FBDCE0',
          borderRadius: 32,
          width: 56,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {item.image?.endsWith('.svg') ? (
          <SvgCssUri
            uri={getUrlImageHybris(item.image)}
            width={26}
            height={26}
          />
        ) : (
          <Image
            style={{ width: 56, height: 56 }}
            resizeMode={'contain'}
            source={{ uri: getUrlImageHybris(item.image) }}
          />
        )}
      </View>
      <View style={stylesCredit.card_containerTitle}>
        <Text
          style={[
            {
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '300',
              lineHeight: 20,
              fontFamily: FONTS_FAMILY.Roboto
            }
          ]}>
          {item.title}
        </Text>
      </View>
    </View>
  );
}
