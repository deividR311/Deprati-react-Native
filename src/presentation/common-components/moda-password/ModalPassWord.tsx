import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Keyboard
} from 'react-native';
import { useFormik } from 'formik';
import {
  FONTS_FAMILY,
  FONTS_SIZES,
  FontStyles
} from '../../../application/common/fonts';
import { HEIGHT_TAB_BAR } from '../../../application/common/layout';
import { COLORS } from '../../../application/common/colors';
import PasswordInput from '../../common-components/inputs/PasswordInput';
import Button from '../buttons/Button';
import { BottomSheet } from '../bottomSheet/bottomSheet';
import { userPasswordChangeValidation } from '../../../application/common/yup-validations/userPasswordChange';
import { useChangePasswordMutation } from '../../../infrastucture/apis/changePassword/changePassword.api';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import ErrorText from '../texts/ErrorText';
import { Popup } from '../poppup';
import { useAuthToken } from '../../../infrastucture/apis/sign-in/useAuthToken.hook';
import { IconButtonCloseTop } from './components/IconButtonCloseTop';
import { ButtonModal } from './components/ButtonModal';
import sleep from '../../../application/utils/sleep';
import { useTranslation } from 'react-i18next';

interface Props {
  showModaPassword: boolean;
  onCloseRequest: () => void;
  setShowModaPassword: (set: boolean) => void;
}

