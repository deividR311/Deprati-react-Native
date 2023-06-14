import { Platform, StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FontStyles
} from '../../../../application/common';
import { fontFamilyOS, fontWeightOS } from '../../../../application/utils';

export const StylesTickets = StyleSheet.create({
  titleStyle: {
    color: COLORS.BRAND,
    paddingLeft: 2,
    marginVertical: 8,
    marginTop: 8
  },
  rowContainerStyle: {
    paddingLeft: 2,
    paddingRight: 0
  },
  rowLeft: {
    justifyContent: 'flex-start'
  },
  titleStyleLeft: {
    minWidth: '50%'
  },
  valueStyleLeft: {
    textAlign: 'left',
    maxWidth: '56%',
    textTransform: 'capitalize'
  },
  titleBoldStyleLeft: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('600'),
    minWidth: '50%'
  },
  rowTitleStyle: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('500')
  },
  container_totals: {
    marginHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.GRAYDARK20,
    marginVertical: 10
  },
  container__message: {
    padding: 15,
    marginTop: 5,
    marginBottom: 10
  },
  container__message_text: {
    ...FontStyles.Body_2,
    ...FontStyles.Justify
  }
});
