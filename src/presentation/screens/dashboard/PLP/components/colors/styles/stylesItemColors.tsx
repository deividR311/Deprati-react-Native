import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../../application/common/colors';

export const styles = StyleSheet.create({
  container: { paddingVertical: 5 },
  contentImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 20,
    borderColor: COLORS.WHITE,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 4
  },
  image: {
    width: '100%',
    height: '100%'
    // borderRadius: 20,
    // borderColor: 'white',
    // borderWidth: 3,
  },
  check: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 4
    // backgroundColor:'cyan',
  }
});
