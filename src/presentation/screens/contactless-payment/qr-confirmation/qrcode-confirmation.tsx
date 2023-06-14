import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {
  COLORS,
  FontStyles,
  globalStyles
} from '../../../../application/common';
import {
  LocalStorageKey,
  useLocalStorage
} from '../../../../application/state-manager/services/localstorage';
import { useRegisteTokenTicketRequest } from '../../../../infrastucture/apis/contactless-payment';
import { keyEventsViewModal } from '../../../../infrastucture/native-modules/emma';
import {
  trackEventView,
  useEmmaSdk
} from '../../../../infrastucture/native-modules/emma/useEmma.hook';
import {
  BottomSheet,
  IconButton
} from '../../../common-components/bottomSheet';
import Button from '../../../common-components/buttons/Button';
import { CreditInformationChart } from '../../../common-components/credit-information-chart';
import {
  ContactLessPaymentNavigationParams,
  ContactLessPaymentSteps
} from '../../../navigation/contactless-payment';
import { useCreditBalance } from '../hooks/useCreditBalance.hook';
import { useQRConfirmation } from '../hooks/useQRCodeConfirmarionBuy.hook';
import { Styles } from './styles';
import TemplatePage from '../../../common-components/template-page';
import { PopupWhatsapp } from '../../../common-components/poppup/poppupWhatsapp';
import { IErrorCredit } from '../../Credit/ErrorCredit.interface';
import { t } from 'i18next';
import { sleep } from '../../../../application/utils';

