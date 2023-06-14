import { StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { FontStyles } from '../../../../../application/common';
import React, { useMemo } from 'react';
import {
  BaseTicket,
  TicketState
} from '../../../../../infrastucture/apis/support-tickets/types';
import { SupportHeaderCell } from './ticket-section-header';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onPress }) => {
  const ticketStatus = useMemo(() => {
    switch (ticket.status.id.toLowerCase()) {
      case TicketState.New.toLowerCase():
        return 'Nuevo';
      case TicketState.Pending.toLowerCase():
        return 'Pendiente';
      case TicketState.Finished.toLowerCase():
        return 'Cerrado';
      case TicketState.NotApproved.toLowerCase():
        return 'No aprobado';
    }
  }, [ticket]);

  return (
    <>
      <SupportHeaderCell title={`TICKET: ${ticket.id}`} />
      <TouchableRipple
        onPress={() => onPress?.(ticket)}
        style={styles.container}>
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={[FontStyles.Subtitle_2, styles.title]}>
              No. Pedido: #{ticket.associatedTo}
            </Text>
            <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
              Motivo:{' '}
              <Text style={[FontStyles.Bold]}>
                {ticket.csTicketCategoryName}
              </Text>
            </Text>
            <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
              Estado: {ticketStatus}
            </Text>
          </View>
          <View style={styles.caret}>
            <Icon size={24} name="chevron-right" />
          </View>
        </View>
      </TouchableRipple>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  title: {
    marginBottom: 8
  },
  content: {
    flexDirection: 'row'
  },
  textContent: {
    flex: 1
  },
  caret: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24
  }
});

interface TicketCardProps {
  ticket: BaseTicket;
  onPress?: (ticket: BaseTicket) => void;
}
