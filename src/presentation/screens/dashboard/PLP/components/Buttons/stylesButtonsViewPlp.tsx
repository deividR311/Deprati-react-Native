import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../application/common/colors';
import layout, {
  MARING_HORIZONTAL
} from '../../../../../../application/common/layout';

export const styles = StyleSheet.create({
  container: {
    width: layout.window.width,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE
  },
  contentDropDown: {
    width: layout.window.width * 0.53,
    paddingLeft: 10
  },
  dropDown: { height: 50 },

  contentButtons: {
    flexDirection: 'row',
    width: layout.window.width * 0.47,
    paddingTop: 3,
    justifyContent: 'space-between'
  }
});
