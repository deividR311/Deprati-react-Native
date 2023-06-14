import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  BottomSheet,
  IconButton
} from '../../../../../common-components/bottomSheet';
import { COLORS, FontStyles, NAV } from '../../../../../../application/common';
import InputBase from '../../../../../common-components/inputs/InputBase';
import RadioButtonComp from '../../../../../common-components/radiosButton';
import SelectInput from '../../../../../common-components/inputs/SelectInput';
import TextRow from '../../../../account/MyAddress/components/TextRow';
import CheckboxComp from '../../../../../common-components/checkboxs';
import Button from '../../../../../common-components/buttons/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';
import {
  balanceInquiryCheckOutDetailDto,
  useDirectCreditBalanceRequest,
  useSelectExpressDirectCreditBalanceRequest
} from '../../../../../../infrastucture/apis/checkout/expressBuy';
import { Cart } from '../../../../../../infrastucture/apis/shopping-cart';
import {
  PaymentMethodType,
  directCreditResponse,
  useDirectCreditBalanceCustomerRequest
} from '../../../../../../infrastucture/apis/checkout/payment-methods';
import { useSetCashPaymentRequest } from '../../../../../../infrastucture/apis/checkout/payments/cashPayment';
import { CheckoutSteps } from '../../../../../navigation/checkout';
import { formatToCurrecy } from '../../../../../../application/utils/currency';
import { getMothOfDate } from '../../../../../../application/utils/formatDate';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Divider } from 'react-native-paper';
import TemplatePage from '../../../../../common-components/template-page';
import { useAppSelector } from '../../../../../../application/state-manager';
import {
  ShoppingCartStateSelector,
  setCartCreditInfo
} from '../../../../../../application/state-manager/services/checkout';
import { useDispatch } from 'react-redux';

interface Props {
  infoUserCredit?: { numberAccount: string; aditional: string };
  show: boolean;
  showCheckbox?: boolean;
  showAddCredit?: boolean;
  onCloseRequest: () => void;
  onCloseRequestError?: (error?: string) => void;
  buyExpress?: boolean;
  onCloseRequestBottomSheet?: () => void;
  onLoadingBuy?: (x: boolean) => void;
  onIsBuying?: (x: boolean) => void;
}

