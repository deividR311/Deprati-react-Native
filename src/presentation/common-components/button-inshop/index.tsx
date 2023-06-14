import { View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { styles, WIDTH_CICLE } from './styles';
import { SIZE_ICON_TAB } from '../../../application/common/fonts';
import HomeShop from '../../../../assets/icons/HomeShop';
import HomeShopScan from '../../../../assets/icons/HomeShopScan';
import HomeShopPay from '../../../../assets/icons/HomeShopPay';
import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../application/common/namesNav';
import { useTranslation } from 'react-i18next';

export const ButtonInShop = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [colapse, setColapse] = useState(true);
  const HiddenInOutRef = useRef(new Animated.Value(0)).current;
  const showElement = () => {
    setColapse(!colapse);
  };

  useEffect(() => {
    Animated.timing(HiddenInOutRef, {
      toValue: colapse ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [HiddenInOutRef, colapse]);

  return (
    <>
      <Animated.View
        style={[
          styles.container_action,
          {
            height: HiddenInOutRef.interpolate({
              inputRange: [0, 1],
              outputRange: [0, WIDTH_CICLE]
            })
          }
        ]}>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.container_action_scan}>
          <HomeShopScan />
          <Text style={styles.container_action_scan_text} numberOfLines={2}>
            Buscar producto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container_action_pay}
          onPress={() => navigation.navigate(NAV.CONTACTLESS_PAYMENT as never)}>
          <HomeShopPay />
          <Text style={styles.container_action_pay_text} numberOfLines={2}>
            {t('contactlessPayment')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.container_button}>
        <TouchableOpacity onPress={showElement}>
          <HomeShopPay fill="#ffffff" size={SIZE_ICON_TAB} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export const FloatingButton: React.FC<FloatingButtonProps> = props => {
  const { borderColor, backgroundColor, shadowColor, ..._styles } =
    styles.container_button;
  return (
    <>
      <View
        style={{
          ..._styles,
          borderColor: props?.borderColor ?? borderColor,
          backgroundColor: props?.backgroundColor ?? backgroundColor,
          shadowColor: props?.shadowColor ?? shadowColor
        }}>
        <TouchableOpacity onPress={props.onPress}>
          {props.children}
        </TouchableOpacity>
      </View>
    </>
  );
};

export interface FloatingButtonProps {
  onPress: () => void;
  borderColor?: string;
  backgroundColor?: string;
  shadowColor?: string;
  children: React.ReactNode;
}
