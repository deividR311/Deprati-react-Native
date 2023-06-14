export interface PointOfServiceModel {
  posGroups: IPosGroup[];
}

export interface IPosGroup {
  code: string;
  name: string;
  posList: IPosList[];
}

export interface IPosList {
  address: IAddress;
  displayName?: string;
  features: IFeatures;
  geoPoint: IGeoPoint;
  name: string;
  openingHours: IOpeningHours;
  storeImages: any[];
  schedule: ISchedule[];
}

export interface IAddress {
  country: ICountry;
  defaultAddress: boolean;
  formattedAddress: string;
  id: string;
  line1: string;
  phone: string;
  region: IRegion;
  shippingAddress: boolean;
  town: string;
  visibleInAddressBook: boolean;
  cellphoneNumber?: string;
}

export interface ICountry {
  isocode: string;
  name: string;
}

export interface IRegion {
  countryIso: string;
  isocode: string;
  isocodeShort: string;
  name: string;
}

export interface IFeatures {}

export interface IGeoPoint {
  latitude: number;
  longitude: number;
}

export interface IOpeningHours {
  code: string;
  specialDayOpeningList: any[];
  weekDayOpeningList: IWeekDayOpeningList[];
}

export interface IWeekDayOpeningList {
  closingTime?: IIngTime;
  openingTime?: IIngTime;
  closed: boolean;
  weekDay: string;
}

// export interface IIngTime {
//   formattedHour: string
//   hour: number
//   minute: number
// }

export interface IIngTimeBasic {
  formattedHour: string;
  hour: number;
}
export interface IIngTime extends IIngTimeBasic {
  minute: number;
}

export interface ISchedule {
  closingTime: IIngTimeBasic;
  openingTime: IIngTimeBasic;
  days: string[];
}
