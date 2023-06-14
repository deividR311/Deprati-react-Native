import React, { useEffect, useMemo } from 'react';
//Libs
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ColorValue
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS_FAMILY, FONTS_SIZES } from '../../../application/common';
import { CardInformationProps, iconDefault, MapStatesCard } from './utilsCard';

export default function CardReload({
  style = {},
  styleContent = {},
  styleIcon = {},
  styleContentText = {},
  styleText = {},
  styleContentClose = {},
  sizeIcon = 24,
  sizeClose = 20,
  typeCard = 'information',
  isVisible,
  Icon: CustomIcon,
  text,
  onPress,
  onClose
}: CardInformationProps) {
  const handleTextColorRed =
    typeCard === 'todayOffer'
      ? (COLORS.BRAND as ColorValue)
      : (COLORS.DARK70 as ColorValue);

  const [isOpen, setIsOpen] = React.useState<boolean>();
  const handleGetStatesCard = () => MapStatesCard.get(typeCard);

  const handleOnClose = () => {
    if (!isOpen) return;
    setIsOpen(false);
    onClose?.(text);
  };

  useEffect(() => {
    if (isVisible === undefined) return;
    if (isVisible !== isOpen) setIsOpen(isVisible);
  }, [isVisible]);

  return (
    <View
      style={[styles.container, style, { display: isOpen ? 'flex' : 'none' }]}>
      <View
        style={[
          styles.content,
          styleContent,
          { backgroundColor: handleGetStatesCard()?.backgroundColor }
        ]}>
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!onPress}
          style={{ flexDirection: 'row' }}
          onPress={() => onPress?.()}>
          <View style={[styles.contentIcon, styleIcon]}>
            {CustomIcon ? (
              { CustomIcon }
            ) : (
              <Icon
                name={handleGetStatesCard()?.iconName ?? iconDefault}
                size={sizeIcon}
                color={handleGetStatesCard()?.iconColor}
              />
            )}
          </View>
          <View style={[styles.contentText, styleContentText]}>
            {typeof text === 'string' ? (
              <Text
                style={[styles.text, { color: handleTextColorRed }, styleText]}>
                {text}
              </Text>
            ) : (
              text
            )}
          </View>
        </TouchableOpacity>

        <View style={[styles.contentClose, styleContentClose]}>
          <Icon
            name={'rotate-left'}
            size={sizeClose}
            color={COLORS.DARK70}
            onPress={handleOnClose}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    display: 'flex'
  },
  content: {
    width: '100%',
    // height: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 5
  },
  contentIcon: {
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentText: { width: '80%', justifyContent: 'center' },
  contentClose: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: '400',
    fontSize: FONTS_SIZES.legal,
    lineHeight: 16,
    color: COLORS.DARK70,
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal'
  }
});
