import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { COLORS, FontStyles } from '../../../../../application/common';
import {
  PaymentCreditOrDebitCardParams,
  PaymentCreditOrDebitCardSteps
} from '../../../../navigation/checkout';
import InputBase from '../../../../common-components/inputs/InputBase';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../../common-components/buttons/Button';
import TextInputMask from 'react-native-mask-input';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import _, { fromPairs } from 'lodash';
import { OPTCCodeConfirmation } from './components/opt-code-confirmation.bottomsheet';
import Paymentez, {
  PaymentezAddCardError,
  PaymentezAddCardErrorsTypes,
  PaymentezAddCardStatus,
  PaymentezCard
} from '../../../../../infrastucture/native-modules/paymentez/paymentez';
import {
  AddBankCardResponse,
  AddBankCardStatusResponse,
  useAddBankCardRequest,
  useValidateBankCardOTPCodeRequest
} from '../../../../../infrastucture/apis/checkout/payment-methods';
import { CardBrands } from '../../../../../infrastucture/apis/checkout/payment-methods/paymentez.type';
import { Popup } from '../../../../common-components/poppup';
import sleep from '../../../../../application/utils/sleep';

export const FormAddBankCard: React.FC<FormAddBankCardProps> = props => {
  const CreditCardLength = {
    Min: 14,
    Max: 16
  };

  const {
    localStorageData: {
      [LocalStorageKey.User]: USER,
      [LocalStorageKey.Token]: TOKEN,
      [LocalStorageKey.MessagesApp]: MessagesApp
    }
  } = useLocalStorage();

  const [form, setForm] = React.useState({
    number: '',
    holder_name: '',
    expiry_month: '',
    expiry_year: '',
    cvc: '',
    email: USER.uid,
    id: USER.customerId
  });

  const [formErrors, setFormErrors] = React.useState({
    number: false,
    holder_name: false,
    expiryDate: false,
    cvv: false
  });
  const [formDirty, setFormDirty] = React.useState({
    number: false,
    holder_name: false,
    expiryDate: false,
    cvv: false
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [bankCard, setBankCard] = React.useState<{
    id: string;
    type: CardBrands | '';
  }>({
    id: '',
    type: ''
  });
  const [
    showOTPCodeConfirmationBottomSheet,
    setShowOTPCodeConfirmationBottomSheet
  ] = React.useState(false);

  const [modal, setModalState] = React.useState({
    isVisible: false,
    message: ''
  });

  const [
    doSaveBankCard,
    {
      isError: hasErrorBySaveBankCard,
      error: errorBySaveBankCard,
      isLoading: isLoadingBySaveBankCard,
      data: dataBySaveBankCard
    }
  ] = useAddBankCardRequest();

  const [
    doValidateOTPCode,
    {
      isLoading: isLoadingByOTPConfirmation,
      error: errorByOTPConfirmation,
      isError: isErrorByOTPConfirmation,
      data: dataByOTPConfirmation
    }
  ] = useValidateBankCardOTPCodeRequest();

  const enableButton = (): boolean =>
    Object.values(formErrors).every(value => value === false) &&
    Object.values(form).every(value => value !== '');

  const onPressAddBankCard = async () => {
    setIsLoading(true);
    try {
      const user = {
        uid: form.id,
        email: form.email
      };
      const card: PaymentezCard = {
        cardNumber: form.number,
        cardHolder: form.holder_name,
        expMonth: Number(form.expiry_month),
        expYear: 2000 + Number(form.expiry_year),
        cvc: form.cvc
      };

      const cardResponse = await Paymentez.addCard(user, card);

      const cardIsPending =
        cardResponse.status === PaymentezAddCardStatus.Pending;

      const { error, data }: any = await doSaveBankCard({
        token_header: TOKEN,
        cardNumber: Number(form.number.substring(6)),
        bin: cardResponse.bin || form.number.substring(6),
        type: cardResponse.type,
        pending: cardIsPending,
        transactionId: cardResponse.transaction_reference,
        token: cardResponse.token,
        expYear: `${2000 + Number(form.expiry_year)}`,
        expMonth: form.expiry_month,
        name: form.holder_name
      });

      if (error || !data) {
        const err = error?.data?.errors?.map(e => e.message).join('\n');
        throw Error(err);
      }

      const bankCardData: AddBankCardResponse = data;
      setBankCard({
        id: bankCardData.code,
        type: cardResponse.type
      });

      if (bankCardData.status !== AddBankCardStatusResponse.Success) return;
      cardIsPending
        ? setShowOTPCodeConfirmationBottomSheet(true)
        : props.navigation.goBack();
    } catch (error) {
      const { code, message, userInfo } = error as PaymentezAddCardError;
      let _message: string = message;

      if (code === PaymentezAddCardErrorsTypes.PaymentezError) {
        if (userInfo.error_type) _message = userInfo.error_type;
        if (typeof userInfo.description === 'string')
          _message = userInfo.description += ` ${userInfo.description}`;
        if (userInfo.help) _message += ` ${userInfo.help}`;
      }

      setModalState({
        ...modal,
        isVisible: true,
        message: _message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyOTPCode = (cardId: string, otpCode: string) => {
    doValidateOTPCode({
      token: TOKEN,
      cardId: cardId,
      otpCode: otpCode
    });
  };

  const onCloseOTPCodeConfirmationBottomSheet = () => {
    setShowOTPCodeConfirmationBottomSheet(false);
  };

  useEffect(() => {
    if (!dataByOTPConfirmation) return;
    onCloseOTPCodeConfirmationBottomSheet();
    sleep(600).then(() => props.navigation.goBack());
  }, [dataByOTPConfirmation]);

  /* useEffect(() => {
    if (!isErrorByOTPConfirmation) return
  }, [isErrorByOTPConfirmation])

  useEffect(() => {
    if (!hasErrorBySaveBankCard) return
  }, [hasErrorBySaveBankCard]) */

  useEffect(() => {
    props.route.params.showTotalsBand(false);
    return () => props.route.params.showTotalsBand(true);
  });

  return (
    <ScrollView>
      <View style={Styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={40}>
          <Text style={[FontStyles.Body_1, FontStyles.Center, Styles.title]}>
            Agrega tarjeta crédito o débito
          </Text>
          <View style={Styles.imageContainer}>
            <Image
              style={{ width: '100%', height: 63 }}
              resizeMode="contain"
              source={require('../../../../../../assets/images/card-issuer/visa-mastercard-diners.png')}
            />
            <Image
              style={{ width: '100%', height: 63, marginTop: 10 }}
              resizeMode="contain"
              source={require('../../../../../../assets/images/card-issuer/discover-american-alia.png')}
            />
          </View>
          <InputBase
            style={Styles.inputSpace}
            label="Número de tarjeta"
            keyboardType="numeric"
            value={form.number}
            maxLength={CreditCardLength.Max}
            onChangeText={text => {
              !!text &&
                formErrors.number &&
                setFormErrors({ ...formErrors, number: false });
              setForm({ ...form, number: text });
            }}
            onEndEditing={e => {
              const hasError = e.nativeEvent.text.length < CreditCardLength.Min;
              setFormErrors({ ...formErrors, number: hasError });
            }}
            error={formErrors.number}
            disabled={isLoading || isLoadingBySaveBankCard}
            dense={true}
          />
          <InputBase
            style={Styles.inputSpace}
            label="Titular de la tarjeta"
            placeholder="Nombre del tarjeta habiente"
            value={form.holder_name}
            onChangeText={text => {
              !text &&
                form.holder_name &&
                setFormErrors({ ...formErrors, holder_name: !text });
              setForm({ ...form, holder_name: text });
            }}
            onEndEditing={e => {
              const hasError = e.nativeEvent.text.length < 1;
              setFormErrors({ ...formErrors, holder_name: hasError });
            }}
            error={formErrors.holder_name}
            disabled={isLoading || isLoadingBySaveBankCard}
            dense={true}
          />
          <View style={Styles.formRow}>
            <InputBase
              style={[Styles.inputSpace, Styles.inputRow]}
              label="Valida hasta"
              placeholder="MM/AA"
              keyboardType="numeric"
              dense={true}
              maxLength={5}
              value={`${form.expiry_month}${form.expiry_year}`}
              error={formErrors.expiryDate}
              disabled={isLoading || isLoadingBySaveBankCard}
              onChangeText={text => {
                !text &&
                  `${form.expiry_month}${form.expiry_year}` &&
                  setFormErrors({ ...formErrors, expiryDate: !text });
                setForm({
                  ...form,
                  expiry_month: text.substring(0, 2),
                  expiry_year: text.substring(2)
                });
              }}
              render={_props => (
                <TextInputMask
                  {..._props}
                  style={_props.style}
                  mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                  value={_props.value ?? ''}
                  onChangeText={_props.onChangeText}
                  placeholder={_props.placeholder}
                  onBlur={_props.onBlur}
                  onFocus={_props.onFocus}
                  maxLength={5}
                  onEndEditing={e => {
                    const hasError = e.nativeEvent.text.length < 5;
                    setFormErrors({ ...formErrors, expiryDate: hasError });
                  }}
                />
              )}
            />
            <InputBase
              style={[Styles.inputSpace, Styles.inputRow]}
              label="CVC"
              value={form.cvc}
              onChangeText={text => {
                !text &&
                  form.cvc &&
                  setFormErrors({ ...formErrors, cvv: !text });
                setForm({ ...form, cvc: text });
              }}
              onEndEditing={e => {
                const hasError = e.nativeEvent.text.length < 3;
                setFormErrors({ ...formErrors, cvv: hasError });
              }}
              error={formErrors.cvv}
              keyboardType="numeric"
              right={'alert-circle'}
              maxLength={4}
              dense={true}
              disabled={isLoading || isLoadingBySaveBankCard}
            />
          </View>
          <Button
            backgroundColor={COLORS.BRAND}
            textColor={COLORS.WHITE}
            linkName="GUARDAR"
            marginTop={15}
            disabled={!enableButton() || isLoading || isLoadingBySaveBankCard}
            onPress={onPressAddBankCard}
            showActivityIndicator={isLoading || isLoadingBySaveBankCard}
          />
          <OPTCCodeConfirmation
            show={showOTPCodeConfirmationBottomSheet}
            cardId={bankCard.id}
            cardType={bankCard.type}
            onCloseRequest={onCloseOTPCodeConfirmationBottomSheet}
            isLoading={isLoadingByOTPConfirmation}
            onVerifyOTPCode={onVerifyOTPCode}
          />
        </KeyboardAvoidingView>
        <Popup
          icon="error"
          title={
            MessagesApp?.Paymentez?.description ??
            'La información ingresada no fue procesada. Por favor intenta de nuevo.'
          }
          buttonType="full"
          buttonText="ACEPTAR"
          buttonAction={() => {
            setModalState({
              ...modal,
              isVisible: false
            });
          }}
          closeAction={() => {
            setModalState({
              ...modal,
              isVisible: false
            });
          }}
          showCloseButton={true}
          hideButton={false}
          visible={modal.isVisible}
          iconColor={COLORS.BRAND}
          textContentStyle={{ marginBottom: 16 }}
          titleStyle={{ textAlign: 'left', alignSelf: 'flex-start' }}
        />
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 150,
    backgroundColor: COLORS.WHITE
  },
  imageContainer: {
    marginBottom: 18
  },
  inputSpace: {
    marginTop: 8
  },
  title: {
    marginBottom: 20
  },
  inputRow: {
    width: '48%'
  },
  formRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export interface FormAddBankCardProps
  extends NativeStackScreenProps<
    PaymentCreditOrDebitCardParams,
    PaymentCreditOrDebitCardSteps.FormAddBankCard
  > {}
