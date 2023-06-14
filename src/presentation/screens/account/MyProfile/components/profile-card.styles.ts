import { StyleSheet } from 'react-native';
import {
  COLORS,
  FontStyles,
  FONTS_SIZES,
  MARING_HORIZONTAL,
  SHADOW_CARD
} from '../../../../../application/common';

export const Styles = StyleSheet.create({
  container: { marginHorizontal: 2 },
  cardProfile: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.WHITE,
    marginTop: MARING_HORIZONTAL,
    paddingHorizontal: 18,
    paddingVertical: MARING_HORIZONTAL,
    paddingBottom: 24
  },
  shadow: {
    ...SHADOW_CARD,
    shadowColor: COLORS.DARK,
    elevation: 3
  },
  cardProfile_container: {},
  cardProfile_container_line: {
    height: 1,
    backgroundColor: COLORS.GRAYDARK60,
    opacity: 0.2,
    marginHorizontal: MARING_HORIZONTAL,
    marginVertical: MARING_HORIZONTAL
  },
  cardProfile_container_title: {
    ...FontStyles.H1_Headline,
    marginBottom: 8,
    textAlign: 'left',
    fontSize: FONTS_SIZES.title1,
    lineHeight: 21,
    letterSpacing: 0.005,
    color: COLORS.DARK70
  },
  cardProfile_container_data: {
    flexDirection: 'row'
  },
  cardProfile_container_data_title: {
    ...FontStyles.Body_2,
    fontWeight: '500',
    color: FontStyles.DarkColor.color
  },
  cardProfile_container_data_value: {
    ...FontStyles.Body_2,
    width: '60%',
    lineHeight: 18,
    letterSpacing: 0.1
  }
});
