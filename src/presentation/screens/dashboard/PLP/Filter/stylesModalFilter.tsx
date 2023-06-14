import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import {
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { HEIGHT_TAB_BAR } from '../../../../../application/common/layout';

export const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    height: '100%'
  },
  container: {
    // flex: 1,
    height: '74%',
    width: '100%',
    // marginTop: 150,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    // paddingVertical: 32,
    paddingBottom: HEIGHT_TAB_BAR - 15
  },
  content: {
    // paddingBottom: HEIGHT_TAB_BAR + 50,
    paddingHorizontal: 16
  },
  content_close: {
    backgroundColor: COLORS.DEPRATYGRAY,
    width: 30,
    height: 30,
    right: 0,
    position: 'absolute'
  },
  content_close_x: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1
  },
  line: {
    width: 50,
    backgroundColor: COLORS.DARK70,
    height: 2,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center'
  },
  container__title: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container__title_text: {
    flexGrow: 3,
    position: 'absolute',
    top: 10,
    color: COLORS.DARK70,
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: FONTS_SIZES.label + 10
  },
  container__subtitle: {
    color: 'gray',
    textAlign: 'center',
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: 10,
    marginTop: 5
  },
  textSelected: {
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: 12,
    color: 'gray'
  },
  content_accordion: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // alignSelf:'center',
    width: '100%'
  },
  content__accordion_title: { marginLeft: -10, color: COLORS.DARK },
  content__checkbox: { marginTop: 0 },
  content__checkbox_textStyle: {
    fontSize: FONTS_SIZES.label,
    color: COLORS.DARK,
    width: '100%'
  },
  container__buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingLeft: 10,
    width: '100%'
  },
  container__buttons_clear: { alignSelf: 'center', width: '50%' },
  container__buttons_show: { width: '50%' }
});
