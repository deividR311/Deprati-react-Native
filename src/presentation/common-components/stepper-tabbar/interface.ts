import {
  BottomTabBarProps,
  BottomTabNavigationOptions
} from '@react-navigation/bottom-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

export interface PropsButtonTab {
  arrowIconDirection: 'left' | 'right';
  options?: BottomTabNavigationOptions;
  isFocused?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

export interface StepperTabBarNavigationProps extends BottomTabBarProps {
  title?: string;
  subtitle?: string;
  showMenu?: () => void;
  onBackFromTabbar?(state: TabNavigationState<ParamListBase>): void;
  onNextFromTabbar?(state: TabNavigationState<ParamListBase>): void;
  showButtomsWhenZero?: boolean;
}
