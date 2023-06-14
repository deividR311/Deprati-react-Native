import React, { FC, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SupportTicketsNavigationParams,
  SupportTicketsNavigationRoute
} from '../../../navigation/account/support-tickets/support-tickets.navigator';
import { useDetailSupportTicketsRequest } from '../../../../infrastucture/apis/support-tickets/support-tickets.api';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import TemplatePage from '../../../common-components/template-page';
import { TicketState } from '../../../../infrastucture/apis/support-tickets/types';
import { COLORS, FontStyles } from '../../../../application/common';
import Button from '../../../common-components/buttons/Button';
import { formatDateReview } from '../../../../application/utils/formatDate';
import { SkeletonClaimDetail } from './components/skeleton-claim-detail';

export const TicketDetailsScreen: FC<TicketDetailsProps> = props => {
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USERNAME }
  } = useLocalStorage();
  const {
    data: ticketDetails,
    isError,
    isLoading
  } = useDetailSupportTicketsRequest({
    ticketId: props.route.params.ticket?.id ?? '',
    username: USERNAME
  });
  const ticketStatus = useMemo(() => {
    switch (props.route.params.ticket?.status.id.toLowerCase()) {
      case TicketState.New.toLowerCase():
        return 'Nuevo';
      case TicketState.Pending.toLowerCase():
        return 'Pendiente';
      case TicketState.Finished.toLowerCase():
        return 'Cerrado';
      case TicketState.NotApproved.toLowerCase():
        return 'No aprobado';
    }
  }, [props.route.params.ticket?.status.id]);
  const onPressAccept = () => {
    props.navigation.goBack();
  };
  return (
    <TemplatePage
      loading={isLoading}
      error={isError}
      skeleton={<SkeletonClaimDetail />}>
      <View style={styles.container}>
        <Text style={[FontStyles.Body_1, styles.shortSpace]}>Ticket</Text>
        <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
          #{props.route.params.ticket?.id}
        </Text>
        <Text
          style={[
            FontStyles.Body_1,
            FontStyles.PrimaryColor,
            styles.bigSpace,
            styles.shortSpace
          ]}>
          Pedido #{props.route.params.ticket?.associatedTo}
        </Text>
        <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
          Fecha:{' '}
          {formatDateReview(props.route.params.ticket?.creationDate || '')}
        </Text>
        <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
          Cantidad: {ticketDetails?.associatedToTotalUnitCount} items
        </Text>
        <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
          Monto: {ticketDetails?.associatedToTotalPriceWithTax.formattedValue}
        </Text>
        <Text style={[FontStyles.Body_1, styles.bigSpace, styles.shortSpace]}>
          Estado
        </Text>
        <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
          {ticketStatus}
        </Text>
        <View style={styles.line} />
        <Text style={[FontStyles.Body_1, styles.bigSpace, styles.shortSpace]}>
          Motivo del reclamo
        </Text>
        <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
          {props.route.params.ticket?.csTicketCategoryName}
        </Text>
        <View style={styles.line} />
        <Text style={[FontStyles.Body_1, styles.bigSpace, styles.shortSpace]}>
          Comentario del cliente
        </Text>
        {ticketDetails?.ticketEvents.map((te, index) => (
          <Text key={index} style={[FontStyles.Caption, FontStyles.MutedColor]}>
            {te.text}
          </Text>
        ))}

        <Button
          onPress={onPressAccept}
          marginTop={0}
          linkName="ACEPTAR"
          backgroundColor={COLORS.BRAND}
          textColor={COLORS.WHITE}
          containerStyle={styles.button}
        />
      </View>
    </TemplatePage>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  shortSpace: {
    marginBottom: 4
  },
  bigSpace: {
    marginTop: 16
  },
  button: {
    marginTop: 30
  },
  line: {
    width: '100%',
    borderColor: COLORS.GRAYBRAND,
    borderBottomWidth: 1,
    marginTop: 16
  }
});
export interface TicketDetailsProps
  extends NativeStackScreenProps<
    SupportTicketsNavigationParams,
    SupportTicketsNavigationRoute.TicketDetails
  > {}
