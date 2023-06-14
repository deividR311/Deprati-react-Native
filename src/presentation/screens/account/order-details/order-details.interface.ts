import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AccountNavigationParams,
  AccountNavigationRoute
} from '../../../navigation/account';
import {
  OrdersNavigationParams,
  OrdersNavigationRoute
} from '../../../navigation/account/my-orders/my-orders.navigator';

export interface OrderDetailsProps
  extends NativeStackScreenProps<
    OrdersNavigationParams,
    OrdersNavigationRoute.OrderDetails
  > {}

export interface OrderReviewProps
  extends NativeStackScreenProps<
    AccountNavigationParams,
    AccountNavigationRoute.PurchaseItemReview
  > {}
