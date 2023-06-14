import React, { useMemo } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { COLORS } from '../../../../application/common/colors';
import { FONTS_FAMILY, FontStyles } from '../../../../application/common/fonts';
import useOpenLinkInApp from '../../../../application/common/hooksCommons/useOpenLinkInApp';
import { NAV } from '../../../../application/common/namesNav';
import { DeliveryModeCodeMap } from '../../../../infrastucture/apis/customer-orders';
import Button from '../../../common-components/buttons/Button';
import { Box, SkeletonBox } from '../../../common-components/table';
import { OrderState, OrderStateType } from './components/order-state';
import { SkeletonContentLayout } from './components/skeleton';
import { Styles } from './order-detail.stylesheet';
import { OrderDetailsProps } from './order-details.interface';
import { useOrderDetails } from './useOrderDetails.hook';
import { PaymentMethodModeType } from '../../../../infrastucture/apis/checkout/payment-methods';
import { currencyFormatter } from '../../../../application/utils/currency';
import { capitalize } from '../../../../application/utils/string-formater';
import { credicardMask } from '../../../../application/utils/creditCardMask';
import { DeliveryModeCode } from '../../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';
import { fontWeightOS } from '../../../../application/utils';

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  route,
  navigation
}) => {
  const titleColor = FontStyles.PrimaryColor.color;

  const { orderDetails, isLoading } = useOrderDetails(
    route.params.orderId,
    route.params.userEmail
  );

  const openUrl = useOpenLinkInApp();

  const goToHome = () => {
    navigation.push(NAV.DASHBOARD_NAVIGATION as any);
  };

  React.useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: 'Datos pedido'
    });
  }, []);

  const paymentInfo = useMemo(() => {
    let valueStatus = orderDetails?.paymentInfo?.paymentModeDisplayLine1;
    if (
      orderDetails?.paymentInfo?.paymentMode === PaymentMethodModeType.Paymentez
    ) {
      const { paymentModeDisplayLine1, paymentModeDisplayLine2 } =
        orderDetails?.paymentInfo;
      valueStatus = `${paymentModeDisplayLine1} ${paymentModeDisplayLine2}`;
    }

    const res = [
      {
        title: 'Método de pago',
        value: valueStatus
      }
    ];
    if (
      orderDetails?.paymentInfo?.paymentMode ===
      PaymentMethodModeType.DePratiCredit
    ) {
      let infoDePratiCredit = [
        {
          title: 'Código de cliente',
          value: orderDetails?.paymentInfo?.obfuscatedAccountNumber
        }
      ];
      if (
        orderDetails?.paymentInfo?.selectedDeferredData?.deferredDescription !==
        'ROTATIVO'
      ) {
        infoDePratiCredit.push(
          ...[
            {
              title: 'Número cuotas',
              value:
                orderDetails?.paymentInfo?.selectedDeferredData
                  ?.deferredDescription
            },
            {
              title: 'Pago estimado',
              value: currencyFormatter(
                orderDetails?.paymentInfo?.selectedDeferredData?.feeValue
              )
            }
          ]
        );
      }
      res.push(...infoDePratiCredit);
    }
    if (
      orderDetails?.paymentInfo?.paymentMode === PaymentMethodModeType.Paymentez
    ) {
      res.push({
        title: 'Tarjeta',
        value: orderDetails?.paymentInfo?.cardNumber
      });
    }

    if (
      orderDetails?.paymentInfo?.paymentMode ===
      PaymentMethodModeType.DePratiGiftCard
    ) {
      res.push({
        title: 'Número',
        value: credicardMask(orderDetails?.paymentInfo?.giftNumber, 2)
      });
    }
    return res;
  }, [orderDetails?.paymentInfo]);

  const headerInfo = useMemo(() => {
    const idType = () => {
      const replaceText =
        orderDetails?.userIdType === 'CEDULA'
          ? 'Cédula'
          : orderDetails?.userIdType;
      return capitalize(replaceText ?? '');
    };

    let headerData = [
      {
        title: 'Nombres',
        value: orderDetails?.user.name,
        maxWithRowValue: '80%'
      },
      {
        title: `${idType()}`,
        value: orderDetails?.userDocId
      }
    ];
    if (orderDetails?.invoiceNumber) {
      headerData.push({
        title: 'Factura',
        value: orderDetails?.invoiceNumber
      });
    }
    if (orderDetails?.placedByName) {
      headerData.push({
        title: 'Agente de servicio',
        value: orderDetails?.placedByName
      });
    }

    return headerData;
  }, [
    orderDetails?.user,
    orderDetails?.userDocId,
    orderDetails?.invoiceNumber
  ]);

  const totalsInfo = useMemo(() => {
    let totalData = [
      {
        title: 'Venta 0%',
        value: orderDetails?.sellWithoutTaxes?.formattedValue,
        size: 'medium'
      },
      {
        title: 'Venta 12%',
        value: orderDetails?.sellWithTaxes?.formattedValue,
        size: 'medium'
      },
      {
        title: 'Costo de envío',
        value: orderDetails?.deliveryCost?.formattedValue ?? '$0,00',
        size: 'medium'
      },
      {
        title: 'Subtotal',
        value: orderDetails?.subTotal?.formattedValue,
        titleStyle: {
          fontWeight: fontWeightOS('bold'),
          fontFamily: FONTS_FAMILY['Roboto-Medium']
        },
        size: 'medium'
      },
      {
        title: 'IVA 12%',
        value: orderDetails?.totalTax?.formattedValue,
        size: 'medium'
      }
    ];
    if (
      orderDetails?.paymentInfo?.paymentMode ===
      PaymentMethodModeType.DePratiCredit
    ) {
      if (
        orderDetails?.paymentInfo?.selectedDeferredData?.deferredDescription !==
        'ROTATIVO'
      ) {
        totalData.push({
          title: 'Intereses',
          value: currencyFormatter(
            orderDetails?.paymentInfo?.selectedDeferredData?.interestValue
          ),
          size: 'medium'
        });
      }
    }
    totalData.push({
      title: 'Total',
      value: orderDetails?.totalPriceWithTax?.formattedValue,
      size: 'large',
      fontValueColor: COLORS.BRAND
    });
    return totalData;
  }, [orderDetails]);

  const pickupInfo = useMemo(() => {
    try {
      const pickupOrder = orderDetails?.pickupOrderGroups[0] ?? {};
      const { deliveryPointOfService } = pickupOrder;
      let pickupData = [
        {
          title: 'Retiro en tienda',
          value: deliveryPointOfService?.displayName
        }
      ];
      if (orderDetails?.pickupRetireName) {
        pickupData.push(
          ...[
            {
              title: 'Recibe',
              value: orderDetails?.pickupRetireName
            },
            {
              title: 'Cédula',
              value: orderDetails?.pickupRetireId
            }
          ]
        );
      }
      return pickupData ?? [];
    } catch (error) {}
    return [];
  }, [orderDetails?.pickupOrderGroups, orderDetails?.pickupRetireName]);

  const thirdpartyInfo = useMemo(() => {
    let thirdpartyData = [];
    try {
      if (orderDetails?.thirdAgencyData) {
        const { thirdAgencyData } = orderDetails;
        const pickupOrder = orderDetails?.pickupOrderGroups[0] ?? {};
        const { deliveryPointOfService } = pickupOrder ?? {};
        thirdpartyData = [
          {
            title: 'Agencia',
            value: thirdAgencyData?.agencyName
          },
          {
            title: 'Provincia',
            value: deliveryPointOfService?.address?.region?.name
          },
          {
            title: 'Ciudad',
            value: deliveryPointOfService?.address?.town
          },
          {
            title: 'Sucursal',
            value: deliveryPointOfService?.displayName
          },
          {
            title: 'Dirección',
            value: deliveryPointOfService?.address?.line1
          },
          {
            title: 'Persona que retira',
            value: thirdAgencyData?.retireName
          },
          {
            title: 'Cédula',
            value: thirdAgencyData?.retireId
          },
          {
            title: 'Teléfono',
            value: thirdAgencyData?.retirePhone
          }
        ];
      }
    } catch (error) {}
    return thirdpartyData;
  }, [orderDetails?.thirdAgencyData]);

  return (
    <View style={Styles.container}>
      <ScrollView style={Styles.scroll}>
        {/* HEADER */}
        <SkeletonContent
          isLoading={isLoading}
          animationDirection="diagonalDownRight"
          animationType="shiver"
          containerStyle={Styles.sketonContentLayout}
          layout={SkeletonContentLayout}>
          {orderDetails?.deliveryStatusDisplay && (
            <OrderState
              text={orderDetails?.deliveryStatusDisplay}
              status={orderDetails?.deliveryStatus as OrderStateType}
            />
          )}
          <Box
            title={`Orden #${route.params.orderId}`}
            titleStyle={{ color: titleColor }}
            boxStyle={{ backgroundColor: COLORS.WHITE }}
            rows={[]}
          />
          <Box
            boxStyle={{
              backgroundColor: COLORS.BRAND,
              fontColor: FontStyles.LightColor.color
            }}
            rows={headerInfo}
          />
        </SkeletonContent>

        {/* PURCHASE DETAILS */}
        <SkeletonBox isLoading={isLoading} />
        {!isLoading &&
          orderDetails?.entries.map((purchaseItem, index) => (
            <View key={'order-detail-' + index}>
              <Box
                title={index === 0 ? 'Detalle de la compra' : undefined}
                titleStyle={index === 0 ? { color: titleColor } : undefined}
                separator
                rows={[
                  {
                    title: purchaseItem.product?.ean,
                    value: purchaseItem.product.name,
                    semicolom: false
                  },
                  {
                    title: 'Precio Unitario',
                    value: `${purchaseItem.basePriceWithoutTaxes.formattedValue}`
                  },
                  {
                    title: '% IVA',
                    value: purchaseItem.product?.ivaCondition
                  },
                  {
                    title: 'Cantidad',
                    value: purchaseItem.quantity.toString()
                  },
                  {
                    title: 'Precio Unitario',
                    value: `${purchaseItem.basePriceWithoutTaxes.formattedValue}`
                  },
                  {
                    title: 'Subtotal',
                    value: `${purchaseItem.subtotal.formattedValue}`
                  },
                  {
                    title: 'Descuento',
                    value: purchaseItem?.totalDiscount?.formattedValue
                  },
                  {
                    title: 'Total sin IVA',
                    value: `${purchaseItem?.totalPriceWithoutTaxes?.formattedValue}`
                  }
                ]}
              />
            </View>
          ))}

        {/* PAYMENT METHODS */}
        <SkeletonBox isLoading={isLoading} rows={4} />
        {!isLoading && (
          <Box
            separator
            title={'Formas de pago'}
            titleStyle={{ color: titleColor }}
            rows={paymentInfo}
          />
        )}
        <SkeletonBox isLoading={isLoading} rows={6} />
        {/* DELIVERY ADDRESS */}
        {!['thirdParty', 'pickup'].includes(orderDetails?.deliveryMode?.code) &&
          !isLoading &&
          orderDetails?.deliveryAddress && (
            <Box
              separator
              title={'Dirección de envío'}
              titleStyle={{ color: titleColor }}
              rows={[
                {
                  title: 'Nombre dirección',
                  value: orderDetails?.deliveryAddress.firstName
                },
                {
                  title: 'Dirección',
                  value: `${orderDetails?.deliveryAddress.line1 ?? ''} ${
                    orderDetails?.deliveryAddress.line2 ?? ''
                  }`
                },
                {
                  title: 'Método de envío',
                  value:
                    DeliveryModeCodeMap[orderDetails?.deliveryMode?.code] ?? ''
                },
                {
                  title: 'Provincia',
                  value: orderDetails?.deliveryAddress?.region?.name
                },
                { title: 'Ciudad', value: orderDetails?.deliveryAddress?.town },
                {
                  title: 'Indicaciones',
                  value: orderDetails?.deliveryAddress.otherInfo
                }
              ]}
            />
          )}
        {/* DELIVERY PICKUP */}
        {orderDetails?.deliveryMode?.code === DeliveryModeCode.pickup &&
          !isLoading &&
          orderDetails?.pickupOrderGroups?.length > 0 && (
            <Box
              separator
              title={'Retiro en tienda'}
              titleStyle={{ color: titleColor }}
              rows={pickupInfo}
            />
          )}
        {/* DELIVERY THIRDPARTY */}
        {orderDetails?.deliveryMode?.code === DeliveryModeCode.thirdparty &&
          !isLoading &&
          orderDetails?.thirdAgencyData && (
            <Box
              separator
              title={'Retiro en agencias autorizadas'}
              titleStyle={{ color: titleColor }}
              rows={thirdpartyInfo}
            />
          )}
        {!isLoading && orderDetails?.consignments?.length ? (
          <>
            {/* ORDER TRACKING */}
            {orderDetails?.trackingInfo?.map(
              ({ urlTracking, entries: itemsTitle }) => (
                <Box
                  separator
                  rows={[
                    {
                      title: 'Tracking del pedido',
                      size: 'small',
                      maxWithRowTitle: 150,
                      titleStyle: {
                        fontFamily: FONTS_FAMILY['Roboto-Bold'],
                        fontWeight: fontWeightOS('bold')
                      },
                      fontColor: FontStyles.PrimaryColor.color,
                      semicolom: false,
                      valueComponent: (
                        <TouchableOpacity onPress={() => openUrl(urlTracking)}>
                          <Text style={[FontStyles.Link]}>Ver tracking</Text>
                        </TouchableOpacity>
                      )
                    },
                    ...itemsTitle.map(itemTitle => ({
                      title: itemTitle,
                      semicolom: false,
                      maxWithRowTitle: 420
                    }))
                  ]}
                />
              )
            )}
            {/* INVOICE */}
            {orderDetails?.deliveryInvoiceNumber && (
              <Box
                separator
                title={'Factura costo de envío'}
                titleStyle={{ color: titleColor }}
                rows={[
                  {
                    title: 'Factura',
                    value: orderDetails?.deliveryInvoiceNumber,
                    size: 'small',
                    fontValueColor: FontStyles.DarkColor.color
                  }
                ]}
              />
            )}
          </>
        ) : null}

        {/* CARD TOTAL VALUES */}
        <View style={[Styles.scroll__card]}>
          <SkeletonBox isLoading={isLoading} rows={6} />
          {!isLoading && <Box rows={totalsInfo} />}
        </View>

        {/* FOOTER */}
        <SkeletonContent
          isLoading={isLoading}
          animationDirection="diagonalDownRight"
          animationType="shiver"
          containerStyle={Styles.sketonContentLayout}
          layout={[
            { width: '60%', height: 30, alignSelf: 'center', marginBottom: 10 },
            { width: '100%', height: 100 },
            {
              width: '80%',
              height: 30,
              alignSelf: 'center',
              marginVertical: 10
            }
          ]}>
          <Text
            style={[
              FontStyles.H1_Headline,
              FontStyles.PrimaryColor,
              Styles.scroll__thanks
            ]}>
            ¡Gracias por tu compra!
          </Text>

          <View style={[Styles.scroll__message]}>
            <Text style={[FontStyles.Caption, FontStyles.Justify]}>
              Cualquier duda, comunícate con nosotros al (04)3731800 o
              (02)3950400. Para consultar o descargar facturas, ingresa al
              enlace{' '}
              <TouchableWithoutFeedback
                onPress={() => openUrl('https://facturacion.deprati.com.ec')}>
                <Text>https://facturacion.deprati.com.ec</Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>

          <Button
            linkName="SEGUIR COMPRANDO"
            backgroundColor={COLORS.BRAND}
            textColor={FontStyles.LightColor.color}
            containerStyle={Styles.scroll__button}
            onPress={goToHome}
          />
        </SkeletonContent>
      </ScrollView>
    </View>
  );
};
