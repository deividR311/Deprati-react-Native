import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Divider } from 'react-native-paper';
import {
  COLORS,
  FontStyles,
  FONTS_SIZES
} from '../../../../../application/common';
import layout from '../../../../../application/common/layout';
import { useAppSelector } from '../../../../../application/state-manager';
import { isGiftCardCartShoppingCart } from '../../../../../application/state-manager/services/checkout';
import { BillingAddressComponent } from '../../../../common-components/billingAddress';
import Button, {
  ButtonText
} from '../../../../common-components/buttons/Button';
import { FullLoadingComponent } from '../../../../common-components/fullLoadingComponent/FullLoadingComponent';
import InputBase from '../../../../common-components/inputs/InputBase';
import { ModalsType } from '../../../../common-components/modal/modal.interfaces';
import { useGenericModal } from '../../../../common-components/modal/ModalProvider';
import { Popup } from '../../../../common-components/poppup';
import TemplatePage from '../../../../common-components/template-page';
import ErrorText from '../../../../common-components/texts/ErrorText';
import {
  CheckoutNavigationParams,
  CheckoutSteps
} from '../../../../navigation/checkout';
import { useDataCart } from '../../hooks/useDataCart';
import { PaymentCashSkeleton } from '../payment-cash-deposit/components/skeleton/PaymentCashSkeleton';
import BottomSheetCredit from './components/BottomSheetCredit';
import { usePaymentDepratiCredit } from './usePaymentDepratiCredit.hook';

export const PaymentDePratiCredit: React.FC<
  PaymentDePratiCreditProps
