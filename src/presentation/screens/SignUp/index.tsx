import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FormSignUp, { FormSignUpRef } from './FormSignUp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../application/common/colors';
import { stylesSignUp } from './stylesSignUp';
import { useNavigation } from '@react-navigation/native';
import {
  setIndexPaage,
  signUpState
} from '../../../application/state-manager/services/signUp';
import { useSelector } from 'react-redux';
import ModalLoading from '../../common-components/modal/ModalLoading';
import LinearGradient from 'react-native-linear-gradient';
import { useGenericModal } from '../../common-components/modal/ModalProvider';
import { ModalsType } from '../../common-components/modal/modal.interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthNavigationParams } from '../../navigation/auth';
import {
  useEmmaSdk,
  keyEventsViewModal
} from '../../../infrastucture/native-modules/emma';
import { useNewUserRequest } from '../../../infrastucture/apis/user/user.api';
import sleep from '../../../application/utils/sleep';
import { useTranslation } from 'react-i18next';

export const SignUp: React.FC<SignUpProps> = props => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { showModal } = useGenericModal();
  const [loading, setloading] = useState(false);
  const [isPressNext, setIsPressNext] = useState(false);
  const [isError, setIsError] = useState(true);
  const sigUpState = useSelector(signUpState);
  const dataUserFromSocialNetwork: SignUpScreenType = props?.route?.params;
  const formRef = useRef<FormSignUpRef>(null);
  const arrPages = [0];
  const { trackEventModal } = useEmmaSdk({});
  const [createNewUser] = useNewUserRequest();

  const showError = error => {
    setloading(false);
    trackEventModal(keyEventsViewModal.crearcuenta_ko);
    showModal(ModalsType.ErrorSignUp, {
      title: error?.data?.errors[0]?.message ?? ''
    });
  };

  useEffect(() => {
    if (!isError && isPressNext) createUser();
  }, [isError, isPressNext]);

  const handleNext = async () => {
    setIsPressNext(true);
    await sleep(2000);
    setIsPressNext(false);
  };

  const createUser = async () => {
    const data = {
      city: sigUpState.values.city,
      country: sigUpState.values.country,
      docId: sigUpState.values.numID,
      firstName: sigUpState.values.name,
      generoId: sigUpState.values.gender.toUpperCase(),
      isNewsletterAccepted: sigUpState.values.newsLetter,
      lastName: sigUpState.values.lastnames,
      password: sigUpState.values.password,
      province: sigUpState.values.region,
      typeId: sigUpState.values.id.toUpperCase(),
      uid: sigUpState.values.email.toLowerCase()
    };

    try {
      setloading(true);
      const { data: resultData, error } = await createNewUser(data);

      if (resultData) {
        trackEventModal(keyEventsViewModal.crearcuenta_ok);
        setloading(false);
        showModal(ModalsType.VerifyAccount, {
          textContent: `${t(
            'emailSent'
          )}${sigUpState.values.email.toLowerCase()}${t('emailSent1')}`
        });

        //AsyncStorage.setItem('user-data', JSON.stringify(data))
        return;
      }
      if (error) {
        showError(error);
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    if (!dataUserFromSocialNetwork) return;
    const {
      firsname: name,
      lastname: lastnames,
      email
    } = dataUserFromSocialNetwork;
    formRef.current?.onChange('name', name ?? '');
    formRef.current?.onChange('lastnames', lastnames ?? '');
    formRef.current?.onChange('email', email ?? '');
  }, [dataUserFromSocialNetwork]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FormSignUp
          ref={formRef}
          setIsError={setIsError}
          isPressNext={isPressNext}
        />
      </View>

      <View>
        <LinearGradient
          colors={['#FFFFFF01', '#FFFFFF20', '#0000001A']}
          style={stylesSignUp.tabShadow}
        />
        <View style={stylesSignUp.bottomNav}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={stylesSignUp.viewArrow}>
              <Icon name="arrow-back-ios" size={25} color={COLORS.DARK} />
              <Text style={stylesSignUp.textArrow}>Atrás </Text>
            </View>
          </TouchableOpacity>
          <View style={stylesSignUp.viewTitle}>
            <Text style={stylesSignUp.titleBottom}>Regístrate</Text>
            <Text style={stylesSignUp.stepText}>
              Paso 1 de {arrPages.length}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              {arrPages.map(indexArr => {
                return (
                  <View
                    key={indexArr}
                    style={{
                      ...stylesSignUp.lineStep,
                      backgroundColor:
                        sigUpState.indexPage === indexArr
                          ? COLORS.BRAND
                          : COLORS.GRAYBRAND
                    }}
                  />
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            // disabled={!sigUpState.enabledNextArrow}
            onPress={() => handleNext()}>
            <View
              style={{
                ...stylesSignUp.viewArrow
              }}>
              <Icon
                name="arrow-forward-ios"
                size={24}
                color={sigUpState.enabledNextArrow ? COLORS.BRAND : COLORS.DARK}
              />
              <Text
                style={{
                  ...stylesSignUp.textArrow,
                  color: sigUpState.enabledNextArrow
                    ? COLORS.BRAND
                    : COLORS.DARK
                }}>
                Siguiente{' '}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {loading && <ModalLoading />}
      </View>
    </SafeAreaView>
  );
};

interface SignUpScreenProps {
  email?: string | null;
  firsname?: string | null;
  lastname?: string | null;
}
export type SignUpScreenType = undefined | SignUpScreenProps;

export interface SignUpProps
  extends NativeStackScreenProps<AuthNavigationParams, 'SignUp'> {}

export default SignUp;
