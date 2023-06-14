import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import { FONTS_FAMILY, FONTS_SIZES } from '../../../application/common/fonts';
import { HEIGHT_TAB_BAR } from '../../../application/common/layout';

export const WIDTH_CICLE = 230;
const BOTTOM_SHOP = 16;
const BOX_SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 1,
  shadowRadius: 4,
  elevation: 5
};

export const styles = StyleSheet.create({
  container_button: {
    position: 'absolute',
    bottom: HEIGHT_TAB_BAR + BOTTOM_SHOP,
    right: 16,
    width: 'auto',
    height: 'auto',
    minWidth: 55,
    minHeight: 55,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    overflow: 'hidden',
    backgroundColor: COLORS.BRAND,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    ...BOX_SHADOW
  },
  container_label: {
    position: 'absolute',
    bottom: HEIGHT_TAB_BAR + BOTTOM_SHOP + 10,
    right: 45,
    width: 120,
    height: 37,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
    zIndex: 97,
    ...BOX_SHADOW
  },
  container_label_text: {
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    fontSize: FONTS_SIZES.legal,
    color: COLORS.DARK,
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  container_action: {
    position: 'absolute',
    bottom: (WIDTH_CICLE * -1) / 29,
    right: (WIDTH_CICLE * -1) / 3.6,
    width: WIDTH_CICLE,
    height: WIDTH_CICLE,
    borderRadius: 150,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    zIndex: 98,
    ...BOX_SHADOW
  },
  container_action_scan: {
    position: 'absolute',
    right: 90,
    top: 20,
    zIndex: 98,
    flexDirection: 'column',
    alignItems: 'center'
  },
  container_action_scan_text: {
    marginTop: 5,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    fontSize: FONTS_SIZES.badge,
    color: COLORS.DARK,
    textTransform: 'uppercase',
    fontWeight: '700',
    width: 60,
    textAlign: 'center'
  },
  container_action_pay: {
    position: 'absolute',
    left: 10,
    bottom: 90,
    zIndex: 98,
    flexDirection: 'column',
    alignItems: 'center'
  },
  container_action_pay_text: {
    marginTop: 5,
    fontFamily: FONTS_FAMILY['Roboto-Bold'],
    fontSize: FONTS_SIZES.badge,
    color: COLORS.DARK,
    textTransform: 'uppercase',
    fontWeight: '700',
    width: 60,
    textAlign: 'center'
  }
});
