import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { HEIGHT_TAB_BAR } from '../../../application/common/layout';
import { fontWeightOS } from '../../../application/utils';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
    paddingBottom: HEIGHT_TAB_BAR
  },
  content_chart: {
    paddingVertical: 16,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4
  },
  imageCard: {
    width: '100%',
    height: 236
  },
  nextPayment__container: {
    marginTop: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.GRAYDARK20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    paddingHorizontal: 24
  },
  nextPayment: {
    justifyContent: 'space-between'
  },
  nextPayment__title_text: {
    color: COLORS.DARK70,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.title,
    fontWeight: '500',
    marginTop: 16
  },
  nextPayment__data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  nextPayment__data_date: {
    color: '#3C4858',
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontSize: FONTS_SIZES.label,
    fontWeight: '400'
  },
  nextPayment__data_price: {
    color: '#3C4858',
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontSize: FONTS_SIZES.label,
    fontWeight: '400'
  },
  lastMovement: {
    paddingTop: 10
  },
  lastMovement_title: {
    color: COLORS.DARK70,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.label,
    fontWeight: fontWeightOS('700')
  },
  lastMovement_movement: {
    marginTop: 24
  },
  lastMovementItem: {
    marginBottom: 16
  },
  lastMovementItem__title: {
    color: '#0B1D34',
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontSize: FONTS_SIZES.subtitle1,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  lastMovementItem__data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  lastMovementItem__data_date: {
    color: '#999999',
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontSize: FONTS_SIZES.small,
    fontWeight: '500',
    letterSpacing: 0.8
  },
  lastMovementItem__data_price: {
    marginTop: -8,
    fontFamily: FONTS_FAMILY['Roboto-Regular'],
    fontSize: FONTS_SIZES.subtitle1,
    fontWeight: '400'
  },
  price_plus: {
    color: COLORS.GREENOK
  },
  price_minus: {
    color: COLORS.BRAND
  }
});
