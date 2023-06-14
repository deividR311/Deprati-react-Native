import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';

import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../application/common/namesNav';
import { EcommerceNavigationRoute } from '../../navigation/ecommerce';
import { COLORS, MARING_HORIZONTAL } from '../../../application/common';
import { FontStyles } from '../../../application/common/fonts';

const Barcode = () => {
  const navigation = useNavigation();

  const onEanDetected = ({ data: code, type }: BarCodeReadEvent) => {
    //console.log('>>> EAN detected: ', type, code)
    navigation.replace(NAV.ECOMMERCE, {
      screen: EcommerceNavigationRoute.Searchproduct,
      params: {
        EAN: code
      }
    });
  };
  useEffect(() => {
    if (__DEV__) {
      onEanDetected({ data: '00000014615201' });
    }
  }, []);

  const topContent = () => {
    return (
      <SafeAreaView style={styles.container_header}>
        <TouchableOpacity
          style={styles.container_header_back}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
        <Text style={styles.container_header_text}>Buscar por producto</Text>
        <TouchableOpacity
          style={styles.close}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={20} color={COLORS.DARK} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <QRCodeScanner
      onRead={onEanDetected}
      reactivate={true}
      reactivateTimeout={5000}
      showMarker={true}
      fadeIn={false}
      vibrate={true}
      customMarker={
        <>
          {topContent()}
          <Image
            style={styles.marker}
            source={require('../../../../assets/images/barcode-custom-frame.png')}
          />
        </>
      }
      flashMode={RNCamera.Constants.FlashMode.auto}
      cameraStyle={{
        height: '100%'
      }}
    />
  );
};

export default Barcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  container_header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 2,
    zIndex: 2000
    // backgroundColor: 'transparent',
  },
  container_header_back: {
    marginLeft: MARING_HORIZONTAL
  },
  container_header_text: {
    ...FontStyles.H3_Headline,
    color: COLORS.WHITE,
    textAlign: 'left',
    paddingHorizontal: MARING_HORIZONTAL,
    paddingVertical: MARING_HORIZONTAL,
    flexGrow: 2
  },
  barcodeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  close: {
    width: 40,
    height: 40,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: COLORS.DEPRATYGRAY,
    elevation: 2,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    width: 300,
    height: 300
  }
});
