import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../../../application/common/namesNav';
import { useContactlessPaymentState } from '../../../../application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import { AccountNavigationRoute } from '../../../navigation/account';
import { OrdersNavigationRoute } from '../../../navigation/account/my-orders/my-orders.navigator';
import sleep from '../../../../application/utils/sleep';
import { TypeOrderEnum } from '../../account/MyOrders/MyOrdersScreen';

export const useSuccessPurchase = (): SuccessPurchaseHook => {
  const navigation = useNavigation();

  const {
    showSuccessBuy,
    doEnableConfirmPurchaseButton,
    TicketNumberContactLessPayment: ORDER_NUMBER
  } = useContactlessPaymentState();

  const onBuyingContinue = () => {
    showSuccessBuy(false);
    doEnableConfirmPurchaseButton(false);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: NAV.DASHBOARD_NAVIGATION as never,
          state: { index: 0, routes: [{ name: NAV.DASHBOARD_INICIO }] }
        }
      ]
    });
  };

  const onSeeOrderDetails = async (ticketId: string) => {
    showSuccessBuy(false);
    doEnableConfirmPurchaseButton(false);
    await sleep(600);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: NAV.DASHBOARD_NAVIGATION as never,
          state: {
            index: 0,
            routes: [
              {
                name: NAV.ACCOUNT,
                state: {
                  index: 1,
                  routes: [
                    {
                      name: AccountNavigationRoute.Home
                    },
                    {
                      name: AccountNavigationRoute.Orders,
                      state: {
                        index: 1,
                        routes: [
                          {
                            name: OrdersNavigationRoute.MyOrders,
                            params: {
                              selectTypeOrder: TypeOrderEnum.CONTACTO
                            }
                          },
                          {
                            name: OrdersNavigationRoute.TicketDetail,
                            params: {
                              ticketId: ticketId ?? ORDER_NUMBER
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                name: NAV.HOME
              }
            ]
          }
        }
      ]
    });
  };

  return {
    onBuyingContinue,
    onSeeOrderDetails
  };
};

export interface SuccessPurchaseHook {
  onBuyingContinue: () => void;
  onSeeOrderDetails: (ticketId: string) => void;
}
