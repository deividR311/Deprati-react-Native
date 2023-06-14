import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    backgroundColor: COLORS.DARK70,
    width: '95%',
    height: 80,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content__text: { width: '60%', paddingHorizontal: 20 },
  text: { color: COLORS.WHITE },
  content__button: { width: '40%', paddingHorizontal: 10 },
  button: { alignSelf: 'center' }
});
