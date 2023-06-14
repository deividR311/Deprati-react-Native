import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { PaymentMethodModeType } from '../../../../infrastucture/apis/checkout/payment-methods';
import { PaymentInfo } from '../../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';
import {
  CheckoutNavigationParams,
  CheckoutSteps
} from '../../../navigation/checkout';
import BottomSheetCreditFinish from './dePratiCreditFinish/BottomSheetCreditFinish';
import SummaryPurchase from '../summaryPurchase/summaryPurchase';
import { useSummaryPurchase } from '../summaryPurchase/useSummaryPurchase.hook';
import { ConfirmationOrderByPaymentez } from './components/paymentez-confirmation';
import { useConfirmation } from './confirmation.hook';
import { PurchaseProcessed } from './purchaseProcessed/PurchaseProcessed';
import { NAV } from '../../../../application/common';

export const Confirmation: React.FC<ConfirmationProps> = props => {
  const hookSummaryPurchase = useSummaryPurchase();
  const { paymentInfo } = hookSummaryPurchase;
  const hook = useConfirmation(paymentInfo);

  const {
    route: {
      params: { dataCart }
    }
  } = props;

  return (
    <SummaryPurchase
      hookSummaryPurchase={hookSummaryPurchase}
      hookConfirmation={hook}>
      <ConfirmationOrderByPaymentez
        showOTPDialogVerifier={hook.isVisibleOTPConfirmation}
        otpConfirmationData={hook.otpConfirmationData}
        onVerifyOTPCode={hook.successOTPConfirmation}
        onCloseRequest={() => {
          hook.closeOTPConfirmation();
          setTimeout(() => {
            props.navigation.navigate(NAV.HOME as never);
          }, 500);
        }}
        orderNumber={hook?.order?.code}
      />
      <BottomSheetCreditFinish
        onCloseRequest={() => hook.setShowBottomSheetDePratiCredit(false)}
        show={hook.showBottomSheetDePratiCredit}
        hook={hook}
      />
      <PurchaseProcessed
        typePurchase={hook.typePaymentMethod}
        orderNumber={hook?.order?.code}
        show={hook.showPurchaseSuccess}
        onCloseRequest={() => hook.setShowPurchaseSuccess(false)}
      />
    </SummaryPurchase>
  );
};

export interface ConfirmationProps
  extends NativeStackScreenProps<
    CheckoutNavigationParams,
    CheckoutSteps.PurchaseConfirmation
  > {}
