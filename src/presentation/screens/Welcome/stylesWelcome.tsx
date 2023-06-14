import { StyleSheet } from 'react-native';
import { COLORS } from '../../../application/common/colors';
import layout from '../../../application/common/layout';

export const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.WHITE },
  contentContainer: { paddingBottom: layout.isSmallDevice ? 150 : 0 },
  heightAux: { height: layout.window.height },

  containerImage: { height: '10%', alignItems: 'center', paddingBottom: 16 },
  image: { width: '60%' },

  containerCarousel: {
    backgroundColor: COLORS.WHITE,
    height: layout.isSmallDevice ? '90%' : '60%',
    shadowColor: 'rgba(16, 10, 68, 0.4)',
    shadowOffset: {
      width: 4,
      height: 8
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center'
  },

  containerButtons: {
    paddingTop: 20,
    height: 300,
    width: '100%',
    alignItems: 'center',
    // position: layout.isSmallDevice ? 'relative' : 'absolute',
    bottom: layout.isSmallDevice ? -10 : -50
  }
});
