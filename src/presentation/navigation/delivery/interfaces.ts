import { CartData } from '../../../infrastucture/apis/shopping-cart';

export enum DeliveryNavigationRoute {
  DeliveryThirdParty = 'DELIVERY@DELIVERYTHIRDPARTY',
  DeliverySelect = 'DELIVERY@DELIVERYSELECT',
  DeliveryAddress = 'DELIVERY@DELIVERYADDRESS',
  DeliveryStorePickup = 'DELIVERY@DELIVERYSTOREPICKUP'
}

export type DeliveryNavigationParams = {
  [DeliveryNavigationRoute.DeliveryThirdParty]: {
    cartId: string;
    dataCart: CartData;
  };
  [DeliveryNavigationRoute.DeliverySelect]: {
    cartId: string;
    dataCart: CartData;
  };
  [DeliveryNavigationRoute.DeliveryAddress]: {
    cartId: string;
    dataCart: CartData;
  };
  [DeliveryNavigationRoute.DeliveryStorePickup]: {
    cartId: string;
    dataCart: CartData;
  };
};
