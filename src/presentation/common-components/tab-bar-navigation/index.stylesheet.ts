import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';

export const styles = StyleSheet.create({
  tab__container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    paddingVertical: 10,
    backgroundColor: COLORS.WHITE
  },
  tab__shadow: {
    position: 'absolute',
    bottom: 71,
    width: '100%',
    height: 10
  },
  tab__bar: {
    flexDirection: 'row',
    paddingBottom: 5,
    height: '100%',
    width: '100%'
  },
  tab__button: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center'
  },
  tab__button__text: {
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontSize: FONTS_SIZES.legal,
    textAlign: 'center',
    color: COLORS.DARK70
  },
  tab__button__text_active: {
    color: COLORS.BRAND
  },
  tab__button__line: {
    height: 3.5,
    position: 'absolute',
    marginLeft: 15,
    bottom: 68,
    backgroundColor: COLORS.DARKBRAND,
    overflow: 'hidden',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    zIndex: 5
  },
  tab__button__line_active: {
    backgroundColor: COLORS.DARKBRAND,
    overflow: 'hidden',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20
  }
});
