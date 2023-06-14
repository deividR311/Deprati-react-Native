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
    paddingTop: 40,
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
  ticket: {
    color: COLORS.DARKBRAND
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
    backgroundColor: COLORS.LIGHTGRAY,
    width: '100%',
    paddingHorizontal: 17,
    paddingVertical: 13,
    marginVertical: 15,
    borderRadius: 8
  },
  seeDetail: {
    color: COLORS.BRAND,
    marginBottom: 30
  },
  textCard: {
    fontSize: FONTS_SIZES.extra
  },

  buttonSeeDetails: { width: '95%', marginTop: 18 },

  contentButtons: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20
  }
});
