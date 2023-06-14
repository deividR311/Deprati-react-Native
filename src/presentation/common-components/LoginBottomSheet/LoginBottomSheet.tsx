import * as React from 'react';
import { FC } from 'react';
import { LoginBottomSheetProps, LoginMechanism } from './interfaces';
import { BottomSheet, IconButton } from '../bottomSheet';
import useBiometrics from '../../../application/common/hooksCommons/useBiometrics';
import { Styles } from './styles';
import { ActivityIndicator, Text, View } from 'react-native';
import { COLORS, FontStyles, NAV } from '../../../application/common';
import FaceIdIcon from '../../../../assets/icons/FaceIdIcon';
import { FacebookIcon, GoogleIcon, IconFinger } from '../../../../assets/icons';
import Button from '../buttons/Button';
import { TouchableRipple } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ButtonSocial from '../../screens/SignIn/components/ButtonSocial';
import { CustomKeyboardAvoidingView } from '../../screens/account/support-tickets/components/custom-keyboard-avoiding-view';
import InputBase from '../inputs/InputBase';
import ErrorText from '../texts/ErrorText';
import PasswordInput from '../inputs/PasswordInput';
import { useIdentityConfirmation } from '../../screens/contactless-payment/hooks/useIdentityConfirmation.hook';
import sleep from '../../../application/utils/sleep';
import { Popup } from '../poppup';

