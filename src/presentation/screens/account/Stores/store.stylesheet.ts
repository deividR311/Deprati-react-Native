import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../application/common/colors';
import { FontStyles, FONTS_SIZES } from '../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../application/common';
import { fontFamilyOS } from '../../../../application/utils';

export const stylesStore = StyleSheet.create({
  viewCard: {
    width: '100%',
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
  mapView: {
    width: '100%',
    height: 120
  },
  contentDescription: {
    paddingHorizontal: MARING_HORIZONTAL,
    marginBottom: 16,
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    ...FontStyles.H1_Headline,
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 16
  },
  content_card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
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
  contentSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  schedule: {
    fontFamily: fontFamilyOS('Regular'),
    flexDirection: 'row',
    width: '80%'
  },
  textSchedule: {
    ...FontStyles.Body_1,
    fontSize: FONTS_SIZES.subtitle2,
    textAlign: 'left',
    marginTop: 12,
    flexWrap: 'wrap'
  },
  contentIcons: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between'
    // alignSelf: 'flex-end',
  }
});
