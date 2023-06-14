import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common';
import layout from '../../../../../application/common/layout';

export const stylesItem = StyleSheet.create({
  container: { width: '100%', marginTop: 5 },
  content: { width: '100%', flexDirection: 'row' },
  leftColumn: { width: '34%' },
  rightColumn: { width: '66%', paddingLeft: 20 }
});

export const stylesImageProduct = StyleSheet.create({
  style: { width: '100%', height: 180, borderRadius: 8 },
  styleImage: { width: '100%', height: '100%', borderRadius: 8 },
  styleContentImage: { borderRadius: 8 },
  styleViewLabel: { width: '100%', height: '13%', alignSelf: 'flex-end' },
  styleLabel: {
    alignSelf: 'flex-end',
    width: '50%',
    height: '100%',
    borderTopRightRadius: 6
  }
});

export const stylesTitleDelete = StyleSheet.create({
  style: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  styleText: {
    width: '80%',
    justifyContent: 'flex-start',
    fontFamily: FONTS_FAMILY.Roboto
  },
  styleViewDelete: { width: '20%', justifyContent: 'flex-end' }
});

export const stylesComponentPrice = StyleSheet.create({
  style: {
    width: layout.window.width * 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
    // backgroundColor:'red'
  },
  styleAux: {
    width: layout.window.width * 0.3,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
    // marginTop:0,
  },
  stylePrevPrice: { marginRight: 10 }
});

export const stylesComponentSizeColor = StyleSheet.create({
  style: {},
  styleText: {}
});

export const stylesComponentDiscount = StyleSheet.create({
  style: {},
  styleText: { color: COLORS.ACCENTBRANDRED },
  styleBoldText: { backgroundColor: COLORS.BACKGROUNDACCENTBRANDRED },
  styleNormalText: {
    backgroundColor: COLORS.BACKGROUNDACCENTBRANDRED,
    fontWeight: 'normal'
  }
});

export const promotionsStyle = StyleSheet.create({
  text: {
    fontSize: FONTS_SIZES.legal,
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 16,
    marginVertical: 1,
    padding: 2,
    color: COLORS.ACCENTBRANDRED
  },
  primary: {
    backgroundColor: COLORS.BACKGROUNDACCENTBRANDRED
  },
  secondary: {
    // backgroundColor: COLORS.BACKGROUNDACCENTBRANDRED,
    backgroundColor: COLORS.GRAYBRAND
  }
});
