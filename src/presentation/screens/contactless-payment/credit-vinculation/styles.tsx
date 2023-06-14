import { StyleSheet } from 'react-native';
import { fontFamilyOS, fontWeightOS } from '../../../../application/utils';
import {
  COLORS,
  FONTS_SIZES,
  FontStyles
} from '../../../../application/common';

export const HeaderStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GRAYDARK20,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  imageCard: {
    width: 133,
    height: 80,
    marginTop: 20
  },
  content: {
    marginTop: 8,
    marginBottom: 4
  },
  breadcrumb: {
    ...FontStyles.H6_Headline,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: fontWeightOS('700')
  },
  title: {
    ...FontStyles.H2_Headline,
    ...FontStyles.PrimaryColor,
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('bold'),
    marginBottom: 8,
    marginTop: 4
  },
  body: {
    ...FontStyles.Body_1,
    ...FontStyles.Center,
    fontSize: 14,
    marginBottom: 12
    // lineHeight: 20,
  }
});

export const SelectCreditAccountStyles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16
  },
  title: {
    ...FontStyles.Button,
    ...FontStyles.Justify,
    marginTop: 28,
    marginBottom: 4,
    fontSize: 16
  },
  text: {
    ...FontStyles.Body_1,
    fontSize: FONTS_SIZES.label,
    marginBottom: 5
  },
  divider: {
    width: '100%',
    height: 2,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'solid',
    marginVertical: 20,
    borderColor: COLORS.GRAYDARK20,
    backgroundColor: COLORS.GRAYDARK20
  },
  textFooter: {
    ...FontStyles.Body_1,
    ...FontStyles.Center,
    fontSize: FONTS_SIZES.label
  },
  buttonSendCode: {
    backgroundColor: COLORS.BRAND,
    color: COLORS.WHITE,
    marginTop: 12
  },
  activityIndicator: {
    color: COLORS.BRAND
  }
});

export const ConfirmVinculationCodeStyles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16
  },
  body1: {
    ...FontStyles.Body_1,
    ...FontStyles.Center
  },
  body2: {
    ...FontStyles.Body_S,
    ...FontStyles.Center
  },
  textUpperSide: {
    marginTop: 20,
    marginBottom: 4
  },
  numbers: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  number: {
    marginHorizontal: 5,
    width: 42,
    height: 40,
    fontSize: 23,
    lineHeight: 40,
    textAlign: 'center',
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    paddingHorizontal: 0
  },
  resentCodeSuccessMessage: {
    marginTop: 24,
    flexDirection: 'row',
    backgroundColor: COLORS.BACKGROUND_GREEN_SUCCESS,
    padding: 12,
    borderRadius: 12
  },
  resentCodeErrorMessage: {
    backgroundColor: COLORS.ERRORBACKGROUND
  },
  resentCodeSuccessMessageText: {
    ...FontStyles.Body_2,
    flexGrow: 1,
    marginHorizontal: 12
  },
  successIcon: {
    color: COLORS.GREEN_ICON_SUCCESS
  },
  errorIcon: {
    color: COLORS.BRAND
  },
  closeIcon: {
    color: COLORS.DARK70TRANSPARENT
  },
  textBelowSide: {
    marginTop: 12,
    ...FontStyles.Body_2,
    ...FontStyles.Center
  },
  link: {
    textDecorationLine: 'underline',
    color: COLORS.BRAND
  },
  redButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.BRAND
  },
  button: {
    borderWidth: 1,
    borderColor: COLORS.DARK,
    borderStyle: 'solid',
    marginTop: 12
  },
  closeButtonBottomSheet: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    width: '100%'
  },
  iconBottomSheet: {
    marginBottom: 18,
    alignSelf: 'center'
  },
  contentBottomSheet: {
    justifyContent: 'center',
    paddingHorizontal: 34
  },
  titleBottomSheet: {
    ...FontStyles.H2_Headline
  },
  textBottomSheet: {
    ...FontStyles.Body_2,
    ...FontStyles.Center,
    marginTop: 18
  }
});
