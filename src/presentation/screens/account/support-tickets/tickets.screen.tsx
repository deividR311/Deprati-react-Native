import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SupportTicketsNavigationParams,
  SupportTicketsNavigationRoute
} from '../../../navigation/account/support-tickets/support-tickets.navigator';
import { WarrantyMark } from './components/warranty-mark';
import { useSupportTicketsRequest } from '../../../../infrastucture/apis/support-tickets/support-tickets.api';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import TemplatePage from '../../../common-components/template-page';
import { TicketCard } from './components/ticket-card';
import { BaseTicket } from '../../../../infrastucture/apis/support-tickets/types';
import { COLORS } from '../../../../application/common';
import Button from '../../../common-components/buttons/Button';
import { SkeletonList } from './components/skeleton-list';
import { EmptyList } from './components/list-empty';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';

export const SupportTicketsScreen: FC<SupportTicketsProps> = props => {
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USERNAME }
  } = useLocalStorage();
  useEmmaSdk({});
  const { data, isLoading, isError } = useSupportTicketsRequest({
    username: USERNAME
  });

  const onPressMakeClaim = () => {
    props.navigation.navigate(SupportTicketsNavigationRoute.Orders, {
      totalTickets: data?.tickets?.length
    });
  };

  const onPressCell = (ticket: BaseTicket) => {
    props.navigation.navigate(SupportTicketsNavigationRoute.TicketDetails, {
      ticket
    });
  };

  return (
    <TemplatePage
      loading={isLoading}
      error={isError}
      skeleton={<SkeletonList />}>
      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={
            <EmptyList text={`Actualmente no tienes\nreclamos ingresados`} />
          }
          data={data?.tickets}
          style={styles.list}
          renderItem={({ item: ticket }) => (
            <TicketCard onPress={onPressCell} ticket={ticket} />
          )}
          ListFooterComponent={() => (
            <Button
              onPress={onPressMakeClaim}
              marginTop={6}
              linkName="SOLICITAR RECLAMO"
              backgroundColor={COLORS.BRAND}
              textColor={COLORS.WHITE}
              containerStyle={styles.buttonText}
            />
          )}
        />
        <WarrantyMark />
      </View>
    </TemplatePage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
    backgroundColor: COLORS.WHITE
  },
  list: {
    flex: 1
  },
  buttonText: {
    marginHorizontal: 16,
    marginBottom: 16
  }
});

export interface SupportTicketsProps
  extends NativeStackScreenProps<
    SupportTicketsNavigationParams,
    SupportTicketsNavigationRoute.Tickets
  > {}
