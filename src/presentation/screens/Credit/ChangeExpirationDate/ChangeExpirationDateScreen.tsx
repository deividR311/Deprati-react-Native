//libs
import React, { FC, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS_SIZES, NAV } from '../../../../application/common';
//components
import TemplatePage from '../../../common-components/template-page';
import { CreditNavigationProps } from '../../../navigation/credit';
import { ClientInfoCard } from '../credit-limit-increase/components/client-info-card';
import CheckboxComp from '../../../common-components/checkboxs';
import TextAndLink from '../../SignUp/components/TextAndLink';

import { Popup } from '../../../common-components/poppup';
import { MainButton } from '../../../common-components/buttons/Button';

import TextWarningComponent from './components/TextWarningComponent';
import TextSuccessComponent from './components/TextSuccessComponent';
import { SkeletonMonthInfo } from './components/SkeletonChangeExpirationDate';
import SelectInput from '../../../common-components/inputs/SelectInput';
import { AlertCard } from '../../../common-components/alert-card/AlertCard';
import { CircularWarningIcon } from '../../../../../assets/icons/CircularWarningIcon';
//hooks
import useChangeExpirationDate from './hook/useChangeExpirationDate.hook';
import useOpenLinkInApp from '../../../../application/common/hooksCommons/useOpenLinkInApp';

//utils
import { styles, stylesPopup } from './styleChangeExpirationDate';
import formatTextByTags from '../../../../application/utils/formatTextByTags';
import { getUrlCreditTerms } from '../../../../application/utils/urls';
import { PopupWhatsapp } from '../../../common-components/poppup/poppupWhatsapp';
import { useTranslation } from 'react-i18next';

const TEXT_DESCRIPTION =
  'No puedes cambiar tu fecha máxima de pago si tienes una deuda pendiente y este <b>cambio se hará efectivo a partir del próximo mes.</b>';

const TITLE_ALERT =
  '¿Estás seguro de cambiar la fecha máxima de pago de tu crédito De Prati?';

const TITLE_SUCCESS =
  '¡La solicitud de cambio de fecha ha sido enviada con éxito! \\n Ten en cuenta que tu nueva fecha de vencimiento es el {0} de cada mes\\ny se hará efectiva a partir de {1} de {2}';

const TITLE_ERROR =
  '-No se pudo generar la solicitud de cambio de fecha de vencimiento, Volver a Intentar';
export const ChangeExpirationDateScreen: FC<
  ChangeExpirationDateScreenProps
