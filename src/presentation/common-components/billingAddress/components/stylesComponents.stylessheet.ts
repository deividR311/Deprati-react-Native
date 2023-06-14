import { StyleSheet } from 'react-native';
import layout from '../../../../application/common/layout';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common';

const sizeMarker = layout.window.width * 0.25;

export const stylesAddressPayment = StyleSheet.create({
  container: { width: '100%', flexDirection: 'row' },
  content_radioButton: { width: '10%' },
  content_textRow: { width: '90%' },
  content_buttonBottom: { flexDirection: 'row' },
  content_buttonAddDelete: {
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 36
  },
  checkBox: { marginLeft: -12, marginTop: 14 },
  text_button: { color: COLORS.BRAND }
});

export const stylesAddressEmpty = StyleSheet.create({
  contentCart: {
    alignSelf: 'center',
    backgroundColor: COLORS.BACKGROUNDICON,
    width: sizeMarker,
    height: sizeMarker,
    borderRadius: sizeMarker / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  textEmpty: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: FONTS_SIZES.label,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.2,
    color: COLORS.DARK70,
    paddingHorizontal: 5
  }
});

export const stylesTextRowComponent = StyleSheet.create({
  title: {
    ...FontStyles.Body_2,
    fontFamily: FONTS_FAMILY['Roboto-Bold']
  },
  titleIos: {
    ...FontStyles.Body_2,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    fontWeight: 'bold'
  },
  text: { fontFamily: FONTS_FAMILY.Roboto }
});

export const stylesBillingAddressComponent = StyleSheet.create({
  header_info: {
    color: COLORS.BRAND,
    fontSize: 18,
    marginTop: 16,
    marginBottom: 10,
    marginLeft: 0,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  divider: {
    width: '86%',
    height: 1,
    marginTop: 3,
    marginBottom: 3,
    alignSelf: 'center'
  },
  text_button: { color: COLORS.DARKBRAND }
});
