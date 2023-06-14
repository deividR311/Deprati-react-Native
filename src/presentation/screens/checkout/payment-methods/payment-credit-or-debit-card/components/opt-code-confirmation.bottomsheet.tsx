import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { DinersInternational } from '../../../../../../../assets/icons/issuer-cards/diners-international';
import { COLORS, FontStyles } from '../../../../../../application/common';
import { CardBrands } from '../../../../../../infrastucture/apis/checkout/payment-methods/paymentez.type';
import {
  BottomSheet,
  IconButton
} from '../../../../../common-components/bottomSheet';
import Button from '../../../../../common-components/buttons/Button';
import InputBase from '../../../../../common-components/inputs/InputBase';

export const OPTCCodeConfirmation: React.FC<
  OPTCCodeConfirmationProps
> = props => {
  const OTP_CODE_LENGTH = 6;

  const [OTPCode, setOTPCode] = React.useState<string[]>(
    Array(OTP_CODE_LENGTH).fill('')
  );

  const OTPCodeRefObj = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null)
  ];

  const onTextChange = (index: number, text: string) => {
    const newOTPCode = [...OTPCode];
    newOTPCode[index] = text;
    setOTPCode(newOTPCode);
    if (!newOTPCode.join('').length) {
      OTPCodeRefObj[0].current?.focus();
      return;
    }
    if (text.length === 1 && index < OTP_CODE_LENGTH - 1) {
      OTPCodeRefObj[index + 1].current?.focus();
    } else if (text.length === 0 && index > 0) {
      OTPCodeRefObj[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    OTPCodeRefObj[0].current?.focus();
  }, [props.show]);

  return (
    <BottomSheet
      show={props.show}
      canDrop={false}
      percentage={70}
      paddingHorizontal={16}
      header={
        <View style={Styles.iconButtomContainer}>
          <IconButton
            iconName="close"
            onPress={props.onCloseRequest}
            testID={'bottomsheet-otp-confirmation-btn-close'}
          />
        </View>
      }>
      <View style={Styles.content}>
        <Text style={[FontStyles.H3_Headline]}>
          Digita el código de seguridad
        </Text>
        <View
          style={{
            marginVertical: 24,
            alignSelf: 'center'
          }}>
          <DinersInternational width="115" height="80" />
        </View>
        <View style={Styles.numbers}>
          {OTPCodeRefObj.map((ref, index) => (
            <InputBase
              ref={ref}
              key={index}
              textAlign="center"
              maxLength={1}
              style={Styles.number}
              testID={'bottomsheet-otp-confirmation-input-' + index}
              keyboardType="numeric"
              onChangeText={text => onTextChange(index, text)}
            />
          ))}
        </View>

        <Text
          numberOfLines={4}
          textBreakStrategy={'balanced'}
          style={[FontStyles.Body_1, FontStyles.Center, Styles.text]}>
          Hemos enviado un código de
          {` ${OTP_CODE_LENGTH} `}dígitos al número celular que tienes
          registrado en Diners Club
        </Text>

        <Button
          backgroundColor={COLORS.BRAND}
          textColor={COLORS.WHITE}
          linkName="CONTINUAR"
          marginTop={15}
          onPress={() => props.onVerifyOTPCode(props.cardId, OTPCode.join(''))}
          showActivityIndicator={props.isLoading}
          disabled={props.isLoading || OTPCode.some(v => v === '')}
        />
      </View>
    </BottomSheet>
  );
};

export const Styles = StyleSheet.create({
  iconButtomContainer: {
    marginTop: 22,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    width: '100%'
  },
  content: {},
  number: {
    marginHorizontal: 5,
    width: 40
  },
  numbers: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 12
  }
});

interface OPTCCodeConfirmationProps {
  show: boolean;
  isLoading: boolean;
  cardId: string;
  cardType: CardBrands | '';
  onVerifyOTPCode: (cardId: string, otpCode: string) => void;
  onCloseRequest: () => void;
}
