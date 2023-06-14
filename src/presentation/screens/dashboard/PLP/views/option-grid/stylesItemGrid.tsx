import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../application/common';
import layout from '../../../../../../application/common/layout';

export const stylesItem = StyleSheet.create({
  container: { width: layout.window.width / 2 - 15 }
});

export const stylesImageProduct = StyleSheet.create({
  style: { width: '100%', height: 260, borderRadius: 8 },
  styleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  styleViewLabel: { width: '40%', height: '10%', alignSelf: 'flex-end' },
  styleLabel: { width: '100%', height: '100%', borderTopRightRadius: 10 }
});

export const stylesImageProductGitfCard = StyleSheet.create({
  styleImage: {
    backgroundColor: COLORS.GRAYBRAND
  }
});

export const stylesFavoriteTitle = StyleSheet.create({
  style: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  styleText: {
    paddingTop: 8,
    width: '80%',
    justifyContent: 'flex-start'
  },
  styleFavorite: {
    width: '20%',
    justifyContent: 'flex-end'
  }
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
