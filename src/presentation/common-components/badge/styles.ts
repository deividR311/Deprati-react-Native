import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_SIZES } from '../../../application/common/fonts';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';

export const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -5,
    right: 18,
    width: 'auto',
    height: 'auto',
    minWidth: 20,
    minHeight: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.BRAND,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  badge_text: {
    alignSelf: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    paddingBottom: 1,
    color: COLORS.WHITE,
    fontFamily: fontFamilyOS(),
    fontSize: FONTS_SIZES.badge,
    fontWeight: fontWeightOS('700')
  }
});
