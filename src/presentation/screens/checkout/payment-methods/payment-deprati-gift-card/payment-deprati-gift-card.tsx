import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { COLORS, FontStyles } from '../../../../../application/common';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { BillingAddressComponent } from '../../../../common-components/billingAddress';
import {
  IAddressPayment,
  IModal
} from '../../../../common-components/billingAddress/components';
import InputBase from '../../../../common-components/inputs/InputBase';
import PasswordInput from '../../../../common-components/inputs/PasswordInput';
import { Popup } from '../../../../common-components/poppup';
import {
  CheckoutNavigationParams,
  CheckoutSteps
} from '../../../../navigation/checkout';
import useKeyBoardListener from '../../hooks/useKeyBoardListener';
import usePaymentGifCard from './hooks/usePaymentGifCard';

export const PaymentDePratiGiftCard: React.FC<
  PaymentDePratiGiftCardProps
> = props => {
  const {
    navigation,
    route: {
      params: {
        dataCart,
        enableContinueButton,
        showActivityIndicatorContinueButton,
        showTotalsBand
      }
    }
  } = props;
  const {
    localStorageData: { [LocalStorageKey.MessagesApp]: MessagesApp }
  } = useLocalStorage();

  const [addressSelected, setAddressSelected] = useState<IAddressPayment>();
  const [modalError, setModalError] = useState<IModal>({
    show: false,
    message: '',
    buttonText: ''
  });
  const { padding } = useKeyBoardListener({
    showTotalsBand: showTotalsBand
  });

  const [values, setvalues] = useState({
    codeCard: '',
    passwordCard: ''
  });

  const { error, isSuccess } = usePaymentGifCard({
    cartId: dataCart.code,
    setLoading: loading => {
      showActivityIndicatorContinueButton(loading);
      enableContinueButton(!loading);
    },
    gifCardData: {
      giftCardForm: {
        giftCode: values.codeCard,
        giftPass: values.passwordCard
      },
      selectedPaymentGroup: 'giftCardPaymentGroup'
    }
  });

  useEffect(() => {
    const validEnabled =
      values.codeCard !== '' && values.passwordCard !== '' && addressSelected
        ? true
        : false;

    enableContinueButton(validEnabled);

    return () => enableContinueButton(false);
  }, [values, addressSelected]);

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      navigation.navigate(CheckoutSteps.PurchaseConfirmation, {
        ...props.route.params,
        giftCard: { ...values }
      });
      return;
    }

    if (error && !isSuccess) {
      // @ts-ignore
      const { data } = error;
      let message: string = data?.errors?.[0]?.message;
      let buttonText = 'VUELVE A INTENTARLO';
      if (['checkout.error.paymentethod.giftcard.timeout'].includes(message)) {
        message = MessagesApp?.Hybris_Giftcard_Timeout?.description;
        buttonText = 'ACEPTAR';
      }

      setModalError({
        show: true,
        message: message,
        buttonText: buttonText
      });
      return;
    }
  }, [error, isSuccess]);

  return (
    <View style={[styles.container, { marginBottom: padding }]}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Text style={[FontStyles.Body_1, styles.title]}>Tarjeta regalo</Text>
        <View style={styles.viewImage}>
          <Image
            style={styles.image}
            resizeMode="center"
            source={{
              uri: `https://imagesdevapp.deprati.com.ec/appstatics/Tarjeta_regalo_modoCompra.png`
            }}
          />
        </View>
        <InputBase
          value={values.codeCard}
          onChangeText={(text: string) =>
            setvalues({ ...values, codeCard: text })
          }
          keyboardType="number-pad"
          label="Código de Tarjeta"
          maxLength={10}
          style={styles.input}
        />
        <PasswordInput
          isVisible={false}
          testID="password"
          style={{
            marginTop: 20
          }}
          value={values.passwordCard}
          onChangeText={(text: string) =>
            setvalues({ ...values, passwordCard: text })
          }
          maxLength={6}
          keyboardType="number-pad"
          label="Clave Transaccional"
          secureTextEntry={true}
        />

        <Divider style={styles.divider} />
        <BillingAddressComponent
          enableHandleEnableButton={false}
          style={styles.billingAddress}
          emptyStyle={styles.billingAddressEmpty}
          onSelected={(_, address) => setAddressSelected(address)}
        />
      </ScrollView>
      <Popup
        visible={modalError.show}
        icon={'error'}
        iconColor={COLORS.BRAND}
        title={modalError.message}
        buttonText={modalError.buttonText}
        showCloseButton={true}
        buttonType={'full'}
        buttonAction={() => setModalError({ ...modalError, show: false })}
        closeAction={() => setModalError({ ...modalError, show: false })}
        contentStyle={styles.contentPopup}
      />
    </View>
  );
};

export interface PaymentDePratiGiftCardProps
  extends NativeStackScreenProps<
    CheckoutNavigationParams,
    CheckoutSteps.PaymentDePratiGiftCard
  > {}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, flex: 1, backgroundColor: COLORS.WHITE },
  title: { textAlign: 'center', marginTop: 10 },
  viewImage: { width: '100%', alignSelf: 'center', height: 123, marginTop: 22 },
  image: { width: '100%', height: '100%' },
  input: { marginTop: 16 },
  btnText: { marginTop: 20, color: COLORS.BRAND },
  billingAddress: { marginLeft: 16 },
  billingAddressEmpty: { marginTop: 16 },
  divider: { width: '86%', height: 1, marginTop: 28, alignSelf: 'center' },
  contentPopup: { width: '80%' }
});
