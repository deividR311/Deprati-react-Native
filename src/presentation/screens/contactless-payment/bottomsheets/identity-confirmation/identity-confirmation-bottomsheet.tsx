import React, { FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  NativeModules
} from 'react-native';
import {
  FacebookIcon,
  GoogleIcon,
  IconFinger
} from '../../../../../../assets/icons';
import { COLORS } from '../../../../../application/common/colors';
import {
  FontStyles,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import Button from '../../../../common-components/buttons/Button';
import InputBase from '../../../../common-components/inputs/InputBase';
import PasswordInput from '../../../../common-components/inputs/PasswordInput';
import ButtonSocial from '../../../SignIn/components/ButtonSocial';
import { BottomSheet } from '../../../../common-components/bottomSheet/bottomSheet';
import { IconButton } from '../../../../common-components/bottomSheet/iconButton';
import { Styles } from './identity-confirmation-bottomsheet.stylesheet';
import ErrorText from '../../../../common-components/texts/ErrorText';
import { useIdentityConfirmation } from '../../hooks/useIdentityConfirmation.hook';
import FaceIdIcon from '../../../../../../assets/icons/FaceIdIcon';
import { stylesSignIn } from '../../../SignIn/stylesSignIn';
import { Popup } from '../../../../common-components/poppup';
import { CustomKeyboardAvoidingView } from '../../../account/support-tickets/components/custom-keyboard-avoiding-view';

export const IdentityConfirmationBottomSheet: FC<
  IdentityConfirmationBottomSheetProps
> = props => {
  const { StatusBarManager } = NativeModules;
  const { show, onCloseRequest, title, infoParagraph } = props;
  const {
    isLoading,
    formErrors,
    setFormValues,
    isEnableBiometrics,
    biometricsType,
    doIdentifyConfirmationByBiometric,
    doIdentityConfirmationByCredential,
    doIdentifyConfirmationBySocialNetwork,
    formValues,
    popUpError,
    closePopUpError,
    hasKeychain,
    resetForm
  } = useIdentityConfirmation();

  const _onCloseRequest = () => {
    resetForm();
    onCloseRequest?.();
  };

  return (
    <>
      <BottomSheet
        percentage={87}
        show={show}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? -200 - StatusBarManager.HEIGHT : -80
        }
        behaviorIOSCustom="padding"
        behaviorAndroidCustom="height"
        onCloseRequest={_onCloseRequest}
        paddingHorizontal={16}
        header={
          <View style={Styles.iconButtomContainer}>
            <IconButton iconName="close" onPress={onCloseRequest} />
          </View>
        }>
        <View style={Styles.contentContainer}>
          <View>
            <Text style={FontStyles.H3_Headline}>
              {title ? title : 'Confirma tu identidad'}
            </Text>
            <Text
              style={[
                FontStyles.Body_1,
                FontStyles.Center,
                Styles.textContent
              ]}>
              {infoParagraph
                ? infoParagraph
                : 'Para poder continuar con la transacción debes de ingresar tus credenciales.'}
            </Text>
            <Text style={[FontStyles.Subtitle, FontStyles.MutedColor]}>
              Iniciar sesión con
            </Text>

            <View style={Styles.socialContainer}>
              <ButtonSocial
                disabled={isLoading}
                onPress={() =>
                  doIdentifyConfirmationBySocialNetwork('facebook')
                }
                icon={<FacebookIcon />}
              />
              <ButtonSocial
                disabled={isLoading}
                onPress={() => doIdentifyConfirmationBySocialNetwork('google')}
                icon={<GoogleIcon />}
              />
            </View>
            <View style={Styles.separtor} />
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
                  onChangeText={(text: string) =>
                    setFormValues({ email: text })
                  }
                />
                {!!formErrors.email && <ErrorText text={formErrors.email} />}
                <PasswordInput
                  isVisible
                  testID="password"
                  dense
                  error={!!formErrors.password}
                  onChangeText={(text: string) =>
                    setFormValues({ password: text })
                  }
                  style={{ marginTop: 20 }}
                  label="Contraseña"
                  disabled={isLoading}
                  value={formValues.password}
                  secureTextEntry={true}
                />
                {!!formErrors.password && (
                  <ErrorText text={formErrors.password} />
                )}
                {!!formErrors.identityConfirmation && (
                  <ErrorText text="Usuario y contraseña no válidos" />
                )}
                <Button
                  containerStyle={{
                    width: '100%',
                    backgroundColor: COLORS.BRAND
                  }}
                  backgroundColor={COLORS.BRAND}
                  linkName="ENVIAR"
                  textColor={FontStyles.LightColor.color}
                  onPress={doIdentityConfirmationByCredential}
                  disabled={isLoading}
                  showActivityIndicator={isLoading}
                  activityIndicator={{
                    color: FontStyles.LightColor.color
                  }}
                />
                {isEnableBiometrics && hasKeychain ? (
                  !isLoading ? (
                    <>
                      <TouchableOpacity
                        onPress={doIdentifyConfirmationByBiometric}
                        style={Styles.biometricContainer}>
                        {biometricsType === 'FaceID' ? (
                          <FaceIdIcon />
                        ) : (
                          <IconFinger />
                        )}
                      </TouchableOpacity>
                      <Text
                        style={{
                          ...stylesSignIn.textForgot,
                          fontSize: FONTS_SIZES.subtitle1,
                          textDecorationLine: 'none'
                        }}>
                        Ingresa con tu huella o Face ID
                      </Text>
                    </>
                  ) : (
                    <View>
                      <ActivityIndicator size="large" color={COLORS.BRAND} />
                    </View>
                  )
                ) : null}
              </View>
            </CustomKeyboardAvoidingView>
          </View>
        </View>
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
      </BottomSheet>
    </>
  );
};

interface IdentityConfirmationBottomSheetProps {
  show: boolean;
  onCloseRequest?: () => void;
  title?: string;
  infoParagraph?: string;
}
