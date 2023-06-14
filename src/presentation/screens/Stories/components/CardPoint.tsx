import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated
} from 'react-native';
import React, { useState, useLayoutEffect, useRef, useMemo } from 'react';
import { COLORS } from '../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common/fonts';
import { useCardInfo } from '../hooks/useCardInfo';
import { useLinkPress } from '../../../../application/common/hooksCommons/useLinkPress';
import { HEIGHT_IMG } from './Points';

const CardPoints = ({ point, showCard }) => {
  const HiddenInOutRef = useRef(new Animated.Value(0)).current;
  const { top, left, link } = point ?? {};
  const { productCode, categoryCode, linkName, url } = link ?? {};
  const { loading, contentProduct } = useCardInfo(productCode);
  const { goToPdp, goToCategory, goLink } = useLinkPress();

  useLayoutEffect(() => {
    Animated.timing(HiddenInOutRef, {
      toValue: showCard ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [HiddenInOutRef, showCard]);

  const width = Dimensions.get('window').width;
  const widthCard = 240;

  const topCard = useMemo<number>(() => {
    try {
      const pointNumber = Number(point?.y ?? '1');
      const normalizeHeight = pointNumber / HEIGHT_IMG;
      const convertInPorcent = normalizeHeight * 100;
      if (convertInPorcent < 75) {
        const factorUp = 3.2;
        return `${convertInPorcent + factorUp}%`;
      } else {
        const factorDown = 15;
        return `${convertInPorcent - factorDown}%`;
      }
    } catch (error) {}
    return top;
  }, [top]);

  const positionCard = useMemo(() => {
    let widthCardMid = widthCard / 2;
    let leftPosition = left - widthCardMid;
    if (leftPosition < 0) return { left: 8 };
    if (left + widthCardMid > width) return { right: 8 };
    return { left: leftPosition };
  }, [left]);

  const goToLink = () => {
    if (productCode) {
      goToPdp(productCode);
      return;
    }
    if (categoryCode) {
      goToCategory(categoryCode, true);
      return;
    }
    goLink(url ?? '');
  };

  return (
    <Animated.View
      style={[
        styles.card_point,
        { top: topCard, ...positionCard },
        {
          height: HiddenInOutRef.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 80]
          })
        }
      ]}>
      {!showCard ? null : productCode && loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.WHITE}
          style={{ alignSelf: 'center', width: '100%' }}
        />
      ) : (
        <>
          <View style={[styles.card_point_name]}>
            <Text style={[styles.card_point_text]} numberOfLines={3}>
              {productCode ? contentProduct?.name : linkName ?? ''}
            </Text>
            {productCode && contentProduct?.price && (
              <Text style={[styles.card_point_price]}>
                {contentProduct?.price?.formattedValue}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={[styles.card_point_button]}
            onPress={goToLink}>
            <Text style={[styles.card_point_price]}>
              {productCode ? 'COMPRAR' : 'Conóce más'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card_point: {
    position: 'absolute',
    width: 260,
    height: 80,
    backgroundColor: COLORS.DARK70,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  card_point_name: {
    maxWidth: '45%'
  },
  card_point_text: {
    color: COLORS.WHITE,
    width: 100,
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontWeight: '400',
    fontSize: FONTS_SIZES.label,
    textTransform: 'capitalize'
  },
  card_point_price: {
    color: COLORS.WHITE,
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontWeight: '700',
    fontSize: FONTS_SIZES.label,
    textTransform: 'uppercase'
  },
  card_point_button: {
    maxWidth: 130,
    minWidth: 100,
    backgroundColor: COLORS.BRAND,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 99,
    zindex: 99,
    marginLeft: 8
  }
});

export default CardPoints;
