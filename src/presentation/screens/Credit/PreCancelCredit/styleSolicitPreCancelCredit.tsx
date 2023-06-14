import { Platform, StyleSheet } from 'react-native';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  HEIGHT_TAB_BAR
} from '../../../../application/common';
import { fontWeightOS } from '../../../../application/utils';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: HEIGHT_TAB_BAR + 16
  },
  cardTop: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.GRAYBRAND,
    paddingVertical: 12
  },

  subTitle: { textAlign: 'center' },
  valueRed: {
    color: COLORS.BRAND
  },
  textCard: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '400'
  },
  textTotal: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: fontWeightOS('700'),
    fontStyle: 'normal',
    lineHeight: 28,
    fontSize: 24
  },
  valueTotal: {
    color: COLORS.BRAND,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontStyle: 'normal',
    lineHeight: 28,
    fontSize: 20
  },
  valueSaving: {},
  valueApplicationDate: {
    ...FontStyles.Body_1,
    fontStyle: 'normal',
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  viewCard: {
    //marginTop: 8,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2
  },
  contentCard: {
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GRAYDARK20
  },
  divider: {
    height: 1,
    width: '75%',
    alignSelf: 'center',
    marginVertical: 12
    // backgroundColor: 'red',
  },
  legend: {
    marginTop: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center'
  },
  contentButtons: {
    width: '100%',
    marginTop: 20
  },
  button: { width: '100%', height: 40 },
  buttonText: {
    fontSize: 14,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: 16.41,
    letterSpacing: 0.75,
    textAlign: 'center'
  },
  buttonSeeDetails: {
    width: '100%',
    height: 40,
    marginTop: 20,
    borderColor: COLORS.DARK70,
    borderWidth: 1
  },
  buttonLabel: { width: '92%', height: '50%' }
});

export const stylesPopup = StyleSheet.create({
  containerButtonsStyle: { marginHorizontal: 20 },
  buttonTextStyle: {
    textDecorationLine: 'none',
    color: COLORS.DARK,
    marginRight: 60
  },
  secondButtonTextStyle: { textDecorationLine: 'none' }
});
