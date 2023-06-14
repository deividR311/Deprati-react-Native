import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import {
  HEIGHT_TAB_BAR,
  MARING_HORIZONTAL
} from '../../../application/common/layout';

export const stylesNoti = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  container_row: {
    flex: 1,

    height: '100%',
    paddingHorizontal: MARING_HORIZONTAL,
    paddingVertical: 10
  },
  container_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  btnDelete: {
    height: '100%',
    width: 92,
    backgroundColor: COLORS.BRAND,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
