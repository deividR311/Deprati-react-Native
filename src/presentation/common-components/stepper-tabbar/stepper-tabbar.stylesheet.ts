import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';

export const Styles = StyleSheet.create({
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
    alignItems: 'center',
    maxWidth: 64
  },
  tab__button__text_active: {
    color: COLORS.BRAND
  },
  tab__stepper__container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab__stepper__indicator_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab__stepper__indicator_line: {
    backgroundColor: COLORS.GRAYBRAND,
    height: 3,
    flex: 1,
    marginHorizontal: 3,
    maxWidth: 38,
    borderRadius: 6
  },
  tab__stepper__indicator_onblur: {
    backgroundColor: COLORS.GRAYBRAND
  },
  tab__stepper__indicator_line_onfocus: {
    backgroundColor: COLORS.BRAND
  }
});
