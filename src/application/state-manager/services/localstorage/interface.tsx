import { NotificationListRes } from '../../../../infrastucture/apis/notifications/notifications.interfaces';
import { MessagesAppInterface } from '../../../../presentation/screens/Splash/hooks/messages.interface';
import { INITIAL_STATE as ContactlessInitialState } from '../contactless-payment';
import {
  UserResponse,
  USER_DEFAULT_DATA
} from '../../../../infrastucture/apis/user/user.interface';

export type LocalStorageParams = Partial<LocalStorageType>;

export interface LocalStorageHook {
  localStorageData: LocalStorageType;
  save(params: LocalStorageParams): void;
  remove(keys: LocalStorageKey[]): void;
  readAndStorageInState(): void;
  fullClean(): void;
}

export enum LocalStorageKey {
  // BEHAVIOR
  WasStoreRead = 'WAS_STORE_READ',
  isAppOpenByFirstTime = 'IS_APP_OPEN_BY_FIRST_TIME',
  IpAddress = 'IP_ADDRESS',
  UID = 'DEVICE_ID',
  IsEnableConfirmPurchaseButtonInQRScreen = 'CONTACTLESS_PAYMENT@IS_ENABLE_CONFIRM_PURCHASE_BUTTON',
  TicketNumberContactLessPayment = 'CONTACTLESS_PAYMENT@TICKET_NUMBER',
  AnonymousCartGuid = 'ANONYMOUS_CART_GUID',

  // USER DATA
  User = 'USER_DATA',
  UserEmail = 'USER_EMAIL',
  UserLastEntry = 'USER_LAST_ENTRY',

  // ACCOUNT DATA
  IsAccountAuthenticated = 'IS_ACCOUNT_AUTHENTICATED',
  AccountNumber = 'ACCOUNT_NUMBER',
  AccountDisplayNumber = 'ACCOUNT_DISPLAY_NUMBER',
  AccountAdditionalNumber = 'ACCOUNT_ADDITIONAL_NUMBER',
  AccountPhoneNumber = 'ACCOUNT_DISPLAY_PHONE_NUMBER',
  LastCustomerId = 'LAST_CUSTOMER_ID',

  //Notifications
  Notifications = 'NOTIFICATIONS',

  //Notifications Push FCM
  TokenFCM = 'TOKENFCM',

  // SECURITY
  Token = 'TOKEN',
  RefreshToken = 'REFRESH_TOKEN',
  ExpiresIn = 'EXPERES_IN',
  ExpiresAt = 'EXPERES_AT',
  GetTokenDate = 'GET_TOKEN_DATE',
  IsLogin = 'IS_LOGIN',
  IsSucessFirstLogin = 'IS_SUCCESS_FIRST_LOGIN',

  BiometricPublicKey = 'publicKey-generate',
  MessagesApp = 'MESSAGES_APP',
  LocalStorageKey = 'LocalStorageKey',
  Whatsapp = 'WHATSAPP'
}

export interface LocalStorageType {
  [LocalStorageKey.WasStoreRead]: boolean;
  [LocalStorageKey.isAppOpenByFirstTime]: boolean;
  [LocalStorageKey.UserLastEntry]: string;
  [LocalStorageKey.UserEmail]: string;
  [LocalStorageKey.AccountNumber]: string;
  [LocalStorageKey.AccountDisplayNumber]: string;
  [LocalStorageKey.AccountAdditionalNumber]: string;
  [LocalStorageKey.AccountPhoneNumber]: string;
  [LocalStorageKey.LastCustomerId]: string;
  [LocalStorageKey.IsEnableConfirmPurchaseButtonInQRScreen]: boolean;
  [LocalStorageKey.TicketNumberContactLessPayment]?: string;
  [LocalStorageKey.AnonymousCartGuid]?: string;
  [LocalStorageKey.User]: UserResponse;
  [LocalStorageKey.Token]: string;
  [LocalStorageKey.RefreshToken]: string;
  [LocalStorageKey.ExpiresIn]: number;
  [LocalStorageKey.ExpiresAt]: string;
  [LocalStorageKey.GetTokenDate]: string;
  [LocalStorageKey.IsLogin]: boolean;
  [LocalStorageKey.IsAccountAuthenticated]: boolean;
  [LocalStorageKey.IpAddress]: string;
  [LocalStorageKey.BiometricPublicKey]: string;
  [LocalStorageKey.UID]: string;
  [LocalStorageKey.IsSucessFirstLogin]: boolean;
  [LocalStorageKey.Notifications]: {
    unread: number;
    notifications: NotificationListRes[];
  };
  [LocalStorageKey.MessagesApp]: MessagesAppInterface;
  [LocalStorageKey.TokenFCM]: string;
  [LocalStorageKey.Whatsapp]: {
    message: string;
    phone: string;
  };
}

export const InitialLocalStorage: LocalStorageType = {
  [LocalStorageKey.WasStoreRead]: false,
  [LocalStorageKey.isAppOpenByFirstTime]: true,
  [LocalStorageKey.AccountNumber]: '',
  [LocalStorageKey.AccountDisplayNumber]: '',
  [LocalStorageKey.AccountAdditionalNumber]: '',
  [LocalStorageKey.AccountPhoneNumber]: '',
  [LocalStorageKey.LastCustomerId]: '',
  [LocalStorageKey.User]: USER_DEFAULT_DATA,
  [LocalStorageKey.UserEmail]: '',
  [LocalStorageKey.UserLastEntry]: '',
  [LocalStorageKey.IsEnableConfirmPurchaseButtonInQRScreen]:
    ContactlessInitialState.enableConfirmPurchaseButton,
  [LocalStorageKey.TicketNumberContactLessPayment]: '',
  [LocalStorageKey.AnonymousCartGuid]: '',
  [LocalStorageKey.Token]: '',
  [LocalStorageKey.RefreshToken]: '',
  [LocalStorageKey.ExpiresIn]: 0,
  [LocalStorageKey.ExpiresAt]: '',
  [LocalStorageKey.GetTokenDate]: '',
  [LocalStorageKey.IsLogin]: false,
  [LocalStorageKey.IsAccountAuthenticated]: false,
  [LocalStorageKey.IsAccountAuthenticated]: false,
  [LocalStorageKey.IpAddress]: '0.0.0.0',
  [LocalStorageKey.BiometricPublicKey]: '',
  [LocalStorageKey.UID]: '',
  [LocalStorageKey.IsSucessFirstLogin]: false,
  [LocalStorageKey.Notifications]: {
    unread: 0,
    notifications: []
  },
  [LocalStorageKey.MessagesApp]: {},
  [LocalStorageKey.TokenFCM]: '',
  [LocalStorageKey.Whatsapp]: {
    phone: '',
    message: ''
  }
};
