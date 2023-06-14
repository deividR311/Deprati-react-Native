import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface PopupProps {
  key?: React.Key;
  visible?: boolean;
  onCloseRequest?: () => void;

  showCloseButton?: boolean;
  closeAction?: () => void;
  onDismiss?: () => void;

  icon?: string | JSX.Element;
  iconButton?: JSX.Element;
  iconColor?: string;

  title?: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  containerButtonsStyle?: ViewStyle;
  textContent?: string;
  textContentStyle?: TextStyle;
  buttonTextStyle?: TextStyle;
  secondButtonTextStyle?: TextStyle;
  textComponent?: (props: any) => React.ReactNode;
  modalContent?: () => React.ReactNode;
  hideButton?: boolean;
  doubleButton?: boolean;
  buttonText?: string;
  secondButtonText?: string;
  buttonType?: 'full' | 'short';
  buttonAction?: () => void;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  bodyComponent?: () => React.ReactNode;

  ///MODAL CARD TOAST
  isToast?: boolean;
  isToastBottom?: boolean;
  delayHideToast?: number;
  styleToast?: ViewStyle;
  styleContentToast?: ViewStyle;
  styleContentTextToast?: ViewStyle;
  styleTextToast?: TextStyle;
  styleContentButtonToast?: ViewStyle;
  styleButtonToast?: ViewStyle;
  identifier?: string;

  //MODAL LOGIN
  isLoginModal?: boolean;

  //MODAL LOADING
  isModalLoading?: boolean;
  behaviorCustom?: 'height' | 'position' | 'padding';
  hasInput?: boolean;
}
