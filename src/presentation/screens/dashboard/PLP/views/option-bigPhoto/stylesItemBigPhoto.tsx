import { StyleSheet } from 'react-native';
import layout from '../../../../../../application/common/layout';
import { COLORS } from '../../../../../../application/common';

export const stylesItem = StyleSheet.create({
  // container: { width: 600, height:520 ,alignSelf:'center'},
  container: {
    width: layout.window.width * 0.97,
    height: layout.window.height * 0.75,
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE
  },
  isReferred: { marginBottom: '62%' },
  isNotReferred: { marginBottom: '40%' }
});

export const stylesImageProduct = StyleSheet.create({
  style: { width: '100%', height: '100%', borderRadius: 8 },
  styleImage: { width: '100%', height: '100%', borderRadius: 8 },
  styleViewLabel: { width: '30%', height: '6%', alignSelf: 'flex-end' },
  styleLabel: { width: '100%', height: '100%', borderTopRightRadius: 10 }
});

export const stylesFavoriteTitle = StyleSheet.create({
  style: {
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16
  },
  styleText: {},
  styleFavorite: {}
});

export const stylesComponentPrice = StyleSheet.create({
  style: {
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16
  },
  stylePrevPrice: { marginRight: 10 }
});

export const stylesComponentColors = StyleSheet.create({
  style: { marginVertical: 4, marginHorizontal: 16, width: '94%' }
});

export const stylesComponentStars = StyleSheet.create({
  style: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16
  },
  styleList: { flexDirection: 'row', backgroundColor: 'white' },
  styleText: {}
});

export const stylesComponentDeferred = StyleSheet.create({
  style: {
    width: layout.window.width * 0.7,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 15
  },
  styleContentCuotas: { alignSelf: 'flex-start' },
  styleCuotas: { paddingRight: 5 },
  styleDescribe: { width: '80%' },
  styleTextDescribe: { marginLeft: 10 }
});
