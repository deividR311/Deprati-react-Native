import { OrderEntry } from '../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';

export enum EcommerceNavigationRoute {
  PurchaseItemReview = 'ECOMMERCE@PURCHASE_ITEM_REVIEW',
  Stories = 'ECOMMERCE@STORIES',
  Searchproduct = 'ECOMMERCE@SEARCHPRODUCT',
  Barcode = 'ECOMMERCE@BARCODE',
  ProductPage = 'PRODUCTPAGE',
  ProductPageSAP = 'ECOMMERCE@PRODUCTPAGESAP',
  CaruselProductPage = 'ECOMMERCE@CARUSELPRODUCTPAGE',
  CategoryPage = 'ECOMMERCE@CATEGORYPAGE'
}

export type EcommerceNavigationParams = {
  [EcommerceNavigationRoute.PurchaseItemReview]: OrderEntry;
  [EcommerceNavigationRoute.Stories]: undefined;
  [EcommerceNavigationRoute.Searchproduct]: undefined;
  [EcommerceNavigationRoute.ProductPage]: undefined;
  [EcommerceNavigationRoute.ProductPageSAP]: undefined;
  [EcommerceNavigationRoute.CaruselProductPage]: undefined;
  [EcommerceNavigationRoute.Barcode]: undefined;
};
