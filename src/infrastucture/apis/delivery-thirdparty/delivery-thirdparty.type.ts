import { productResponse } from '../product';

export interface ProvincesResponse {
  regions: RegionsDto[];
}

export interface RegionsDto {
  isocode: string;
  name: string;
}

export interface CityBody {
  provinceCode: string;
}
export interface CityResponse {
  regions: RegionsDto[];
}

export interface ThirdPartyAgencyBody {
  cityCode: string;
}
export interface ThirdPartyAgencyResponse {
  posGroups: AgenciesDto[];
}

export interface AgenciesDto {
  code: string;
  name: string;
  posList: AgenciesPosDTo[];
}

export interface AgenciesPosDTo {
  id: string;
  displayName: string;
  formattedAddress: string;
  phone: string;
  geoPoint: {
    latitude: number;
    longitude: number;
  };
}

export interface selectThirdPartyAgencyBody {
  cartId: string;
  posCode: string;
}

export interface updateThirdPartyAgencyBody {
  cartId: string;
  agency: string;
  agencyName: string;
  city: string;
  pointOfService: string;
  province: string;
  retireId: string;
  retireName: string;
  retirePhone: string;
}

export interface selectThirdPartyAgencyResponse {
  deliveryTimeRanges: DeliveryTimeRanges[];
}

export interface DeliveryTimeRanges {
  deliveryCost: number;
  deliveryMethod: string;
  deliveryMethodDescription: string;
  deliveryTimeRange: string;
  totalVolume: number;
  totalWeight: number;
  items: productResponse[];
}

export interface PickupTimeRanges {
  items: {
    ean?: string;
    code?: string;
    name?: string;
    url?: string;
    purchasable?: boolean;
    availableForPickup?: boolean;
  }[];
  stores?: any[];
  deliveryMethod?: string;
}

export interface updateThirdPartyAgencyResponse {
  cartId: string;
}