export default function BottomSheetCredit({
  infoUserCredit,
  onCloseRequest,
  onCloseRequestError,
  onCloseRequestBottomSheet,
  show,
  showCheckbox,
  showAddCredit = false,
  buyExpress = false,
  onLoadingBuy,
  onIsBuying
}: Props) {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [saveForFuturePay, setsaveForFuturePay] = useState(false);
  const [optionDeferredOption, setOptionDeferredOption] = useState<number>();
  const [checkboxs, setCheckboxs] = useState({
    corriente: false,
    deferido: true
  });

  const dataCart = useAppSelector(ShoppingCartStateSelector) as Cart;

  const {
    localStorageData: {
      [LocalStorageKey.UserEmail]: userEmail,
      [LocalStorageKey.AccountNumber]: accountNumber,
      [LocalStorageKey.AccountAdditionalNumber]: accountAdditionalNumber
    }
  } = useLocalStorage();

  const [
    _getSelectExpress,
    { isLoading: loadingSelectExpress, isSuccess: successSelectExpress }
  ] = useSelectExpressDirectCreditBalanceRequest();

  const [_getCreditBalance, statusCreditBalance] =
    useDirectCreditBalanceRequest();

  const [_getCreditBalanceCustomer, statusCreditBalanceCustomer] =
    useDirectCreditBalanceCustomerRequest();

  const [
    setPaymentService,
    { isLoading: isLoadingPayment, isSuccess: isSuccessPayment }
  ] = useSetCashPaymentRequest();

  const handleContinueExpress = () => {
    _getSelectExpress({
      cartId: dataCart.code ?? '',
      username: userEmail,
      selectedPaymentGroup: PaymentMethodType.DePratiCredit,
      directCreditForm: {
        directCreditClientCode:
          infoUserCredit?.numberAccount ?? accountNumber ?? '',
        directCreditPaymentMode: checkboxs.corriente ? 0 : 1,
        directCreditClientAdditionalCode:
          infoUserCredit?.aditional ?? accountAdditionalNumber ?? '',
        directCreditBalanceData: directCreditBalanceData,
        directCreditSelectedDeferredOption: `${directCreditSelectedDeferredOption}`
      }
    });
  };

  const handleContinueCredit = () => {
    setPaymentService({
      cartId: dataCart.code ?? '',
      user: userEmail,
      selectedPaymentGroup: PaymentMethodType.DePratiCredit,
      directCreditForm: {
        directCreditClientCode:
          infoUserCredit?.numberAccount ?? accountNumber ?? '',
        directCreditPaymentMode: checkboxs.corriente ? 0 : 1,
        directCreditClientAdditionalCode:
          infoUserCredit?.aditional ?? accountAdditionalNumber ?? '',
        directCreditBalanceData: directCreditBalanceData,
        directCreditSelectedDeferredOption: directCreditSelectedDeferredOption
      }
    });
  };

  const handleBalanceCart = async () => {
    if (buyExpress) {
      await _getCreditBalance({
        username: userEmail,
        cartId: dataCart.code
      });
    } else {
      const numberAccount =
        infoUserCredit?.numberAccount ?? accountNumber ?? '';
      const aditional =
        infoUserCredit?.aditional ?? accountAdditionalNumber ?? '';
      await _getCreditBalanceCustomer({
        user: userEmail,
        cartId: dataCart.code,
        accountNumber: numberAccount,
        additionalNumber: aditional
      });
    }
  };

  useEffect(() => {
    if (show) {
      handleBalanceCart();
    }
  }, [show, dataCart?.totalPriceWithTax]);

  const statusBottomCredit = useMemo(() => {
    const status =
      buyExpress ?? false ? statusCreditBalance : statusCreditBalanceCustomer;

    return status;
  }, [buyExpress, statusCreditBalance, statusCreditBalanceCustomer]);

  const dataCredit: directCreditResponse = useMemo(() => {
    const status = buyExpress
      ? statusCreditBalance
      : statusCreditBalanceCustomer;
    if (!status.isLoading && status.isSuccess) {
      const response = status.data;
      if (response?.ok) {
        return response;
      } else if (response?.errorMsg) {
        onCloseRequestError?.(response?.errorMsg);
        onCloseRequest?.();
      }
    }

    return {};
  }, [statusCreditBalance, statusCreditBalanceCustomer]);

  const listDeferred: balanceInquiryCheckOutDetailDto[] = useMemo(() => {
    if (dataCredit?.deferredList?.length > 0) {
      const list = dataCredit?.deferredList?.map(deferred => ({
        ...deferred,
        deferredDescription:
          deferred?.deferredData?.deferredDescription?.toLocaleLowerCase()
      }));
      return list;
    }
    return [];
  }, [dataCredit]);

  const dataPayment = useMemo(() => {
    if (checkboxs.deferido) {
      if (listDeferred?.length > 0 && listDeferred[optionDeferredOption]) {
        const { deferredData, ...option } = listDeferred[optionDeferredOption];
        return {
          ...option,
          mesOne: getMothOfDate(deferredData?.periodFirstMonth) || '',
          mesTwo: getMothOfDate(deferredData?.periodSecondMonth) || '',
          paga1Mes: formatToCurrecy(deferredData?.payFirstMonth ?? 0),
          paga2Mes: formatToCurrecy(deferredData?.paySecondMonth ?? 0),
          totalValue: formatToCurrecy(deferredData?.feeValue ?? 0)
        };
      }
    } else {
      if (checkboxs.corriente && dataCredit?.rotativeDeferred?.feeValueDesc) {
        const { deferredData, ...rotativo } = dataCredit?.rotativeDeferred;
        return {
          ...rotativo,
          mesOne: getMothOfDate(deferredData?.periodFirstMonth) || '',
          mesTwo: getMothOfDate(deferredData?.periodSecondMonth) || '',
          paga1Mes: formatToCurrecy(deferredData?.payFirstMonth ?? 0),
          paga2Mes: formatToCurrecy(deferredData?.paySecondMonth ?? 0),
          totalValue: formatToCurrecy(deferredData?.feeValue ?? 0)
        };
      }

      return {};
    }
  }, [listDeferred, optionDeferredOption, checkboxs, dataCredit]);

  const directCreditBalanceData = useMemo(() => {
    if (dataCredit?.balanceData?.accountNumber) {
      const response = {
        ...dataCredit.balanceData,
        deferredList: null,
        accountAdditionalNumber: infoUserCredit?.aditional
      };
      return JSON.stringify(response);
    }

    return '';
  }, [dataCredit?.balanceData]);

  const directCreditSelectedDeferredOption = useMemo(() => {
    const optionInString = ({ deferredData }) => {
      const response = {
        ...deferredData,
        deferredNumbers: null, // ??
        interestValue: deferredData.interestValue,
        totalValue: deferredData.totalValue // dataCart?.totalPriceWithTax, //deferredData.totalValue,
      };
      return JSON.stringify(response);
    };

    if (
      checkboxs.deferido &&
      listDeferred?.length > 0 &&
      listDeferred[optionDeferredOption]
    ) {
      const option = listDeferred[optionDeferredOption];
      return optionInString(option);
    }

    if (
      checkboxs.corriente &&
      dataCredit?.rotativeDeferred?.feeFirstPaymentDesc
    ) {
      const option_rotativo = dataCredit?.rotativeDeferred;
      return optionInString(option_rotativo);
    }

    return '';
  }, [checkboxs, optionDeferredOption, dataCredit]);

  useEffect(() => {
    if (loadingSelectExpress || isLoadingPayment) {
      onIsBuying?.(true);
    }
  }, [loadingSelectExpress, isLoadingPayment]);

  useEffect(() => {
    if (!loadingSelectExpress && successSelectExpress) {
      handleLoadingBuyed();
      const creditInfo = {
        saveForFuturePay,
        maskedPhoneNumber: dataCredit?.obfuscatedPhone,
        maskedNumberAccount: dataCredit?.obfuscatedAccountNumber,
        maskedEmail: dataCredit?.obfuscatedMail
      };
      dispatch(setCartCreditInfo(creditInfo));
      navigation.navigate(NAV.CHECKOUT, {
        screen: CheckoutSteps.PurchaseConfirmation,
        dataCart,
        params: {
          ...creditInfo
        }
      });
      onCloseRequest?.();
    }
  }, [loadingSelectExpress]);

  useEffect(() => {
    if (!isLoadingPayment && isSuccessPayment) {
      handleLoadingBuyed();
      const creditInfo = {
        saveForFuturePay,
        maskedPhoneNumber: dataCredit?.obfuscatedPhone,
        maskedNumberAccount: dataCredit?.obfuscatedAccountNumber,
        maskedEmail: dataCredit?.obfuscatedMail,
        directCreditCodeAdditional: infoUserCredit?.aditional,
        directCreditCodeCustomer: infoUserCredit?.numberAccount
      };
      dispatch(setCartCreditInfo(creditInfo));
      navigation.navigate(CheckoutSteps.PurchaseConfirmation, {
        ...route.params,
        ...creditInfo
      });
      //onCloseRequest()
    }
    return () => onCloseRequest?.();
  }, [isLoadingPayment]);

  const handleLoadingBuyed = () => {
    onIsBuying?.(false);
    onLoadingBuy?.(false);
  };

  return (
    <BottomSheet
      onCloseRequest={onCloseRequestBottomSheet}
      percentage={95}
      show={show}
      canDrop={false}
      header={
        <View style={styles.container_close}>
          <IconButton iconName="close" onPress={onCloseRequest} />
        </View>
      }
      paddingHorizontal={0}>
      <TemplatePage
        loading={statusBottomCredit.isLoading}
        error={statusBottomCredit.isError}
        skeleton={
          <SkeletonContent
            isLoading={true}
            animationDirection="horizontalLeft"
            layout={[
              {
                key: 'loadingSelectExpress',
                alignSelf: 'center',
                width: '90%',
                height: 700
              }
            ]}
          />
        }>
        <View style={styles.bottom_sheet}>
          <Text style={styles.title}>Paga con crédito De Prati</Text>
          <View style={styles.card}>
            <Text style={FontStyles.Subtitle}>
              Código del cliente: {dataCredit?.obfuscatedAccountNumber}
            </Text>
            <Text style={styles.subtitle}>
              Verifica que tus datos son correctos, para que obtengas tu código
              de compra
            </Text>
            <InputBase
              disabled={true}
              value={dataCredit?.obfuscatedMail}
              onChangeText={(text: string) => {}}
              keyboardType="number-pad"
              label=""
              style={[styles.input]}
            />
            <InputBase
              disabled={true}
              value={dataCredit?.obfuscatedPhone}
              onChangeText={(text: string) => {}}
              keyboardType="number-pad"
              label=""
              style={[styles.input2]}
            />
            <Divider style={styles.divider} />
            <RadioButtonComp
              value={''}
              onPress={() =>
                setCheckboxs({
                  corriente: true,
                  deferido: false
                })
              }
              status={checkboxs.corriente ? 'checked' : 'unchecked'}
              label="Consumo Corriente"
              color={COLORS.BRAND}
            />
            <RadioButtonComp
              value=""
              onPress={() =>
                setCheckboxs({
                  deferido: true,
                  corriente: false
                })
              }
              status={checkboxs.deferido ? 'checked' : 'unchecked'}
              label="Diferido"
              color={COLORS.BRAND}
            />
            {!checkboxs.corriente && (
              <SelectInput
                styles={{ marginTop: 16 }}
                label="Seleccionar"
                namePropertyDisplay={'deferredDescription'}
                items={listDeferred}
                onChange={(selectItem, index) => {
                  setOptionDeferredOption(index);
                }}
                valueByIndex={optionDeferredOption}
              />
            )}

            {dataPayment?.totalValue && (
              <View style={styles.quota_content_info}>
                <TextRow
                  title="Cuota estimada:"
                  text={dataPayment?.totalValue ?? 0}
                />
                <TextRow
                  title={`Pago estimado ${dataPayment?.mesOne ?? ''}:`}
                  text={dataPayment?.paga1Mes ?? 0}
                />
                <TextRow
                  title={`Pago estimado ${dataPayment?.mesTwo ?? ''}:`}
                  text={dataPayment?.paga2Mes ?? 0}
                />
              </View>
            )}
            {showCheckbox && (
              <CheckboxComp
                testId="save_forfuture_pay"
                label="Guardar datos para futuras compras."
                status={saveForFuturePay ? 'checked' : 'unchecked'}
                onPress={() => setsaveForFuturePay(!saveForFuturePay)}
                color={COLORS.BRAND}
              />
            )}
          </View>
          <Button
            testID="next_checkout"
            marginTop={12}
            linkName="CONTINUAR COMPRA"
            containerStyle={{ marginHorizontal: 16 }}
            activityIndicator={{
              color: FontStyles.LightColor.color
            }}
            showActivityIndicator={loadingSelectExpress || isLoadingPayment}
            onPress={() => {
              if (buyExpress) {
                handleContinueExpress();
              } else {
                handleContinueCredit();
              }
            }}
            backgroundColor={FontStyles.PrimaryColor.color}
            textColor={FontStyles.LightColor.color}
            disabled={
              !statusBottomCredit.isSuccess ||
              !directCreditSelectedDeferredOption
            }
          />
          <Button
            marginTop={12}
            linkName="CANCELAR"
            containerStyle={{
              marginHorizontal: 16,
              borderWidth: 1,
              borderColor: COLORS.DARK
            }}
            activityIndicator={{
              color: FontStyles.LightColor.color
            }}
            onPress={onCloseRequest}
            backgroundColor={FontStyles.LightColor.color}
            textColor={FontStyles.DarkColor.color}
            disabled={loadingSelectExpress || isLoadingPayment}
          />
        </View>
      </TemplatePage>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottom_sheet: {
    paddingBottom: 40
  },
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 8,
    marginHorizontal: 16,
    alignSelf: 'center'
  },
  container_close: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 40,
    width: '100%'
  },
  title: {
    ...FontStyles.H1_Headline,
    marginTop: 16,
    marginBottom: 25
  },
  card: {
    borderRadius: 8,
    marginHorizontal: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  subtitle: { ...FontStyles.Body_2, marginTop: 12, marginBottom: 12 },
  input: { backgroundColor: '#C4C3C5' },
  input2: {
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: '#C4C3C5'
  },
  quota_content_info: { marginTop: 12, marginBottom: 28 }
});
