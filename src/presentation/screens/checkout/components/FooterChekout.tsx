import React, { useEffect, useMemo } from 'react';
import { FooterCart } from '../../cart/Cart/Components/footerCart';
import { COLORS, FontStyles } from '../../../../application/common';
import Button from '../../../common-components/buttons/Button';
import { useAppSelector } from '../../../../application/state-manager';
import {
  ShoppingCartStateSelector,
  TotalPriceBeforeSelectDeliveryModeSelector
} from '../../../../application/state-manager/services/checkout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DeliveryNavigationRoute } from '../../../navigation/delivery';
import { CheckoutSteps } from '../../../navigation/checkout';

interface Props {
  linkName: string;
  disabled?: boolean;
  showActivityIndicator?: boolean;
  screenId?: string;
  onPress: () => void;
}

export default function FooterChekout(props: Props) {
  const {
    linkName,
    disabled,
    onPress,
    showActivityIndicator,
    screenId = ''
  } = props;
  const {
    totalPriceWithTax: { formattedValue: _totalOrder = '' } = {},
    totalUnitCount: totalUnit = 0
  } = useAppSelector(ShoppingCartStateSelector);

  const priceBeforeSelectDeliveryMode = useAppSelector(
    TotalPriceBeforeSelectDeliveryModeSelector
  );

  /** @summary IMPORTANT: THIS LINE KEEP THE PRICE BEFORE SET DELIVERY MODE IN ADRRESS-SELECT SCREEN */
  /** @summary IMPORTANT: YOU MUST NEED SEE THE DetailsButtons.tsx COMPONENT TOO */
  const totalOrder = useMemo(
    () =>
      screenId === CheckoutSteps.DELIVERY
        ? priceBeforeSelectDeliveryMode
        : _totalOrder,
    [_totalOrder, priceBeforeSelectDeliveryMode, screenId]
  );

  return (
    <FooterCart
      totalOrder={totalOrder}
      totalUnit={totalUnit}
      screenId={screenId}>
      <Button
        testID={'checkout_continue'}
        marginTop={12}
        linkName={linkName}
        disabled={disabled || showActivityIndicator}
        showActivityIndicator={showActivityIndicator}
        onPress={onPress}
        activityIndicator={{
          color: FontStyles.LightColor.color
        }}
        backgroundColor={
          disabled || showActivityIndicator ? COLORS.GRAYBRAND : COLORS.BRAND
        }
        textColor={FontStyles.LightColor.color}
      />
    </FooterCart>
  );
}
