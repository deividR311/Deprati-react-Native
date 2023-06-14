import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import InputBase from '../../common-components/inputs/InputBase';
import { COLORS } from '../../../application/common/colors';
import { MainButton } from '../../common-components/buttons/Button';
import { useFormik } from 'formik';
import { recoveryPasswordValidation } from '../../../application/common/yup-validations/auth.validations';
import ErrorText from '../../common-components/texts/ErrorText';
import { useNavigation } from '@react-navigation/native';
import { FONTS_SIZES } from '../../../application/common/fonts';
import { useForgottenpasswordRequest } from '../../../infrastucture/apis/user/user.api';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';

export default function RecoveryPass() {
  const [isFetching, setisFetching] = useState(false);
  const navigation = useNavigation();
  const [errorNotEmail, seterror] = useState('');

  const { values, errors, setFieldValue, setFieldTouched } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: recoveryPasswordValidation,
    onSubmit: () => handledSubmit()
  });
  const validateError = errors.email ? errors.email : errorNotEmail;

  const [forgottenpassword] = useForgottenpasswordRequest();
  const handledSubmit = async () => {
    try {
      setisFetching(true);
      const { data: result, error } = await forgottenpassword({
        email: values.email?.toLocaleLowerCase()
      });

      if (result) {
        setisFetching(false);
        navigation.navigate('ModalMessageForgot', {
          email: values.email
        });
        return;
      }

      if (error) {
        setisFetching(false);
        setFieldTouched('email', true);
        seterror(error?.data?.errors?.[0]?.message);
      }
    } catch (error: any) {}
  };

  const onChange = (name: string, value: string) => {
    setFieldValue(name, value);
    seterror('');
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <Text style={styles.textScreen}>He olvidado mi contraseña</Text>
      <Text style={styles.textMessage}>
        ¡No te preocupes! Esto puede sucederle a los mejores. Ingresa tu correo
        electrónico registrado
      </Text>

      <InputBase
        testID="emailRecovery"
        value={values.email}
        onChangeText={(text: string) => onChange('email', text)}
        onFocus={() => setFieldTouched('email', true)}
        error={validateError}
        keyboardType="email-address"
        label="Correo electrónico"
        placeholder="bianca@mail.com"
        activiColor={'#000'}
        inactiveColor={COLORS.BORDERCOLOR}
      />

      {validateError ? (
        <ErrorText text={errors.email || errorNotEmail} />
      ) : null}
      <MainButton
        style={styles.mainButton}
        disabled={!values.email || Object.keys(errors).length > 0 || isFetching}
        testID="recovery-button"
        title={'ENVIAR'.toUpperCase()}
        onPress={() => handledSubmit()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textScreen: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.extra,
    textAlign: 'center',
    color: '#000000',
    marginTop: 40
  },

  textMessage: {
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.subtitle1,
    textAlign: 'center',
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 20,
    width: '90%'
  },

  mainButton: {
    marginTop: 24,
    alignSelf: 'center',
    height: 46,
    width: '100%'
  }
});
