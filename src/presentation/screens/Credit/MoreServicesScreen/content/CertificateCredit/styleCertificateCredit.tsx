import { StyleSheet } from 'react-native';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES,
  globalStyles
} from '../../../../../../application/common';
import {
  fontFamilyOS,
  fontWeightOS
} from '../../../../../../application/utils';

export const styles = StyleSheet.create({
  buttonWhatsapp: {
    borderRadius: 5,
    backgroundColor: COLORS.BRAND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 25,
    height: 40,
    flexDirection: 'row'
  },
  textWhite: {
    color: FontStyles.LightColor.color,
    fontSize: 14,
    fontWeight: fontWeightOS('700'),
    fontFamily: fontFamilyOS(),
    fontStyle: 'normal',
    letterSpacing: 0.6
  },
  textInfoErr: {
    textAlign: 'center',
    width: 300,
    fontFamily: FONTS_FAMILY.Roboto
  },
  iconStyles: {
    paddingHorizontal: 0,
    color: FontStyles.LightColor.color,
    marginRight: 7
  },
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 10
  },

  container__title: {
    ...FontStyles.Body_1,
    marginBottom: 5,
    textAlign: 'left',
    width: '90%'
  },

  conditionsContainer: {
    marginTop: 20
  },
  conditionsText: {
    ...FontStyles.Subtitle_1,
    fontFamily: FONTS_FAMILY.Roboto,
    fontSize: FONTS_SIZES.label,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0.25,
    lineHeight: 20
  },
  customerService: {
    ...FontStyles.Subtitle_1,
    color: FontStyles.PrimaryColor.color,
    fontSize: FONTS_SIZES.label
  },
  contentChecks: {
    width: '93%'
  },
  boxContent: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 10
  },
  input: {
    marginHorizontal: 8,
    marginTop: 8
  },
  inputEmail: {
    marginTop: 15
  },
  contentTerms: {
    width: '93%',
    marginTop: 15
  },
  accept: {
    ...FontStyles.Body_2,
    fontStyle: 'normal'
  },
  link: {
    ...FontStyles.Body_2,
    fontStyle: 'normal',
    color: COLORS.BRAND
  },
  error: { marginTop: 5, marginLeft: -5 },
  containerButton: {
    width: '90%',
    borderColor: COLORS.BORDERCOLOR,
    borderWidth: 1
  },
  textCard: {
    ...FontStyles.H3_Headline,
    fontSize: FONTS_SIZES.title,
    textAlign: 'left'
  },
  divider: {
    ...globalStyles.divider,
    width: '100%'
  },
  textConfirm: {
    ...FontStyles.Body_1,
    textAlign: 'center'
  },
  textSucces: {
    ...FontStyles.Body_1,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  textAlert: {
    fontFamily: FONTS_FAMILY.Roboto
  }
});
