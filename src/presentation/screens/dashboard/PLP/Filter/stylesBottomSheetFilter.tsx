import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import { HEIGHT_TAB_BAR } from '../../../../../application/common/layout';

export const styles = StyleSheet.create({
  close: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    position: 'absolute',
    right: 0,
    top: 0
  },
  container: {
    height: '74%',
    width: '100%',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    overflow: 'hidden',
    // backgroundColor: COLORS.REDICON,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: HEIGHT_TAB_BAR - 15
  },
  content_accordion: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  content__accordion_title: { marginLeft: -10, color: COLORS.DARK },
  container__buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingLeft: 11,
    width: '100%'
  },
  container__buttons_clear: { alignSelf: 'center', width: '50%' },
  container__buttons_show: { width: '50%' }
});
