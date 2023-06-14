import { AddressDto } from '../../../infrastucture/apis/address';
import { OrderEntry } from '../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';

export enum AccountNavigationRoute {
  Home = 'ACCOUNT@HOME',
  Notifications = 'ACCOUNT@NOTIFICATIONS',
  Detail_Notification = 'ACCOUNT@DETAIL_NOTIFICATION',
  AddressDelivery = 'ACCOUNT@ADDRESS_DELIVERY',
  AdressForm = 'ACCOUNT@ADDRESS_FORM',
  AddressPaymentForm = 'ACCOUNT@ADDRESS_PAYMENT_FORM',
  SupportTickets = 'ACCOUNT@SUPPORT_TICKETS',
  PurchaseItemReview = 'ACCOUNT@PURCHASE_ITEM_REVIEW',
  StoresList = 'ACCOUNT@STORES_LIST',
  StoreDetail = 'ACCOUNT@STORE_DETAIL',
  MyData = 'ACCOUNT@MY_DATA',
  Profile = 'ACCOUNT@PROFILE',
  CostumerService = 'ACCOUNT@COSTUMER_SERVICE',
  MyReturns = 'ACCOUNT@MY_RETURNS',
  Orders = 'ACCOUNT@ORDERS'
}

export type AccountNavigationParams = {
  [AccountNavigationRoute.Home]: undefined;
  [AccountNavigationRoute.Orders]: undefined;
  [AccountNavigationRoute.PurchaseItemReview]: OrderEntry;
  [AccountNavigationRoute.StoresList]: undefined;
  [AccountNavigationRoute.Profile]: undefined;
  [AccountNavigationRoute.AdressForm]: AddressDto;
  [AccountNavigationRoute.SupportTickets]: undefined;
  [AccountNavigationRoute.MyData]: undefined;
  [AccountNavigationRoute.MyReturns]: undefined;
  [AccountNavigationRoute.StoreDetail]: {
    codTienda: number;
    codTiendaSAP: string;
    nombre_Tienda: string;
    direccion: string;
    numero_Contacto: string;
    latitud: number;
    longitud: number;
    ciudad: string;
    distancia: number;
  };
};
