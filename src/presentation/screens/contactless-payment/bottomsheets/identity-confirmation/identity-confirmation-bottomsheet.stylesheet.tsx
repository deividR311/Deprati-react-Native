import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import { FONTS_FAMILY } from '../../../../../application/common/fonts';

export const Styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  iconButtomContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    width: '100%'
  },
  textContent: {
    padding: 20
  },
  socialContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 4
  },
  separtor: {
    height: 1,
    width: Dimensions.get('window').width - 76,
    backgroundColor: COLORS.DARK70TRANSPARENT,
    marginVertical: 25,
    opacity: 0.3,
    borderRadius: 4
  },
  biometricContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 10
  },
  biometricButton: {
    marginBottom: 14
  },
  biometricText: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    fontSize: 16,
    color: COLORS.BRAND
  },
  biometricActivityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70
  }
});
