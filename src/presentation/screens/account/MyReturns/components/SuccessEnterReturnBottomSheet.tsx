import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FontStyles } from '../../../../../application/common';
import {
  BottomSheet,
  IconButton
} from '../../../../common-components/bottomSheet';
import Button from '../../../../common-components/buttons/Button';
import { styles } from './styleSuccessEnterReturnBottomSheet.stylesheet';
import { SuccessEnterReturnProps as SuccessReturnProps } from '../interfaces/IMyReturnsSearch.interface';

const TITLE = '¡Tu solicitud ha\nsido ingresada!';
const TEXT_BUYINGCONTINUE = 'SEGUIR COMPRANDO';
const TEXT_TICKET = 'Tu número de ticket #';
export const SuccessEnterReturnBottomSheet: FC<SuccessReturnProps> = props => {
  const {
    show,
    ticketNumber,
    handleClose,
    handleGoSeeDetails,
    percentage = 75
  } = props;

  return (
    <BottomSheet
      percentage={percentage}
      show={show}
      canDrop={false}
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
          {TITLE}
        </Text>
        <Text style={[FontStyles.Body_1, FontStyles.Center, styles.ticket]}>
          {TEXT_TICKET}
          {ticketNumber}
        </Text>

        <View style={styles.card}>
          <Text
            style={[
              FontStyles.H6_Headline,
              FontStyles.Center,
              styles.seeDetail
            ]}
            onPress={handleGoSeeDetails}>
            Ver detalle.
          </Text>

          <Text style={[FontStyles.Body_1, FontStyles.Center, styles.textCard]}>
            Si tienes alguna duda comunícate con Servicio al cliente a los
            números: Guayaquil (04) 3751800 Quito (02) 3950400
          </Text>
        </View>
      </View>
      <View style={styles.contentButtons}>
        <Button
          linkName={TEXT_BUYINGCONTINUE}
          marginTop={14}
          containerStyle={{ width: '95%', height: 45 }}
          backgroundColor={COLORS.BRAND}
          textColor={FontStyles.LightColor.color}
          onPress={handleClose}
          textStyle={{
            marginHorizontal: 10
          }}
        />
      </View>
    </BottomSheet>
  );
};