> = props => {
  const { t } = useTranslation();
  const openUrl = useOpenLinkInApp();
  const {
    TEXT_NEWDATE,
    infoCreditBalance,
    dataCurrentDate,
    dataChangeDate,
    selectedDay,
    setSelectedDay,
    isAcceptTerms,
    setIsAcceptTerms,
    handleChangeDate,
    showWarning,
    setShowWarning,
    isLoadingChangeDate,
    isLoadingCurrentDate,
    showSucces,
    handleCloseSuccess,
    showErrorSucces,
    handleCloseError,
    expirationDateContent,
    handleCloseWarning,
    selectRef,
    showModalChangeDate,
    errorChangeDate,
    handleCloseModal
  } = useChangeExpirationDate();

  const calendarDayNumber = useMemo(() => {
    // return getNextMonthDays().map(v => ({
    //   label: v.label,
    //   value: v.value.getDate().toString(),
    // }))

    /** @todo IMPOERTANTE!!! */
    // 👆 Utiliza esta 👆 si se debe calcular por el mes
    // O utiliza esta 👇 si solo es quemar los 30 dias

    return new Array(30).fill(1).map((v, i) => ({
      label: (v + i).toString(),
      value: (v + i).toString()
    }));
  }, []);

  const successMessage = useMemo(() => {
    const message =
      dataChangeDate?.message?.split('\\n') ?? TITLE_SUCCESS.split('\\n');
    const title = message[0];

    const content = [...message];
    content.shift();

    return {
      title,
      content: content.join(`\n`)
    };
  }, [dataChangeDate?.message]);

  return (
    <TemplatePage loading={false} error={false} skeleton={null}>
      <ScrollView>
        <View style={styles.container}>
          <ClientInfoCard
            clientName={infoCreditBalance?.clientName ?? ''}
            accountNumber={
              infoCreditBalance?.numeroTarjetaAdicionalDisplay ?? ''
            }
            clientSince={infoCreditBalance?.affiliateDate ?? ''}
          />
          <View
            style={{
              backgroundColor: COLORS.GRAYDARK20,
              padding: 12,
              marginVertical: 16
            }}>
            <Text style={[styles.subTitle]}>Fecha de pago actual</Text>
            {isLoadingCurrentDate ? (
              <SkeletonMonthInfo />
            ) : (
              <Text style={[styles.title]}>
                {`${dataCurrentDate?.cuttingDay ?? ''} de cada mes`}
              </Text>
            )}
          </View>

          <>
            <Text style={[styles.subTitle, { marginBottom: 10 }]}>
              Cambia la fecha máxima de pago
            </Text>
            <Text style={[styles.title]}>
              El día que selecciones aplicará para todos tus siguientes pagos de
              tu crédito De Prati
            </Text>
          </>

          <View style={styles.viewInput}>
            <SelectInput
              selectRef={selectRef}
              useOnlyPlaceHolder
              autoPlaceholderMessage={false}
              label="Selecciona el día"
              items={calendarDayNumber}
              onChange={(day: string | number) => setSelectedDay(day)}
              value={selectedDay}
            />
          </View>

          <AlertCard
            icon={<CircularWarningIcon />}
            text={
              <Text style={[styles.description]}>
                {formatTextByTags({
                  text: expirationDateContent?.legend ?? TEXT_DESCRIPTION
                })}
              </Text>
            }
          />
        </View>

        <CheckboxComp
          onPress={() => setIsAcceptTerms(!isAcceptTerms)}
          color={COLORS.BRAND}
          status={isAcceptTerms ? 'checked' : 'unchecked'}
          styleContainer={styles.check}
          textStyle={{
            fontSize: FONTS_SIZES.label,
            color: COLORS.DARK,
            width: '100%'
          }}
          label={
            <TextAndLink
              textLinkStyle={styles.terms}
              text={t('acceptThe')}
              textLink={t('termsAndConditions')}
              onPress={() => {
                openUrl(getUrlCreditTerms());
              }}
            />
          }
        />
        <View style={styles.viewButton}>
          <MainButton
            disabled={
              !isAcceptTerms ||
              selectedDay === TEXT_NEWDATE ||
              isLoadingChangeDate ||
              !dataCurrentDate?.cuttingDay
            }
            showActivityIndicator={isLoadingChangeDate}
            style={styles.button}
            title={'CAMBIAR FECHA'}
            onPress={() => setShowWarning(true)}
          />
        </View>
        <View style={{ height: 80, width: '100%' }} />
      </ScrollView>
      <Popup
        visible={showWarning}
        doubleButton={true}
        title={expirationDateContent?.popup_title ?? TITLE_ALERT}
        textComponent={() => (
          <TextWarningComponent content={expirationDateContent} />
        )}
        buttonText={expirationDateContent?.popup_cancel_action}
        secondButtonText={
          expirationDateContent?.popup_accept_action ?? 'SI, ESTOY DE ACUERDO'
        }
        contentStyle={stylesPopup.contentStyle}
        titleStyle={stylesPopup.titleStyle}
        containerButtonsStyle={stylesPopup.containerButtonsStyle}
        buttonTextStyle={stylesPopup.buttonTextStyle}
        secondButtonTextStyle={stylesPopup.secondButtonTextStyle}
        closeAction={handleCloseWarning}
        buttonAction={handleChangeDate}
      />
      <Popup
        visible={showSucces}
        closeAction={handleCloseSuccess}
        icon={'check-circle'}
        iconColor={COLORS.GREENOK}
        title={successMessage.title}
        textComponent={() => (
          <TextSuccessComponent content={successMessage.content} />
        )}
        showCloseButton={true}
        buttonAction={handleCloseSuccess}
        buttonText="CERRAR"
        buttonType="full"
        contentStyle={stylesPopup.contentSuccessStyle}
      />
      <Popup
        visible={showErrorSucces}
        closeAction={handleCloseError}
        icon={'error'}
        iconColor={COLORS.BRAND}
        title={dataChangeDate?.message?.split('\n')[0] ?? TITLE_ERROR}
        showCloseButton={true}
        hideButton={true}
      />
      <PopupWhatsapp
        visible={showModalChangeDate}
        title={errorChangeDate?.data.message ?? errorChangeDate?.data.Message}
        onClose={handleCloseModal}
      />
    </TemplatePage>
  );
};

export interface ChangeExpirationDateScreenProps
  extends NativeStackScreenProps<
    CreditNavigationProps,
    NAV.CreditChangeExpirationDate
  > {}
