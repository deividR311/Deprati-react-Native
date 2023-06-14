import { StyleSheet } from 'react-native';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common';
import { fontFamilyOS, fontWeightOS } from '../../../../../application/utils';
import layout from '../../../../../application/common/layout';

export const stylesReturnList = StyleSheet.create({
  divider: {
    height: 1,
    width: '95%',
    alignSelf: 'center'
    // backgroundColor: 'red',
  },
  dateOrderReturn: {
    backgroundColor: COLORS.GRAYBRAND50,
    paddingRight: 30,
    height: 32,
    justifyContent: 'center'
  },
  dateOrderReturn_text: {
    ...FontStyles.Overline,
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    textAlign: 'right',
    color: COLORS.DARK
    // lineHeight: 16,
  },
  headerOrderReturn: {
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },

  buttonSolicit: { alignSelf: 'center', width: '91%', marginBottom: 15 },
  textSolicit: { lineHeight: 16, letterSpacing: 0.75 }
});

export const stylesReturnSolicit = StyleSheet.create({
  divider: {
    height: 1,
    width: '95%',
    alignSelf: 'center'
    // backgroundColor: 'red',
  },
  dateOrdersMade: {
    backgroundColor: COLORS.GRAYBRAND50,
    paddingRight: 30,
    height: 32,
    justifyContent: 'center'
  },
  dateOrdersMade_text: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '700',
    fontSize: FONTS_SIZES.label,
    letterSpacing: 1,
    textAlign: 'right',
    color: COLORS.DARK
    // lineHeight: 16,
  },
  title: {
    paddingHorizontal: 15,
    marginTop: 10,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: 24,
    color: COLORS.DARK70
  },
  subTitle: {
    marginTop: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: COLORS.DARK70
  },
  paragraph: {
    marginTop: 5,
    paddingHorizontal: 15,
    color: COLORS.DARK70
  },
  paragraph2: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    color: COLORS.DARK70
  }
});

export const tagsStyles = StyleSheet.create({
  h1: {
    fontFamily: layout.isIos
      ? FONTS_FAMILY['Roboto-Medium']
      : FONTS_FAMILY['Roboto-Bold'],
    fontWeight: fontWeightOS('700')
  }
});

export const stylesReturnDetail = StyleSheet.create({
  divider: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 12
    // backgroundColor: 'red',
  },
  table: {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    width: '100%'
  },
  headTable: {
    backgroundColor: COLORS.BACKGROUNDHEAD,
    // paddingHorizontal:10,
    height: 32,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10
  },
  centerY: { justifyContent: 'center' },
  widthLeft: { width: '20%' },
  widthCenter: { width: '60%' },
  widthRight: { width: '20%' },

  fileTable: { flexDirection: 'row', width: '100%', marginBottom: 10 },

  columnHeadLeft: { paddingLeft: 10 },
  columnHeadCenter: { width: '60%', paddingLeft: 20 },
  columnHeadRight: { paddingLeft: 5 },

  columnLeft: { alignItems: 'center', paddingLeft: 5 },
  columnCenter: { paddingHorizontal: 20 },
  columnRight: { paddingLeft: 5 },

  text: {
    fontSize: FONTS_SIZES.legal,
    color: COLORS.GRAYDARK60,
    // fontFamily: FONTS_FAMILY.Roboto,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontStyle: 'normal',
    letterSpacing: 0.8
    // lineHeight:18
  },
  textOrder: {
    fontSize: FONTS_SIZES.legal,
    color: COLORS.GRAYDARK60,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontStyle: 'normal',
    letterSpacing: 0.8,
    marginBottom: -8
  },
  textState: {
    marginTop: 12
  },
  subTitle: {},
  order: { marginTop: 12, color: COLORS.BRAND },
  sectionUp: { paddingHorizontal: 20 },
  headTitle: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.label,
    // letterSpacing: 0.44,
    lineHeight: 20,
    color: COLORS.DARK70
  },
  button: { alignSelf: 'center', width: '91%', marginBottom: 15 },
  textButton: { lineHeight: 16, letterSpacing: 0.75 },
  line: {
    width: '100%',
    borderColor: COLORS.GRAYBRAND,
    borderBottomWidth: 1,
    marginTop: 16
  },
  textRow: {
    fontFamily: FONTS_FAMILY.Roboto
  }
});

export const stylesReturnEnter = StyleSheet.create({
  divider: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 12
    // backgroundColor: 'red',
  },
  checkBox: {
    paddingHorizontal: 15
  },
  table: {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    width: '100%'
  },
  headTable: {
    backgroundColor: COLORS.BACKGROUNDHEAD,
    // paddingHorizontal:10,
    height: 32,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10
  },
  centerY: { justifyContent: 'center' },
  widthLeft: { width: '20%' },
  widthCenter: { width: '60%' },
  widthRight: { width: '20%' },

  fileTable: { flexDirection: 'row', width: '100%', marginBottom: 10 },

  columnHeadLeft: { paddingLeft: 10 },
  columnHeadCenter: { width: '60%', paddingLeft: 20 },
  columnHeadRight: { paddingLeft: 5 },

  columnLeft: { alignItems: 'center', paddingLeft: 5 },
  columnCenter: { paddingHorizontal: 20 },
  columnRight: { paddingLeft: 5 },

  text: {
    fontSize: FONTS_SIZES.legal,
    color: COLORS.GRAYDARK60,
    // fontFamily: FONTS_FAMILY.Roboto,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontStyle: 'normal',
    letterSpacing: 0.8
    // lineHeight:18
  },
  textOrder: {
    fontSize: FONTS_SIZES.legal,
    color: COLORS.GRAYDARK60,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontStyle: 'normal',
    letterSpacing: 0.8,
    marginBottom: -8
  },
  textState: {
    marginTop: 12
  },
  subTitle: { paddingHorizontal: 20, paddingTop: 20 },
  order: { marginTop: 12, color: COLORS.BRAND },
  sectionUp: { paddingHorizontal: 20 },
  headTitle: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '700',
    fontSize: FONTS_SIZES.label,
    // letterSpacing: 0.44,
    lineHeight: 20,
    color: COLORS.DARK70
  },
  totalItems: {
    width: '100%',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GRAYDARK20
  },
  viewEnd: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30
  },
  viewEndMore: {},
  button: {
    alignSelf: 'center',
    width: '91%',
    marginTop: 30,
    marginBottom: 15,
    height: 40
  },
  buttonMore: {
    alignSelf: 'center',
    width: '91%',
    marginTop: 25,
    marginBottom: 15,
    height: 40
  },
  textButton: { lineHeight: 16, letterSpacing: 0.75 }
});
