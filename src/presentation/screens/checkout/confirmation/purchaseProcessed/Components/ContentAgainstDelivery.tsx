import React from 'react';
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { styles } from '../purchaseProcessedbottomsheet.stylesheet';

const GET_RESOURCE = {
  Delivery: 'https://imagesdevapp.deprati.com.ec/checkout/Cajita_checkout.svg',
  Cancel: 'https://imagesdevapp.deprati.com.ec/checkout/Billetera_checkout.svg',
  Clock: 'https://imagesdevapp.deprati.com.ec/checkout/Reloj_checkout.svg'
};

const SVG_W = '100%';
const SVG_H = '100%';
export function ContentAgainstDelivery() {
  return (
    <View style={styles.containerImages}>
      <View style={[styles.contentImages]}>
        <SvgUri width={SVG_W} height={SVG_H} uri={GET_RESOURCE.Delivery} />
      </View>
      <View style={[styles.contentImages, styles.imageCancel]}>
        <SvgUri width={SVG_W} height={SVG_H} uri={GET_RESOURCE.Cancel} />
      </View>
      <View style={[styles.contentImages]}>
        <SvgUri width={SVG_W} height={SVG_H} uri={GET_RESOURCE.Clock} />
      </View>
    </View>
  );
}
