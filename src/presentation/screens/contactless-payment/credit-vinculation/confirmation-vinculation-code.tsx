import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { ConfirmVinculationCodeStyles as Styles } from './styles';
import { trackEventclick } from '../../../../infrastucture/native-modules/emma/useEmma.hook';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CreditVinculationNavigataionParentType,
  CreditVinculationNavigationParams,
  CreditVinculationNavigationRoutes
} from './credit-vinculation.navigator';

import CardHeader from './components/cardHeader';
import { keyEvents } from '../../../../infrastucture/native-modules/emma/clickEventMap';
import Button from '../../../common-components/buttons/Button';
import { ContactLessPaymentSteps } from '../../../navigation/contactless-payment';
import { COLORS } from '../../../../application/common';
import InputBase from '../../../common-components/inputs/InputBase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useWhatsapp } from '../../../../application/common/hooksCommons/useOpenLinkInApp';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import useResendSMSCredit from '../../Credit/hooks/useResendSMSCredit';
import {
  AccountBondingResentCodeResponse,
  AccountBondingUpdateStateResponse
} from '../../../../infrastucture/apis/creditAccountBonding';
import usePreBondingAccount from '../../Credit/hooks/useBondingAccount';
import useUpdateStateVinculation from '../../Credit/hooks/useUpdateStateVinculation';
import { RequestRawResult } from '../../../../infrastucture/apis/common/config';
import {
  BottomSheet,
  IconButton
} from '../../../common-components/bottomSheet';
import sleep from '../../../../application/utils/sleep';

export const VinculationCodeConfirmation: FC<
  VinculationCodeConfirmationProps
