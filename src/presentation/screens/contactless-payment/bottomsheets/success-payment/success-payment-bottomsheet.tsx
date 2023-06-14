import React, { FC, useEffect } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../../../application/common/colors';
import { FontStyles } from '../../../../../application/common/fonts';
import { keyEventsViewModal } from '../../../../../infrastucture/native-modules/emma';
import { trackEventView } from '../../../../../infrastucture/native-modules/emma/useEmma.hook';
import {
  BottomSheet,
  IconButton
} from '../../../../common-components/bottomSheet';
import Button from '../../../../common-components/buttons/Button';
import { useSuccessPurchase } from '../../hooks/useSuccessPurchase.hook';
import { Styles } from './success-payment-bottomsheet.stylesheet';

interface SuccessPauymentBottomSheetProps {
  show: boolean;
  text: string;
  ticketId: string;
  onCloseRequest?: () => void;
}

export const SuccessPaymentBottomSheet: FC<
  SuccessPauymentBottomSheetProps
> = props => {
  const { show, text: ORDER_NUMBER_TEXT, ticketId } = props;
  const { onBuyingContinue, onSeeOrderDetails } = useSuccessPurchase();

  useEffect(() => {
    if (show) {
      trackEventView(keyEventsViewModal.credito_pagosincontacto_confirmacion);
    }
  }, [show]);

  return (
    <BottomSheet
      show={show}
      percentage={95}
      canDrop={false}
      header={
        <View style={Styles.iconButtomContainer}>
          <IconButton
            testID={'close_modal'}
            iconName="close"
            onPress={onBuyingContinue}
          />
        </View>
      }>
      <View style={Styles.contentContainer}>
        <Icon
          name={'check-circle'}
          size={80}
          style={Styles.checkMarkIcon}
          color={Styles.checkMarkIcon.color}
        />
        <Text style={[FontStyles.H6_Headline, FontStyles.Center, Styles.title]}>
          ¡Tu compra ha sido {'\n'}procesada con éxito!
        </Text>
        <Text
          style={[
            FontStyles.Body_1,
            FontStyles.Center,
            FontStyles.PrimaryColor
          ]}>
          Número de ticket #{ORDER_NUMBER_TEXT}
        </Text>
        <View style={Styles.card}>
          <Text style={[FontStyles.Body_1, FontStyles.Center]}>
            Recibirás un correo electrónico, con la {'\n'}
            información de tu compra.
            {'\n\n'}
            Sigue disfrutando lo mejor en Moda, {'\n'}
            Hogar y Tecnología que tenemos{'\n'}
            en nuestra App De Prati!
          </Text>
        </View>
        <Button
          linkName="SEGUIR COMPRANDO"
          marginTop={14}
          containerStyle={{ width: '95%' }}
          backgroundColor={COLORS.BRAND}
          textColor={FontStyles.LightColor.color}
          onPress={onBuyingContinue}
          textStyle={{
            marginHorizontal: 10
          }}
        />
        <Button
          linkName="VER DETALLE DE LA COMPRA"
          marginTop={14}
          containerStyle={{ width: '95%' }}
          backgroundColor={COLORS.GRAYDARK60}
          textColor={FontStyles.MutedDarkColor.color}
          onPress={() => onSeeOrderDetails(ticketId)}
          textStyle={{
            marginHorizontal: 10
          }}
        />
      </View>
    </BottomSheet>
  );
};
