import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../application/common/colors';

export const Styles = StyleSheet.create({
  scroll: {
    backgroundColor: COLORS.WHITE
  },
  scroll__card: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 24,
    elevation: 6,
    backgroundColor: COLORS.GRAYDARK20,
    marginVertical: 10
  },
  scroll__message: {
    backgroundColor: COLORS.GRAYDARK,
    padding: 15,
    marginTop: 5,
    marginBottom: 10
  },
  container__buttons: {
    paddingBottom: 64,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.WHITE
  }
});
