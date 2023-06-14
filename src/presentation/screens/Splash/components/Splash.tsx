import React from 'react';
//Libs
import { View, Text, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
//Styles
import { styles } from './stylesSplash';
//Utils
const GET_RESOURCE = {
  LocalImage: require('../../../../../assets/splash/Splash_screen.png'),
  Lottie: require('../../../../../assets/splash/Loading.json')
};
const textInformation = 'Ups, algo pasa con la conexión, intenta de nuevo';

export default function Splash({
  isConnected
}: {
  isConnected: boolean | null;
}) {
  return (
    <ImageBackground
      imageStyle={styles.imageStyleBackground}
      style={styles.background}
      // resizeMode="stretch"
      source={GET_RESOURCE.LocalImage}>
      <LottieView
        source={GET_RESOURCE.Lottie}
        resizeMode="cover"
        style={styles.lottie}
        autoSize
        autoPlay
        loop
      />
      {!isConnected && (
        <View style={styles.viewInformation}>
          <Text testID={'text-info'} style={styles.information}>
            {textInformation}
          </Text>
        </View>
      )}
    </ImageBackground>
  );
}
