import { StyleSheet } from 'react-native';
import { fontFamilyOS, fontWeightOS } from '../../../../application/utils';

export const styles = StyleSheet.create({
  background: {
    // width: Layout.window.width,
    // height: Layout.window.height,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  imageStyleBackground: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  viewInformation: {
    bottom: 50,
    position: 'absolute'
  },
  information: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: '20%',
    justifyContent: 'flex-end',
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('500')
  },
  lottie: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
