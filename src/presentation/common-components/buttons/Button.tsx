import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '../../../application/common/colors';
import { Button as Buttonrnp } from 'react-native-paper';
import { FontStyles, FONTS_FAMILY } from '../../../application/common/fonts';
import { testProps } from '../../../application/utils/accessibleId';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';

export interface IndicatorProps {
  color?: string;
  size?: 'large' | 'small';
}
interface ButtonProps {
  onPress: () => void;
  icon?: JSX.Element;
  backgroundColor?: string;
  textColor: string;
  linkName: string;
  textStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  testID?: string;
  showActivityIndicator?: boolean;
  marginTop?: number;
  activityIndicator?: IndicatorProps;
}

export const Button: FC<ButtonProps> = ({
  testID,
  icon = null,
  disabled,
  linkName,
  backgroundColor,
  onPress,
  containerStyle,
  textStyle,
  textColor,
  showActivityIndicator,
  marginTop,
  activityIndicator
}) => {
  return (
    <TouchableOpacity
      accessible
      {...testProps(testID ?? linkName)}
      activeOpacity={0.9}
      onPress={() => !disabled && onPress()}
      style={[
        {
          borderRadius: 5,
          backgroundColor: disabled ? COLORS.BORDERCOLOR : backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          marginTop: marginTop ?? 25,
          height: 40,
          flexDirection: 'row'
        },
        containerStyle
      ]}>
      {showActivityIndicator && (
        <ActivityIndicator
          style={{ marginRight: 8 }}
          size={activityIndicator?.size ?? 'small'}
          color={activityIndicator?.color ?? COLORS.BRAND}
        />
      )}
      {icon}
      <Text
        style={[
          FontStyles.Button,
          textStyle,
          {
            color: textColor ?? textStyle?.color ?? 'white',
            opacity: disabled ? 0.5 : 1
          }
        ]}>
        {linkName}
      </Text>
    </TouchableOpacity>
  );
};

interface MainButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  testID?: string;
  showActivityIndicator?: boolean;
  activityIndicator?: IndicatorProps;
}
export function ButtonText({
  onPress,
  title,
  disabled = false,
  style = {},
  styleText = {},
  testID = ''
}: MainButtonProps) {
  let auxColor = disabled ? { color: COLORS.BORDERCOLOR } : {};

  return (
    <TouchableOpacity
      {...testProps(testID ?? title)}
      disabled={disabled}
      style={[ButtonStyles.textTouchable, style]}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={[ButtonStyles.textText, styleText, auxColor]}>{title}</Text>
    </TouchableOpacity>
  );
}

export function MainButton({
  onPress,
  title,
  icon = null,
  disabled = false,
  style = {},
  styleText = {},
  testID = '',
  showActivityIndicator,
  activityIndicator
}: MainButtonProps) {
  let auxBackground = disabled ? { backgroundColor: COLORS.BORDERCOLOR } : {};
  let auxIcon = icon ? ButtonStyles.iconText : {};
  return (
    <TouchableOpacity
      accessible
      {...testProps(testID ?? testID)}
      disabled={disabled}
      style={[ButtonStyles.mainTouchable, style, auxBackground]}
      activeOpacity={0.9}
      onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {!showActivityIndicator && icon}
        {showActivityIndicator && (
          <ActivityIndicator
            style={{ marginRight: 8 }}
            size={activityIndicator?.size ?? 'small'}
            color={activityIndicator?.color ?? COLORS.BRAND}
          />
        )}
        <Text style={[ButtonStyles.mainText, auxIcon, styleText]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
interface ButtonOutlinedProps extends MainButtonProps {
  labelStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<TextStyle>;
}
export function ButtonOutlined({
  onPress,
  title,
  disabled = false,
  style = {},
  styleText = {},
  labelStyle = {},
  contentStyle = {},
  testID = ''
}: ButtonOutlinedProps) {
  let auxBackground = disabled ? { backgroundColor: COLORS.BORDERCOLOR } : {};
  return (
    <Buttonrnp
      mode="outlined"
      {...testProps(testID)}
      theme={{ colors: { primary: COLORS.BRAND } }}
      disabled={disabled}
      labelStyle={[{ width: '80%' }, labelStyle]}
      contentStyle={contentStyle}
      style={[
        disabled
          ? ButtonStyles.outlinedTouchableDisabled
          : ButtonStyles.outlinedTouchable,
        style,
        auxBackground
      ]}
      onPress={onPress}>
      <Text
        style={[
          ButtonStyles.outlinedText,
          disabled ? ButtonStyles.outlinedTextDisabled : styleText
        ]}>
        {title}
      </Text>
    </Buttonrnp>
  );
}

export const ButtonStyles = StyleSheet.create({
  textTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14
  },
  textText: {
    fontFamily: fontFamilyOS(),
    fontSize: 14,
    fontWeight: fontWeightOS('700'),
    color: COLORS.DARK70,
    letterSpacing: 0.6,
    textDecorationLine: 'underline'
  },
  mainTouchable: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: COLORS.BRAND,
    width: '95%'
  },
  mainText: {
    fontSize: 14,
    fontWeight: fontWeightOS('700'),
    color: 'white',
    fontFamily: fontFamilyOS(),
    fontStyle: 'normal'
  },
  iconText: {
    marginLeft: 8
  },
  outlinedText: {
    fontSize: 14,
    fontWeight: fontWeightOS('700'),
    fontFamily: fontFamilyOS(),
    color: COLORS.DARK70
  },
  outlinedTextDisabled: {
    fontSize: 14,
    fontWeight: fontWeightOS('700'),
    fontFamily: fontFamilyOS(),
    color: COLORS.DEPRATYGRAY
  },
  outlinedTouchable: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    borderColor: COLORS.DARK70
  },
  outlinedTouchableDisabled: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    borderColor: COLORS.DEPRATYGRAY
  }
});

export default Button;
