import { TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../../application/common';

export const iconDefault = 'information-outline';
export const MapStatesCard = new Map([
  [
    'information',
    {
      iconName: iconDefault,
      iconColor: COLORS.DARK70,
      backgroundColor: COLORS.GRAYDARK20
    }
  ],
  [
    'success',
    {
      iconName: 'checkbox-marked-circle',
      iconColor: COLORS.DARK70,
      backgroundColor: COLORS.BACKGROUNDCARDSUCCESS
    }
  ],
  [
    'error',
    {
      iconName: 'alert-circle-outline',
      iconColor: COLORS.BRAND,
      backgroundColor: COLORS.PINKBRAND
    }
  ],
  [
    'todayOffer',
    {
      iconName: iconDefault,
      iconColor: COLORS.DARK70,
      backgroundColor: COLORS.WHITE
    }
  ],
  [
    'promotion',
    {
      iconName: 'alert-circle-outline',
      iconColor: COLORS.PINKBACKGROUND,
      backgroundColor: COLORS.PINKBACKGROUND
    }
  ],
  [
    'second-promotion',
    {
      iconName: 'alert-circle-outline',
      iconColor: COLORS.PINKBACKGROUND,
      backgroundColor: COLORS.PINKBACKGROUND,
      textColor: 'red'
    }
  ]
]);

export type AllTypesCard =
  | 'information'
  | 'success'
  | 'error'
  | 'todayOffer'
  | 'promotion'
  | 'second-promotion';

export interface CardInformationProps {
  style?: ViewStyle;
  styleContent?: ViewStyle;
  styleIcon?: ViewStyle;
  styleContentText?: ViewStyle;
  styleText?: TextStyle;
  styleContentClose?: ViewStyle;
  sizeClose?: number;
  sizeIcon?: number;
  typeCard?: AllTypesCard;
  Icon?: React.ReactNode;
  text: string;
  onClose?(text?: string): void;
  onPress?(args: { text: string; link?: string }): void;
}
