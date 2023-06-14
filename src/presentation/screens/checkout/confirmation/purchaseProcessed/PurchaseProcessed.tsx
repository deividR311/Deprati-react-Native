import React, { FC, useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  COLORS,
  FontStyles,
  FONTS_SIZES
} from '../../../../../application/common';
import {
  BottomSheet,
  IconButton
} from '../../../../common-components/bottomSheet';
import Button, {
  ButtonOutlined
} from '../../../../common-components/buttons/Button';
import {
  CheckoutNavigationParams,
  CheckoutSteps
} from '../../../../navigation/checkout';
import { AfterCard, BeforeCard, ContentPurchase } from './Components';
import { usePurchaseProcessed } from './hook/usePurchaseProcessed.hook';
import { styles } from './purchaseProcessedbottomsheet.stylesheet';
import { PurchaseProcessedProps } from './utils/utilsPurcharse';
import usePageContent from '../../../../../infrastucture/apis/contentPage/contentPage.hook';
import { PaymentMethodModeType } from '../../../../../infrastucture/apis/checkout/payment-methods';
import { trackEventView } from '../../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEventsViewModal } from '../../../../../infrastucture/native-modules/emma';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../application/state-manager';
import {
  CreditInfoSelector,
  isGiftCardCartShoppingCart
} from '../../../../../application/state-manager/services/checkout';
import CheckboxComp from '../../../../common-components/checkboxs';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import {
  useCreditAccountBondingUnlinkAccountRequest,
  useSummaryCreditAccountRequest
} from '../../../../../infrastucture/apis/creditAccountBonding';
import { useUserSave } from '../../../../../infrastucture/apis/user/user.hook';
import sleep from '../../../../../application/utils/sleep';
import { ResponseBase } from '../../../../../infrastucture/apis/common/request-response.type';
import { FullLoadingComponent } from '../../../../common-components/fullLoadingComponent/FullLoadingComponent';
import { Popup } from '../../../../common-components/poppup';
import { loadIndicationsKeys } from '../../../../../application/state-manager/services/indications/indications.slice';
import ErrorText from '../../../../common-components/texts/ErrorText';
import { useTranslation } from 'react-i18next';

