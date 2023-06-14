import { View, Text } from 'react-native';
import React from 'react';
import CustomModal from '../../../common-components/modal';
import { useNavigation } from '@react-navigation/native';

export default function ModalNotLogin() {
  const navigation = useNavigation();

  return (
    <CustomModal
      title="Atención"
      message="Para activar la huella , debes ingresar con tu usuario y contraseña"
      textButton="Ok"
      onPress={() => navigation.goBack()}
    />
  );
}
