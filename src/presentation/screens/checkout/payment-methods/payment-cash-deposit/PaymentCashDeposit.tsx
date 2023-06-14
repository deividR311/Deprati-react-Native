//Libs
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import usePaymentCashDeposit from './hook/usePaymentCashDeposit.hook';
import RenderHTML from '../../../../common-components/renderHtml/RenderHTML';
import { PaymentCashSkeleton } from './components/skeleton/PaymentCashSkeleton';
import TemplatePage from '../../../../common-components/template-page';
import { BillingAddressComponent } from '../../../../common-components/billingAddress';
import {
  COLORS,
  FONTS_FAMILY,
  htmlStyles
} from '../../../../../application/common';
import layout from '../../../../../application/common/layout';
import { CheckoutSteps } from '../../../../navigation/checkout';
import { useAppSelector } from '../../../../../application/state-manager';
import { isGiftCardCartShoppingCart } from '../../../../../application/state-manager/services/checkout';

const width = layout.window.width;
export default function PaymentCashDeposit() {
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const isGiftCardCart = useAppSelector(isGiftCardCartShoppingCart);
  const {
    getCashPayment,
    dataCashPayment,
    isLoading,
    dataCart,
    setCurrentStep,
    enableContinueButton,
    isLoadingPayment
  } = usePaymentCashDeposit();

  const focused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      setCurrentStep({
        index: 1,
        screenId: CheckoutSteps.PaymentCashDeposit
      });

      if (isGiftCardCart) enableContinueButton(isGiftCardCart);
    }, [isGiftCardCart])
  );

  useLayoutEffect(() => {
    if (!focused) return;
    getCashPayment();
  }, [focused]);

  useEffect(() => {
    if (!focused && !isEnable) return;
    enableContinueButton(focused && isEnable);
  }, [focused, isEnable]);

  return (
    <TemplatePage
      loading={isLoading}
      disableSkeleton
      loadingWithModal={isLoadingPayment}
      skeleton={<PaymentCashSkeleton />}
      error={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentTitle}>
            <Text style={styles.contentTitle_text}>Depósito en efectivo</Text>
          </View>
          <RenderHTML
            tagsStyles={htmlStyles}
            contentWidth={width}
            text={dataCashPayment.html}
          />
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: COLORS.GRAYBRAND,
              marginBottom: 16,
              alignSelf: 'center'
            }}
          />
          {!isGiftCardCart && (
            <BillingAddressComponent
              enableHandleEnableButton={true}
              onIsEnable={x => {
                setIsEnable(x);
              }}
              onSelected={(x, address) => {
                //enableContinueButton(x)
              }}
            />
          )}
        </View>
      </ScrollView>
    </TemplatePage>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    paddingBottom: 200
  },
  content: { paddingHorizontal: 15 },
  contentTitle: { alignSelf: 'center', paddingVertical: 8 },
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
  },
  loading_cart: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.BACKDROP,
    alignItems: 'center',
    justifyContent: 'center'
    //opacity: 1,
  }
});
