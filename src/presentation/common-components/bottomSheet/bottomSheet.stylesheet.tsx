import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';

export const Styles = StyleSheet.create({
  backDrop: {
    backgroundColor: COLORS.BACKDROP,
    flex: 1,
    justifyContent: 'flex-end'
  },
  header: {
    width: '100%',
    height: 32
  },
  mania: {
    width: 60,
    backgroundColor: COLORS.GRAYBRAND,
    height: 4,
    alignSelf: 'center',
    marginVertical: 14,
    borderRadius: 2
  },
  contentContainer: {
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    // elevation: 10,
    // shadowColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: COLORS.WHITE,
    overflow: 'hidden'
  },
  without: { flex: 1 }
});
