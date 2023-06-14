//Libs
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';

export const styles = StyleSheet.create({
  lineMania: {
    backgroundColor: COLORS.DARK,
    height: 2,
    width: 70,
    marginTop: 40
  },
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 16,
    justifyContent: 'center'
    // alignItems: 'center',
  },

  content_colors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },

  container_withoutStock: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.small,
    color: COLORS.BRAND,
    fontWeight: '400',
    marginTop: 8
  },

  subTitle: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: FONTS_SIZES.subtitle1,
    lineHeight: 24,
    letterSpacing: 0.5,
    textAlign: 'left',
    color: COLORS.DARK70
  }
});

export const stylesColors = StyleSheet.create({
  container: { marginBottom: 5 },
  contentImage: { width: 27, height: 27 },
  check: { marginLeft: 6 }
});

export const stylesDropdown = StyleSheet.create({
  btn: {
    flex: 1,
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.DARK2ND,
    width: '100%'
  },
  btnText: {
    color: COLORS.DARK2ND,
    textAlign: 'left',
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Regular']
  },
  dropdown: {
    backgroundColor: '#EFEFEF',
    width: 300,
    elevation: 7
  },
  row: {
    backgroundColor: 'white',
    // borderColor: 'white',
    borderBottomColor: 'white'
  },
  rowText: { color: '#444', textAlign: 'left', fontSize: 14 }
});
