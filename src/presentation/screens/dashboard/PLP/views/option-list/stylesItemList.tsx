import { StyleSheet } from 'react-native';
import layout from '../../../../../../application/common/layout';

export const stylesItem = StyleSheet.create({
  container: { width: '100%', flexDirection: 'row' },
  leftColumn: { width: '30%' },
  rightColumn: { width: '70%', paddingLeft: 12 }
});

export const stylesImageProduct = StyleSheet.create({
  style: { width: '100%', height: 180, borderRadius: 8 },
  styleImage: { width: '100%', height: '100%', borderRadius: 8 },
  styleViewLabel: { width: '100%', height: '13%', alignSelf: 'flex-end' },
  styleLabel: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6
  }
});

export const stylesFavoriteTitle = StyleSheet.create({
  style: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  styleText: { width: '80%', justifyContent: 'flex-start' },
  styleFavorite: { width: '20%', justifyContent: 'flex-end' }
});

export const stylesComponentPrice = StyleSheet.create({
  style: {
    width: layout.window.width * 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    //marginTop: -12,
    // backgroundColor:'red'
  },
  styleAux: {
    width: layout.window.width * 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // marginTop:-,
    // backgroundColor:'cyan'
  }
});

export const stylesComponentStars = StyleSheet.create({
  style: { flexDirection: 'row', alignContent: 'center', alignItems: 'center' },
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
  styleDescribe: { width: '70%' },
  styleTextDescribe: { marginLeft: 10 }
});