const ModalPassword = ({
  showModaPassword,
  setShowModaPassword,
  onCloseRequest
}: Props) => {
  const { t } = useTranslation();
  const [showSuccesPopUp, setShowSuccesPopUp] = useState<boolean>(false);
  const [showModaPasswordError, setShowModaPasswordError] =
    useState<boolean>(false);
  const [messageErrorNewPassword, setMessageErrorNewPassword] = useState('');
  const [messageErrorConfirNewPassword, setMessageErrorConfirNewPassword] =
    useState('');

  const [
    _doChangePassword,
    {
      isLoading,
      isSuccess,
      isError,
      data: dataChangePassword,
      error: errorChangePassword
    }
  ] = useChangePasswordMutation();

  const {
    handledSubmit,
    isLoadingBySignInWithDePrati,
    errorSignInWithDePrati,
    loadingUser,
    onSuccess
  } = useAuthToken();

  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: username,
      [LocalStorageKey.MessagesApp]: messagesApp
    }
  } = useLocalStorage();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirNewPassword: ''
    },
    initialErrors: {},
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    validationSchema: userPasswordChangeValidation,
    onSubmit: _ => {}
  });

  const closeSuccessPopUp = () => {
    sleep(400).then(() => {
      handledSubmit({ email: username, password: values.newPassword });
    });
    resetForm();
    setShowSuccesPopUp(false);
    setShowModaPassword(false);
  };

  const onPressPasswordChange = () => {
    _doChangePassword({
      username: username,
      old: values?.oldPassword,
      new: values?.newPassword
    });
  };

  const onCloseModa = () => {
    resetForm();
    setShowModaPassword(false);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setShowSuccesPopUp(true);
    }
    if (!isLoading && isError) {
      setShowModaPasswordError(true);
    }
  }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    if (!errors) return;

    if (errors.newPassword === 'minimo 6 caracteres') {
      setMessageErrorNewPassword(
        messagesApp?.Hybris_Password_Invalid_Length?.description
      );
    } else {
      setMessageErrorNewPassword(errors.newPassword);
    }
    if (errors.confirNewPassword === 'Las contraseñas no coinciden') {
      setMessageErrorConfirNewPassword(
        messagesApp?.Hybris_CurrentPassword_Ok_New_Incorrect?.description
      );
    } else {
      setMessageErrorConfirNewPassword(errors.confirNewPassword);
    }
  }, [errors]);

  const [heightBottomSheet, setHeightBottomSheet] = useState(62);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      const subs1 = Keyboard.addListener('keyboardDidShow', () =>
        setHeightBottomSheet(100)
      );
      const subs2 = Keyboard.addListener('keyboardDidHide', () =>
        setHeightBottomSheet(62)
      );
      return () => {
        subs1.remove();
        subs2.remove();
      };
    }
  }, []);

  return (
    <>
      <BottomSheet
        percentage={heightBottomSheet}
        canDrop={false}
        show={showModaPassword}
        paddingHorizontal={16}
        onCloseRequest={onCloseRequest}
        header={
          <View style={styles.bottomsheet__iconButtonClose}>
            <IconButtonCloseTop iconName="close" onPress={onCloseModa} />
          </View>
        }>
        <View style={styles.container__title}>
          <Text style={styles.containerTitle}>Cambio de contraseña</Text>
        </View>
        <ScrollView style={styles?.contentContainer}>
          <PasswordInput
            isVisible
            testID="oldPassword"
            name="oldPassword"
            nativeID="oldPassword"
            id="oldPassword"
            value={values.oldPassword}
            dense
            error={touched.oldPassword && errors.oldPassword ? true : false}
            // error={errors.oldPassword}
            onChangeText={(text: string) => setFieldValue('oldPassword', text)}
            style={styles?.inputPassword}
            label="Contraseña actual"
            disabled={isLoading}
            secureTextEntry={true}
            onChange={handleChange('oldPassword')}
            onBlur={handleBlur('oldPassword')}
          />
          <View style={styles.container__line} />
          <PasswordInput
            isVisible
            testID="newPassword"
            name="newPassword"
            nativeID="newPassword"
            id="newPassword"
            value={values.newPassword}
            error={touched.newPassword && errors.newPassword ? true : false}
            onChangeText={(text: string) => setFieldValue('newPassword', text)}
            dense
            style={styles?.inputPassword}
            label="Nueva contraseña"
            secureTextEntry={true}
            onChange={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
          />
          <PasswordInput
            isVisible
            testID="confirNewPassword"
            name="confirNewPassword"
            nativeID="confirNewPassword"
            id="confirNewPassword"
            value={values.confirNewPassword}
            onChangeText={(text: string) =>
              setFieldValue('confirNewPassword', text)
            }
            error={
              touched.confirNewPassword && errors.confirNewPassword
                ? true
                : false
            }
            // error={errors.confirNewPassword}
            dense
            style={styles?.inputPassword}
            label="Confirmar nueva contraseña"
            secureTextEntry={true}
            onChange={handleChange('confirNewPassword')}
            onBlur={handleBlur('confirNewPassword')}
          />
          {Object.keys(errors).length > 0 ? (
            <ErrorText
              text={
                errors.oldPassword ||
                messageErrorNewPassword ||
                messageErrorConfirNewPassword
              }
            />
          ) : null}
          <View style={styles?.buttonContainer}>
            <ButtonModal
              containerStyle={{
                width: '100%',
                borderColor: COLORS.BORDERCOLOR,
                borderWidth: 1,
                backgroundColor:
                  isLoading ||
                  Object.keys(errors).length > 0 ||
                  !values.newPassword
                    ? COLORS.GRAYDARK20
                    : COLORS.BRAND
              }}
              backgroundColor={COLORS.BRAND}
              linkName="ENVIAR"
              textColor={
                isLoading ||
                Object.keys(errors).length > 0 ||
                !values.newPassword
                  ? COLORS.BORDERCOLOR
                  : FontStyles.LightColor.color
              }
              onPress={() => onPressPasswordChange()}
              disabled={
                isLoading ||
                Object.keys(errors).length > 0 ||
                !values.newPassword
              }
              showActivityIndicator={isLoading}
              activityIndicator={{
                color: FontStyles.LightColor.color
              }}
            />
            <Button
              linkName="Cancelar"
              marginTop={14}
              containerStyle={{ width: '45%' }}
              backgroundColor={COLORS.WHITE}
              textColor={COLORS.BRAND}
              textStyle={{ textDecorationLine: 'underline' }}
              onPress={onCloseModa}
              disabled={isLoading}
              showActivityIndicator={isLoading}
            />
            <Popup
              visible={showModaPasswordError}
              title={
                errorChangePassword?.data?.errors[0]?.type ===
                'PasswordMismatchError'
                  ? messagesApp?.Hybris_Passwords_Not_Same?.description
                  : `${t('failedInfoFound')}`
              }
              icon="error"
              hideButton={true}
              iconColor={COLORS.REDICON}
              closeAction={() => setShowModaPasswordError(false)}
              showCloseButton={true}
            />
          </View>
        </ScrollView>
        <Popup
          visible={showSuccesPopUp}
          title="¡Tu contraseña fue modificada!"
          icon="check-circle"
          hideButton={true}
          iconColor={COLORS.GREENOK}
          closeAction={closeSuccessPopUp}
          showCloseButton={true}
        />
      </BottomSheet>
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: 150,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: Platform.select({
      android: HEIGHT_TAB_BAR + 50,
      ios: 0
    }),
    paddingHorizontal: 24
  },
  contentContainer: {
    width: '100%'
  },
  container__line: {
    width: '100%',
    backgroundColor: COLORS.DEPRATYGRAY,
    height: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 22
  },
  container__title: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container__title_icon: {
    flexGrow: 1
  },
  container__title_text: {
    flexGrow: 3,
    position: 'absolute',
    color: COLORS.DARK70,
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: FONTS_SIZES.label + 10
  },
  categories: {
    flex: 1
  },
  item: {
    flex: 1,
    width: '95%',

    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAYBRAND
  },
  item__title: {
    color: COLORS.DARK70,
    fontSize: FONTS_SIZES.label,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    lineHeight: FONTS_SIZES.label + 10
  },
  inputPassword: {
    marginTop: 20
    // height: '20%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerTitle: {
    fontSize: FONTS_SIZES.extra,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  bottomsheet__iconButtonClose: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // paddingBottom: 11,
    // marginTop: 18,
    marginBottom: 25,
    width: '100%'
  }
});

export default ModalPassword;
