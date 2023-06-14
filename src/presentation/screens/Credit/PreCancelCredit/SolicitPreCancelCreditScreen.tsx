//libs
import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Divider } from 'react-native-paper';
//hook
import useSolicitPreCancelCredit from './hooks/useSolicitPreCancelCredit';
//component
import TemplatePage from '../../../common-components/template-page';
import TextRowComponent from '../../../common-components/billingAddress/components/TextRowComponent';
import {
  ButtonOutlined,
  MainButton
} from '../../../common-components/buttons/Button';
import { Popup } from '../../../common-components/poppup';
import { formatDatePrecancel } from '../../../../application/utils/formatDate';
import { SkeletonSolicitPreCancelCredit } from './components/skeleton/SkeletonSolicitPreCancelCredit';
import ModalForWp from './components/ModalForWp';
//styles
import { styles } from './styleSolicitPreCancelCredit';
//utils
import { COLORS, FontStyles, NAV } from '../../../../application/common';
import { CreditNavigationProps } from '../../../navigation/credit';
import { IListSolicit } from './interfaces/ISolicitPreCancelCredit';
import { PopupWhatsapp } from '../../../common-components/poppup/poppupWhatsapp';
import { useTranslation } from 'react-i18next';

const TEXT_SELECTEDDEFERRED = 'Diferidos seleccionados:';
const TEXT_APPLICATIONDATE = 'Fecha de solicitud:';

const TEXT_LEGEND =
  'Recuerda que debes realizar el pago hasta la hora\ny fecha indicada, de lo contrario esta solicitud se\ncancelará automáticamente.';
const TEXT_APPROVE = 'APROBAR SOLICITUD';
const TEXT_CANCEL = 'CANCELAR';

export const SolicitPreCancelCreditScreen: FC<
  SolicitPreCancelCreditProps
> = props => {
  const { t } = useTranslation();
  const TITLE_SUCCESS = `${t('requestSuccess')}`;
  const {
    dataTotalsPayment,
    handleConfirm,
    handleClose,
    handleCancel,
    showSuccess,
    showError,
    loading,
    isError,
    isErrorConfirmTickets,
    errorConfirmTickets
  } = useSolicitPreCancelCredit();

  const listInformation: IListSolicit[] = [
    {
      title: 'Valor diferidos:',
      value: `$${dataTotalsPayment?.selectedvalue ?? ''}`,
      titleStyle: {},
      valueStyle: styles.valueRed
    },
    {
      title: 'Valor a pagar del mes:',
      value: `$${dataTotalsPayment?.monthPayment ?? ''}`,
      titleStyle: {},
      valueStyle: styles.valueRed
    },
    {
      title: 'Valor total a pagar:',
      value: `$${dataTotalsPayment?.paymentTotal ?? ''}`,
      titleStyle: styles.textTotal,
      valueStyle: styles.valueTotal
    },
    {
      title: 'Ahorro (referencial):',
      value: `$${dataTotalsPayment?.interestsaved ?? ''}`,
      titleStyle: {},
      valueStyle: styles.valueSaving
    },
    {
      title: 'Fecha máxima de pago:',
      value: dataTotalsPayment?.maxPaymentDate ?? '',
      titleStyle: FontStyles.Body_1,
      valueStyle: styles.valueApplicationDate
    }
  ];

  return (
    <TemplatePage
      loading={loading.isLoadingTotalsPayment}
      error={false}
      skeleton={<SkeletonSolicitPreCancelCredit />}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardTop}>
          <TextRowComponent
            textStyle={[FontStyles.Body_1, styles.subTitle]}
            title={TEXT_SELECTEDDEFERRED}
            text={` ${dataTotalsPayment?.selectedDeferreds ?? ''}`}
          />
          <TextRowComponent
            textStyle={[FontStyles.Body_1, styles.subTitle]}
            title={TEXT_APPLICATIONDATE}
            text={formatDatePrecancel()}
            // text={' 01/sept/2022'}
          />
        </View>

        <View style={[styles.viewCard]}>
          <View style={[styles.contentCard]}>
            {listInformation.map((x, index) => (
              <>
                <Text
                  style={[
                    FontStyles.H3_Headline,
                    styles.textCard,
                    x.titleStyle
                  ]}>
                  {x.title}
                </Text>
                <Text style={[FontStyles.H3_Headline, x.valueStyle]}>
                  {x.value}
                </Text>
                {index < listInformation.length - 1 && (
                  <Divider style={styles.divider} />
                )}
              </>
            ))}
          </View>
        </View>
        <Text style={[FontStyles.Body_2, FontStyles.Center, { marginTop: 8 }]}>
          {dataTotalsPayment?.legend ?? TEXT_LEGEND}
        </Text>
        <View style={styles.contentButtons}>
          <MainButton
            title={TEXT_APPROVE}
            showActivityIndicator={loading.isLoadingConfirmTickets}
            disabled={loading.isLoadingConfirmTickets}
            onPress={handleConfirm}
            style={styles.button}
            styleText={styles.buttonText}
          />
          <ButtonOutlined
            title={TEXT_CANCEL}
            style={styles.buttonSeeDetails}
            labelStyle={styles.buttonLabel}
            onPress={handleCancel}
          />
        </View>
      </ScrollView>
      <Popup
        visible={showSuccess}
        closeAction={handleClose}
        icon={'check-circle'}
        iconColor={COLORS.GREENOK}
        title={TITLE_SUCCESS}
        showCloseButton={true}
        hideButton={true}
      />
      <ModalForWp visible={showError} onClose={handleClose} />
      <PopupWhatsapp
        visible={isErrorConfirmTickets}
        title={errorConfirmTickets?.data.message}
        onClose={handleClose}
      />
    </TemplatePage>
  );
};

export interface SolicitPreCancelCreditProps
  extends NativeStackScreenProps<
    CreditNavigationProps,
    NAV.CreditSolicitPreCancel
  > {}
