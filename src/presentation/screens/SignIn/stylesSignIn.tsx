import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY } from '../../../application/common';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';

export const stylesSignIn = StyleSheet.create({
  containerSkeleton: { paddingTop: 12 },
  containerScrollView: { backgroundColor: COLORS.WHITE },
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  containerLogo: { width: '100%', alignItems: 'center' },
  logo: {
    marginHorizontal: 50,
    marginTop: -12
  },
  textSocials: {
    fontSize: 14,
    color: COLORS.DARK70TRANSPARENT,
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Roboto
  },
  viewSocial: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 4
  },
  textForgot: {
    fontFamily: fontFamilyOS(),
    color: COLORS.BRAND,
    fontSize: 14,
    fontWeight: fontWeightOS('bold'),
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 12,
    height: 40
  },
  mainButton: {
    marginTop: 24,
    alignSelf: 'center',
    height: 46,
    width: '100%'
  },
  textError: {
    marginLeft: 2
  }
});
