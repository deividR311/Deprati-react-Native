import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import { COLORS, FONTS_SIZES } from '../../../application/common';
import LinearGradient from 'react-native-linear-gradient';
import { getUrlImageHybris } from '../../../application/utils/urls';
import { keyEvents } from '../../../infrastucture/native-modules/emma/clickEventMap';
import { trackEventclick } from '../../../infrastucture/native-modules/emma/useEmma.hook';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';

interface Props {
  customProps: any;
  onPress: () => void;
}

const Storie = (props: Props) => {
  const eventStorie = () => {
    try {
      trackEventclick(keyEvents.home_historias, {
        IDStory: props?.customProps?.title ?? ''
      });
    } catch (error) {}
  };

  const handleOnPress = () => {
    eventStorie();
    props?.onPress();
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.storie}>
        <ImageBackground
          borderRadius={8}
          source={{
            uri: getUrlImageHybris(props?.customProps?.image?.url)
          }}
          style={styles.storie}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', 'black']}
            style={styles.storie__gradient}>
            <View
              style={{
                height: '75%'
              }}
            />
            <Text style={styles.textStorie} numberOfLines={2}>
              {props?.customProps?.title}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default Storie;

const styles = StyleSheet.create({
  storie: {
    width: 100,
    height: 144,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 2
  },
  storie__gradient: {
    alignItems: 'flex-start',
    height: 144
  },
  textStorie: {
    width: '92%',
    fontFamily: fontFamilyOS(),
    fontSize: FONTS_SIZES.badge + 1,
    color: COLORS.WHITE,
    marginLeft: 4,
    paddingBottom: 20,
    textAlign: 'left',
    fontWeight: fontWeightOS('bold')
  }
});