export const QRShareScreen: FC<QRShareScreenProps> = props => {
  const { navigation } = props;
  const [showCreditBalanceBottomsheet, setShowCreditBalanceBottomsheet] =
    useState(false);
  const { isDisableContinueButton, QRData } = useQRConfirmation();
  const { infoCreditBalance = {} } = useCreditBalance();
  const [showModalBlock, setShowModalBlock] = useState(false);

  const route = useRoute();
  useEmmaSdk({ route });
  const {
    localStorageData: {
      [LocalStorageKey.AccountDisplayNumber]: ACCOUNT_NUMBER_DISPLAY_NUMBER,
      [LocalStorageKey.AccountNumber]: ACCOUNT_NUMBER,
      [LocalStorageKey.AccountAdditionalNumber]: ACCOUNT_ADDITIONAL_NUMBER,
      [LocalStorageKey.TokenFCM]: tokenFCM,
      [LocalStorageKey.UID]: DEVICE_ID
    }
  } = useLocalStorage();

  const [registerToken, { isLoading: loadingRegister, error: errorRegister }] =
    useRegisteTokenTicketRequest();

  useEffect(() => {
    trackEventView(keyEventsViewModal.credito_pagosincontacto_qr);
  }, []);

  useEffect(() => {
    handleRegisterToken();
    return () => {
      setShowModalBlock(false);
    };
  }, [tokenFCM, ACCOUNT_NUMBER, ACCOUNT_ADDITIONAL_NUMBER, DEVICE_ID]);

  const handleRegisterToken = async () => {
    if (
      !tokenFCM ||
      !ACCOUNT_NUMBER ||
      !ACCOUNT_ADDITIONAL_NUMBER ||
      !DEVICE_ID
    ) {
      return;
    }

    const response = await registerToken({
      account: ACCOUNT_NUMBER,
      additional: ACCOUNT_ADDITIONAL_NUMBER,
      token: tokenFCM,
      deviceId: DEVICE_ID
    });

    if (response?.error?.status === 452) {
      sleep(500).then(() => {
        setShowModalBlock(true);
      });
    }
  };

  const onPressCancel = () => {
    navigation.goBack();
  };

  const onPressContinueToBuying = () => {
    navigation.navigate(ContactLessPaymentSteps.PurchaseConfirmation);
  };

  const closeModaError = () => {
    setShowModalBlock(false);
    onPressCancel();
  };

  return (
    <TemplatePage loading={loadingRegister}>
      <ScrollView style={[globalStyles.scrollViewStyle]}>
        <View style={Styles.contentContainer}>
          <Text style={FontStyles.H1_Headline}>{t('purchaseCode')}</Text>
          <View style={Styles.spacing} />

          <View style={[Styles.qrCodeContainer]}>
            <QRCode size={200} value={QRData || `${t('isNoDataRead')}`} />
          </View>

          <Text
            style={[FontStyles.Body_2, FontStyles.Center, Styles.information]}>
            {t('buttonActivePress')}
          </Text>
          <Button
            containerStyle={[Styles.button__containerStyle]}
            onPress={onPressContinueToBuying}
            linkName={t('APP_BOTON_LABEL.continueShopping2')}
            disabled={isDisableContinueButton}
            backgroundColor={COLORS.BRAND}
            textColor={FontStyles.LightColor.color}
            showActivityIndicator={isDisableContinueButton}
            activityIndicator={{
              color: FontStyles.LightColor.color
            }}
          />
          <Button
            containerStyle={[
              {
                width: '100%',
                borderWidth: 1,
                borderColor: FontStyles.DarkColor.color
              },
              Styles.button__containerStyle
            ]}
            backgroundColor={COLORS.WHITE}
            textColor={FontStyles.DarkColor.color}
            linkName={t('APP_BOTON_LABEL.cancel2')}
            onPress={onPressCancel}
          />
          <View style={Styles.line} />
          <Text
            style={Styles.link}
            onPress={() => setShowCreditBalanceBottomsheet(true)}>
            {t('APP_BOTON_LABEL.seeAvailableSpace')}
          </Text>
          <BottomSheet
            show={showCreditBalanceBottomsheet}
            onCloseRequest={() => setShowCreditBalanceBottomsheet(false)}
            percentage={72}
            canDrop={false}
            isCancelable
            header={
              <>
                <View style={Styles.closeButtonBottomSheet}>
                  <IconButton
                    testID={'close_modal'}
                    iconName="close"
                    onPress={() => setShowCreditBalanceBottomsheet(false)}
                  />
                </View>
                <Text style={Styles.titleBottomsheet}>
                  {t('availableSpace')}
                </Text>
              </>
            }>
            <View style={Styles.containerBottomsheet}>
              <CreditInformationChart
                invertValues
                wrapperChartInCard
                displayCartType="large"
                constentChart={infoCreditBalance}
                totalAmount={Number(
                  infoCreditBalance?.totalAmount
                    ?.toString()
                    .replace('.', '')
                    .replace(',', '.') || 0
                )}
                amountSpent={Number(
                  infoCreditBalance?.amountSpent
                    ?.toString()
                    .replace('.', '')
                    .replace(',', '.') || 0
                )}
                availableAmount={Number(
                  infoCreditBalance?.availableAmount
                    ?.toString()
                    .replace('.', '')
                    .replace(',', '.') || 0
                )}
                ownerFullname={infoCreditBalance?.clientName}
                affiliateDate={infoCreditBalance?.affiliateDate}
                numeroTarjetaAdicionalDisplay={ACCOUNT_NUMBER_DISPLAY_NUMBER}
              />
              <Button
                onPress={() => setShowCreditBalanceBottomsheet(false)}
                linkName={t('APP_BOTON_LABEL.close2')}
                backgroundColor={COLORS.BRAND}
                textColor={FontStyles.LightColor.color}
              />
            </View>
          </BottomSheet>
        </View>
      </ScrollView>
      <PopupWhatsapp
        visible={showModalBlock}
        title={(errorRegister as IErrorCredit)?.data.message}
        onClose={closeModaError}
      />
    </TemplatePage>
  );
};

export interface QRShareScreenProps
  extends NativeStackScreenProps<
    ContactLessPaymentNavigationParams,
    ContactLessPaymentSteps.QRShare
  > {}
