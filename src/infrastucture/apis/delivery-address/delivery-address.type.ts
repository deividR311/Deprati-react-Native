import { boolean } from 'yup';
import { DeliveryTimeRanges, PickupTimeRanges } from '../delivery-thirdparty';

export interface baseDeliveryAddressBody {
  cartId: string;
  username: string;
}

export interface setDeliveryAddressBody extends baseDeliveryAddressBody {
  addressId: string;
}

export interface setDeliveryModeBody extends baseDeliveryAddressBody {
  deliveryModeId: string;
}

export interface DeliveryAddressResponse {
  deliveryTimeRanges?: DeliveryTimeRanges[];
  pickupTimeRanges?: PickupTimeRanges;
  productsShippingDisabled?: PickupTimeRanges;
}

export interface DeliveryOptionsResponse {
  addressFormEnabled: boolean;
  hasCartPickupItems: boolean;
  isCartPickupOnly: boolean;
  noAddress: boolean;
  removeAddressEnabled: boolean;
  showThirdParty: boolean;
  defaultAddress?: Address;
  deliveryAddresses?: Address[];
}

export interface Address {
  defaultAddress: boolean;
  shippingAddress: boolean;
  visibleInAddressBook: boolean;
  cellphoneNumber: string;
  cellphonePreffix: string;
  city: string;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string;
  idNumber: string;
  idType: string;
  line1: string;
  line2: string;
  otherInfo: string;
  phone: string;
  phonePreffix: string;
  town: string;
  country: {
    isocode: string;
    name: string;
  };
  region: {
    countryIso: string;
    isocode: string;
    name: string;
    isocodeShort: string;
  };
}
