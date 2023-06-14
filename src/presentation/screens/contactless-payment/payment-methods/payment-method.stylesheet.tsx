import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../application/common/colors';

export const Styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  space: {
    paddingVertical: 16
  },
  card: {
    marginVertical: 10,
    borderRadius: 4,
    shadowColor: COLORS.DARK,
    elevation: 4
  },
  poppup__title: {
    paddingHorizontal: 32
  }
});
