import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { FontStyles } from '../../../application/common/fonts';

export interface RowProps {
  title?: string;
  value?: string;
  semicolom?: boolean;
  fontColor?: string;
  fontValueColor?: string;
  size?: 'small' | 'medium' | 'large' | 'asLink';
  onPress?: () => void;
  valueComponent?: React.ReactNode;
  asLink?: boolean;
  maxWithRowValue?: string | number;
  maxWithRowTitle?: string | number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

export interface BoxProps {
  title?: string;
  separator?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  boxStyle?: BoxStyle;
  rows: RowProps[];
  initialRowComponent?: React.ReactNode;
  rowContainerStyle?: StyleProp<ViewStyle>;
}

interface BoxStyle extends ViewStyle {
  backgroundColor?: string;
  fontColor?: string;
  titleColor?: string;
}
