import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS_FAMILY } from '../../../../../application/common';
import layout from '../../../../../application/common/layout';
import { BillingAddressComponent } from '../../../../common-components/billingAddress';
import TemplatePage from '../../../../common-components/template-page';
import { PaymentImagesComponent } from './components/PaymentImagesComponent';
import { AgainstDeliverySkeleton } from './components/skeleton/Payment-against-deliverySkeleton';
import usePaymentAgainstDelivery from './hook/usePaymentAgainstDelivery.hook';
import { CheckoutSteps } from '../../../../navigation/checkout';
import { useAppSelector } from '../../../../../application/state-manager';
import { isGiftCardCartShoppingCart } from '../../../../../application/state-manager/services/checkout';

export const PaymentAgainstDelivery: React.FC<PaymentAgainstDeliveryProps> = (
  props = {}
) => {
  const { enableContinueButton, dataCart, setCurrentStep } =
    usePaymentAgainstDelivery();
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const isGiftCardCart = useAppSelector(isGiftCardCartShoppingCart);

  useFocusEffect(
    useCallback(() => {
      enableContinueButton(isEnable);
      setCurrentStep({
        index: 1,
        screenId: CheckoutSteps.PaymentAgaintsDelivery
      });
    }, [isEnable])
  );

  return (
    <TemplatePage
      loading={false}
      skeleton={<AgainstDeliverySkeleton />}
      error={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentTitle}>
            <Text style={styles.contentTitle_text}>Pago contra entrega</Text>
          </View>
          <PaymentImagesComponent />
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: COLORS.GRAYBRAND,
              alignSelf: 'center',
              marginVertical: 16
            }}
          />
          {!isGiftCardCart && (
            <BillingAddressComponent
              enableHandleEnableButton={true}
              onIsEnable={x => setIsEnable(x)}
              //onSelected={enableContinueButton}
            />
          )}
        </View>
      </ScrollView>
    </TemplatePage>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    paddingBottom: layout.window.height * 0.235
  },
  content: { paddingHorizontal: 15 },
  contentTitle: { alignSelf: 'center', paddingVertical: 12 },
  contentTitle_text: {
    fontFamily: FONTS_FAMILY.Roboto,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.44,
    color: COLORS.DARK
  },
  containerBtnContinue: {
    borderColor: `${COLORS.GRAYDARK60}90`,
    borderWidth: 1
  }
});

export interface PaymentAgainstDeliveryProps {}