> = props => {
  const {
    navigation,
    route: {
      params: {
        creditAccountInfo: CREDIT_ACCOUNT_INFO,
        userPhoneNumber: USER_PHONE_NUMBER
      }
    }
  } = props;

  const {
    localStorageData: {
      [LocalStorageKey.Whatsapp]: {
        message: WHATSAPP_MESSAGE,
        phone: WHATSAPP_PHONE_NUMBER
      }
    }
  } = useLocalStorage();

  const CODE_LENGTH = 7;
  const [verificationCode, setVerificationCode] = React.useState<string[]>(
    Array(CODE_LENGTH).fill('')
  );

  const codeTextInputRef = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null)
  ];

  const [showResenedCodeSuccessMessage, setShowResendedCodeSuccessMessage] =
    useState(false);
  const [
    showSuccessVinculationBottomSheet,
    setShowSuccessVinculationBottomSheet
  ] = useState(false);

  const [errorMessageConfirmationCode, setErrorMessageConfirmationCode] =
    useState<string>();

  const { resendVerificationCode, isLoading } = useResendSMSCredit();
  const { onPressPreBondingWithCreditInfo } = usePreBondingAccount();
  const {
    validateVerificationCode,
    isLoadingSMS,
    isErrorSMS,
    dataSMS,
    errorSMS,
    clearErrorOnValidationRequest
  } = useUpdateStateVinculation();

  const [openWhatsapp] = useWhatsapp();

  const onTextChange = (index: number, text: string) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = text;
    setVerificationCode(newVerificationCode);
    //console.log(newVerificationCode.length < CODE_LENGTH);
    if (!newVerificationCode.join('').length) {
      codeTextInputRef[0].current?.focus();
      return;
    }
    if (text.length === 1 && index < CODE_LENGTH - 1) {
      codeTextInputRef[index + 1].current?.focus();
    } else if (text.length === 0 && index > 0) {
      codeTextInputRef[index - 1].current?.focus();
    }
  };

  const onPressCustomerService = () => {
    openWhatsapp(WHATSAPP_PHONE_NUMBER, WHATSAPP_MESSAGE);
  };

  const onPressCloseResendMessage = () => {
    setShowResendedCodeSuccessMessage(false);
    setErrorMessageConfirmationCode(undefined);
  };

  const onPressCloseBottomSheet = () => {
    setShowSuccessVinculationBottomSheet(false);
    sleep(400).then(() => {
      navigation.getParent<CreditVinculationNavigataionParentType>().goBack();
    });
  };

  const onPressConfirmationCode = async () => {
    onPressCloseResendMessage();
    if (!CREDIT_ACCOUNT_INFO) return;
    const { error } = (await validateVerificationCode(
      verificationCode.join(''),
      CREDIT_ACCOUNT_INFO
    )) as RequestRawResult<AccountBondingUpdateStateResponse>;

    // @ts-ignore
    let errorMessage = (error?.data?.message as string) || undefined;

    if (errorMessage) {
      setErrorMessageConfirmationCode(errorMessage);
      return;
    }
    setShowSuccessVinculationBottomSheet(true);
  };

  const onPressContinueButtonBottomSheet = () => {
    setShowSuccessVinculationBottomSheet(false);
    sleep(400).then(() => {
      navigation
        .getParent<CreditVinculationNavigataionParentType>()
        .replace(ContactLessPaymentSteps.QRShare);
    });
  };

  const onPressResendCode = async () => {
    setErrorMessageConfirmationCode(undefined);
    if (!CREDIT_ACCOUNT_INFO) return;
    const { error, data } = (await resendVerificationCode(
      CREDIT_ACCOUNT_INFO
    )) as RequestRawResult<AccountBondingResentCodeResponse>;

    if (error) {
      return;
    }
    console.log('>>> Resended Code result: ', data);
    setShowResendedCodeSuccessMessage(true);
  };

  useEffect(() => {
    codeTextInputRef[0].current?.focus();
    trackEventclick(keyEvents.credito_vincular);
    if (CREDIT_ACCOUNT_INFO)
      onPressPreBondingWithCreditInfo(CREDIT_ACCOUNT_INFO);
  }, []);

  useEffect(() => {
    if (showResenedCodeSuccessMessage) {
      setErrorMessageConfirmationCode(undefined);
    }
  }, [showResenedCodeSuccessMessage]);

  const renderResendCodeSuccessMessage = useMemo(() => {
    if (!showResenedCodeSuccessMessage && !errorMessageConfirmationCode)
      return <></>;

    return (
      <View
        style={[
          Styles.resentCodeSuccessMessage,
          errorMessageConfirmationCode
            ? Styles.resentCodeErrorMessage
            : undefined
        ]}>
        <Icon
          name={showResenedCodeSuccessMessage ? 'check-circle' : 'cancel'}
          size={20}
          color={
            showResenedCodeSuccessMessage
              ? Styles.successIcon.color
              : Styles.errorIcon.color
          }
        />
        <Text style={[Styles.resentCodeSuccessMessageText]}>
          {errorMessageConfirmationCode ?? 'Código enviado correctamente'}
        </Text>
        <Icon
          name="close"
          size={20}
          color={Styles.closeIcon.color}
          onPress={onPressCloseResendMessage}
        />
      </View>
    );
  }, [showResenedCodeSuccessMessage, errorMessageConfirmationCode]);

  return (
    <View style={Styles.contentContainer}>
      <CardHeader
        stepText={'Paso 2 de 2'}
        bodyText={`Acabamos de enviar un mensaje de texto al\nnúmero ${USER_PHONE_NUMBER}`}
        titleText={'Confirmación de seguridad'}
      />
      <View style={Styles.textUpperSide}>
        <Text style={Styles.body1}>Escribe el código</Text>
        <Text style={Styles.body2}>Tienes 5 minutos para ingresarlo</Text>
      </View>
      <View style={Styles.numbers}>
        {codeTextInputRef.map((ref, index) => (
          <InputBase
            ref={ref}
            key={index}
            textAlign="center"
            maxLength={1}
            style={Styles.number}
            testID={'confirmation-code-input-' + index}
            keyboardType="numeric"
            onChangeText={text => onTextChange(index, text)}
          />
        ))}
      </View>
      {renderResendCodeSuccessMessage}
      <Button
        onPress={onPressConfirmationCode}
        backgroundColor={Styles.redButton.backgroundColor}
        textColor={Styles.redButton.color}
        linkName={'CONFIRMAR CÓDIGO'}
        disabled={
          isLoading ||
          isLoadingSMS ||
          verificationCode.join('').length < CODE_LENGTH
        }
        showActivityIndicator={isLoadingSMS}
      />
      <Button
        onPress={onPressResendCode}
        backgroundColor="transparent"
        containerStyle={Styles.button}
        textColor={Styles.button.borderColor}
        linkName={'REENVIAR CÓDIGO'}
        disabled={isLoading || isLoadingSMS}
        showActivityIndicator={isLoading}
      />
      <Text style={Styles.textBelowSide}>
        Si no lo has recibido, comunícate con{' '}
        <Text style={Styles.link} onPress={onPressCustomerService}>
          Servicio al{'\n'}Cliente
        </Text>
      </Text>
      <BottomSheet
        header={
          <View style={Styles.closeButtonBottomSheet}>
            <IconButton
              testID={'close_modal'}
              iconName="close"
              onPress={onPressCloseBottomSheet}
            />
          </View>
        }
        show={showSuccessVinculationBottomSheet}
        canDrop={false}
        percentage={45}>
        <>
          <View style={Styles.contentBottomSheet}>
            <Icon
              name="check-circle"
              size={72}
              style={Styles.iconBottomSheet}
              color={COLORS.GREENOK}
            />
            <Text style={Styles.titleBottomSheet}>
              ¡Tu crédito De Prati ha sido{'\n'}vinculado!
            </Text>
            <Text style={Styles.textBottomSheet}>
              Presiona continuar para seguir con tu compra
            </Text>
            <Button
              onPress={onPressContinueButtonBottomSheet}
              backgroundColor={Styles.redButton.backgroundColor}
              textColor={Styles.redButton.color}
              linkName={'CONTINUAR'}
            />
          </View>
        </>
      </BottomSheet>
    </View>
  );
};

export interface VinculationCodeConfirmationProps
  extends NativeStackScreenProps<
    CreditVinculationNavigationParams,
    CreditVinculationNavigationRoutes.ConfirmationCode
  > {}
