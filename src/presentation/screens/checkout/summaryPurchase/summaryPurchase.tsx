import React, { useEffect } from 'react';
import TemplatePage from '../../../common-components/template-page';
import { View, Text, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { styles } from './summaryPurchase.style';
import { RightIconAccordion } from '../../../common-components/RightIconAccordion/RightIconAccordion';
import CheckboxComp from '../../../common-components/checkboxs';
import { COLORS } from '../../../../application/common';
import DeliveryAddress from './components/deliveryAddress';
import { BillingAddressComponent } from '../../../common-components/billingAddress';
import MethodPayment from './components/methodPayment';
import ListItemsCarts from './components/listItemsCarts';
import useOpenLinkInApp from '../../../../application/common/hooksCommons/useOpenLinkInApp';
import { getUrlTerms } from '../../../../application/utils/urls';
import { useAccordion } from './useAccordion.hook';
import { useTranslation } from 'react-i18next';

interface ISummaryPurchase {
  hookSummaryPurchase?: any;
  hookConfirmation?: any;
  children?: Array<JSX.Element> | JSX.Element | null | undefined;
}

export default function SummaryPurchase(props: ISummaryPurchase) {
  const {
    checkSummary,
    setCheckSummary,
    deliveryAddressSelect,
    goBackDeveliveryAddress,
    deliveryMode,
    pickupAddress,
    addressCart,
    paymentInfo,
    paymentAddress,
    itemsCart,
    totalWeight,
    appliedProductPromotions,
    isGiftCardCart,
    hasAddressBilling,
    addressBilling
  } = props?.hookSummaryPurchase;
  const { loadingPetition, firstTimeSummary, changefirstTimeSummary } =
    props?.hookConfirmation;
  const openUrl = useOpenLinkInApp();
  const accordion = useAccordion(firstTimeSummary);
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      changefirstTimeSummary(false);
    };
  }, []);

  return (
    <TemplatePage
      loading={false}
      skeleton={null}
      disableSkeleton={true}
      error={false}
      loadingWithModal={loadingPetition}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={styles.summaryPurchase_description}>
          <Text style={styles.summaryPurchase_title}>
            {t('titleConfirmation')}
          </Text>
          <Text style={styles.summaryPurchase_subtitle}>
            {t('subTitleConfirmation')}
          </Text>
        </View>
        <List.Accordion
          title="Artículos de tu pedido"
          id="1"
          expanded={accordion.productDetail}
          onPress={() => accordion.setProductDetail(!accordion.productDetail)}
          style={[styles.summaryPurchase_delivery_accordion]}
          titleStyle={styles.summaryPurchase_delivery_accordion_text}
          right={RightIconAccordion}>
          <View
            testID="accordion-expanded"
            style={[styles.summaryPurchase_delivery_accordion_content]}>
            <ListItemsCarts
              itemsCart={itemsCart}
              appliedProductPromotions={appliedProductPromotions}
            />
          </View>
        </List.Accordion>
        <List.Accordion
          title="Método de pago"
          id="2"
          expanded={accordion.methodPayment}
          onPress={() => accordion.setMethodPayment(!accordion.methodPayment)}
          style={[styles.summaryPurchase_delivery_accordion]}
          titleStyle={styles.summaryPurchase_delivery_accordion_text}
          right={RightIconAccordion}>
          <View
            testID="accordion-expanded"
            style={[styles.summaryPurchase_delivery_accordion_content]}>
            <MethodPayment paymentInfo={paymentInfo} />
          </View>
        </List.Accordion>
        {!isGiftCardCart && (
          <>
            <List.Accordion
              title="Dirección de envío"
              id="3"
              style={[styles.summaryPurchase_delivery_accordion]}
              titleStyle={styles.summaryPurchase_delivery_accordion_text}
              right={RightIconAccordion}>
              <View testID="accordion-expanded">
                <DeliveryAddress
                  onAction={goBackDeveliveryAddress}
                  address={deliveryAddressSelect}
                  deliveryMode={deliveryMode}
                  pickupAddress={pickupAddress}
                  textEditAction={'Editar mi dirección'}
                />
              </View>
            </List.Accordion>
            <List.Accordion
              title="Dirección de facturación"
              id="4"
              style={[styles.summaryPurchase_delivery_accordion]}
              titleStyle={styles.summaryPurchase_delivery_accordion_text}
              right={RightIconAccordion}>
              <View
                testID="accordion-expanded"
                style={[styles.summaryPurchase_delivery_accordion_content]}>
                <BillingAddressComponent
                  styleSecundaryButton={false}
                  key={'billingAddress_summary'}
                  onIsEnable={x => hasAddressBilling(x)}
                  enableHandleEnableButton={false}
                  onSelected={() => {}}
                  showTitle={false}
                  paymentInfo={paymentInfo}
                  paymentAddress={paymentAddress}
                  textEditAction={'Editar mis datos'}
                />
              </View>
            </List.Accordion>
          </>
        )}
        <View style={styles.summaryPurchase_check}>
          <CheckboxComp
            testId="accept_term_checkout"
            styleContainer={{ alignItems: 'center' }}
            status={checkSummary ? 'checked' : 'unchecked'}
            onPress={() => setCheckSummary((prev: boolean) => !prev)}
            color={COLORS.BRAND}
            uncheckedColor={COLORS.GRAYDARK60}
            label={
              <Text style={styles.summaryPurchase_check_text}>
                Declaro que he leído y acepto las políticas de garantía de la
                compañía Almacenes De Prati S.A.
                <Text
                  style={[
                    styles.summaryPurchase_check_text,
                    styles.summaryPurchase_check_show
                  ]}
                  onPress={() => {
                    openUrl(getUrlTerms());
                  }}>
                  &nbsp;Ver aquí
                </Text>
              </Text>
            }
          />
        </View>
        <View style={styles.summaryPurchase_line} />
        <Text style={styles.summaryPurchase_weight}>
          Peso aproximado del envío: {totalWeight} kg
        </Text>
      </ScrollView>
      {props?.children}
    </TemplatePage>
  );
}
