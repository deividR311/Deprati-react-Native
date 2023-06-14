//Libs
import { StyleSheet } from 'react-native';
import { COLORS, FONTS_FAMILY } from '../../../../application/common';
import layout from '../../../../application/common/layout';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    // paddingBottom: HEIGHT_TAB_BAR + 120,
    paddingBottom: layout.window.height * 0.25
  },
  content: { paddingHorizontal: 15 },
  contentTitle: { alignSelf: 'center', paddingVertical: 10 },
  title: { fontFamily: FONTS_FAMILY.Roboto },
  inputCity: { marginTop: 2 },
  inputStore: { marginTop: 16 },
  contentButton: { width: '50%', alignSelf: 'flex-start', marginVertical: 16 },
  buttonClean: { width: '80%' },
  buttonContinue: { width: '100%', borderColor: 'red' },
  accordion_title: { color: COLORS.DARK },
  accordion: {
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.GRAYDARK60
  },
  containerBtnContinue: {
    borderColor: `${COLORS.GRAYDARK60}90`,
    borderWidth: 1
  }
});
