import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  Linking,
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {
  COLORS,
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES,
  HEIGHT_TAB_BAR
} from '../../../../../../application/common';
import useOpenLinkInApp, {
  useWhatsapp
} from '../../../../../../application/common/hooksCommons/useOpenLinkInApp';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { getUrlCreditTerms } from '../../../../../../application/utils/urls';
import { useCheckMailMutationRequest } from '../../../../../../infrastucture/apis/checkMail/checkMail';
import { useContentServiceMutation } from '../../../../../../infrastucture/apis/contentService';
import Button from '../../../../../common-components/buttons/Button';
import CheckboxComp from '../../../../../common-components/checkboxs';
import InputBase from '../../../../../common-components/inputs/InputBase';
import SelectInput from '../../../../../common-components/inputs/SelectInput';
import { Popup } from '../../../../../common-components/poppup';
import TemplatePage from '../../../../../common-components/template-page';
import TextAndLink from '../../../../SignUp/components/TextAndLink';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDcStateCreditMutationrquest } from '../../../../../../infrastucture/apis/creditStatus/creditStatus';
import moment from 'moment';
import { capitalize } from '../../../../../../application/utils/string-formater';
import { trackEventclick } from '../../../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEvents } from '../../../../../../infrastucture/native-modules/emma/clickEventMap';
import { useAccountMovementsPeriodsRequest } from '../../../../../../infrastucture/apis/creditMovement';
import {
  fontFamilyOS,
  fontWeightOS
} from '../../../../../../application/utils';
import { PopupWhatsapp } from '../../../../../common-components/poppup/poppupWhatsapp';
import { useTranslation } from 'react-i18next';

