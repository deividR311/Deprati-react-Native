import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

const GET_RESOURCE = {
  Delivery:
    'https://imagesdevapp.deprati.com.ec/checkout/entrega_contraentrega.svg',
  Cancel:
    'https://imagesdevapp.deprati.com.ec/checkout/cancela_contraentrega.svg',
  Clock: 'https://imagesdevapp.deprati.com.ec/checkout/reloj_contraentrega.svg'
};

const SVG_W = '100%';
const SVG_H = '100%';
export const PaymentImagesComponent: React.FC<PaymentImagesComponentProps> = (
  props = {}
) => {
  return (
    <View style={styles.containerImages}>
      <View style={[styles.contentImages, styles.imageDelivery]}>
        <SvgUri width={SVG_W} height={SVG_H} uri={GET_RESOURCE.Delivery} />
      </View>
      <View style={[styles.contentImages, styles.imageCancel]}>
        <SvgUri width={SVG_W} height={SVG_H} uri={GET_RESOURCE.Cancel} />
      </View>
      <View style={[styles.contentImages, styles.imageClock]}>
        <SvgUri width={SVG_W} height={SVG_H} uri={GET_RESOURCE.Clock} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerImages: {
    width: '100%',
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignSelf: 'center',
    paddingHorizontal: 10
    // backgroundColor: 'cyan',
  },
  contentImages: { /*width: '33.3%',*/ height: 155 },
  imageDelivery: { width: '22%' },
  imageCancel: { width: '28%' },
  imageClock: { width: '25%' }
});

export interface PaymentImagesComponentProps {}
