import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 78
  },
  textLeft: {
    textAlign: 'left'
  },
  row: {
    flexDirection: 'row',
    width: '100%'
  },
  rowItem: {
    flex: 1
  },
  rowItemSpace: {
    width: 16,
    height: 16
  },
  inputSpaceTop: {
    marginTop: 16
  },
  line: {
    borderBottomColor: COLORS.GRAYBRAND,
    opacity: 0.5,
    borderBottomWidth: 1,
    marginVertical: 16
  }
});