export default function CreditStatus() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const openUrl = useOpenLinkInApp();
  const [openWhatsapp] = useWhatsapp();
  const [urlWhatsapp, setUrlWhatsapp] = useState('');
  const [checkDefault, setcheckDefault] = useState(false);
  const [dates, setDates] = useState<
    {
      label: string;
      value: moment.Moment;
    }[]
  >([]);
  const [sendDates, setSendDates] = useState(false);

  const [showModaError, setShowModaError] = useState('');
  const [showModalPeriodError, setShowModalPeriodError] = useState('');

  const [showModaErrorCreditStatus, setShowModaErrorCreditStatus] =
    useState(false);
  const [showSuccesPopUp, setShowSuccesPopUp] = useState<boolean>(false);

  const [
    _sendCreditStatus,
    {
      isLoading: isLoadingResponse,
      isSuccess: isSuccessResponse,
      isError: isErrorReponse,
      error: errorResponse,
      data: dataReponse
    }
  ] = useDcStateCreditMutationrquest();

  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: USER_EMAIL,
      [LocalStorageKey.IpAddress]: IP_ADDRESS,
      [LocalStorageKey.UID]: deviceId,
      [LocalStorageKey.User]: userData,
      [LocalStorageKey.AccountAdditionalNumber]:
        GLOBAL_ADDITIONAL_ACCOUNT_NUMBER,
      [LocalStorageKey.AccountNumber]: GLOBAL_ACCOUNT_NUMBER,
      [LocalStorageKey.User]: { documentTypeNumber: UserDocumentId }
    }
  } = useLocalStorage();

  const onPressSendCreditStatus = async () => {
    try {
      trackEventclick(keyEvents.credito_estadocredito);
      const year = moment(sendDates, 'DD [de] MMMM YYY').format('Y');
      const month = moment(sendDates, 'YYYYMM').format('MM');
      await _sendCreditStatus({
        identification: userData?.documentTypeNumber ?? '',
        year: year || '',
        month: month || '',
        email: dataCheckMail?.data?.email ?? '',
        deviceId: deviceId ?? ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [doGetServicesList, { data: dataRequestContent }] =
    useContentServiceMutation();

  const [
    getCheckMail,
    {
      isLoading: isLoadingMail,
      isSuccess: isSuccessMail,
      isError: isErrorMail,
      error: errorMail,
      data: dataCheckMail
    }
  ] = useCheckMailMutationRequest();

  const [
    getAccountMovementPeriods,
    { isError: hasErrorMovementPeriods, data: movementPeriods }
  ] = useAccountMovementsPeriodsRequest();

  const closeModaError = () => {
    setShowModaError('');
    setShowModalPeriodError('');
    navigation.goBack();
  };

  const closeModaErrorCreditStatus = () => {
    setShowModaErrorCreditStatus(false);
  };

  const closeSuccessPopUp = () => {
    setShowSuccesPopUp(false);
    navigation.goBack();
  };

  const onLinkWhatsapp = async () => {
    Linking.canOpenURL(urlWhatsapp).then((supported: boolean) => {
      if (!supported) {
        Alert.alert('Por favor instale la aplicación de WhatsApp');
        return;
      }
      return Linking.openURL(urlWhatsapp);
    });
  };

  useEffect(() => {
    if (!movementPeriods) return;
    const periods = movementPeriods?.data?.map(
      ({ periodName, periodMonth }) => ({
        label: capitalize(periodName),
        value: moment().subtract(periodMonth, 'months')
      })
    );
    setDates(periods);
  }, [movementPeriods]);

  useEffect(() => {
    if (!isLoadingResponse && isSuccessResponse) {
      setShowSuccesPopUp(true);
    }
  }, [isLoadingResponse, isSuccessResponse]);

  useEffect(() => {
    if (!isErrorReponse) return;
    //console.log('error sendStatusCredit>>> ', errorResponse)
    if (isErrorReponse) {
      setShowModaErrorCreditStatus(true);
    }
  }, [isErrorReponse]);

  const tryAllRequest = async () => {
    const getServicesList = doGetServicesList({
      content: 'customerService'
    });

    const getCheckEmail = getCheckMail({
      identification: userData?.documentTypeNumber ?? '',
      deviceId
    });

    const getMovementPeriods = getAccountMovementPeriods({
      deviceId,
      identification: UserDocumentId
    });

    const [_servicesList, checkEmail, _movementPeriods] = await Promise.all([
      getServicesList,
      getCheckEmail,
      getMovementPeriods
    ]);

    if (checkEmail.error?.data?.message) {
      setShowModaError(checkEmail.error?.data?.message);
      return;
    }

    if (_movementPeriods?.error?.data?.message) {
      setShowModalPeriodError(_movementPeriods?.error?.data?.message);
      return;
    }
  };

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitleStyle: FontStyles.H3_Headline
    });
    tryAllRequest();
  }, []);

  useEffect(() => {
    const mobileNumber =
      dataRequestContent?.data?.customerService?.whatsappPhoneNumber;
    let urlWhat = `https://wa.me/${mobileNumber}?text=${dataRequestContent?.data?.customerService?.whatsappMessage}`;
    setUrlWhatsapp(urlWhat);
  }, [dataRequestContent]);

  return (
    <TemplatePage
      error={false}
      loading={isLoadingMail}
      skeleton={
        <SkeletonContent
          isLoading={isLoadingMail}
          layout={[{ width: '100%', height: 200 }]}
        />
      }>
      <View style={styles.container}>
        <Text style={styles.container__title}>
          Selecciona el periodo que deseas solicitar.
        </Text>
        <SelectInput
          testID="selectperiod"
          styles={{ marginTop: 14, width: '95%' }}
          label="Periodo a consultar"
          items={dates}
          // value={blockReasons}
          onChange={date => setSendDates(date)}
        />
        <View style={styles.boxContent}>
          <InputBase
            testID="email"
            dense
            keyboardType="email-address"
            label={dataCheckMail?.data?.email}
            // error={!!formErrors.email}
            disabled={true}
            // value={formValues.email}
            // onChangeText={(text: string) => setFormValues({ email: text })}
          />
        </View>

        <View style={styles.conditionsContainer}>
          <Text style={styles.conditionsText}>
            Este documento se enviará al correo electrónico que tenemos
            registrado. Si quieres actualizarlo puedes comunicarte con
            <Text
              onPress={() => onLinkWhatsapp()}
              style={styles.customerService}>
              {' '}
              Servicio al Cliente
            </Text>
            .
          </Text>
        </View>
        <View style={styles.contentTerms}>
          <CheckboxComp
            testId="accept_terms"
            label={
              <TextAndLink
                textStyle={styles.accept}
                textLinkStyle={styles.link}
                text={t('acceptThe')}
                textLink={t('termsAndConditions')}
                onPress={() => {
                  openUrl(getUrlCreditTerms());
                }}
              />
            }
            color={COLORS.BRAND}
            onPress={() => setcheckDefault(!checkDefault)}
            status={checkDefault ? 'checked' : 'unchecked'}
          />
        </View>

        <Button
          linkName="ENVIAR ESTADO DEL CRÉDITO"
          marginTop={14}
          containerStyle={{
            width: '95%',
            borderColor: COLORS.BORDERCOLOR,
            borderWidth: 1,
            backgroundColor:
              checkDefault && sendDates && !isLoadingResponse
                ? COLORS.BRAND
                : COLORS.GRAYDARK20
          }}
          textColor={
            checkDefault && sendDates && !isLoadingResponse
              ? FontStyles.LightColor.color
              : COLORS.BORDERCOLOR
          }
          onPress={onPressSendCreditStatus}
          disabled={!checkDefault || !sendDates || isLoadingResponse}
          showActivityIndicator={isLoadingResponse}
          activityIndicator={{
            color:
              checkDefault && sendDates && !isLoadingResponse
                ? COLORS.WHITE
                : COLORS.BRAND
          }}
        />
      </View>
      <Popup
        visible={!!showModaError}
        title={
          errorMail?.data?.message ||
          'Actualmente no contamos con un correo registrado.'
        }
        icon="error"
        hideButton={true}
        iconColor={COLORS.REDICON}
        closeAction={closeModaError}
        showCloseButton={true}
        bodyComponent={() => (
          <View>
            <Text style={styles.textInfoErr}>
              Comunícate con Servicio al Cliente para hacer el registro.
            </Text>
            <TouchableOpacity
              style={styles.buttonWhatsapp}
              onPress={() => onLinkWhatsapp()}
              activeOpacity={0.5}>
              <Icon style={styles.iconStyles} name="whatsapp" size={22} />
              <Text style={styles.textWhite}>
                {'Escríbenos por Whatsapp'.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <PopupWhatsapp
        visible={showModalPeriodError !== ''}
        title={showModalPeriodError}
        onClose={closeModaError}
      />
      <Popup
        visible={showSuccesPopUp}
        title={dataReponse?.message}
        icon="check-circle"
        hideButton={true}
        iconColor={COLORS.GREENOK}
        closeAction={closeSuccessPopUp}
        showCloseButton={true}
      />
      <Popup
        visible={showModaErrorCreditStatus}
        title={errorResponse?.data.message}
        icon="error"
        hideButton={true}
        iconColor={COLORS.REDICON}
        closeAction={closeModaErrorCreditStatus}
        showCloseButton={true}
      />
    </TemplatePage>
  );
}

const styles = StyleSheet.create({
  buttonWhatsapp: {
    borderRadius: 5,
    backgroundColor: COLORS.BRAND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 25,
    height: 40,
    flexDirection: 'row'
  },
  textWhite: {
    color: FontStyles.LightColor.color,
    fontSize: 14,
    fontWeight: fontWeightOS('700'),
    fontFamily: fontFamilyOS(),
    fontStyle: 'normal',
    letterSpacing: 0.6
  },
  textInfoErr: {
    textAlign: 'center',
    width: 300,
    fontFamily: FONTS_FAMILY.Roboto
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  iconStyles: {
    paddingHorizontal: 0,
    color: FontStyles.LightColor.color,
    marginRight: 7
  },
  container: {
    flex: 1,
    // marginTop: 150,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: Platform.select({
      android: HEIGHT_TAB_BAR + 50,
      ios: 0
    }),
    paddingHorizontal: 8
  },
  container__title: {
    ...FontStyles.Body_1,
    marginBottom: 5,
    textAlign: 'left',
    width: '95%'
  },
  conditionsContainer: {
    // width: '90%',
    marginTop: 20,
    paddingHorizontal: 20
  },
  conditionsText: {
    ...FontStyles.Subtitle_1,
    fontFamily: FONTS_FAMILY.Roboto,
    fontSize: FONTS_SIZES.label,
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: 'normal'
  },
  boxContent: {
    width: '95%',
    marginTop: 10
  },
  customerService: {
    ...FontStyles.Subtitle_1,
    color: FontStyles.PrimaryColor.color,
    fontSize: FONTS_SIZES.label
  },
  contentTerms: {
    width: '93%',
    marginTop: 15
  },
  accept: {
    ...FontStyles.Body_2,
    fontStyle: 'normal'
  },
  link: {
    ...FontStyles.Body_2,
    fontStyle: 'normal',
    color: COLORS.BRAND
  }
});
