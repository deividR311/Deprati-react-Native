import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';

export const stylesModal = StyleSheet.create({
  modal: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerModal: {
    width: '90%',
    height: 'auto',
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18
  },

  title: {
    fontSize: FONTS_SIZES.extra,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: '2%',
    marginBottom: '5%',
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  message: {
    fontSize: FONTS_SIZES.subtitle1,
    textAlign: 'left',

    marginBottom: '5%',
    fontFamily: FONTS_FAMILY['Roboto-Regular']
  },

  button: {
    fontSize: FONTS_SIZES.extra,
    marginTop: '5%',
    alignSelf: 'flex-end',
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    color: COLORS.BRAND
  },
  closeButton: {
    backgroundColor: COLORS.DEPRATYGRAY,
    width: 40,
    alignItems: 'center',
    padding: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    left: 285
  }
});
