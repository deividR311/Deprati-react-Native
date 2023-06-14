export interface AddressDeliveryResponse {
  addresses: AddressDto[];
}

export interface AddressDeliveryBody {
  username: string;
}

export interface AddressDto {
  cellphoneNumber: string;
  cellphonePreffix: string;
  city: string;
  country: {
    isocode: string;
  };
  defaultAddress: boolean;
  firstName: string;
  id?: string;
  line1: string;
  line2: string;
  otherInfo: string;
  phone: string;
  phonePreffix: string;
  region: {
    name?: string;
    isocode: string;
  };
  town: string;
}
export interface AddressDtoBody extends AddressDto, AddressDeliveryBody {}

export interface AddressDeleteRequest extends AddressDeliveryBody {
  id: string;
}

export interface CreateddressDeliveryResponse {
  erros?: ErrorDto[];
}

export interface ErrorDto {
  message: string;
  reason: string;
  subject: string;
  subjectType: string;
  type: string;
}

export interface AddressPaymentResponse {
  addresses: AddressPaymentDto[];
}

export interface AddressPaymentDto {
  defaultAddress: boolean;
  firstName: string;
  id: string;
  line1: string;
  line2: string;
  phone: string;
  phonePreffix: string;
}

export interface AddressPaymentDtoBody
  extends AddressPaymentDto,
    AddressDeliveryBody {}