> = props => {
  const {
    route: {
      params: { dataCart }
    }
  } = props;
  const image = require('../../../../../../assets/images/creditMethod/Tarjeta_NumerosTarjeta.png');
  const dataCartPayment = useDataCart(dataCart.code);
  const { showModal } = useGenericModal();
  const {
    isAccountAuthenticated,
    values,
    setFieldValue,
    maskedAccountNumber,
    setIsEnable,
    stateShowSheet,
    stateShowError,
    StateErrorMessage,
    showAlerAddressPayment,
    setShowAlerAddressPayment,
    onBuy,
    formikCredit
  } = usePaymentDepratiCredit();
  const [showSheet, setshowSheet] = stateShowSheet;
  const [showError, setShowError] = stateShowError;
  const [errorMessage, setErrorMessage] = StateErrorMessage;
  const [showAlerOtherCredit, setShowAlerOtherCredit] = useState(false);
  const [hasEdit, setHasEdit] = useState(!isAccountAuthenticated);
  const isGiftCardCart = useAppSelector(isGiftCardCartShoppingCart);

  return (
    <TemplatePage
      loading={false}
      skeleton={<PaymentCashSkeleton />}
      error={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll]}>
        <View style={[styles.container, { marginBottom: 60 }]}>
          <Text style={styles.title}>Crédito De Prati</Text>
          <Image source={image} style={styles.image} />
          <View style={styles.view_contentForm}>
            <View style={styles.view_contentForm__row}>
              <InputBase
                testID="payment_number_credit"
                value={
                  !hasEdit
                    ? maskedAccountNumber?.split(' ')[0] ?? ''
                    : values.numberAccount
                }
                keyboardType="number-pad"
                label="Código del cliente"
                maxLength={hasEdit ? 14 : undefined}
                style={{ width: '55%' }}
                disabled={isAccountAuthenticated && !hasEdit}
                onChangeText={text => setFieldValue('numberAccount', text)}
              />
              <InputBase
                testID="payment_additional_credit"
                value={values.aditional}
                error={!!formikCredit?.errors?.aditional}
                keyboardType="number-pad"
                label="Código adicional"
                maxLength={2}
                style={{ width: '45%', marginLeft: 16 }}
                disabled={isAccountAuthenticated && !hasEdit}
                onChangeText={text => {
                  setFieldValue('aditional', text);
                  text &&
                    setTimeout(() => {
                      formikCredit.validateField('aditional');
                    }, 200);
                }}
                onBlur={e => {
                  formikCredit.validateField('aditional');
                }}
              />
            </View>
            {showError && (
              <ErrorText
                textStyle={{ marginLeft: 0 }}
                text={
                  'Tu número de Crédito Directo no existe. Ingresa nuevamente.'
                }
              />
            )}
            {/* <Button
              testID="payment_button_get"
              linkName="INGRESAR"
              onPress={() => {
                if (values?.numberAccount && values?.aditional && isEnable) {
                  setShowError(false)
                  setshowSheet(true)
                  setErrorMessage('')
                }
              }}
              containerStyle={{ width: '100%' }}
              showActivityIndicator={false}
              disabled={
                !values?.numberAccount ||
                (values?.aditional?.length || 0) < 2 ||
                !isEnable
              }
              backgroundColor={COLORS.BRAND}
              textColor={FontStyles.LightColor.color}
            /> */}
            {isAccountAuthenticated && (
              <ButtonText
                styleText={styles.other_credit}
                title="Ingresar otro crédito De Prati"
                onPress={() => {
                  setShowAlerOtherCredit(true);
                }}
              />
            )}
            <Divider style={styles.divider} />
            {!isGiftCardCart && (
              <BillingAddressComponent
                onIsEnable={x => setIsEnable(x)}
                enableHandleEnableButton={false}
                emptyStyle={styles.billingAddressEmpty}
                style={styles.billingAddress}
                onSelected={(_, address) => {}}
                paymentCredit={{
                  showAlerAddressPayment,
                  setShowAlerAddressPayment
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <BottomSheetCredit
        onCloseRequestBottomSheet={() => {
          if (errorMessage && !showSheet) {
            showModal(ModalsType.ErrorService, {
              title: errorMessage
            });
          }
        }}
        onCloseRequest={() => {
          setshowSheet(false);
        }}
        onCloseRequestError={error => {
          if (error) setErrorMessage(error);
          else setShowError(true);
          if (Platform.OS === 'android') {
            if (error) {
              showModal(ModalsType.ErrorService, {
                title: error
              });
            }
          }
        }}
        showCheckbox={!isAccountAuthenticated}
        infoUserCredit={values}
        show={showSheet}
        dataCart={dataCartPayment}
        onIsBuying={x => onBuy.setIsBuying(x)}
        onLoadingBuy={x => onBuy.setLoadingBuy(x)}
      />
      <Popup
        visible={showAlerOtherCredit}
        title="¿Estás seguro que deseas cambiar de crédito?"
        showCloseButton={true}
        closeAction={() => {
          setShowAlerOtherCredit(false);
        }}
        buttonAction={() => {
          setShowAlerOtherCredit(false);
          setHasEdit(true);
          setFieldValue('numberAccount', '');
          setFieldValue('aditional', '');
        }}
        buttonText={'ACEPTAR'}
        buttonType={'full'}
        titleStyle={FontStyles.Justify}
      />
      {!showSheet && <FullLoadingComponent visible={onBuy.loadingBuy} />}
    </TemplatePage>
  );
};

export interface PaymentDePratiCreditProps
  extends NativeStackScreenProps<
    CheckoutNavigationParams,
    CheckoutSteps.PaymentDePratiCredit
  > {}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: COLORS.WHITE,
    paddingBottom: layout.window.height * 0.23
  },
  container: { flex: 1, backgroundColor: COLORS.WHITE, flexGrow: 1 },
  title: {
    ...FontStyles.Body_1,
    textAlign: 'center',
    marginVertical: 12
  },
  view_contentForm: { marginHorizontal: 16, marginTop: 16 },
  view_contentForm__row: { flexDirection: 'row', paddingRight: 16 },
  image: { width: '100%', resizeMode: 'contain' },
  billingAddress: { marginTop: 20, marginBottom: 20 },
  billingAddressEmpty: { marginTop: 16 },
  other_credit: { color: COLORS.BRAND, marginTop: 16 },
  divider: { width: '86%', height: 1, marginTop: 16, alignSelf: 'center' }
});
