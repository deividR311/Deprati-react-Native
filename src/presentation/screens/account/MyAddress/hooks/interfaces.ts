import { ParamListBase, RouteProp } from '@react-navigation/native';
import { ViewStyle } from 'react-native';
import { AddressDto } from '../../../../../infrastucture/apis/address';

export interface ListAddressDelivery {
  default?: AddressDto | null;
  others?: AddressDto[] | any[];
}

export interface IModalInfo {
  showModal: boolean;
  message?: string;
  type?: string;
  textButtonModal?: string;
  actionButton?(): void;
}

export interface AdressPaymentFormProps {
  route?: RouteProp<ParamListBase, string>;
  style?: ViewStyle;
  contentButtonsStyle?: ViewStyle;
  isModal?: boolean;
  onAction?(): void;
}
