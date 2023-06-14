import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Text, View } from 'react-native';
import { ContactLessPaymentSteps } from '../../../navigation/contactless-payment/interfaces';
import { Styles } from './payment-method.stylesheet';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { NAV } from '../../../../application/common/namesNav';
import { Popup } from '../../../common-components/poppup';
import { useContactlessPurchaseCancelRequest } from '../../../../infrastucture/apis/contactless-payment';
import { useContactlessPaymentState } from '../../../../application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import { FontStyles } from '../../../../application/common';
import { PaymentButtonCard } from '../../checkout/payment-methods/components/payment-button-card';
import { PaymentMethodType } from '../../../../infrastucture/apis/checkout/payment-methods';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';

export const PaymentMethod: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  useEmmaSdk({ route });
  const [hasPurchasePending, setPurchasePendingState] =
    React.useState<boolean>(false);

  const {
    localStorageData: {
      [LocalStorageKey.IsAccountAuthenticated]: isIsAccountAuthenticated,
      [LocalStorageKey.UserEmail]: EMAIL,
      [LocalStorageKey.IpAddress]: IP_ADDRESS,
      [LocalStorageKey.AccountAdditionalNumber]: ADDITIONAL_ACCOUNT_NUMBER,
      [LocalStorageKey.AccountNumber]: ACCOUNT_NUMBER,
      [LocalStorageKey.IsLogin]: IsLogin
    }
  } = useLocalStorage();

  const {
    doEnableConfirmPurchaseButton,
    enableConfirmPurchaseButton,
    TicketNumberContactLessPayment: TICKET_ID
  } = useContactlessPaymentState();

  const [
    doRejectBuy,
    {
      isLoading: isLoadingByReject,
      data: rejectRawDataResponse,
      isError: rejectRequestHasError
    }
  ] = useContactlessPurchaseCancelRequest();

  const rejectPendientPurchaseTransaction = () => {
    doRejectBuy({
      channel: 'App',
      email: EMAIL,
      ip: IP_ADDRESS,
      idTicket: TICKET_ID ?? '',
      account: ACCOUNT_NUMBER,
      additional: ADDITIONAL_ACCOUNT_NUMBER
    });
    doEnableConfirmPurchaseButton(false);
    setPurchasePendingState(false);
  };

  const completePendientPurchaseTransaction = () => {
    setPurchasePendingState(false);
    navigation.navigate(ContactLessPaymentSteps.PurchaseConfirmation as never);
  };

  const depratiButtonOnPress = () => {
    isIsAccountAuthenticated && IsLogin
      ? navigation.navigate(ContactLessPaymentSteps.CredictDetail as never)
      : navigation.replace(NAV.DASHBOARD_NAVIGATION, {
          screen: NAV.DASHBOARD_CREDIT
        });
  };

  React.useEffect(() => {
    if (enableConfirmPurchaseButton) setPurchasePendingState(true);
  }, []);

  return (
    <View style={Styles.constainer}>
      <Text style={[FontStyles.Body_1, Styles.space]}>
        Escoge el método de pago que desees
      </Text>
      <PaymentButtonCard
        type={PaymentMethodType.DePratiCredit}
        onPress={depratiButtonOnPress}
      />
      <Popup
        icon="error"
        showCloseButton
        buttonType="full"
        visible={hasPurchasePending}
        titleStyle={Styles.poppup__title}
        iconColor={FontStyles.PrimaryColor.color}
        closeAction={rejectPendientPurchaseTransaction}
        buttonAction={completePendientPurchaseTransaction}
        title={
          'Tienes una transacción\npendiente por terminar.\n¿Deseas continuar?'
        }
      />
    </View>
  );
};
