import React, { FC } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicator
} from 'react-native';
import { COLORS, FontStyles } from '../../../../application/common';

interface IndicatorProps {
  color?: string;
  size?: 'large' | 'small';
}
interface ButtonProps {
  onPress: () => void;
  icon?: JSX.Element;
  backgroundColor: string;
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

export const ButtonModal: FC<ButtonProps> = ({
  testID,
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
      testID={testID}
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
      <Text
        style={[
          FontStyles.Button,
          textStyle,
          {
            color: textColor ?? textStyle?.color ?? 'white'
            // opacity: disabled ? 0.5 : 1,
          }
        ]}>
        {linkName}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonModal;