export const LoginBottomSheet: FC<LoginBottomSheetProps> = props => {
  const { show, onRequestClose } = props;
  const navigation = useNavigation();
  const { biometricsType, isValidSensor, hasKeychain } = useBiometrics();

  const [loginMechanism, setLoginMechanism] =
    React.useState<LoginMechanism>('biometric');

  const {
    isLoading,
    formErrors,
    formValues,
    popUpError,
    closePopUpError,
    setFormValues,
    doIdentifyConfirmationByBiometric,
    doIdentityConfirmationByCredential,
    doIdentifyConfirmationBySocialNetwork,
    resetForm
  } = useIdentityConfirmation(() => onIdentityConfirmationSuccess());
  const [disableNormalLoginButton, setDisableNormalLoginButton] =
    React.useState(false);

  const _onCloseRequest = async (success?: boolean) => {
    resetForm();
    onRequestClose(success);
  };

  const changeLoginMechanism = () => {
    if (!hasKeychain || !isValidSensor || loginMechanism === 'biometric') {
      setLoginMechanism('credentials');
      return;
    }
    setLoginMechanism('biometric');
  };

  const doNavigateToForgotPassword = async () => {
    _onCloseRequest();
    await sleep(450);
    navigation.navigate(
      NAV.AUTH_NAVIGATION as never,
      {
        screen: NAV.FORGOT_PASSWORD
      } as never
    );
  };

  const onIdentityConfirmationSuccess = () => {
    _onCloseRequest(true);
  };

  const renderBiomertic = React.useCallback(() => {
    return (
      <>
        <Text style={[FontStyles.H3_Headline]}>
          Por tu seguridad confirma tu cuenta
        </Text>

        <TouchableRipple
          disabled={isLoading}
          onPress={doIdentifyConfirmationByBiometric}
          style={Styles.biometricArea}>
          <>
            {biometricsType === 'FaceID' ? <FaceIdIcon /> : <IconFinger />}
            <Text style={Styles.biometricText}>
              {biometricsType === 'FaceID'
                ? 'Usa tu face ID para continuar'
                : 'Toca el sensor de tu huella \ndactilar'}
            </Text>
            {isLoading && (
              <ActivityIndicator size="large" color={COLORS.BRAND} />
            )}
          </>
        </TouchableRipple>

        <View style={Styles.separator} />
        <Text style={Styles.text}>
          ¿Tienes problemas para confirmar tu cuenta?
        </Text>
        <Button
          linkName="INGRESA CON TUS CREDENCIALES"
          backgroundColor="transparent"
          disabled={isLoading}
          onPress={changeLoginMechanism}
          containerStyle={Styles.buttonChangeToNormalLogin}
          textColor={Styles.buttonChangeToNormalLogin.color}
        />
      </>
    );
  }, [biometricsType, loginMechanism, isLoading]);

  const renderCredentialsForm = React.useCallback(() => {
    return (
      <>
        <Text style={Styles.normalLoginTitle}>
          Por tu seguridad confirma tu cuenta
        </Text>
        <Text style={[Styles.text, { marginTop: 19 }]}>Accede con:</Text>

        <View style={Styles.socialContainer}>
          <ButtonSocial
            disabled={isLoading}
            onPress={() => doIdentifyConfirmationBySocialNetwork('facebook')}
            icon={<FacebookIcon />}
          />
          <ButtonSocial
            disabled={isLoading}
            onPress={() => doIdentifyConfirmationBySocialNetwork('google')}
            icon={<GoogleIcon />}
          />
        </View>
        <View style={Styles.separator} />

        <CustomKeyboardAvoidingView offset={100}>
          <View>
            <InputBase
              testID="email"
              dense
              keyboardType="email-address"
              label="Correo electrónico"
              error={!!formErrors.email}
              disabled={isLoading}
              value={formValues.email}
              onChangeText={(text: string) => setFormValues({ email: text })}
            />
            {!!formErrors.email && <ErrorText text={formErrors.email} />}
            <PasswordInput
              isVisible
              testID="password"
              dense
              error={!!formErrors.password}
              onChangeText={(text: string) => setFormValues({ password: text })}
              style={{ marginTop: 20 }}
              label="Contraseña"
              disabled={isLoading}
              value={formValues.password}
              secureTextEntry={true}
            />
            {!!formErrors.password && <ErrorText text={formErrors.password} />}
            {!!formErrors.identityConfirmation && (
              <ErrorText text="Usuario y contraseña no válidos" />
            )}
          </View>

          <Button
            linkName="CONFIRMAR"
            backgroundColor="transparent"
            onPress={doIdentityConfirmationByCredential}
            containerStyle={[
              Styles.buttonConfirm,
              disableNormalLoginButton
                ? {
                    backgroundColor: COLORS.GRAYBRAND
                  }
                : undefined
            ]}
            textColor={Styles.buttonConfirm.color}
            disabled={disableNormalLoginButton}
            showActivityIndicator={isLoading}
            activityIndicator={{
              color: FontStyles.LightColor.color
            }}
            marginTop={20}
          />

          <Button
            linkName="Olvidé mi contraseña"
            onPress={doNavigateToForgotPassword}
            containerStyle={Styles.buttonForgotPassword}
            textStyle={Styles.buttonForgotPasswordText}
            textColor={Styles.buttonForgotPasswordText.color}
            backgroundColor={''}
            marginTop={20}
          />
        </CustomKeyboardAvoidingView>
      </>
    );
  }, [
    loginMechanism,
    disableNormalLoginButton,
    isLoading,
    formErrors,
    formValues
  ]);

  useFocusEffect(
    React.useCallback(() => {
      if (hasKeychain === undefined || isValidSensor === undefined || !show)
        return;
      hasKeychain && isValidSensor
        ? setLoginMechanism('biometric')
        : setLoginMechanism('credentials');
    }, [biometricsType, isValidSensor, show])
  );

  React.useEffect(() => {
    if (isLoading || !formValues?.email || !formValues?.password) {
      setDisableNormalLoginButton(true);
    } else {
      setDisableNormalLoginButton(false);
    }
  }, [formValues, isLoading]);

  return (
    <BottomSheet
      show={show}
      canDrop={false}
      isCancelable
      percentage={64}
      header={
        <View style={Styles.closeButton}>
          <IconButton
            testID={'close_modal'}
            iconName="close"
            onPress={() => _onCloseRequest()}
          />
        </View>
      }>
      <View style={Styles.body}>
        {loginMechanism === 'biometric'
          ? renderBiomertic()
          : renderCredentialsForm()}
        <Popup
          visible={!!popUpError}
          icon="error"
          buttonText="CERRAR"
          buttonType="full"
          iconColor={COLORS.BRAND}
          title={popUpError}
          showCloseButton={true}
          closeAction={closePopUpError}
          buttonAction={closePopUpError}
        />
      </View>
    </BottomSheet>
  );
};

export default LoginBottomSheet;
