import { TextStyle } from 'react-native';

export interface IListSolicit {
  title: string;
  value: string;
  titleStyle: TextStyle | TextStyle[];
  valueStyle: TextStyle | TextStyle[];
}
export interface ILoadingsSolicitPreCancel {
  isLoadingTotalsPayment: boolean;
  isLoadingConfirmTickets: boolean;
}

export interface IErrorsSolicitPreCancel {
  isErrorTotalsPayment: boolean;
}
