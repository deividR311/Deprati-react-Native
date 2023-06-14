import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';

export const commonsStyles = StyleSheet.create({
  textError: {
    color: COLORS.BRAND,
    fontSize: 16,
    marginLeft: 8,
    marginTop: 4,
    fontWeight: fontWeightOS('500'),
    fontFamily: fontFamilyOS()
  },
  textLogo: {
    fontSize: 45,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.BRAND
  }
});
