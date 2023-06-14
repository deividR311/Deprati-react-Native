import * as React from 'react';
import { View, ScrollView } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { COLORS } from '../../../../application/common/colors';
import { FontStyles } from '../../../../application/common/fonts';
import Button from '../../../common-components/buttons/Button';
import ErrorPage from '../../ErrorPage';
import { usePurchaseConfirmation } from '../hooks/usePurchaseConfirmation.hook';
import { Styles } from './purchase-confirmation.stylesheet';
import {
  TicketHeader,
  TicketShop,
  TicketAccount,
  TicketDetailItems,
  TicketPromotions,
  TicketPayment,
  TicketTotals,
  TicketObservations
} from '../components';

export const PurchaseConfirmation: React.FC = () => {
  const {
    ticket,
    doAcceptPurchase,
    doRejectPurchase,
    isLoadingByAccept,
    isLoadingByReject,
    isLoadingByTicket,
    hasError
  } = usePurchaseConfirmation();

  if (hasError) return <ErrorPage />;

  return (
    <>
      <SkeletonContent
        isLoading={isLoadingByTicket}
        animationDirection="diagonalDownRight"
        animationType="pulse"
        containerStyle={{ width: '100%' }}
        layout={[{ width: '100%', height: 50 }]}>
        <TicketHeader ticket={ticket} />
      </SkeletonContent>
      <ScrollView style={Styles.scroll}>
        <SkeletonContent
          isLoading={isLoadingByTicket}
          animationDirection="diagonalDownRight"
          animationType="pulse"
          containerStyle={{ flex: 1 }}
          layout={[
            { width: '100%', height: 100, marginBottom: 10 },
            { width: '100%', height: 100, marginBottom: 10 },
            { width: '100%', height: 100, marginBottom: 10 },
            { width: '100%', height: 100, marginBottom: 10 },
            { width: '100%', height: 100, marginBottom: 10 },
            { width: '100%', height: 100, marginBottom: 10 },
            { width: '100%', height: 100, marginBottom: 10 },
            { width: '100%', height: 100, marginBottom: 10 }
          ]}>
          <>
            <TicketShop ticket={ticket} />
            <TicketAccount ticket={ticket} />
            <TicketDetailItems ticket={ticket} />
            <TicketPromotions ticket={ticket} />
            <TicketPayment ticket={ticket} />
            <TicketTotals ticket={ticket} />
            <TicketObservations ticket={ticket} />
          </>
          <View style={Styles.container__buttons}>
            <Button
              linkName="CANCELAR"
              marginTop={14}
              containerStyle={{
                width: '45%',
                borderColor: COLORS.DARK70,
                borderWidth: 1
              }}
              backgroundColor={COLORS.WHITE}
              textColor={FontStyles.MutedDarkColor.color}
              onPress={doRejectPurchase}
              disabled={
                isLoadingByAccept || isLoadingByReject || isLoadingByTicket
              }
              showActivityIndicator={isLoadingByReject}
            />

            <Button
              linkName="CONFIRMAR"
              marginTop={14}
              containerStyle={{ width: '45%' }}
              backgroundColor={COLORS.BRAND}
              textColor={FontStyles.LightColor.color}
              onPress={doAcceptPurchase}
              disabled={
                isLoadingByAccept || isLoadingByReject || isLoadingByTicket
              }
              showActivityIndicator={isLoadingByAccept}
            />
          </View>
        </SkeletonContent>
      </ScrollView>
    </>
  );
};
