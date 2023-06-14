import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';
import { MARING_HORIZONTAL } from '../../../application/common/layout';
import { trackRecommendationClick } from '../../../infrastucture/native-modules/emarsys/emarsys';
import { keyEvents } from '../../../infrastucture/native-modules/emma/clickEventMap';
import { trackEventclick } from '../../../infrastucture/native-modules/emma/useEmma.hook';
import { currencyFormatter } from '../../../application/utils/currency';

interface Props {
  item: {
    productId: string;
    imageUrl: string;
    zoomImageUrl: string;
    price: number;
    title: string;
  };
}

const RecommendedItem = (props: Props) => {
  const { item } = props;
  const { goToPdp } = useLinkPress();

  const eventItem = () => {
    try {
      trackEventclick(keyEvents.home_recomendados, {
        Codigodeproducto: item?.productId,
        Categoria: ''
      });
    } catch (error) {}
  };

  const handlePress = () => {
    trackRecommendationClick(item);
    eventItem();
    goToPdp(item.productId, true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          resizeMode="stretch"
          source={{ uri: item?.imageUrl }}
          style={styles.container__image}
        />
        <View style={styles.container__description}>
          <Text style={styles.container__description_text} numberOfLines={3}>
            {item?.title}
          </Text>
          <Text style={styles.container__description_price}>
            {currencyFormatter(item?.price)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 400,
    marginTop: 20,
    marginHorizontal: MARING_HORIZONTAL
  },
  container__image: {
    width: '100%',
    height: 240,
    borderRadius: 4
  },
  container__description: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container__description_text: {
    width: '60%',
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.small,
    lineHeight: 16,
    color: COLORS.DARK70,
    opacity: 0.6,
    fontWeight: '300'
  },
  container__description_price: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.small,
    color: COLORS.BRAND
  }
});

export default RecommendedItem;
