import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FontStyles, FONTS_FAMILY } from '../../../application/common/fonts';

export const Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    //maxWidth: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  header: {
    alignSelf: 'flex-end',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: -16,
    marginRight: -24
  },
  closeButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GRAYBRAND,
    borderTopEndRadius: 8,
    borderBottomStartRadius: 8
  },
  closeButtonIcon: {},
  icon: {
    paddingBottom: 24,
    alignSelf: 'center'
  },
  title: {
    paddingBottom: 16
  },
  text: {},
  button: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 8
  },
  button_full: {
    backgroundColor: COLORS.BRAND,
    alignItems: 'center',
    width: '100%',
    height: 40
  },
  button__text: {
    ...FontStyles.Button,
    width: '100%'
  },
  button_full__text: {
    ...FontStyles.LightColor
  },
  button_short: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'flex-end'
  },
  button_short__text: {
    ...FontStyles.PrimaryColor,
    textAlign: 'right',
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  containerButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
    // justifyContent: 'space-between',
  }
});

export const stylesToast = StyleSheet.create({
  containerBottom: {
    justifyContent: 'flex-end',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center'
  },
  contentBottom: {
    backgroundColor: COLORS.DARK70,
    width: '95%',
    height: 80,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Platform.select({
      ios: 120,
      android: 80
    })
  },
  container: {
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center'
  },
  content: {
    backgroundColor: COLORS.DARK70,
    width: '95%',
    height: 80,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  content__text: { width: '60%', paddingHorizontal: 20 },
  text: { color: COLORS.WHITE, fontFamily: FONTS_FAMILY.Roboto },
  content__button: { width: '40%', paddingHorizontal: 10 },
  button: { alignSelf: 'center' }
});

export const stylesModalLogin = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 20
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '600',
    marginLeft: 25
  }
});

export const stylesModalLoading = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: 'white',
    width: '100%'
  }
});
