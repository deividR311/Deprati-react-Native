import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../../../../application/common';
import { ShoppingCartStateSelector } from '../../../../../../application/state-manager/services/checkout';
import { BottomSheet } from '../../../../../common-components/bottomSheet';
import { Box } from '../../../../../common-components/table';
import { currencyFormatter } from '../../../../../../application/utils/currency';

interface Props {
  showBottomSheet: boolean;
  onCloseRequest: () => void;
  screenId?: string;
}

export default function BottomSheetCart({
  showBottomSheet,
  onCloseRequest,
  screenId = ''
}: Props) {
  const cart = useSelector(ShoppingCartStateSelector);
  const {
    totalPrice: { formattedValue: productsTotalValue = '' } = {},
    subTotal: { formattedValue: subTotal = '' } = {},
    totalTax: { formattedValue: iva12 = '' } = {},
    totalDiscounts: { formattedValue: discount = '' } = {},
    totalPriceWithTax: { formattedValue: totalOrder = '' } = {},
    totalUnitCount = 0,
    entries = [],
    sellWithTaxes: { formattedValue: sellWithTaxes = '' } = {},
    sellWithoutTaxes: { formattedValue: sellWithoutTaxes = '' } = {},
    deliveryCost: { formattedValue: deliveryCost = '' } = {}
  } = cart;

  const totalUnit = totalUnitCount ?? entries?.length;

  const rowData = useMemo(() => {
    let rowsInit = [
      {
        title: `Artículos`,
        value: `${totalUnit}`
      },
      {
        title: 'Descuento',
        value: `-${discount}`
      },
      // add deliveryCost si existe
      {
        title: 'Venta 0%',
        value: `${sellWithoutTaxes}`
      },
      {
        title: 'Venta 12%',
        value: `${sellWithTaxes}`
      },
      {
        title: 'Subtotal',
        value: subTotal
      },
      { title: 'IVA 12%', value: iva12 },
      {
        title: 'Total',
        value: totalOrder,
        size: 'large',
        fontValueColor: COLORS.BRAND
      }
    ];
    if (deliveryCost && screenId !== 'Delivery') {
      rowsInit.splice(4, 0, {
        title: 'Costo de envío',
        value: `${deliveryCost}`
      });
    }
    if (cart?.paymentInfo?.selectedDeferredData?.interestValue > 0) {
      rowsInit.splice(7, 0, {
        title: 'Intereses',
        value: `${currencyFormatter(
          cart?.paymentInfo?.selectedDeferredData?.interestValue
        )}`
      });
    }

    return rowsInit;
  }, [cart, screenId, deliveryCost]);

  return (
    <BottomSheet
      percentage={35}
      show={showBottomSheet}
      paddingHorizontal={16}
      isCancelable
      onCloseRequest={onCloseRequest}>
      <Box
        title={'Datos del pedido'}
        titleStyle={{
          textAlign: 'center'
        }}
        rows={rowData}
      />
    </BottomSheet>
  );
}
