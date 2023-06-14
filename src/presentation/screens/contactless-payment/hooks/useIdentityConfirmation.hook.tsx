import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import useBiometrics, {
  BiometricSignatureData
} from '../../../../application/common/hooksCommons/useBiometrics';
import { signInValidation as IdentityConfirmationValidationSchema } from '../../../../application/common/yup-validations/auth.validations';
import { useContactlessPaymentState } from '../../../../application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { getExpiresAt } from '../../../../application/utils/diferenceDays';
import {
  useSignInRequest,
  useSignInWithSocialNetworksRequest
} from '../../../../infrastucture/apis/sign-in';

import { mapSignInModelfromDTO } from '../../../../infrastucture/apis/sign-in/sign-in.model';
import { useFacebookProfile } from '../../SignIn/facebook.hook';
const MESSAGE_USER_DIFF = 'Las credenciales no coinciden con el usuario';

export const useIdentityConfirmation = (
  onConfirmationSuccess: () => void
): IdentityConfirmation => {
  const [popUpError, setPopupError] = useState<string>();

  const formik = useFormik({
    ...FORMIK_SETTINGS,
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: credentials =>
      _onIdentityConfirmation({ type: 'credential', credentials })
  });

  const [
    doSignIn,
    {
      isLoading: isLoadingBySignInWithCredentials,
      data: rawDataResponse,
      isError: errorSignInWithCredentials
    }
  ] = useSignInRequest();

  const [
    doSignInWithSocialNetwork,
    {
      data: responseSigInWithSocialNetwork,
      error: errorSignInWithSocialNetwork
    }
  ] = useSignInWithSocialNetworksRequest();
  const [getFacebookProfile] = useFacebookProfile();

  const {
    save: saveInLocalStorage,
    localStorageData: { [LocalStorageKey.UserEmail]: CurrentUsername }
  } = useLocalStorage();

  const {
    loadingAuth: isLoadingByReadBiometric,
    isValidSensor: isEnableBiometrics,
    biometricsType: biometricsType,
    readBiometrics,
    hasKeychain
  } = useBiometrics({
    onBiometricRead: signature =>
      _onIdentityConfirmation({ type: 'biometric', signature })
  });

  const socialNetworksLogout = async () => {
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signOut();
      await GoogleSignin.revokeAccess();
    }
    LoginManager.logOut();
  };

  const _onIdentityConfirmation = (args: {
    type: 'credential' | 'social' | 'biometric';
    credentials?: UserCredentialsData;
    signature?: BiometricSignatureData;
    socialNetwork?: SocialNetworkAuthData;
  }) => {
    switch (args.type) {
      case 'credential':
        const { email = '', password = '' } = args.credentials ?? {};
        console.log(
          {
            CurrentUsername,
            email
          },
          !email.toLowerCase().includes(CurrentUsername.toLowerCase())
        );
        if (!email.toLowerCase().includes(CurrentUsername.toLowerCase())) {
          return setPopupError(MESSAGE_USER_DIFF);
        }
        doSignIn({ email, password });
        break;
      case 'biometric':
        _onSuccessIdentityConfirmation();
        break;
      case 'social':
        socialNetworksLogout()
          .then(() => {
            const network = args.socialNetwork?.network;
            network === 'facebook' && signInWithFacebook();
            network === 'google' && signInWithGoogle();
          })
          .catch(err =>
            console.log('>>> Ups: Social network logout error: ', err)
          );
        break;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {
        idToken: accessToken,
        user: { email, id: userId }
      } = await GoogleSignin.signIn();
      if (!email || !userId) return;
      if (!email.toLowerCase().includes(CurrentUsername.toLowerCase())) {
        return setPopupError(MESSAGE_USER_DIFF);
      }
      doSignInWithSocialNetwork({
        appCode: 'google',
        accessToken,
        email,
        userId
      });
    } catch (error) {
      console.log('[ERROR] hook-GoogleSigin: ', error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const { email, userId, accessToken } = await getFacebookProfile();
      if (!email || !userId) return;
      if (!email.toLowerCase().includes(CurrentUsername.toLowerCase())) {
        return setPopupError(MESSAGE_USER_DIFF);
      }
      doSignInWithSocialNetwork({
        appCode: 'facebook',
        email: email ?? '',
        userId: userId ?? '',
        accessToken
      });
    } catch (error) {
      console.log('>>>  [FACEBOOK LOGIN] ERROR: ', error);
    }
  };

  const _onSuccessIdentityConfirmation = () => {
    setTimeout(() => {
      onConfirmationSuccess();
      /** @todo: showQRShare(true) */
    }, 700);
  };

  const setFormValues = (data: UserCredentialsData) => {
    if (data.email !== null && data.email !== undefined) {
      formik.setFieldValue('email', data.email);
    }
    if (data.password !== null && data.password !== undefined) {
      formik.setFieldValue('password', data.password);
    }
  };

  const doIdentityConfirmationByCredential = async () => {
    if (formik.isValid) {
      formik.submitForm();
    } else {
      const errors = await formik.validateForm();
      formik.setErrors(errors);
    }
  };

  const doIdentifyConfirmationBySocialNetwork = async (
    network: 'facebook' | 'google'
  ) => {
    _onIdentityConfirmation({ type: 'social', socialNetwork: { network } });
  };

  const doIdentifyConfirmationByBiometric = async () => {
    const { email = '', password = '', error } = await readBiometrics();
    if (error) return;
    await doSignIn({ email, password });
  };

  const closePopUpError = () => {
    setPopupError(undefined);
  };

  useEffect(() => {
    if (!errorSignInWithSocialNetwork) return;
    console.log(
      '>>> [ERROR] SigInWithSocialNetwork: ',
      errorSignInWithSocialNetwork
    );
    Alert.alert('Error', 'No se pudo confirmar la identidad.');
  }, [errorSignInWithSocialNetwork]);

  useEffect(() => {
    const data = rawDataResponse || responseSigInWithSocialNetwork;
    if (!data) return;
    const {
      accessToken = '',
      expiresIn = 0,
      refreshToken = ''
    } = mapSignInModelfromDTO(data);

    saveInLocalStorage({
      [LocalStorageKey.Token]: accessToken,
      [LocalStorageKey.RefreshToken]: refreshToken,
      [LocalStorageKey.ExpiresIn]: expiresIn,
      [LocalStorageKey.ExpiresAt]: getExpiresAt(expiresIn.toString()),
      [LocalStorageKey.GetTokenDate]: new Date().toISOString()
    });
    formik.resetForm();
    _onSuccessIdentityConfirmation();
  }, [rawDataResponse, responseSigInWithSocialNetwork]);

  useEffect(() => {
    errorSignInWithCredentials &&
      formik.setFieldError(
        'identityConfirmation',
        'Usuario y contraseña no validos'
      );
  }, [errorSignInWithCredentials]);

  const initialization = async () => {
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signOut();
      await GoogleSignin.revokeAccess();
    }
    LoginManager.logOut();
  };

  useEffect(() => {
    initialization();
  }, []);

  return {
    doIdentifyConfirmationByBiometric,
    doIdentifyConfirmationBySocialNetwork,
    doIdentityConfirmationByCredential,
    formErrors: formik.errors,
    isEnableBiometrics,
    setFormValues,
    isLoading: isLoadingBySignInWithCredentials || isLoadingByReadBiometric,
    biometricsType: biometricsType ?? '',
    formValues: {
      email: formik.values.email,
      password: formik.values.password
    },
    popUpError,
    closePopUpError,
    hasKeychain,
    resetForm: formik.resetForm
  };
};

const FORMIK_SETTINGS = {
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: IdentityConfirmationValidationSchema
};

export interface IdentityConfirmation {
  doIdentifyConfirmationByBiometric(): void;
  doIdentityConfirmationByCredential(): void;
  doIdentifyConfirmationBySocialNetwork(
    socialNetwort: 'facebook' | 'google'
  ): void;
  setFormValues(data: UserCredentialsData): void;
  formErrors: {
    email?: string;
    password?: string;
    identityConfirmation?: string;
  };
  closePopUpError(): void;
  popUpError?: string;
  formValues: UserCredentialsData;
  biometricsType: string;
  isLoading: boolean;
  isEnableBiometrics: boolean;
  hasKeychain: boolean;
  resetForm(): void;
}

export interface UserCredentialsData {
  email?: string;
  password?: string;
}

export interface SocialNetworkAuthData {
  network: 'facebook' | 'google';
}
