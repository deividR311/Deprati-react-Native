import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../../../common-components/buttons/Button';
import CheckboxComp from '../../../../../common-components/checkboxs';
import InputBase from '../../../../../common-components/inputs/InputBase';
import RadioButtonComp from '../../../../../common-components/radiosButton';
import TemplatePage from '../../../../../common-components/template-page';
import TextAndLink from '../../../../SignUp/components/TextAndLink';
import ErrorText from '../../../../../common-components/texts/ErrorText';
import { Popup } from '../../../../../common-components/poppup';
import { AlertCard } from '../../../../../common-components/alert-card/AlertCard';
import { CircularWarningIcon } from '../../../../../../../assets/icons/CircularWarningIcon';
import { CircularInformationIcon } from '../../../../../../../assets/icons';
import { useCertificateCredit } from './hook';
import { stylesPopup } from '../../../ChangeExpirationDate/styleChangeExpirationDate';
import { styles } from './styleCertificateCredit';
import { COLORS, FontStyles } from '../../../../../../application/common';
import {
  formatTextByTags,
  getUrlCreditTerms,
  handleChangeColor
} from '../../../../../../application/utils';
import { PopupWhatsapp } from '../../../../../common-components/poppup/poppupWhatsapp';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function CertificateCredit() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const {
    isLoadingMail,
    padding,
    changeOption,
    checkboxs,
    errors,
    touched,
    globalError,
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    dataCheckMail,
    handleOpenWhatsapp,
    openUrl,
    handleAceptTerms,
    checkDefault,
    activeAction,
    isLoadingSend,
    errorMail,
    closeModaError,
    showSuccesPopUp,
    dataSend,
    closeSuccessPopUp,
    errorSend,
    closeModaErrorCrediCertificate,
    showModaError,
    textCertificate,
    COMMERCIAL_REFERENCE,
    CREDIT_PER_DAY,
    showModalConfirm,
    onCloseModalConfirm,
    onOpenModalConfirm,
    onPressGenerate,
    colorsButton,
    showModalWhatsApp
  } = useCertificateCredit();

  const handleCloseCrediCertificate = () => {
    closeModaErrorCrediCertificate();
    navigation.goBack();
  };

  return (
    <TemplatePage
      // error={isErrorMail}
      loading={isLoadingMail}
      skeleton={
        <SkeletonContent
          isLoading={isLoadingMail}
          layout={[{ width: '100%', height: 200 }]}
        />
      }>
      <ScrollView
        style={{ marginBottom: 80 }}
        contentContainerStyle={[styles.container, { paddingBottom: padding }]}>
        <Text style={styles.container__title}>
          Selecciona el certificado que deseas solicitar:
        </Text>
        <View style={styles.contentChecks}>
          <View style={styles.boxContent}>
            <RadioButtonComp
              value={''}
              onPress={() => changeOption('commercialReference')}
              status={checkboxs.commercialReference ? 'checked' : 'unchecked'}
              label={COMMERCIAL_REFERENCE}
              color={COLORS.BRAND}
            />
            {checkboxs.commercialReference ? (
              <>
                <InputBase
                  key={'reference'}
                  testID="reference"
                  error={
                    errors.reference && (touched.reference || globalError)
                      ? true
                      : false
                  }
                  dense
                  label="Certificado dirigido a"
                  // disabled={true}
                  value={values.reference}
                  onChangeText={(text: string) =>
                    setFieldValue('reference', text)
                  }
                  onChange={handleChange('reference')}
                  onBlur={handleBlur('reference')}
                  maxLength={81}
                  style={styles.input}
                />
                {errors.reference && (touched.reference || globalError) && (
                  <View style={styles.error}>
                    <ErrorText text="¿A quién va dirigido?" />
                  </View>
                )}
              </>
            ) : null}
          </View>

          <View style={styles.boxContent}>
            <RadioButtonComp
              value={''}
              onPress={() => changeOption('creditPerDay')}
              status={checkboxs.creditPerDay ? 'checked' : 'unchecked'}
              label={CREDIT_PER_DAY}
              color={COLORS.BRAND}
            />
          </View>
          <View>
            <Divider style={styles.divider} />
            <Text style={FontStyles.H6_2Headline}>
              Tu certificado será enviado a:
            </Text>
            <InputBase
              testID="email"
              dense
              keyboardType="email-address"
              label={'Correo electrónico'}
              value={dataCheckMail?.data?.email}
              // placeholder="MM/AA"
              disabled={true}
              style={[styles.inputEmail, { color: COLORS.GRAYDARK60 }]}
            />
          </View>
          <View style={styles.conditionsContainer}>
            <Text style={styles.conditionsText}>
              {'¿Quieres actualizar este correo?\nComunícate con nuestro '}
              <Text onPress={handleOpenWhatsapp} style={styles.customerService}>
                Servicio al Cliente
              </Text>
              .
            </Text>
          </View>
          <Divider style={[styles.divider, { marginVertical: 27 }]} />
          {(checkboxs.commercialReference || checkboxs.creditPerDay) && (
            <AlertCard
              icon={<CircularWarningIcon />}
              iconAlign={'center'}
              text={
                <>
                  <Text style={styles.textAlert}>
                    {textCertificate.textAlert}
                  </Text>
                  {formatTextByTags({
                    text: `<b>${textCertificate.textCost}</b>`,
                    newTextStyle: styles.textCard
                  })}
                </>
              }
            />
          )}
        </View>
        <View style={styles.contentTerms}>
          <CheckboxComp
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
            onPress={() => handleAceptTerms(!checkDefault)}
            status={checkDefault ? 'checked' : 'unchecked'}
          />
        </View>

        <Button
          linkName="GENERAR DOCUMENTO"
          marginTop={14}
          containerStyle={[
            styles.containerButton,
            { backgroundColor: colorsButton.backgroundColor }
          ]}
          backgroundColor={colorsButton.backgroundColor}
          textColor={colorsButton.textColor}
          onPress={onOpenModalConfirm}
          disabled={!activeAction || isLoadingSend}
          showActivityIndicator={isLoadingSend}
          activityIndicator={{
            color: colorsButton.color
          }}
        />
      </ScrollView>
      <Popup
        visible={showModaError}
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
              onPress={() => handleOpenWhatsapp()}
              activeOpacity={0.5}>
              <Icon style={styles.iconStyles} name="whatsapp" size={22} />
              <Text style={styles.textWhite}>
                {'Escríbenos por Whatsapp'.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Popup
        visible={showSuccesPopUp}
        title="Solicitud enviada"
        textComponent={() => (
          <Text style={styles.textSucces}>
            {dataSend?.message.split('\\n')[0]}
            {handleChangeColor(dataSend?.message.split('\\n')[1])}
          </Text>
        )}
        contentStyle={{ ...stylesPopup.contentStyle }}
        textContentStyle={{
          ...FontStyles.Body_1,
          textAlign: 'center'
        }}
        icon="check-circle"
        buttonType={'full'}
        buttonText={'CERRAR'}
        iconColor={COLORS.GREENOK}
        closeAction={closeSuccessPopUp}
        buttonAction={closeSuccessPopUp}
        showCloseButton={true}
      />
      <PopupWhatsapp
        visible={showModalWhatsApp}
        title={errorSend?.data.message}
        onClose={handleCloseCrediCertificate}
      />
      <Popup
        visible={showModalConfirm}
        title={'¿Confirmas la emisión del certificado?'}
        textComponent={() => (
          <Text style={styles.textConfirm}>
            {textCertificate.confirm[0]}
            {handleChangeColor(textCertificate.confirm[1])}
            {textCertificate.confirm[2]}
          </Text>
        )}
        textContentStyle={{ textAlign: 'center' }}
        buttonText={'REGRESAR'}
        secondButtonText={'CONFIRMO'}
        icon={<CircularInformationIcon />}
        closeAction={onCloseModalConfirm}
        buttonAction={onPressGenerate}
        showCloseButton={true}
        doubleButton={true}
        contentStyle={stylesPopup.contentStyle}
        containerButtonsStyle={stylesPopup.containerButtonsStyle}
        buttonTextStyle={stylesPopup.buttonTextStyle}
        secondButtonTextStyle={stylesPopup.secondButtonTextStyle}
      />
    </TemplatePage>
  );
}
