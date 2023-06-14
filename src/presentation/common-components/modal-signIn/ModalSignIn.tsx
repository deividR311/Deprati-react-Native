import React from 'react';
import {
  Platform,
  // ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FacebookIcon, GoogleIcon } from '../../../../assets/icons';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES,
  HEIGHT_TAB_BAR
} from '../../../application/common';
import { useIdentityConfirmation } from '../../screens/contactless-payment/hooks/useIdentityConfirmation.hook';
import ButtonSocial from '../../screens/SignIn/components/ButtonSocial';
import { BottomSheet } from '../bottomSheet';
import { IconButtonClose } from '../bottomSheet/IconButtonClose';
import Button from '../buttons/Button';
import InputBase from '../inputs/InputBase';
import PasswordInput from '../inputs/PasswordInput';
import { Popup } from '../poppup';
import ErrorText from '../texts/ErrorText';
import { styles } from './ModalSignIn.stylesheet';

interface Props {
  showModalSignIn: boolean;
  setshowModalSignIn: (set: boolean) => boolean;
  onCloseRequest: () => void;
}

const ModalSignIn = ({
  showModalSignIn,
  onCloseRequest,
  setshowModalSignIn
}: Props) => {
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
    hasKeychain
  } = useIdentityConfirmation();

  const onCloseModa = () => {
    setshowModalSignIn(false);
  };
  return (
    <>
      <BottomSheet
        percentage={83}
        canDrop={false}
        show={showModalSignIn}
        paddingHorizontal={16}
        onCloseRequest={onCloseRequest}
        header={
          <View style={styles.bottomsheet__iconButtonClose}>
            <IconButtonClose iconName="close" onPress={onCloseModa} />
          </View>
        }>
        <View style={styles.container__title}>
          <Text style={styles.containerTitle}>Ingresa a tu cuenta</Text>
        </View>
        <View style={styles.container__title}>
          <Text style={styles.containerInfo}>
            Para ver esta opción es necesario que estés logueado.
          </Text>
        </View>
        <View>
          <View style={styles?.socialContainer}>
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
          {/* <View style={styles.separtor} /> */}
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
          </View>
        </View>
      </BottomSheet>
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
    </>
  );
};

export default ModalSignIn;
