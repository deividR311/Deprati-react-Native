import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalMessage from '../../../common-components/modal/ModalMessage';
import { NAV } from '../../../../application/common/namesNav';

export default function ModalMessageForgot() {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <ModalMessage
      title={route.params?.title ?? 'Cambio de contraseña'}
      message={`Hemos enviado un link a tu correo electrónico ${
        route.params?.email ?? 'bianca@mail.com'
      } para que puedas cambiar tu contraseña`}
      onPress={() => {
        navigation.goBack();
        navigation.navigate('SignIn');
      }}
      textButton="Ok"
    />
  );
}
