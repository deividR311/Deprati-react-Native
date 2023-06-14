import React, { FC } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontStyles } from '../../../../../application/common/fonts';
import {
  BottomSheet,
  IconButton
} from '../../../../common-components/bottomSheet';
import Button from '../../../../common-components/buttons/Button';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../application/common/colors';

export const ClaimSuccessBottomSheet: FC<
  ClaimSuccessBottomSheetProps
> = props => {
  const {
    show,
    ticketNumber,
    onCloseRequest,
    onSeeClaimDetails,
    onBuyingContinue
  } = props;

  return (
    <BottomSheet
      percentage={70}
      show={show}
      canDrop={false}
      header={
        <View style={Styles.iconButtomContainer}>
          <IconButton iconName="close" onPress={onCloseRequest} />
        </View>
      }>
      <View style={Styles.contentContainer}>
        <Icon
          name={'check-circle'}
          size={80}
          style={Styles.checkMarkIcon}
          color={Styles.checkMarkIcon.color}
        />
        <Text style={[FontStyles.H3_Headline, FontStyles.Center, Styles.title]}>
          ¡Tu solicitud ha{`\n`}sido ingresada!
        </Text>
        <Text
          style={[
            FontStyles.Body_1,
            FontStyles.Center,
            FontStyles.PrimaryColor
          ]}>
          Tu número de ticket #{ticketNumber}
        </Text>
        <View style={Styles.card}>
          <Text
            onPress={onSeeClaimDetails}
            style={[
              FontStyles.H3_Headline,
              FontStyles.Center,
              FontStyles.PrimaryColor
            ]}>
            Ver detalle.
          </Text>
          <View style={Styles.spacing} />
          <Text style={[FontStyles.Body_1, FontStyles.Center]}>
            Si tienes alguna duda comunícate con Servicio al cliente a los
            números:{`\n`}Guayaquil (04) 3751800{`\n`}Quito (02) 3950400
          </Text>
        </View>
        <Button
          linkName="SEGUIR COMPRANDO"
          marginTop={14}
          containerStyle={{ width: '100%' }}
          backgroundColor={COLORS.BRAND}
          textColor={FontStyles.LightColor.color}
          onPress={() => onBuyingContinue?.()}
        />
      </View>
    </BottomSheet>
  );
};
interface ClaimSuccessBottomSheetProps {
  show: boolean;
  ticketNumber: string;
  onCloseRequest?: () => void;
  onSeeClaimDetails?: () => void;
  onBuyingContinue?: () => void;
}

export const Styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButtomContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 11,
    width: '100%'
  },
  checkMarkIcon: {
    color: COLORS.GREENOK
  },
  title: {
    marginTop: 41,
    marginBottom: 5
  },
  spacing: {
    marginVertical: 8
  },
  card: {
    elevation: 4,
    backgroundColor: COLORS.LIGHTGRAY,
    width: '100%',
    paddingHorizontal: 17,
    paddingVertical: 13,
    marginVertical: 15,
    shadowColor: COLORS.DARK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 8
  },
  buttons: {
    marginHorizontal: 22
  }
});
