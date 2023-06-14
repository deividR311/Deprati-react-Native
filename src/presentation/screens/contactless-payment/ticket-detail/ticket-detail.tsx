import React from 'react';
import { useTicketDetail } from './ticket-detail.hook';
import TemplatePage from '../../../common-components/template-page';
import { TicketDetailSkeleton } from './ticket-detail.skeleton';
import { ScrollView } from 'react-native';
import {
  TicketHeader,
  TicketShop,
  TicketAccount,
  TicketDetailItems,
  TicketPromotions,
  TicketPayment,
  TicketBalance,
  TicketTotals,
  TicketObservations
} from '../components';

export const TicketDetail: React.FC = () => {
  const { ticket, isLoading } = useTicketDetail();
  return (
    <TemplatePage
      loading={isLoading}
      skeleton={<TicketDetailSkeleton />}
      loadingWithModal={false}
      noFoundPage={false}>
      <ScrollView
        style={{ marginBottom: 80 }}
        showsVerticalScrollIndicator={false}>
        <TicketHeader ticket={ticket} />
        <TicketShop ticket={ticket} />
        <TicketAccount ticket={ticket} />
        <TicketDetailItems ticket={ticket} />
        <TicketPromotions ticket={ticket} />
        <TicketPayment ticket={ticket} />
        <TicketBalance ticket={ticket} />
        <TicketTotals ticket={ticket} />
        <TicketObservations ticket={ticket} />
      </ScrollView>
    </TemplatePage>
  );
};
