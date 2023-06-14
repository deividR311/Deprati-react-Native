import Emarsys from 'react-native-emarsys-wrapper';
import { CartData, Entry } from '../../apis/shopping-cart';
import { CustomerOrderDetail } from '../../apis/customer-orders/interfaces/customer-order-detail.type';
import Config from '../../../application/common/dotEnv';

export const setContactEmarsys = async (contactFieldValue: string) => {
  try {
    const contactFieldId = Number(Config.EMARSYS_CONTACT_FIELD_ID);
    if (contactFieldId && contactFieldValue) {
      await Emarsys.setContact(contactFieldId, contactFieldValue);
    }
  } catch (e) {}
};

export const changeApplicationCode = async () => {
  try {
    await Emarsys.changeApplicationCode(Config.EMARSYS_APPLICATION_CODE);
  } catch (e) {}
};

export const changeMerchantId = async () => {
  try {
    await Emarsys.changeMerchantId(Config.EMARSYS_MERCHANTID);
  } catch (e) {}
};

export const clearContactEmarsys = async () => {
  try {
    await Emarsys.clearContact();
  } catch (e) {}
};

export const trackCategoryViewEmarsys = async (
  category: string,
  addHome: boolean = true
) => {
  let categoryPath = addHome ? `Home>${category}` : category;
  try {
    await Emarsys.predict.trackCategoryView(categoryPath);
  } catch (e) {}
};

export const mapCategoryViewEmarsys = (categorys: any[], key: string) => {
  return categorys?.map(category => category[key]).join('>');
};

export const trackCustomEvent = async (
  eventName: string,
  eventAttributes: Object
) => {
  try {
    await Emarsys.trackCustomEvent(eventName, eventAttributes);
  } catch (e) {}
};

export const trackItemView = async (itemId: string) => {
  try {
    await Emarsys.predict.trackItemView(itemId);
  } catch (e) {}
};

export const trackSearchTerm = async (searchTerm: string) => {
  try {
    await Emarsys.predict.trackSearchTerm(searchTerm);
  } catch (e) {}
};

export const trackRecommendationClick = async (product: any) => {
  try {
    await Emarsys.predict.trackRecommendationClick(product);
  } catch (e) {}
};

export const productToCartItem = (product: Entry) => ({
  itemId: product?.product?.code ?? '',
  price: product?.totalPrice?.value ?? 0,
  quantity: product?.quantity ?? 0
});

export const TrackCart = async (dataCart: CartData) => {
  try {
    const cartItems = dataCart.products.map(productToCartItem) ?? [];
    await Emarsys.predict.trackCart(cartItems);
  } catch (e) {}
};

export const TrackPurchase = async (dataCart: CustomerOrderDetail) => {
  try {
    let orderId = dataCart.code;
    const cartItems = dataCart.entries?.map(productToCartItem) ?? [];
    await Emarsys.predict.trackPurchase(orderId, cartItems);
  } catch (e) {}
};
