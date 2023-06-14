import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  TextInput,
  Alert
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
// components
import ButtonSocial from './components/ButtonSocial';
import PasswordInput from '../../common-components/inputs/PasswordInput';
import Button, {
  ButtonText,
  MainButton
} from '../../common-components/buttons/Button';
// assets
import { FacebookIcon, GoogleIcon, IconFinger } from '../../../../assets/icons';
import { COLORS } from '../../../application/common/colors';
//libraries

import { useFormik } from 'formik';
import { signInValidation } from '../../../application/common/yup-validations/auth.validations';
import ErrorText from '../../common-components/texts/ErrorText';
import usePageContent from '../../../infrastucture/apis/contentPage/contentPage.hook';
import ExtensionComponent from '../../common-components/extension-component';

import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../application/common/namesNav';
import useBiometrics from '../../../application/common/hooksCommons/useBiometrics';
import SkeletonSignIn from './SkeletonSignIn';
import { stylesSignIn } from './stylesSignIn';
import { FontStyles, FONTS_SIZES } from '../../../application/common/fonts';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { LoginManager } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useSignInWithSocialNetworksRequest } from '../../../infrastucture/apis/sign-in';
import { CommonDataUserSocialNetwork } from './interface';
import { useFacebookProfile } from './facebook.hook';
import FaceIdIcon from '../../../../assets/icons/FaceIdIcon';
import { AuthNavigationParams } from '../../navigation/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Popup } from '../../common-components/poppup';
import { useAuthToken } from '../../../infrastucture/apis/sign-in/useAuthToken.hook';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useAnalytics } from '../../../infrastucture/firebase/analytics/useAnalytics';
import { AnalyticEvent } from '../../../infrastucture/firebase/analytics/analitics.interfaces';
import { useEmmaSdk } from '../../../infrastucture/native-modules/emma';
import { TextInput as RNPTextInput } from 'react-native-paper';
import { CustomKeyboardAvoidingView } from '../account/support-tickets/components/custom-keyboard-avoiding-view';
import { keyEvents } from '../../../infrastucture/native-modules/emma/clickEventMap';
import { useGenericModal } from '../../common-components/modal/ModalProvider';
import { ModalsType } from '../../common-components/modal/modal.interfaces';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import IconCommunity from '../../common-components/poppup/IconCommunity';
import { useWhatsapp } from '../../../application/common/hooksCommons/useOpenLinkInApp';
import sleep from '../../../application/utils/sleep';
import { useTranslation } from 'react-i18next';

const TYPE_USER_DONT_EXIST = 'UnknownIdentifierError';
const TYPE_USER_DONT_VALIDATED = 'BadCredentialsError';

