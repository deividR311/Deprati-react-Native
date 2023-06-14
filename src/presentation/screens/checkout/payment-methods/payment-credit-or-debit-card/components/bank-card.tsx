import React, { useEffect, useRef } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { COLORS, FontStyles } from '../../../../../../application/common';
import { capitalize } from '../../../../../../application/utils/string-formater';
import {
  Card,
  CardPaymentOptions,
  useDeleteBankCardRequest,
  useSetDefaultBankCardRequest
} from '../../../../../../infrastucture/apis/checkout/payment-methods';
import Button from '../../../../../common-components/buttons/Button';
import InputBase from '../../../../../common-components/inputs/InputBase';
import { Popup } from '../../../../../common-components/poppup';
import SelectInput from '../../../../../common-components/inputs/SelectInput';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';
import { getUrlImageHybris } from '../../../../../../application/utils/urls';

export const BankCard: React.FC<BankCardProps> = ({ card, ...props }) => {
  const CONTAINER_HEIGHT = {
    Collapse: 90,
    Expand: 200,
    ExpandWithPaymentType: 140
  };

  const [showConfirmationPopup, setShowConfirmationPopup] =
    React.useState(false);
  const [showCardVerificationForm, setShowCardVerificationForm] =
    React.useState(false);
  const [formValues, setFormValues] = React.useState<FormValue>();
  const [hasError, setHasError] = React.useState({
    cvv: false,
    paymentType: false
  });
  const animationHeightValue = useRef(
    new Animated.Value(CONTAINER_HEIGHT.Collapse)
  ).current;

  const {
    localStorageData: { [LocalStorageKey.Token]: TOKEN }
  } = useLocalStorage();

  const [
    doDeleteBankCard,
    {
      isError: hasErrorByDelete,
      isLoading: isLoadingByDelete,
      isSuccess: isSuccesByDelete
    }
  ] = useDeleteBankCardRequest();
  const [
    doSetDefaultBankCard,
    {
      isError: isErrorBySetDefaultCard,
      isLoading: isLoadingBySetDefaultBankCard,
      isSuccess: isSuccessBySetDefaultBankCard
    }
  ] = useSetDefaultBankCardRequest();

  const onPressDelete = () => setShowConfirmationPopup(true);
  const onPressDoFavorite = () => {
    doSetDefaultBankCard({
      token: TOKEN,
      cardId: card.id
    });
  };
  const onDelete = () => {
    doDeleteBankCard({
      cardId: card.id,
      token: TOKEN
    }).then(() => {
      setShowConfirmationPopup(false);
    });
  };
  const onChangePaymentType = (value: CardPaymentOptions) => {
    setFormValues({ ...formValues, paymentType: value });
    setHasError({ ...hasError, paymentType: false });
    props.onHasError?.(false || hasError.cvv);
    props.onValueChange?.({
      ...formValues,
      paymentType: value
    });
  };

  const onChangeCVV = (value: string) => {
    setFormValues({ ...formValues, cvv: value });
    !!value && setHasError({ ...hasError, cvv: false });
    props.onHasError?.((!value && hasError.cvv) || hasError.paymentType);
    props.onValueChange?.({
      ...formValues,
      cvv: value
    });
  };

  useEffect(() => {
    const durationS = 100;
    const heigthValue = props.isSelected
      ? card.paymentOptions?.length > 0
        ? CONTAINER_HEIGHT.Expand
        : CONTAINER_HEIGHT.ExpandWithPaymentType
      : CONTAINER_HEIGHT.Collapse;
    if (!props.isSelected) {
      setFormValues(undefined);
      setHasError({ cvv: false, paymentType: false });
    }
    const animation = Animated.spring(animationHeightValue, {
      toValue: heigthValue,
      useNativeDriver: false,
      delay: durationS
    });
    props.isSelected && setShowCardVerificationForm(true);
    animation.start(({ finished }) => {
      if (finished && !props.isSelected) setShowCardVerificationForm(false);
    });
  }, [props.isSelected]);

  return (
    <Animated.View
      style={[Styles.cardContainer, { height: animationHeightValue }]}>
      <View style={Styles.cardFirstLine}>
        <View style={{ marginHorizontal: 12 }}>
          <RadioButton.Android
            uncheckedColor={COLORS.DARK}
            color={COLORS.BRAND}
            status={props.isSelected ? 'checked' : 'unchecked'}
            onPress={() => props.onSelect?.(card)}
            value={''}
          />
        </View>
        <Image
          style={{ width: 64, height: 37 }}
          resizeMode="center"
          source={{ uri: getUrlImageHybris(card.cardLogo.url) }}
        />
        <Text
          lineBreakMode={'clip'}
          numberOfLines={2}
          style={[FontStyles.Body_2, Styles.cardFirstLineText]}>
          {capitalize(card.cardType)}
          {` terminada \nen `}
          <Text style={[FontStyles.Bold]}>
            {card.cardNumber.replace(/\*/g, '')}
          </Text>
          {` - Exp ${card.expiryMonth}/${card.expiryYear}`}
        </Text>
      </View>
      <View style={Styles.cardSecondLine}>
        {isLoadingBySetDefaultBankCard ? (
          <ActivityIndicator color={COLORS.BRAND} />
        ) : (
          <TouchableOpacity onPress={onPressDoFavorite}>
            <Text
              style={[
                FontStyles.DarkColor,
                FontStyles.Subtitle,
                Styles.cardSecondLineText,
                { textDecorationLine: 'underline' }
              ]}>
              Hacer favorita
            </Text>
          </TouchableOpacity>
        )}
        {isLoadingByDelete ? (
          <ActivityIndicator color={COLORS.BRAND} />
        ) : (
          <TouchableOpacity onPress={onPressDelete}>
            <Text
              style={[
                FontStyles.DarkColor,
                FontStyles.Subtitle,
                Styles.cardSecondLineText,
                { textDecorationLine: 'underline' }
              ]}>
              Eliminar
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {showCardVerificationForm && (
        <Animated.View style={[Styles.cardThirdLine]}>
          <InputBase
            dense
            label="CVV"
            placeholder="CVV"
            keyboardType="numeric"
            returnKeyType="done"
            numberOfLines={1}
            multiline={false}
            maxLength={5}
            value={formValues?.cvv}
            onChangeText={onChangeCVV}
            error={hasError.cvv}
            onEndEditing={(e: any) => {
              const isInvalid = !e.nativeEvent.text;
              setHasError({ ...hasError, cvv: isInvalid });
              if (isInvalid) {
                props.onHasError?.(true);
              }
            }}
          />
          {card.paymentOptions?.length > 0 && (
            <SelectInput
              label="Tipo de pago"
              namePropertyDisplay="option"
              items={card.paymentOptions || []}
              onChange={onChangePaymentType}
              value={formValues?.paymentType}
              error={hasError.paymentType}
              styles={{ marginTop: 8 }}
            />
          )}
        </Animated.View>
      )}
      <Popup
        visible={showConfirmationPopup}
        title="¿Estás seguro que deseas eliminar esta tarjeta?"
        showCloseButton={true}
        closeAction={() => setShowConfirmationPopup(false)}
        buttonAction={onDelete}
        buttonDisabled={isLoadingByDelete}
        buttonLoading={isLoadingByDelete}
        buttonText={'ACEPTAR'}
        buttonType={'full'}
        bodyComponent={() => (
          <Button
            linkName="Cancelar"
            onPress={() => setShowConfirmationPopup(false)}
            backgroundColor={COLORS.WHITE}
            textColor={COLORS.BRAND}
            textStyle={{ textDecorationLine: 'underline' }}
          />
        )}
        titleStyle={FontStyles.Justify}
      />
    </Animated.View>
  );
};

export const Styles = StyleSheet.create({
  cardContainer: {
    padding: 8,
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.DARK,
    overflow: 'hidden',
    height: 80
  },
  cardFirstLine: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'center'
  },
  cardFirstLineText: {
    textAlign: 'left',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    width: '70%'
  },
  cardSecondLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardSecondLineText: {
    marginHorizontal: 16
  },
  cardThirdLine: {
    marginTop: 8
  },
  textButton: {
    flexDirection: 'row'
  }
});

export interface BankCardProps {
  card: Card;
  isSelected?: boolean;
  onSelect?: (card: Card) => void;
  onHasError?: (hasError: boolean) => void;
  onValueChange?: (args: FormValue) => void;
}

export interface FormValue {
  cvv?: string;
  paymentType?: CardPaymentOptions;
}