export const PurchaseProcessed: FC<PurchaseProcessedProps> = props => {
  const { show, children, orderNumber, typePurchase, percentage = 100 } = props;
  const { t } = useTranslation();
  const [saveForFuturePayState, setsaveForFuturePay] = useState(false);
  const dispatch = useAppDispatch();
  const {
    onBuyingContinue,
    onSeeOrderDetails,
    handleModifyTitle,
    handleClose
  } = usePurchaseProcessed(props);
  const loadUser = useUserSave();
  const [putSummaryCredit, statusSummaryCredit] =
    useSummaryCreditAccountRequest();

  const [
    doUnlinkAccount,
    { isLoading: isLoadingByUnlinkAccount, data: dataByUnlinkAccount }
  ] = useCreditAccountBondingUnlinkAccountRequest();

  const [savingCarActionMessage, setSavingCarMessage] = useState<string>();
  const [popupTextError, setPopupTextError] = useState<string>();
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false);
  const [errorSave, setErrorSave] = useState({
    show: false,
    text: ''
  });

  const {
    loading: loadingContent,
    error: errorContent,
    pageContent,
    getDataContent
  } = usePageContent();
  const {
    localStorageData: {
      [LocalStorageKey.IsAccountAuthenticated]: IsAccountAuthenticated,
      [LocalStorageKey.User]: LocalUserData,
      [LocalStorageKey.UID]: DeviceId,
      [LocalStorageKey.MessagesApp]: {
        CHECKED_SAVE_CART_TO_FUTURE_PAYMENTS: {
          description: CHECKED_SAVE_CART_TO_FUTURE_PAYMENTS = `${t(
            'success.yourCreditDataSuccessfullySaved'
          )}`
        },
        UNCHECKED_SAVE_CART_TO_FUTURE_PAYMENTS: {
          description: UNCHECKED_SAVE_CART_TO_FUTURE_PAYMENTS = `${t(
            'success.yourCreditDataSuccessfullyDeleted'
          )}`
        }
      }
    }
  } = useLocalStorage();

  useEffect(() => {
    getDataContent({
      pageType: 'ContentPage',
      pageLabelOrId: 'orderConfirmationPage'
    });
    return () => {
      dispatch(
        loadIndicationsKeys({
          cart: 0
        })
      );
    };
  }, []);

  useEffect(() => {
    if (show) {
      trackEventView(keyEventsViewModal.ecommerce_checkout_ok, {
        Metodo_envio: typePurchase,
        Metodo_pago: '',
        Importe: ''
      });
    }
  }, [show]);

  const isGiftCardCart = useAppSelector(isGiftCardCartShoppingCart);
  const creditInfo = useAppSelector(CreditInfoSelector);
  const [isGiftCardCartMemo, hasIsGiftCard] = useState(false);
  useEffect(() => {
    if (!isGiftCardCartMemo) hasIsGiftCard(isGiftCardCart);
  }, [isGiftCardCart, isGiftCardCartMemo]);

  const onSaveCartToFuturePayments = async (state: boolean) => {
    setShowLoadingScreen(true);
    setErrorSave({ show: false, text: '' });
    try {
      let data: ResponseBase;
      if (state) {
        data = await putSummaryCredit({
          cuenta: creditInfo?.directCreditCodeCustomer ?? '',
          adicional: creditInfo?.directCreditCodeAdditional ?? '',
          identificacion: LocalUserData?.documentTypeNumber,
          idDispositivo: DeviceId
        }).unwrap();
      } else {
        data = await doUnlinkAccount({
          idDispositivo: DeviceId,
          adicional: creditInfo?.directCreditCodeAdditional ?? '',
          cuenta: creditInfo?.directCreditCodeCustomer ?? ''
        }).unwrap();
      }
      if (!data.success) {
        setShowLoadingScreen(false);
        await sleep(400);
        setShowErrorDialog(true);
        setPopupTextError(data.message);
        return;
      }
      await loadUser();
      setShowLoadingScreen(false);
      await sleep(400);
      setsaveForFuturePay(state);
      setSavingCarMessage(
        state
          ? CHECKED_SAVE_CART_TO_FUTURE_PAYMENTS
          : UNCHECKED_SAVE_CART_TO_FUTURE_PAYMENTS
      );
    } catch (error) {
      setShowLoadingScreen(false);
      setErrorSave({
        show: true,
        text: error?.data?.message ?? `${t('error.hasOccurred')}`
      });
      await sleep(400);
      console.log('❌ Ups!!! in PurchaseProcess: ', error);
    }
  };

  return (
    <BottomSheet
      percentage={percentage}
      show={show}
      canDrop={false}
      onCloseRequest={handleClose}
      scrollViewContainerStyle={{}}
      header={
        <View style={styles.iconButtomContainer}>
          <IconButton iconName="close" onPress={handleClose} />
        </View>
      }>
      <View style={styles.contentContainer}>
        <Icon
          name={'check-circle'}
          size={80}
          style={styles.checkMarkIcon}
          color={styles.checkMarkIcon.color}
        />
        <Text style={[FontStyles.H6_Headline, FontStyles.Center, styles.title]}>
          {handleModifyTitle(
            pageContent?.components?.OrderConfirmationComponent?.title
          ) ?? `${t('success,yourPurchaseProcessedSuccessfully')}`}
        </Text>
        <Text
          style={[
            FontStyles.Body_1,
            FontStyles.Center,
            FontStyles.PrimaryColor
          ]}>
          {pageContent?.components?.OrderConfirmationComponent?.title2 ??
            `${t('orderNumber')}`}
          {orderNumber}
        </Text>
        <BeforeCard typePurchase={typePurchase} />
        {children ? (
          children
        ) : (
          <View style={styles.card}>
            <ContentPurchase
              orderNumber={orderNumber}
              typePurchase={typePurchase}
              orderConfirmation={
                pageContent?.components?.OrderConfirmationComponent
              }
              isGiftCardCart={isGiftCardCartMemo}
            />
          </View>
        )}
        <AfterCard typePurchase={typePurchase} />
        {!IsAccountAuthenticated &&
          !creditInfo?.saveForFuturePay &&
          typePurchase === PaymentMethodModeType.DePratiCredit && (
            <>
              <CheckboxComp
                testId="save_forfuture_pay"
                label={`${t('iwantSaveFuturePurchases')}`}
                status={saveForFuturePayState ? 'checked' : 'unchecked'}
                onPress={() =>
                  onSaveCartToFuturePayments(!saveForFuturePayState)
                }
                color={COLORS.BRAND}
              />
              {errorSave.show && (
                <ErrorText textStyle={styles.errorSave} text={errorSave.text} />
              )}
              {!!setSavingCarMessage && (
                <View style={{ width: '100%', marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: FONTS_SIZES.small,
                      color: COLORS.BRAND,
                      textAlign: 'center'
                    }}>
                    {savingCarActionMessage}
                  </Text>
                </View>
              )}
            </>
          )}
      </View>
      <View style={styles.contentButtons}>
        <Button
          linkName={
            pageContent?.components?.KeepBuyingLink?.linkName ??
            `${t('APP_BOTON_LABEL.continuousPurchase')}`
          }
          marginTop={14}
          containerStyle={{ width: '95%' }}
          backgroundColor={COLORS.BRAND}
          textColor={FontStyles.LightColor.color}
          onPress={onBuyingContinue}
          textStyle={{
            marginHorizontal: 10
          }}
          showActivityIndicator={statusSummaryCredit.isLoading}
          activityIndicator={{
            color: FontStyles.LightColor.color
          }}
        />
        <ButtonOutlined
          title={
            pageContent?.components?.OrderDetailsLink?.linkName ??
            `${t('APP_BOTON_LABEL.seeDetailsAndOrders2')}`
          }
          style={styles.buttonSeeDetails}
          onPress={() => onSeeOrderDetails(orderNumber)}
          labelStyle={{ width: '92%', height: '50%' }}
          showActivityIndicator={statusSummaryCredit.isLoading}
          // disabled
        />
      </View>
      <Popup
        showCloseButton
        icon="error"
        buttonType="full"
        iconColor={COLORS.BRAND}
        visible={showErrorDialog}
        title={popupTextError}
        hideButton={false}
        buttonText={`${t('APP_BOTON_LABEL.accept2')}`}
        buttonAction={() => {
          setShowErrorDialog(false);
        }}
        closeAction={() => {
          setShowErrorDialog(false);
        }}
      />
      <FullLoadingComponent visible={showLoadingScreen} />
    </BottomSheet>
  );
};

export interface ConfirmationProps
  extends NativeStackScreenProps<
    CheckoutNavigationParams,
    CheckoutSteps.PurchaseConfirmation
  > {}
