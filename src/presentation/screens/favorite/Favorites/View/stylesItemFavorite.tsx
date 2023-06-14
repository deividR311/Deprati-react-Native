import { StyleSheet } from 'react-native';
import layout from '../../../../../application/common/layout';
import { FONTS_FAMILY } from '../../../../../application/common';

export const stylesItem = StyleSheet.create({
  container: { width: layout.window.width / 2 - 15 }
});

export const stylesImageProduct = StyleSheet.create({
  style: { width: '100%', height: 260, borderRadius: 8 },
  styleImage: { width: '100%', height: '100%', borderRadius: 8 },
  styleViewLabel: { width: '40%', height: '10%', alignSelf: 'flex-end' },
  styleLabel: { width: '100%', height: '100%', borderTopRightRadius: 10 }
});

export const stylesTitleDelete = StyleSheet.create({
  style: {
    marginTop: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5
  },
  styleViewText: { width: '80%' },
  styleViewDelete: {
    width: '20%',
    justifyContent: 'flex-start',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 5
  },
  styleText: { height: 36, fontFamily: FONTS_FAMILY.Roboto }
});

export const stylesComponentPrice = StyleSheet.create({
  style: {
    width: layout.window.width * 0.23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export const stylesComponentStars = StyleSheet.create({
  style: { flexDirection: 'row', alignContent: 'center', alignItems: 'center' },
  styleList: { width: '95%', flexDirection: 'row' },
  styleText: { width: '5%' }
});

export const stylesComponentDeferred = StyleSheet.create({
  style: { width: layout.window.width * 0.45, paddingTop: 15 },
  styleContentCuotas: { width: '30%' },
  styleCuotas: { paddingRight: 5 },
  styleDescribe: { width: '70%' }
});

export const stylesMainButton = StyleSheet.create({
  style: { borderRadius: 1, height: 35, marginTop: 7, width: '100%' },
  styleText: {}
});
