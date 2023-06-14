export interface UserRequest {
  email: string;
  token?: string;
}

export interface UserUpdateRequestMetaData {
  userEmail: string;
  token?: string;
}
export interface UserUpdateRequestBody {
  typeId: string;
  firstName: string;
  lastName: string;
  genderCode: string;
  country: {
    isocode: string;
    name: string;
  };
  provinceCode: string;
  cityCode: string;
}

export interface UserResponse {
  type: string;
  name: string;
  uid: string;
  cityCode: string;
  country: Country;
  currency: Currency;
  customerId: string;
  defaultAddress: DefaultAddress;
  displayUid: string;
  documentTypeId: string;
  documentTypeNumber: string;
  firstName: string;
  genderCode: 'MALE' | 'FEMALE' | '';
  language: Currency;
  lastName: string;
  provinceCode: string;
  emarsysClientId: string;
  directCreditCodeAdditional?: string;
  directCreditCodeCustomer?: string;
}

export interface Country {
  isocode: string;
  name: string;
}

export interface Currency {
  active: boolean;
  isocode: string;
  name: string;
  symbol?: string;
  nativeName?: string;
}

export interface DefaultAddress {
  cellphoneNumber: string;
  cellphonePreffix: string;
  country: Country;
  defaultAddress: boolean;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string;
  line1: string;
  line2: string;
  otherInfo: string;
  phone: string;
  region: Region;
  shippingAddress: boolean;
  town: string;
  visibleInAddressBook: boolean;
}

export interface Region {
  countryIso: string;
  isocode: string;
  isocodeShort: string;
  name: string;
}

export const USER_DEFAULT_DATA: UserResponse = {
  type: '',
  name: '',
  uid: '',
  cityCode: '',
  country: {
    isocode: '',
    name: ''
  },
  currency: {
    active: false,
    isocode: '',
    name: '',
    symbol: ''
  },
  customerId: '',
  defaultAddress: {
    cellphoneNumber: '',
    cellphonePreffix: '',
    country: {
      isocode: '',
      name: ''
    },
    defaultAddress: false,
    email: '',
    firstName: '',
    formattedAddress: '',
    id: '',
    line1: '',
    line2: '',
    otherInfo: '',
    phone: '',
    region: {
      countryIso: '',
      isocode: '',
      isocodeShort: '',
      name: ''
    },
    shippingAddress: false,
    town: '',
    visibleInAddressBook: false
  },
  displayUid: '',
  documentTypeId: '',
  documentTypeNumber: '',
  firstName: '',
  genderCode: '',
  language: {
    active: false,
    isocode: '',
    name: '',
    nativeName: ''
  },
  lastName: '',
  provinceCode: '',
  directCreditCodeAdditional: '',
  directCreditCodeCustomer: '',
  emarsysClientId: ''
};

export type GenderCodeType = UserResponse['genderCode'];
export const GenderCodeEnum: Record<GenderCodeType, string> = {
  MALE: 'Masculino',
  FEMALE: 'Femenino',
  '': ''
};

export interface NewUserRequest {
  city: string;
  country: string;
  docId: string;
  firstName: string;
  generoId: string;
  isNewsletterAccepted: boolean;
  lastName: string;
  password: string;
  province: string;
  typeId: string;
  uid: string;
}
