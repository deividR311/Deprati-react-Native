import { StackActions, useNavigation } from '@react-navigation/native';
import { NAV } from '../../../../../../application/common';
import { useListenerAccount } from '../../../../../../application/state-manager/services/listenerAccount/useListenerAccount.hook';
import { LocalStorageKey } from '../../../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../../../application/state-manager/services/localstorage/useLocalStorage';
import sleep from '../../../../../../application/utils/sleep';
import { AccountNavigationRoute } from '../../../../../navigation/account';
import { OrdersNavigationRoute } from '../../../../../navigation/account/my-orders/my-orders.navigator';
import { PurchaseProcessedProps } from '../utils/utilsPurcharse';

export const usePurchaseProcessed = ({
  onCloseRequest,
  show
}: PurchaseProcessedProps): PurchaseProcessedHook => {
  const navigation = useNavigation();
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();

  const { onIsComesFromPaying } = useListenerAccount();

  const onBuyingContinue = async () => {
    onCloseRequest();
    await sleep(501);
    navigation.dispatch(
      StackActions.replace(NAV.DASHBOARD_NAVIGATION, {
        screen: NAV.DASHBOARD_INICIO,
        params: {
          screen: NAV.HOME
        }
      })
    );
  };

  const onSeeOrderDetails = async (code: string) => {
    onCloseRequest();
    onIsComesFromPaying(true);
    await sleep(401);
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
                          { name: OrdersNavigationRoute.MyOrders },
                          {
                            name: OrdersNavigationRoute.OrderDetails,
                            params: {
                              orderId: code,
                              userEmail: USER_EMAIL
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

  const handleClose = () => {
    if (show) {
      onCloseRequest();
      navigation.navigate(NAV.HOME as never);
    }
  };
  const handleModifyTitle = (text: string) => {
    if (text) return text.replace('procesada', '\nprocesada');
    return '';
  };

  return {
    onBuyingContinue,
    onSeeOrderDetails,
    handleClose,
    handleModifyTitle
  };
};

export interface PurchaseProcessedHook {
  onBuyingContinue(): void;
  onSeeOrderDetails(code: string): void;
  handleClose(): void;
  handleModifyTitle(text: string): string;
}
