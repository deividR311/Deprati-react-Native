import { StyleSheet } from 'react-native';
import { COLORS, FontStyles } from '../../../application/common';

export const Styles = StyleSheet.create({
  closeButton: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    width: '100%'
  },
  body: {
    justifyContent: 'center',
    padding: 16
  },
  biometricArea: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GRAYDARK20,
    borderRadius: 12,
    paddingVertical: 24,
    marginTop: 19
  },
  biometricText: {
    ...FontStyles.Body_1,
    ...FontStyles.Center,
    marginTop: 19
  },
  normalLoginTitle: {
    ...FontStyles.H3_Headline,
    ...FontStyles.Center
  },
  separator: {
    height: 3,
    borderRadius: 6,
    backgroundColor: COLORS.GRAYDARK20,
    marginVertical: 20
  },
  text: {
    ...FontStyles.Body_1,
    ...FontStyles.Center
  },
  buttonChangeToNormalLogin: {
    borderWidth: 1,
    borderColor: COLORS.DARK,
    color: COLORS.DARK
  },
  buttonForgotPassword: {
    backgroundColor: 'transparent'
  },
  buttonForgotPasswordText: {
    color: COLORS.BRAND,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.BRAND
  },
  buttonConfirm: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.BRAND
  },
  socialContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 4
  }
});
