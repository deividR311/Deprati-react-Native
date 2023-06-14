import { StyleSheet } from 'react-native';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common';

export const styles = StyleSheet.create({
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
    // paddingTop: 10,
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
    marginVertical: 15,
    borderRadius: 8
  },
  buttons: {
    marginHorizontal: 22
  },
  iconDelivery: {
    backgroundColor: COLORS.BACKGROUNDICON,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewIcons: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
  textIcons: { ...FontStyles.Body_1, paddingHorizontal: 25 },

  payUpTo: {
    backgroundColor: COLORS.ACCENTBRAND,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5
  },
  subtitle: {
    ...FontStyles.H6_Headline,
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    color: COLORS.DARK70,
    flexGrow: 0,
    paddingVertical: 10
  },
  buttonSeeDetails: { width: '95%', marginTop: 18 },

  containerImages: { alignItems: 'center', marginVertical: -4.5 },
  contentImages: { width: '85%', height: 85, marginVertical: 8 },
  imageCancel: { marginLeft: 6 },

  contentButtons: {
    width: '100%',
    paddingHorizontal: 8,
    alignItems: 'center',
    paddingBottom: 16
  },
  errorSave: {
    fontSize: FONTS_SIZES.label
  }
});
