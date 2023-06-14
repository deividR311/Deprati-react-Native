import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../application/common';
import { HEIGHT_TAB_BAR } from '../../../../application/common/layout';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: HEIGHT_TAB_BAR + 160
  },
  subTitle: { paddingHorizontal: 20, paddingTop: 20 },
  divider: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 12
  },
  checkBox: {
    backgroundColor: COLORS.GRAYDARK20,
    height: 60,
    paddingHorizontal: 27
  }
});
