import { useEffect } from 'react';
import {
  Ticket,
  useContactlessTicketByIdRequest
} from '../../../../infrastucture/apis/contactless-payment';
import { useRoute } from '@react-navigation/native';

export const useTicketDetail = (): TicketDetailHook => {
  const route = useRoute();
  const { params } = route;
  const [getTicketId, { isLoading, isSuccess, data }] =
    useContactlessTicketByIdRequest();

  useEffect(() => {
    getTicketId({
      idTicket: params?.ticketId
    });
  }, [params?.ticketId]);

  return {
    isLoading,
    isSuccess,
    ticket: data?.data
  };
};

export interface TicketDetailHook {
  ticket?: Ticket;
  isLoading: boolean;
  isSuccess: boolean;
}