const SignIn: React.FC<SignInProps | undefined> = props => {
  const { t } = useTranslation();
  const SOCIAL_DEFAULT_ERROR_TEXT = `${t('discoverBenefits')}`;

  const {
    handledSubmit,
    isLoadingBySignInWithDePrati,
    errorSignInWithDePrati,
    loadingUser,
    onSuccess,
    saveCredential,
    onLinkedCreditAuth
  } = useAuthToken();
  const [, setMessageError] = useState(false);
  const [showEmailText, setShowEmailText] = useState(true);
  const [messageSignIn, setmessageSignIn] = useState('');
  const [showPopup, setShowPopup] = useState({
    message: SOCIAL_DEFAULT_ERROR_TEXT,
    showButtonToSingUp: false
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showPopupBiometric, setShowPopupBiometric] = useState(false);
  const [showRequired, setShowRequired] = useState(false);
  const [enabledToShowPopupBiometric, setEnabledToShowPopupBiometric] =
    useState(true);
  const [socialNetworkData, setSocialNetworkData] =
    useState<CommonDataUserSocialNetwork>();
  const navigation = useNavigation();
  const { localStorageData } = useLocalStorage();

  const {
    [LocalStorageKey.MessagesApp]: MessagesApp,
    [LocalStorageKey.IsSucessFirstLogin]: IsSucessFirstLogin,
    [LocalStorageKey.IsAccountAuthenticated]: IsAccountAuthenticated,
    [LocalStorageKey.MessagesApp]: {
      Hybris_Usuario_Bloqueado: LOCKED_USER_MESSAGE
    },
    [LocalStorageKey.Whatsapp]: {
      message: WhatsappMessage,
      phone: WhatsappPhone
    }
  } = localStorageData;

  const { trackEventclick } = useEmmaSdk({});
  const { loading, pageContent, getDataContent } = usePageContent();

  useEffect(() => {
    getDataContent({
      pageLabelOrId: 'loginPage'
    });
  }, []);

  const {
    readBiometrics,
    loadingAuth,
    isValidSensor,
    biometricsType,
    hasKeychain,
    saveKeysBiometrics,
    biometricsSuccess
  } = useBiometrics();
  const [getFacebookProfile] = useFacebookProfile();

  const [
    doSignInWithSocialNetwork,
    {
      isLoading: isLoadingBySignInWithSocialNetwork,
      data: responseSigInWithSocialNetwork,
      error: errorSignInWithSocialNetwork
    }
  ] = useSignInWithSocialNetworksRequest();

  const emailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);

  const valuesInit = {
    email: '',
    password: ''
  };

  const { values, errors, setFieldValue, submitForm, setErrors, resetForm } =
    useFormik({
      initialValues: valuesInit,
      initialErrors: {},
      validateOnChange: false,
      validateOnBlur: true,
      validateOnMount: false,
      validationSchema: signInValidation,
      onSubmit: values => handledSubmit(values)
    });

  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (onSuccess) {
      if (isValidSensor && !hasKeychain && enabledToShowPopupBiometric) {
        setShowPopupBiometric(true);
      } else {
        goToSuccess();
      }
    }
    return () => {
      setShowPopupBiometric(false);
    };
  }, [onSuccess]);

  const onRelatedCredit = useMemo(() => {
    if (IsAccountAuthenticated || IsSucessFirstLogin) {
      return false;
    }
    return onLinkedCreditAuth;
  }, [IsSucessFirstLogin, IsAccountAuthenticated, onLinkedCreditAuth]);

  function goToRelatedCredit(index: number = 1) {
    navigation.reset({
      index: index,
      routes: [
        {
          name: NAV.DASHBOARD_NAVIGATION as never,
          state: {
            index: 0,
            routes: [
              {
                name: NAV.DASHBOARD_INICIO
              }
            ]
          }
        },
        {
          name: NAV.AUTH_NAVIGATION as never,
          state: {
            index: 0,
            routes: [
              {
                name: NAV.RELATED_CREDIT
              }
            ]
          }
        }
      ]
    });
  }

  const goToDashboard = () => {
    const { navGoToSuccess } = props?.route?.params ?? {};
    navigation.reset({
      index: 0,
      routes: [
        {
          name: NAV.DASHBOARD_NAVIGATION as never,
          state: {
            index: 0,
            routes: [
              {
                name: navGoToSuccess ?? NAV.DASHBOARD_INICIO
              }
            ]
          }
        }
      ]
    });
  };

  const goToSuccess = async () => {
    _resetForm();
    if (!props?.isModal) {
      setShowPopupBiometric(false);
      await sleep(500);
      onRelatedCredit ? goToRelatedCredit() : goToDashboard();
    }
    props?.onPressLogin?.();
  };

  const handleBiometrics = async () => {
    if (!hasKeychain && (!values?.email || !values?.password)) {
      setShowRequired(true);
    } else {
      const result = await readBiometrics();
      if (hasKeychain) {
        if (result?.email && result?.password) handledSubmit(result);
      }
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios' && biometricsType === 'FaceID') {
      request(PERMISSIONS.IOS.FACE_ID).then(result => {});
    }
  }, [biometricsType]);

  const onChange = (name: string, value: string) => {
    setMessageError(false);
    setmessageSignIn('');
    setFieldValue(name, value);
  };

  const navigateTo = (name: string) => {
    setErrors({});
    if (props?.isModal) {
      props?.onCloseAction?.();
      navigation.navigate(NAV.AUTH_NAVIGATION, { screen: name });
    } else navigation.navigate(name as never);
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {
        idToken: accessToken,
        user: { email, id: userId, familyName, givenName }
      } = await GoogleSignin.signIn();
      if (!email || !userId) return;
      setShowEmailText(false);
      setFieldValue('email', email);
      setSocialNetworkData({
        email,
        firsname: givenName,
        lastname: familyName
      });
      doSignInWithSocialNetwork({
        appCode: 'google',
        email,
        userId,
        accessToken
      });
    } catch (error) {
      console.log('[ERROR] signInWithGoogle-GoogleSigin: ', error);
      setMessageError(true);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const { email, firsname, lastname, accessToken, userId } =
        await getFacebookProfile();
      if (!email || !userId) return;
      setShowEmailText(false);
      setFieldValue('email', email);
      setSocialNetworkData({
        email,
        firsname,
        lastname
      });
      doSignInWithSocialNetwork({
        appCode: 'facebook',
        email: email ?? '',
        userId: userId ?? '',
        accessToken: accessToken ?? ''
      });
    } catch (error) {
      console.log('>>>  [FACEBOOK LOGIN] ERROR: ', error);
    }
  };

  const socialNetworksLogout = async () => {
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signOut();
      await GoogleSignin.revokeAccess();
    }
    LoginManager.logOut();
  };

  useEffect(() => {
    _resetForm();
    socialNetworksLogout();
  }, []);

  const onNavigateToSignup = () => {
    setIsPopupVisible(false);
    setTimeout(() => {
      props.navigation.navigate('SignUp', socialNetworkData);
    }, 1000);
  };

  const _resetForm = () => {
    emailRef?.current?.clear();
    emailRef?.current?.blur();
    passwordRef?.current?.clear();
    passwordRef?.current?.blur();
    resetForm();
  };

  const [openWhatsapp] = useWhatsapp();

  const onPressSendMessage = () => {
    openWhatsapp(WhatsappPhone, WhatsappMessage).catch(() => {
      Alert.alert('Por favor instale la aplicación de WhatsApp');
    });
  };

  useEffect(() => {
    if (!errorSignInWithSocialNetwork) return;
    setErrors({});
    const { data = {} } = errorSignInWithSocialNetwork as FetchBaseQueryError;

    const errorType = (data as any).errors?.map(
      ({ type = '' }) => type
    ) as string[];

    const errorText = (data as any).errors
      ?.map(({ message = '' }) => message)
      .filter((m: string) => !!m)
      .join('\n');

    const message = errorType.includes(TYPE_USER_DONT_VALIDATED)
      ? LOCKED_USER_MESSAGE.description || errorText
      : errorText || SOCIAL_DEFAULT_ERROR_TEXT;

    setShowPopup({
      message,
      showButtonToSingUp: errorType.includes(TYPE_USER_DONT_EXIST)
    });
    setIsPopupVisible(true);
    socialNetworksLogout();
  }, [errorSignInWithSocialNetwork]);

  useEffect(() => {
    if (!errorSignInWithDePrati) return;

    if (errorSignInWithDePrati?.data?.error_description === 'Bad credentials') {
      setmessageSignIn(
        MessagesApp?.Hybris_Login_Failed?.description ??
          'EL USUARIO Y/O CONTRASEÑA SON INCORRECTOS'
      );
    }
    if (
      errorSignInWithDePrati?.data?.error_description === 'User is disabled'
    ) {
      setmessageSignIn(
        MessagesApp?.Hybris_Usuario_Bloqueado?.description ??
          'Tu usuario está bloqueado'
      );
    }

    setMessageError(true);
  }, [errorSignInWithDePrati]);

  useEffect(() => {
    if (biometricsSuccess && !hasKeychain && values?.email) {
      saveKeysBiometrics(values);
    }
    trackEvent(AnalyticEvent.login, {
      singInBy: 'biometrics',
      username: values.email
    });
    return () => {
      setShowPopupBiometric(false);
      setShowRequired(false);
    };
  }, [biometricsSuccess]);

  useEffect(() => {
    const { access_token, refresh_token, expires_in } =
      responseSigInWithSocialNetwork ?? {};

    if (!access_token || !refresh_token || !expires_in) return;
    setEnabledToShowPopupBiometric(false);
    saveCredential({ ...responseSigInWithSocialNetwork, email: values.email });
    trackEvent(AnalyticEvent.login, {
      singInBy: responseSigInWithSocialNetwork?.scope,
      username: values.email
    });
  }, [responseSigInWithSocialNetwork]);

  if (loading && !pageContent) {
    return (
      <View style={stylesSignIn.container}>
        <SkeletonSignIn />
      </View>
    );
  }

  return (
    <ScrollView style={stylesSignIn.containerScrollView}>
      <CustomKeyboardAvoidingView>
        <View style={stylesSignIn.container}>
          <View style={stylesSignIn.logo}>
            {pageContent?.components?.SiteLogoComponent && (
              <ExtensionComponent
                {...pageContent.components?.SiteLogoComponent}
                style={{ container: { height: 120 } }}
              />
            )}
          </View>
          <Text style={stylesSignIn.textSocials}>Iniciar sesión con</Text>
          <View style={stylesSignIn.viewSocial} accessible>
            <ButtonSocial
              onPress={() => {
                trackEventclick(keyEvents.login_iniciarsesion, {
                  origin: 'Facebook'
                });
                signInWithFacebook();
              }}
              icon={<FacebookIcon />}
            />
            <ButtonSocial
              onPress={() => {
                trackEventclick(keyEvents.login_iniciarsesion, {
                  origin: 'Google'
                });
                signInWithGoogle();
              }}
              icon={<GoogleIcon />}
            />
          </View>
          <View accessibilityLabel={'iniciar_sesion_email'} accessible>
            <RNPTextInput
              mode="outlined"
              autoComplete="off"
              autoCapitalize="none"
              label="Correo electrónico"
              textContentType="username"
              keyboardType="email-address"
              testID="iniciar_sesion_email"
              ref={emailRef}
              autoCorrect={false}
              blurOnSubmit={true}
              value={showEmailText ? values.email : undefined}
              onChangeText={(text: string) => onChange('email', text)}
              error={Object.keys(errors).includes('email')}
              placeholderTextColor={COLORS.GRAYDARK60}
              selectionColor={COLORS.GRAYDARK60}
              outlineColor={COLORS.GRAYDARK60}
              style={[
                { marginTop: 30 },
                {
                  backgroundColor: Object.keys(errors).includes('email')
                    ? COLORS.ERRORBACKGROUND
                    : COLORS.WHITE
                }
              ]}
              activeOutlineColor={
                Object.keys(errors).includes('email')
                  ? COLORS.BRAND
                  : COLORS.DARK70
              }
            />
          </View>
          {errors.email && <ErrorText text={errors.email} />}
          <PasswordInput
            isVisible
            ref={passwordRef}
            blurOnSubmit={true}
            testID={'iniciar_sesion_password'}
            error={Object.keys(errors).includes('password')}
            value={values.password}
            onChangeText={(text: string) => onChange('password', text)}
            style={{
              marginTop: 20
            }}
            label="Contraseña"
            secureTextEntry={true}
            textContentType="password"
          />
          {errors.password && <ErrorText text={errors.password} />}
          {messageSignIn ? (
            <ErrorText
              text={messageSignIn}
              textStyle={stylesSignIn.textError}
            />
          ) : null}
          <Button
            testID="iniciar_sesion_button"
            linkName="INICIAR SESIÓN"
            onPress={() => {
              trackEventclick(keyEvents.login_iniciarsesion, { origin: 'App' });
              submitForm();
            }}
            showActivityIndicator={
              loadingUser ||
              isLoadingBySignInWithSocialNetwork ||
              isLoadingBySignInWithDePrati
            }
            disabled={
              !(values?.email && values?.password) ||
              loadingUser ||
              isLoadingBySignInWithSocialNetwork ||
              isLoadingBySignInWithDePrati
            }
            backgroundColor={COLORS.BRAND}
            textColor={FontStyles.LightColor.color}
          />
          {pageContent?.components?.ForgotPasswordEmailLink && (
            <ButtonText
              styleText={stylesSignIn.textForgot}
              onPress={() => navigateTo(NAV.FORGOT_PASSWORD)}
              title={pageContent.components.ForgotPasswordEmailLink.linkName}
            />
          )}
          {isValidSensor && hasKeychain ? (
            !loadingAuth ? (
              <>
                <TouchableOpacity
                  accessible
                  onPress={() => {
                    trackEventclick(keyEvents.login_iniciarsesion);
                    handleBiometrics();
                  }}
                  style={{ alignSelf: 'center', marginTop: -12 }}>
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

          {pageContent?.components?.RegisterLink && (
            <View
              style={{ justifyContent: 'center', alignItems: 'center' }}
              accessible>
              <MainButton
                testID="createAccount"
                title={pageContent.components?.RegisterLink.linkName.toUpperCase()}
                style={stylesSignIn.mainButton}
                onPress={() => navigateTo(NAV.SIGNUP)}
              />
            </View>
          )}
        </View>
      </CustomKeyboardAvoidingView>
      <Popup
        visible={isPopupVisible}
        title={
          showPopup.showButtonToSingUp
            ? `${t('signInAndEnjoy')}`
            : showPopup.message
        }
        textContent={
          showPopup.showButtonToSingUp ? SOCIAL_DEFAULT_ERROR_TEXT : undefined
        }
        buttonText={
          showPopup.showButtonToSingUp
            ? 'REGÍSTRATE'
            : 'ESCRÍBENOS POR WHATSAPP'
        }
        iconButton={
          !showPopup.showButtonToSingUp && (
            <IconCommunity
              style={{
                marginTop: -1,
                color: FontStyles.LightColor.color,
                marginRight: 7
              }}
              name="whatsapp"
              size={22}
            />
          )
        }
        buttonType="full"
        closeAction={() => setIsPopupVisible(false)}
        buttonAction={() => {
          if (showPopup.showButtonToSingUp) {
            onNavigateToSignup();
            return;
          }
          onPressSendMessage();
          setIsPopupVisible(false);
        }}
        showCloseButton={true}
      />
      {showPopupBiometric && (
        <Popup
          key={'showPopupBiometric'}
          visible={showPopupBiometric}
          title={
            biometricsType === 'FaceID'
              ? '¡Ingresa más rápido!\nActiva tu Face ID ya.'
              : '¡Ingresa más rápido!\nActiva tu huella ya.'
          }
          icon={biometricsType === 'FaceID' ? <FaceIdIcon /> : <IconFinger />}
          iconColor={COLORS.GREENOK}
          closeAction={async () => {
            await setShowPopupBiometric(false);
            goToSuccess();
          }}
          buttonAction={async () => {
            await setShowPopupBiometric(false);
            readBiometrics().then(() => {
              goToSuccess();
            });
          }}
          showCloseButton={true}
          buttonType="full"
          contentStyle={{ minWidth: '80%' }}
        />
      )}
      <Popup
        key={'showRequired'}
        visible={showRequired}
        title={'Atención'}
        titleStyle={{ textAlign: 'left', alignSelf: 'flex-start' }}
        textContent={`Para activar la ${
          biometricsType === 'FaceID' ? ' Face ID' : 'huella'
        } , debes ingresar con tu usuario y contraseña`}
        closeAction={() => {
          setShowRequired(false);
        }}
        buttonAction={async () => {
          setShowRequired(false);
        }}
        contentStyle={{ minWidth: '90%', maxWidth: '90%' }}
      />
    </ScrollView>
  );
};

export interface SignInScreenProps {
  navGoToSuccess?: string;
  [any: string]: any;
}

export type SignInScreenType = undefined | SignInScreenProps;

export interface SignInProps
  extends NativeStackScreenProps<AuthNavigationParams, 'SignIn'> {
  onPressLogin?(): void;
  onCloseAction?(): void;
  isModal?: boolean;
}

export default SignIn;
