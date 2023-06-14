import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';

export const Styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 1
  },
  row__title: {
    marginVertical: 12
  },
  row__container: {
    paddingVertical: 6,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 16
  },
  row__value: {
    textAlign: 'right'
  },
  row__separator: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.GRAYBRAND,
    marginVertical: 10
  },
  sketonContentLayout: {
    flex: 1
  },
  sketonContentLayoutBuyItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  skeletonSpace: {
    marginBottom: 8
  }
});
