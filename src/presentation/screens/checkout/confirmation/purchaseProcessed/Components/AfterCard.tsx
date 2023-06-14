import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { FontStyles } from '../../../../../../application/common';
import { ComponentProps, handleSourceHtml } from '../utils/utilsPurcharse';
import { TEXT_MAKEPAYMENT } from '../../../../../../infrastucture/apis/checkout/payments/cashPayment';
import { PaymentMethodModeType } from '../../../../../../infrastucture/apis/checkout/payment-methods';
import usePageContent from '../../../../../../infrastucture/apis/contentPage/contentPage.hook';
import { SkeletonListBanks } from './SkeletonCashDeposit';
import layout from '../../../../../../application/common/layout';
import RenderHTML from '../../../../../common-components/renderHtml/RenderHTML';

const TEXT_AFTER =
  'Banco Guayaquil, Banco Pichincha, Produbanco, Banco Bolivariano, Banco del Pacífico, Western Union, Pago Ágil, Servipagos o Promérica. ';

export function AfterCard({ typePurchase }: ComponentProps) {
  const {
    loading: loadingContent,
    error: errorContent,
    pageContent,
    getDataContent
  } = usePageContent();

  useEffect(() => {
    if (typePurchase === PaymentMethodModeType.CashDeposit) {
      getDataContent({
        pageType: 'ContentPage',
        pageLabelOrId: 'orderConfirmationBankPaymentPage'
      });
    }
  }, []);

  if (typePurchase === PaymentMethodModeType.CashDeposit) {
    const listBanks =
      pageContent?.components?.OrderConfirmationBankPaymentComponent;

    if (loadingContent) return <SkeletonListBanks />;
    return listBanks ? (
      <RenderHTML
        contentWidth={layout.window.width}
        text={handleSourceHtml(listBanks.orderConfirmationText)}
      />
    ) : (
      <Text style={[FontStyles.Body_1, FontStyles.Center, { lineHeight: 20 }]}>
        {`${TEXT_MAKEPAYMENT}${TEXT_AFTER}`}
      </Text>
    );
  }
  return null;
}
