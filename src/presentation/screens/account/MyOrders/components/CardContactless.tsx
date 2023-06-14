import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MainButton } from '../../../../common-components/buttons/Button';
import { OrdersNavigationRoute } from '../../../../navigation/account/my-orders/my-orders.navigator';
import { Ticket } from '../../../../../infrastucture/apis/contactless-payment';
import { COLORS, FontStyles } from '../../../../../application/common';
import { formatToCurrecy } from '../../../../../application/utils/currency';
import { fontFamilyOS, fontWeightOS } from '../../../../../application/utils';
import { t } from 'i18next';

export default function CardContactless({ ticket }: { ticket: Ticket }) {
  const navigation = useNavigation();

  return (
    <View style={[styles.viewCard]}>
      <View style={styles.viewCard__content}>
        <Text style={styles.containerTitle}>{ticket?.fechaCadena}</Text>
        <View style={styles.content_extra}>
          <Text style={styles.subtitle}>{ticket?.tienda}</Text>
          <Text style={styles.price}>
            {formatToCurrecy(ticket?.totalConIva)}
          </Text>
        </View>
      </View>
      <MainButton
        style={styles.buttonDetails}
        title={`${t('APP_BOTON_LABEL.seeDetails')}`}
        onPress={() => {
          navigation.navigate(
            OrdersNavigationRoute.TicketDetail as never,
            { ticketId: ticket.uniqueIdTicket } as never
          );
        }}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  viewCard: {
    borderRadius: 4,
    marginVertical: 11,
    backgroundColor: COLORS.WHITE,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    marginHorizontal: 16,
    padding: 16
  },
  viewCard__content: {
    width: '100%'
  },
  containerTitle: {
    ...FontStyles.Subtitle,
    textAlign: 'left'
  },
  content_extra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  subtitle: {
    ...FontStyles.Body_2,
    textTransform: 'capitalize'
  },
  price: {
    ...FontStyles.Body_2,
    color: COLORS.BRAND,
    fontStyle: 'normal',
    fontFamily: fontFamilyOS('Bold'),
    fontWeight: fontWeightOS('500'),
    textAlign: 'right',
    letterSpacing: 0.8
  },
  buttonDetails: {
    alignSelf: 'center',
    width: '100%'
  }
});
