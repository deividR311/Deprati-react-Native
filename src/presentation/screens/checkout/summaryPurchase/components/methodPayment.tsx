import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FontStyles } from '../../../../../application/common';
import { getUrlImageHybris } from '../../../../../application/utils/urls';
import { PaymentMethodModeType } from '../../../../../infrastucture/apis/checkout/payment-methods';
import { PaymentInfo } from '../../../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';
import { ButtonText } from '../../../../common-components/buttons/Button';
import ImageCard from '../../../../common-components/credito/ImageCard';
import { CheckoutSteps } from '../../../../navigation/checkout';
import { currencyFormatter } from '../../../../../application/utils/currency';
import credicardMask from '../../../../../application/utils/creditCardMask';
import TextRow from '../../../account/MyAddress/components/TextRow';

interface Props {
  paymentInfo: PaymentInfo;
}

export default function MethodPayment({ paymentInfo }: Props) {
  const navigation = useNavigation();
  const route = useRoute();
  const handleGoBack = () => {
    const stack = navigation.getState();
    const { index: current, routes } = stack;
    const indexChoose = routes?.findIndex(
      page => page.name === CheckoutSteps.ChoosePaymentMethod
    );
    if (indexChoose >= 0) {
      const backStep = current - indexChoose;
      navigation.pop(backStep);
    } else {
      navigation.replace(CheckoutSteps.ChoosePaymentMethod, {
        ...route.params
      });
    }
  };

  const dePratiCreditInfo = useMemo(() => {
    if (
      paymentInfo?.paymentMode === PaymentMethodModeType.DePratiCredit &&
      paymentInfo?.obfuscatedAccountNumber
    ) {
      const {
        obfuscatedAccountNumber,
        periodFirstMonth,
        periodSecondMonth,
        payFirstMonth,
        paySecondMonth,
        selectedDeferredData: { deferredDescription, feeValue, orderCode }
      } = paymentInfo;
      return (
        <View>
          <TextRow title="No:" text={obfuscatedAccountNumber} />
          <TextRow
            title={orderCode === '0' ? 'Pago corriente' : 'Diferido:'}
            text={orderCode === '0' ? '' : deferredDescription?.toLowerCase()}
          />
          {orderCode !== '0' && (
            <TextRow
              title={'Cuota estimada:'}
              text={currencyFormatter(feeValue ?? 0)}
            />
          )}
          <TextRow
            title={`Pago estimado ${periodFirstMonth}:`}
            text={currencyFormatter(payFirstMonth)}
          />
          <TextRow
            title={`Pago estimado ${periodSecondMonth}:`}
            text={currencyFormatter(paySecondMonth)}
          />
        </View>
      );
    }
    return null;
  }, [paymentInfo, paymentInfo?.paymentMode]);

  const dePratiGiftCardInfo = useMemo(() => {
    if (
      paymentInfo?.paymentMode === PaymentMethodModeType.DePratiGiftCard &&
      paymentInfo?.giftNumber
    ) {
      return (
        <TextRow title="No:" text={credicardMask(paymentInfo?.giftNumber, 2)} />
      );
    }
    return null;
  }, [paymentInfo, paymentInfo?.paymentMode]);

  const paymentezInfo = useMemo(() => {
    if (paymentInfo?.paymentMode === PaymentMethodModeType.Paymentez) {
      return (
        <Text style={styles.methodPayment_dePratiCredit_text}>
          {paymentInfo?.paymentModeDisplayLine2}
        </Text>
      );
    }
    return null;
  }, [paymentInfo, paymentInfo?.paymentMode]);

  return (
    <View style={styles.methodPayment}>
      <View style={styles.methodPayment_contet}>
        <Text style={styles.methodPayment_text}>
          {paymentInfo?.paymentModeDisplayLine1}
          {'\n'}
          {dePratiCreditInfo}
          {dePratiGiftCardInfo}
          {paymentezInfo}
        </Text>
        {paymentInfo?.paymentMode === PaymentMethodModeType.DePratiCredit && (
          <ImageCard style={styles.methodPayment_creditCard} />
        )}
        {paymentInfo?.paymentMode === PaymentMethodModeType.Paymentez && (
          <Image
            style={styles.methodPayment_creditCard}
            resizeMode="center"
            source={{
              uri: getUrlImageHybris(paymentInfo?.cardLogo?.url)
            }}
          />
        )}
      </View>

      <ButtonText
        onPress={() => handleGoBack()}
        styleText={styles.methodPayment_action}
        title="Editar mi método de pago"
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  methodPayment: {
    width: '100%'
  },
  methodPayment_contet: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  methodPayment_text: {
    ...FontStyles.Subtitle,
    textAlign: 'left',
    alignSelf: 'center'
  },
  methodPayment_dePratiCredit_text: {
    ...FontStyles.Subtitle,
    fontWeight: '300',
    textAlign: 'left',
    alignSelf: 'center',
    lineHeight: 20
  },
  methodPayment_creditCard: {
    width: 70,
    height: 42,
    marginTop: 0,
    marginRight: 16
  },
  methodPayment_action: {
    color: COLORS.BRAND,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingVertical: 0
  }
});
