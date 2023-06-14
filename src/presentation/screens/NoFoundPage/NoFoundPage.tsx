import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Image,
  View
} from 'react-native';
import { NAV } from '../../../application/common';
import { COLORS } from '../../../application/common/colors';
import { MainButton } from '../../common-components/buttons/Button';

interface Props {
  headerShow?: boolean;
}

const NoFoundPage = (props: Props) => {
  const { headerShow = true } = props;
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  useLayoutEffect(() => {
    if (headerShow) {
      navigation?.setOptions({
        headerShown: true,
        headerTitle: 'Resultados de búsqueda',
        headerTitleAlign: 'left'
      });
    }
  }, [navigation]);

  //const widthButton = width * 0.7
  const aspectRatio = width / height;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container]}>
        <Image
          style={[styles.background]}
          imageStyle={{ aspectRatio }}
          resizeMode={'stretch'}
          source={require('../../../../assets/images/noResults.jpg')}
        />
        <MainButton
          onPress={() => {
            navigation.navigate(NAV.HOME);
          }}
          style={[styles.container_button]}
          title={'regresar a la página principal'.toLocaleUpperCase()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  background: {
    width: '100%',
    minHeight: 500,
    maxHeight: 600,
    height: '100%',
    aspectRatio: 600 / 850,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.WHITE,
    marginBottom: 8
  },
  container_button: {
    width: '90%',
    marginHorizontal: 16,
    marginBottom: 16
  }
});

export default NoFoundPage;
