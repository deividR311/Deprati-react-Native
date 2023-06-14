import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../application/common/colors';
import { fontWeightOS } from '../../../../application/utils';
import { FONTS_FAMILY } from '../../../../application/common';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  scroll: {
    backgroundColor: COLORS.WHITE,
    marginBottom: 72
  },
  scroll__card: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 24,
    elevation: 6,
    backgroundColor: COLORS.GRAYDARK20,
    marginVertical: 10
  },
  scroll__thanks: {
    marginBottom: 16,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  scroll__message: {
    backgroundColor: COLORS.GRAYDARK,
    padding: 15
  },
  scroll__button: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 16
  },
  sketonContentLayout: {
    flex: 1
  },
  sketonContentLayoutBuyItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  skeletonSpace: {
    marginBottom: 8
  },
  horizontalSpacing: {
    width: '100%',
    paddingHorizontal: 16
  }
});
