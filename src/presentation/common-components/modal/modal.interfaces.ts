import { PopupProps } from '../poppup';
export enum ModalsType {
  initial = '',
  NoModal = 'NOT_MODAL',
  // generics modal
  PermisionsModalLocation = 'permissionModalLocation',
  //Modal Loading
  ModalLoading = 'modalLoading',

  //Services
  ErrorService = 'errorService',

  //Credit
  ErrorServiceCreditsUser = 'errorServiceCreditsUser',
  CreditSuccessRelated = 'creditSuccessRelated',
  CreditNewDevice = 'CreditNewDevice',
  CreditNoFound = 'CreditNoFound',
  CreditSelect = 'creditSelect',
  CreditMovement = 'creditMovement',
  CreditSMS = 'creditSMS',
  VerifyAccount = 'verifyAccount',
  SucessSignUp = 'sucessSignUp',
  ErrorSignUp = 'errorSignUp',
  MaximumFavorite = 'maximumFavorite',
  OutStock = 'outStock',

  //toast
  ToastAddCart = 'toastAddCart',
  ToastDeleteFavorite = 'toastDeleteFavorite',
  ToastAddFavorite = 'toastAddFavorite',

  //Modals Screen
  LoginModal = 'loginModal',
  AddressPaymentModal = 'AddressPaymentModal',

  //Cart
  ToastDeleteProductCart = 'toastDeleteProductCart',

  //Address
  DeleteAddress = 'deleteAddress',
  IsErrorAddress = 'isErrorAddress',
  SuccessAddress = 'successAddress',

  // Methods payment

  IsErrorGifCard = 'isErrorGifCard',

  //Password

  modalPassword = 'modalPassword',
  CardItemWithoutStock = 'CardItemWithoutStock',
  CartDeliveryAddressError = 'CART@DELIVERY_ADDRESS_ERROR',
  //Generales
  modalInformations = 'modalInformations'
}

export interface Modal {
  id: ModalsType;
  config: PopupProps;
}

export interface ModalProviderProps {
  modals: Modal[];
}

export interface GenericModalHook {
  showModal(modalID: ModalsType, config?: PopupProps): void;
  hideModal(): void;
  currentModal: ModalsType;
  config?: PopupProps;
  onCloseRequestModal: () => void;
}
export interface IInitialModal {
  show: boolean;
  title?: string;
  msg?: string;
  onClose?(): void;
}
