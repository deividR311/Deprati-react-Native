export interface PointOfServiceRequest {
  user: string;
}
export interface ICartID {
  cartId: string;
}
export interface SelectPointOfServiceRequest
  extends PointOfServiceRequest,
    ICartID {}

export interface SelectPointOfServiceBody
  extends SelectPointOfServiceRequest,
    SelectPOSRequestBody {}

export interface SelectPOSRequestBody {
  posCode: string;
  selectedAddressCode?: string;
  deliveryMethodCode?: string;
  retireId?: string;
  retireName?: string;
}
export interface ISelectPOSRequest extends ICartID, SelectPOSRequestBody {}

export interface SuccessSelectPointOfServiceResponse {
  status: number;
}

export interface ErrorPointOfServiceResponse {
  status: number;
  data: dataError;
}
export interface dataError {
  errors: ErrorPointOfService[];
}

export interface ErrorPointOfService {
  type: TypeErrorWishlist;
  message: string;
}
export enum TypeErrorWishlist {
  INVALID_TOKEN_ERROR = 'InvalidTokenError'
}
/*********************************
 *********************************
 *********************************/

export interface PointOfServiceResponse {
  posGroups: PosGroup[];
}

export interface PosGroup {
  code: string;
  name: string;
  posList: PosList[];
}

export interface PosList {
  address: Address;
  displayName?: string;
  features: Features;
  geoPoint: GeoPoint;
  name: string;
  openingHours: OpeningHours;
  storeImages: any[];
  schedule: Schedule[];
}

export interface Address {
  country: Country;
  defaultAddress: boolean;
  formattedAddress: string;
  id: string;
  line1: string;
  phone: string;
  region: Region;
  shippingAddress: boolean;
  town: string;
  visibleInAddressBook: boolean;
  cellphoneNumber?: string;
}

export interface Country {
  isocode: string;
  name: string;
}

export interface Region {
  countryIso: string;
  isocode: string;
  isocodeShort: string;
  name: string;
}

export interface Features {}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface OpeningHours {
  code: string;
  specialDayOpeningList: any[];
  weekDayOpeningList: WeekDayOpeningList[];
}

export interface WeekDayOpeningList {
  closingTime?: IngTime;
  openingTime?: IngTime;
  closed: boolean;
  weekDay: string;
}

// export interface IngTime {
//   formattedHour: string
//   hour: number
//   minute: number
// }

export interface IngTimeBasic {
  formattedHour: string;
  hour: number;
}
export interface IngTime extends IngTimeBasic {
  minute: number;
}

export interface Schedule {
  closingTime: IngTimeBasic;
  openingTime: IngTimeBasic;
  days: string[];
}
