import { Dimensions, Platform, StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  HEIGHT_TAB_BAR
} from '../../../application/common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: 150,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: Platform.select({
      android: HEIGHT_TAB_BAR + 50,
      ios: 0
    }),
    paddingHorizontal: 24
  },
  contentContainer: {
    // width: '100%',
    // flexDirection: 'row',
    // alignSelf: 'center',
    // marginTop: 12,
    flex: 1,
    alignItems: 'center'
  },
  socialContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 4
  },
  separtor: {
    height: 1,
    width: Dimensions.get('window').width - 76,
    backgroundColor: COLORS.DARK70TRANSPARENT,
    marginVertical: 25,
    opacity: 0.3,
    borderRadius: 4
  },
  container__line: {
    width: '100%',
    backgroundColor: COLORS.DEPRATYGRAY,
    height: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 22
  },
  container__title: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container__title_icon: {
    flexGrow: 1
  },
  container__title_text: {
    flexGrow: 3,
    position: 'absolute',
    color: COLORS.DARK70,
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: FONTS_SIZES.label + 10
  },
  categories: {
    flex: 1
  },
  item: {
    flex: 1,
    width: '95%',

    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAYBRAND
  },
  item__title: {
    color: COLORS.DARK70,
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: FONTS_SIZES.label + 10
  },
  inputPassword: {
    marginTop: 20
    // height: '20%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerTitle: {
    fontSize: FONTS_SIZES.extra,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  bottomsheet__iconButtonClose: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // paddingBottom: 11,
    // marginTop: 18,
    marginBottom: 25,
    width: '100%'
  }
});
