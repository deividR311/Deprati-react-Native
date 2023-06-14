import {
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Image,
  View
} from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '../../../application/common/colors';
import { FontStyles } from '../../../application/common/fonts';
import { testProps } from '../../../application/utils/accessibleId';
import { SvgCssUri } from 'react-native-svg';
import { TouchableRipple } from 'react-native-paper';

interface ListCardButtonProps {
  onPress?: () => void;
  image: string;
  text: string;
  flagVisible?: boolean;
  flagText?: string;
  flagTextStyle?: TextStyle;
  flagContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
  disabled?: boolean;
}

export const ListCardButton: FC<ListCardButtonProps> = ({
  onPress,
  image,
  text,
  flagVisible = false,
  flagText = 'Nuevo',
  flagTextStyle = {},
  flagContainerStyle = {},
  textStyle = {},
  containerStyle = {},
  testID = '',
  disabled = false
}) => {
  const renderFlag = () => {
    return (
      <View
        style={[
          {
            backgroundColor: flagVisible ? COLORS.BRAND : 'transparent',
            height: 14,
            paddingHorizontal: 4,
            paddingVertical: 2,
            alignSelf: 'flex-end',
            marginTop: -10,
            marginBottom: 4,
            borderTopRightRadius: 4
          },
          flagContainerStyle
        ]}>
        <Text
          numberOfLines={1}
          style={[
            FontStyles.Bold,
            FontStyles.LightColor,
            {
              textTransform: 'uppercase',
              fontSize: 8
            },
            flagTextStyle
          ]}>
          {flagVisible && flagText}
        </Text>
      </View>
    );
  };

  const renderIcon = () => {
    return (
      <View style={styles.image}>
        {image?.endsWith('.svg') ? (
          <SvgCssUri
            style={{ borderRadius: styles.image.borderRadius }}
            uri={image}
            width={styles.image.width}
            height={styles.image.height}
          />
        ) : (
          <Image
            style={{ borderRadius: styles.image.borderRadius }}
            source={{
              width: styles.image.width,
              height: styles.image.height,
              uri: image
            }}
            resizeMethod="resize"
            resizeMode="cover"
          />
        )}
      </View>
    );
  };
  return (
    <TouchableRipple
      accessible
      // activeOpacity={0.9}
      disabled={disabled}
      {...testProps(testID ?? text)}
      onPress={() => !disabled && onPress?.()}
      style={[
        styles.cardContainer,
        { backgroundColor: disabled ? COLORS.BORDERCOLOR : COLORS.WHITE },
        containerStyle
      ]}>
      <>
        {renderFlag()}
        {renderIcon()}
        <Text
          numberOfLines={3}
          style={[FontStyles.Subtitle, styles.text, textStyle]}>
          {text}
        </Text>
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.CARDBACKGROUND,
    marginBottom: 4
  },
  cardContainer: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 104,
    margin: 6,
    flexDirection: 'column',
    elevation: 4,
    shadowColor: COLORS.DARK,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5
  },
  text: { flex: 1, marginHorizontal: 4 }
});

export default ListCardButton;
