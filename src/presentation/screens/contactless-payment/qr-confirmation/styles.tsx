import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS_SIZES,
  FontStyles
} from '../../../../application/common';
import layout from '../../../../application/common/layout';

export const Styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 28,
    paddingHorizontal: 22,
    backgroundColor: COLORS.WHITE
  },
  spacing: {
    marginVertical: 18
  },
  qrCodeContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  shareIcon: {
    marginHorizontal: 8
  },
  information: {
    marginTop: 40
    //marginBottom: 8,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.GRAYBRAND,
    width: '100%',
    marginVertical: 24
  },
  link: {
    ...FontStyles.Center,
    ...FontStyles.Bold,
    ...FontStyles.PrimaryColor,
    textDecorationLine: 'underline',
    fontSize: FONTS_SIZES.subtitle1,
    lineHeight: 24
  },
  closeButtonBottomSheet: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    width: '100%'
  },
  titleBottomsheet: {
    ...FontStyles.H1_Headline,
    paddingVertical: 26
  },
  button__containerStyle: {
    marginTop: 16
  },
  containerBottomsheet: {
    paddingHorizontal: 16,
    paddingBottom: layout.window.height * 0.035
  }
});
