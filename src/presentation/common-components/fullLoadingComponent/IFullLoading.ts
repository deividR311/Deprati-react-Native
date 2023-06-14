import { ViewStyle } from 'react-native';

export interface IFullLoading {
  visible: boolean;
  style?: ViewStyle | ViewStyle[];
  contentStyle?: ViewStyle | ViewStyle[];
  sizeIndicator?: number | 'small' | 'large';
  colorIndicator?: string;
}
