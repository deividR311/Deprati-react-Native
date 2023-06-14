import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';

export const Styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButtomContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    width: '100%'
  },
  checkMarkIcon: {
    color: COLORS.GREENOK
  },
  title: {
    marginTop: 41,
    marginBottom: 5
  },
  spacing: {
    marginVertical: 22
  },
  card: {
    elevation: 4,
    backgroundColor: COLORS.LIGHTGRAY,
    width: '100%',
    paddingHorizontal: 17,
    paddingVertical: 13,
    marginVertical: 15
  },
  buttons: {
    marginHorizontal: 22
  }
});
