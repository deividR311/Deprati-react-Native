import { Dispatch, SetStateAction } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AddressPaymentDto } from '../../../../infrastucture/apis/address';
import { BasicAddress } from '../../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';
import { CartData } from '../../../../infrastucture/apis/shopping-cart';
import { PaymentInfo } from '../../../screens/checkout/confirmation/purchaseProcessed/utils/IOrdersPurchaseProccessed.interface';

export interface IListAddress {
  addresses: IAddressPayment[];
}

export interface IAddressPayment {
  defaultAddress: boolean;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string;
  idNumber: string;
  idType: string;
  line1: string;
  line2: string;
  phone: string;
  phonePreffix: string;
  shippingAddress: boolean;
  visibleInAddressBook: boolean;
}

export interface TextRowComponentProps {
  title: string;
  text?: string;
  textStyle?: TextStyle | TextStyle[];
}

export interface IChangeAddress {
  handleSelected(item: IAddressPayment): void;
  addressSelected: AddressPaymentDto | undefined;
}

export interface AddressPaymentProps {
  item: IAddressPayment;
  isButtonChangeData: boolean;
  onChangeData(item: IAddressPayment): void;
  changeAddress: IChangeAddress;
  handleDelete?(idItem: string): void;
  handleAddEdit?(isEdit: boolean, item?: IAddressPayment): void;
  textEditAction?: string;
}
export interface StyleAddressProps {
  style?: StyleProp<ViewStyle>;
  emptyStyle?: StyleProp<ViewStyle>;
  styleSecundaryButton: boolean;
}
export interface BillingAddressProps extends StyleAddressProps {
  onSelected?(x: boolean, address?: IAddressPayment): void;
  showTitle?: boolean;
  addressCart?: string;
  enableHandleEnableButton?: boolean;
  onIsEnable?(x: boolean): void;
  paymentInfo?: PaymentInfo;
  paymentAddress?: BasicAddress;
  paymentCredit?: {
    showAlerAddressPayment: boolean;
    setShowAlerAddressPayment: Dispatch<SetStateAction<boolean>>;
  };
  textEditAction?: string;
}
export interface AddressEmptyProps extends StyleAddressProps {
  onPress?(x: boolean): void;
  children?: React.ReactNode;
}

export interface IModal {
  show: boolean;
  message: string;
  buttonText: string;
}
