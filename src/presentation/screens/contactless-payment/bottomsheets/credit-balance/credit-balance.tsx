import React, { useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import { FontStyles } from '../../../../../application/common/fonts';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useContactlessPaymentState } from '../../../../../application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import Button from '../../../../common-components/buttons/Button';
import { CreditInformationChart } from '../../../../common-components/credit-information-chart';
import { useCreditBalance } from '../../hooks/useCreditBalance.hook';
import { Styles } from './credit-balannce.stylesheet';
import ErrorPage from '../../../ErrorPage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useRegisteTokenTicketRequest } from '../../../../../infrastucture/apis/contactless-payment';
import { Popup } from '../../../../common-components/poppup';
import { useRoute } from '@react-navigation/native';
import { useEmmaSdk } from '../../../../../infrastucture/native-modules/emma';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useContentServiceRequest from '../../../../../infrastucture/apis/contentService/useContentServiceRequest.hook';
import { useWhatsapp } from '../../../../../application/common/hooksCommons/useOpenLinkInApp';
import { IInfoWp } from '../../../../../infrastucture/apis/precancellation/precancellation.type';

export const CreditBalance: React.FC = () => {
  const { showIdentityConfirmation } = useContactlessPaymentState();
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const { infoCreditBalance = {}, isLoading, hasError } = useCreditBalance();
  const [infoWp, setInfoWp] = useState<IInfoWp>({
    phoneNumber: '',
    messageToSend: ''
  });
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

  const [
    registerToken,
    {
      isLoading: isLoadingRegisterToken,
      isError: isErrorRegisterToken,
      isSuccess: isSuccessRegisterToken,
      error: errorRegisterToken
    }
  ] = useRegisteTokenTicketRequest();

  const { getContentCustomer, dataCustomer } = useContentServiceRequest();

  const [openWhatsapp] = useWhatsapp();

  const _showIdentityConfirmation = () => {
    registerToken({
      account: ACCOUNT_NUMBER,
      additional: ACCOUNT_ADDITIONAL_NUMBER,
      token: tokenFCM,
      deviceId: DEVICE_ID
    });
    //showIdentityConfirmation(true)
  };
  useEffect(() => {
    if (dataCustomer) {
      setInfoWp({
        phoneNumber: dataCustomer.customerService.whatsappPhoneNumber,
        messageToSend: dataCustomer.customerService.whatsappMessage
      });
    }
  }, [dataCustomer]);

  useEffect(() => {
    if (!isLoadingRegisterToken) {
      if (isSuccessRegisterToken) {
        showIdentityConfirmation(true);
      } else {
        if (errorRegisterToken?.data?.message) {
          getContentCustomer();
          setErrorModal(true);
        }
      }
    }
  }, [
    isLoadingRegisterToken,
    isSuccessRegisterToken,
    isErrorRegisterToken,
    errorRegisterToken
  ]);

  const hasData = React.useCallback((): boolean => {
    return !!infoCreditBalance?.clientName && !!infoCreditBalance?.cardNumber;
  }, [infoCreditBalance?.clientName, infoCreditBalance?.cardNumber]);

  function onLinkWhatsapp() {
    openWhatsapp(infoWp.phoneNumber, infoWp.messageToSend).catch(() => {
      Alert.alert('Por favor instale la aplicación de WhatsApp');
    });
  }

  function handleAction() {
    onLinkWhatsapp();
    setErrorModal(false);
  }

  if (hasError) return <ErrorPage />;

  return (
    <View style={Styles.constainer}>
      <SkeletonContent
        isLoading={isLoading || !hasData()}
        animationDirection="horizontalRight"
        containerStyle={Styles.skeleton__title_container}
        layout={[Styles.skeleton__title, Styles.skeleton__subtitle]}>
        <View style={Styles.titleContainer}>
          <Text style={FontStyles.H1_Headline}>
            ¡Muy bien {infoCreditBalance?.clientFirstName}!
          </Text>
          <Text style={[FontStyles.Body_1, Styles.subtitle]}>
            Cupo disponible para el pago
          </Text>
        </View>
      </SkeletonContent>

      <View style={Styles.card}>
        {isLoading ? (
          <SkeletonContent
            isLoading={isLoading || !hasData()}
            animationDirection="horizontalRight"
            containerStyle={Styles.skeleton__card}
            layout={[
              Styles.skeleton__card_text_1,
              Styles.skeleton__card_text_1,
              Styles.skeleton__card_text_2,
              Styles.skeleton__card_char
            ]}
          />
        ) : (
          <CreditInformationChart
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
        )}
      </View>

      <SkeletonContent
        isLoading={isLoading || !hasData()}
        animationDirection="horizontalRight"
        containerStyle={Styles.skeleton__card}
        layout={[Styles.skeleton__card_button]}>
        <Button
          containerStyle={{ width: '100%' }}
          backgroundColor={COLORS.BRAND}
          linkName="CONTINUAR CON PAGO SIN CONTACTO"
          textColor={FontStyles.LightColor.color}
          onPress={_showIdentityConfirmation}
          disabled={isLoading}
          showActivityIndicator={isLoadingRegisterToken}
          activityIndicator={{
            color: FontStyles.LightColor.color
          }}
        />
      </SkeletonContent>
      <Popup
        visible={errorModal}
        icon={'error'}
        iconColor={COLORS.BRAND}
        title={errorRegisterToken?.data?.message || ''}
        showCloseButton={true}
        buttonType={'full'}
        buttonAction={handleAction}
        closeAction={() => setErrorModal(false)}
        buttonText="ESCRÍBENOS POR WHATSAPP"
        iconButton={
          <Icon
            style={Styles.iconButton}
            name="whatsapp"
            size={22}
            color={COLORS.WHITE}
          />
        }
      />
    </View>
  );
};
