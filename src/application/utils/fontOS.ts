import { Platform } from 'react-native';

type IWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

type IFamily = 'Regular' | 'Medium' | 'Bold';

export const fontWeightOS = (fontWeight: IWeight): IWeight => {
  return Platform.OS === 'ios' ? fontWeight : undefined;
};

export const fontFamilyOS = (fontFamily?: IFamily): string => {
  const applyFont = fontFamily ?? 'Medium';
  return Platform.OS === 'ios' ? 'Roboto-Regular' : `Roboto-${applyFont}`;
};
