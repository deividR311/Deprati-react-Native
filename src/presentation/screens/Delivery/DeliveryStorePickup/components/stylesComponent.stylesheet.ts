import { StyleSheet } from 'react-native';
import {
  COLORS,
  FontStyles,
  MARING_HORIZONTAL
} from '../../../../../application/common';

export const stylesStore = StyleSheet.create({
  viewCard: {
    borderRadius: 4,
    marginTop: 21,
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  content: { paddingHorizontal: MARING_HORIZONTAL, marginBottom: 16 },

  content_card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content_title: {
    ...FontStyles.H3_Headline,
    textAlign: 'left',
    marginTop: 20
  },

  addressTitle: {
    ...FontStyles.Body_1,
    textAlign: 'left',
    marginTop: 3,
    width: '80%'
  },
  schedule: {
    ...FontStyles.Body_1,
    textAlign: 'left',
    marginTop: 12,
    width: 200
  },
  content__days: {
    width: '100%',
    flexDirection: 'row'
    // backgroundColor: 'cyan',
  },
  content__days_schedule: { width: '78%' },
  content__days_signs: {
    width: '22%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'center'
    // backgroundColor: 'red',
  }
});

export const stylesPersonal = StyleSheet.create({
  viewCard: {
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  content: { paddingHorizontal: MARING_HORIZONTAL, marginBottom: 22 },
  content_title: {
    ...FontStyles.Subtitle_1,
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.BRAND
  },
  inputStyle: { width: '100%', marginTop: 16 }
});
