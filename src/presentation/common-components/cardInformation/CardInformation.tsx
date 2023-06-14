import React, { useMemo } from 'react';
//Libs
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ColorValue
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../application/common';
import { CardInformationProps, iconDefault, MapStatesCard } from './utilsCard';
import {
  htmlMatcherRegex,
  hrefAnchorMatcherRegex
} from '../../../application/utils/regExp';

export default function CardInformation({
  style = {},
  styleContent = {},
  styleIcon = {},
  styleContentText = {},
  styleText = {},
  styleContentClose = {},
  sizeIcon = 24,
  sizeClose = 20,
  typeCard = 'information',
  Icon: CustomIcon,
  text,
  onPress,
  onClose
}: CardInformationProps) {
  const handleTextColorRed =
    typeCard === 'todayOffer' || typeCard === 'second-promotion'
      ? (COLORS.BRAND as ColorValue)
      : (COLORS.DARK70 as ColorValue);

  const handleGetStatesCard = () => MapStatesCard.get(typeCard);

  const sanitizedText = useMemo(() => {
    let textSanitized = text;
    let link: string | undefined;

    const htmlMatcher = new RegExp(htmlMatcherRegex);
    const hrefAnchorMatcher = new RegExp(hrefAnchorMatcherRegex);

    const matches = textSanitized.match(htmlMatcher);

    if (matches) {
      const hrefMatches = textSanitized.match(hrefAnchorMatcher);
      if (hrefMatches) link = hrefMatches[2];
      textSanitized = textSanitized
        .replace(matches[0], matches[2])
        .replaceAll(`\n`, '');
    }

    return {
      text: textSanitized,
      link
    };
  }, [text]);

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.content,
          styleContent,
          { backgroundColor: handleGetStatesCard()?.backgroundColor }
        ]}>
        <TouchableOpacity
          testID="test-onPress-ID"
          activeOpacity={0.6}
          disabled={!onPress}
          style={{ flexDirection: 'row' }}
          onPress={() => onPress?.(sanitizedText)}>
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
            <Text
              style={[styles.text, { color: handleTextColorRed }, styleText]}>
              {sanitizedText.text}
              {` `}
              {sanitizedText.link && (
                <Text
                  style={[
                    FontStyles.Link,
                    FontStyles.Bold
                  ]}>{`Ver más aquí.`}</Text>
              )}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.contentClose, styleContentClose]}>
          <Icon
            name={'close'}
            size={sizeClose}
            color={COLORS.DARK70}
            onPress={() => onClose?.(text)}
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
  contentIcon: { width: '10%', alignItems: 'center', justifyContent: 'center' },
  contentText: { width: '80%', justifyContent: 'center' },
  contentClose: {
    width: '10%',
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
