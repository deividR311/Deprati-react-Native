import { fontFamilyOS, fontWeightOS } from '../utils/fontOS';
import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const FONTS_FAMILY = {
  Roboto: 'Roboto-Regular',
  'Roboto-Regular': 'Roboto-Regular',
  'Roboto-Medium': 'Roboto-Medium',
  'Roboto-Bold': 'Roboto-Bold'
};

export const FONTS_SIZES = {
  super: 23,
  extra: 20,
  title: 18,
  title1: 18,
  title2: 16,
  subtitle1: 16,
  subtitle2: 15,
  subtitle3: 10,
  label: 14,
  paragraph: 14,
  small: 13,
  legal: 12,
  badge: 10,
  badge2: 8,
  input: 17
};

export const SIZE_ICON_TAB = 28;

export const FontStyles = StyleSheet.create({
  H1_Headline: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.super,
    letterSpacing: 0.44,
    textAlign: 'center',
    color: COLORS.DARK
  },
  H2_Headline: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: 'bold',
    fontSize: FONTS_SIZES.extra,
    letterSpacing: 0.5,
    textAlign: 'center',
    lineHeight: 24
  },
  H3_Headline: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('500'),
    fontSize: FONTS_SIZES.extra,
    letterSpacing: 0.15,
    textAlign: 'center',
    lineHeight: 24
  },
  H6_2Headline: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('600'),
    fontSize: FONTS_SIZES.title2,
    lineHeight: 24,
    letterSpacing: 0.15
  },
  H6_Headline: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('500'),
    fontSize: FONTS_SIZES.extra,
    letterSpacing: 0.15,
    textAlign: 'center',
    lineHeight: 28
  },
  Subtitle: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('500'),
    fontSize: FONTS_SIZES.label,
    letterSpacing: 0.1,
    textAlign: 'center'
  },
  Subtitle_1: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('500'),
    fontSize: FONTS_SIZES.subtitle1,
    letterSpacing: 0.1,
    lineHeight: 16
  },
  Subtitle_2: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.subtitle2,
    letterSpacing: 0.1,
    lineHeight: 16
  },
  Subtitle_3: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    fontSize: FONTS_SIZES.legal,
    color: COLORS.DARK70TRANSPARENT75,
    letterSpacing: 0.44,
    lineHeight: 16
  },
  Body_1: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: FONTS_SIZES.subtitle1,
    letterSpacing: 0.44,
    color: COLORS.DARK,
    lineHeight: 24
  },
  Body_2: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('400'),
    fontSize: FONTS_SIZES.paragraph,
    color: COLORS.DARK,
    letterSpacing: 0.25,
    lineHeight: 20
  },
  Body_3: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('600'),
    fontSize: FONTS_SIZES.label,
    color: COLORS.DARK70,
    letterSpacing: 0.44,
    lineHeight: 16
  },
  Body_S: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: FONTS_SIZES.legal,
    color: COLORS.DARK,
    lineHeight: 22
  },
  Caption: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('500'),
    fontSize: FONTS_SIZES.legal,
    letterSpacing: 0.8,
    color: COLORS.DARK
    // lineHeight: 16,
  },
  Link: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('500'),
    fontSize: FONTS_SIZES.legal,
    letterSpacing: 0.1,
    color: COLORS.BRAND,
    lineHeight: 16,
    textDecorationLine: 'underline'
  },
  Overline: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    fontSize: FONTS_SIZES.badge,
    letterSpacing: 1,
    color: COLORS.DARK
  },
  Button: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.label,
    letterSpacing: 0.8,
    textAlign: 'center',
    color: COLORS.DARK
    // lineHeight: 16,
  },
  Action: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24,
    color: COLORS.DARK
  },
  Regular: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    fontSize: FONTS_SIZES.label,
    lineHeight: 20
  },
  ProductDescription: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    fontSize: FONTS_SIZES.subtitle3,
    letterSpacing: 0.8,
    textAlign: 'center',
    color: COLORS.DARK
    // lineHeight: 16,
  },
  Steps: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('500'),
    fontSize: FONTS_SIZES.badge,
    color: COLORS.DARK70
  },
  DarkColor: {
    color: COLORS.DARK
  },
  LightColor: {
    color: COLORS.WHITE
  },
  PrimaryColor: {
    color: COLORS.BRAND
  },
  SecondaryColor: {
    color: COLORS.GRAYBRAND
  },
  MutedColor: {
    color: COLORS.DARK70TRANSPARENT
  },
  MutedDarkColor: {
    color: COLORS.DARK70
  },
  Bold: {
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    fontWeight: fontWeightOS('bold')
  },
  Center: {
    textAlign: 'center'
  },
  Uppercase: {
    textTransform: 'uppercase'
  },
  Justify: {
    textAlign: 'justify'
  },
  default: { fontFamily: FONTS_FAMILY.Roboto }
});
