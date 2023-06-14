import React from 'react';
import { ContentAgainstDelivery, ContentCashDeposit, ContentDefault } from '.';
import { PaymentMethodModeType } from '../../../../../../infrastucture/apis/checkout/payment-methods';
import { ContentPurchaseProps } from '../utils/utilsPurcharse';

export function ContentPurchase({
  typePurchase,
  orderNumber,
  orderConfirmation,
  isGiftCardCart
}: ContentPurchaseProps) {
  let component = null;
  switch (typePurchase) {
    case PaymentMethodModeType.AgaintsDelivery:
      component = <ContentAgainstDelivery />;
      break;
    case PaymentMethodModeType.CashDeposit:
      component = <ContentCashDeposit orderNumber={orderNumber} />;
      break;
    case PaymentMethodModeType.DePratiCredit:
    case PaymentMethodModeType.DePratiGiftCard:
    case PaymentMethodModeType.Paymentez:
      component = (
        <ContentDefault
          orderConfirmation={orderConfirmation}
          typePurchase={typePurchase}
          isGiftCardCart={isGiftCardCart}
        />
      );
      break;
  }
  return component;
}
