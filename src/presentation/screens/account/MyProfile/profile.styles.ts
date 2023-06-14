import { StyleSheet } from 'react-native';
import {
  globalStyles,
  MARING_HORIZONTAL
} from '../../../../application/common';

export const Styles = StyleSheet.create({
  profile: {
    paddingHorizontal: MARING_HORIZONTAL
  },
  profile_button_edit: {
    width: '100%',
    marginVertical: 32
  },
  credit_title: {
    textAlign: 'left'
  },
  credit_paragraph: {
    marginTop: 8,
    lineHeight: 22
  },
  bottomsheet__iconButtonClose: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    marginTop: 18,
    width: '100%'
  },
  bottomsheet__paragraph: {
    paddingHorizontal: MARING_HORIZONTAL
  },
  cardFooter: {
    backgroundColor: 'rgba(245, 246, 249, 0.75)',
    padding: 15,
    borderRadius: 8
  },
  line: { ...globalStyles.divider, width: '93%', marginVertical: 25 }
});
