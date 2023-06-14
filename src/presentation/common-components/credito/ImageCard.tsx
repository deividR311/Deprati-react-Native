import {
  View,
  Text,
  ImageBackground,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Image
} from 'react-native';
import React, { FC } from 'react';
import { stylesSignUp } from '../../screens/SignUp/stylesSignUp';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import layout from '../../../application/common/layout';
import { fontWeightOS } from '../../../application/utils';

interface Iprops {
  style?: StyleProp<ViewStyle>;
  infoUserCredit?: any[];
}

export const ImageCardRezise: FC<{
  infoUserCredit?: string[];
  size?: number;
}> = props => {
  const ASPECT_RATIO = 151 / 244;
  const { infoUserCredit = [], size = 244 } = props;
  const IMAGE_HEIGHT = ASPECT_RATIO * size;

  return (
    <View
      style={[ImageCardReziseStyles.container, { height: IMAGE_HEIGHT + 20 }]}>
      <View>
        <Image
          resizeMode="contain"
          style={[
            ImageCardReziseStyles.image,
            { height: IMAGE_HEIGHT, width: size }
          ]}
          source={require('../../../../assets/images/cardCredito.png')}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: IMAGE_HEIGHT / 1.9,
          width: size - 28
        }}>
        {infoUserCredit && (
          <View style={[ImageCardReziseStyles.containerInfo]}>
            {infoUserCredit?.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={[ImageCardReziseStyles.info]}
                  numberOfLines={1}>
                  {item}
                </Text>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

export default function ImageCard({ style, infoUserCredit }: Iprops) {
  return (
    <ImageBackground
      resizeMode="contain"
      style={[stylesSignUp.cardImage, style]}
      source={require('../../../../assets/images/cardCredito.png')}>
      {infoUserCredit && (
        <View style={[styles.infoCard]}>
          {infoUserCredit?.map((item, index) => {
            return (
              <Text
                key={index}
                style={[styles.infoCard_text]}
                numberOfLines={1}>
                {item}
              </Text>
            );
          })}
        </View>
      )}
    </ImageBackground>
  );
}

const ImageCardReziseStyles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerInfo: { paddingHorizontal: layout.isSmallDevice ? 13 : 20 },
  image: {},
  info: {
    color: COLORS.WHITE,
    fontSize: FONTS_SIZES.label - (layout.isSmallDevice ? 2 : 0),
    fontWeight: fontWeightOS('500'),
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: FONTS_SIZES.label + (layout.isSmallDevice ? 6 : 10)
  }
});

const styles = StyleSheet.create({
  infoCard: {
    alignSelf: 'flex-start',
    marginTop: 90,
    marginLeft: 26,
    width: '100%'
  },
  infoCard_text: {
    width: '64%',
    color: COLORS.WHITE,
    fontSize: FONTS_SIZES.label,
    fontWeight: '500',
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: FONTS_SIZES.label + 10
  }
});
