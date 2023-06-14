import { StyleSheet } from 'react-native';
import { COLORS, FONTS_FAMILY } from '../../../../application/common';
import layout from '../../../../application/common/layout';

export const styles = StyleSheet.create({
  containerItem: {
    width: layout.window.width * 0.9,
    justifyContent: 'center'
    //backgroundColor: 'orange',
  },

  containerImage: {
    width: '85%',
    height: '60%',
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center'
    //backgroundColor: 'red',
  },
  image: { resizeMode: 'contain', width: '100%', height: '100%' },

  textHeadline: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.DARK70,
    paddingHorizontal: layout.isSmallDevice ? '8%' : '20%',
    paddingTop: '3%',
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal'
    // lineHeight: 24,
  },

  contentDescription: { marginTop: 15 },
  textDescritption: {
    textAlign: 'center',
    color: COLORS.DARK70,
    paddingHorizontal: '10%',
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWight: '400',
    fontSize: 14,
    // lineHeight: 20,
    letterSpacing: 0.25
  },

  //paginacion
  containerPagination: {
    height: '5%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
    //backgroundColor: 'purple',
  },
  contentPagination: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5
  }
});
