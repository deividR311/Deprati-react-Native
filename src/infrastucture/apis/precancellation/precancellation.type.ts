import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface IPrecancellationError {
  status: number;
  data: DataErrorPrecancellation;
}

export interface DataErrorPrecancellation extends ResponseBase {
  data: null;
}
export interface ResponseDeferred extends ResponseBase {
  data: IDeferredList[] | TotalPaymentResponse | null;
}
export interface ResponseConfirm extends ResponseBase {
  data: IConfirmResponse | null;
}
export interface DeferredRequestBody extends RequestBodyBase {
  deviceId: string;
  identification: string;
}

export interface RegisterTicketRequest extends DeferredRequestBody {
  selectedTickets: IselectedTickets[];
}

export interface IselectedTickets {
  store: string;
  registerArea: string;
  ticket: string;
}

export interface TotalPaymentResponse {
  paymentTotal: number;
  interestsaved: number;
  selectedDeferreds: number;
  selectedvalue: number;
  monthPayment: string;
  maxPaymentDate: string;
  legend: string;
}

export interface IDeferredList {
  account: string;
  store: string;
  registerArea: string;
  ticket: string;
  purchaseDate: string;
  quota: string;
  quotaValue: number;
  quotaValueFormated: string;
  pendingValue: number;
  pendingValueFormated: string;
  selected: string;
}
export interface IDataConfirmPrecancel extends IConfirmResponse {
  success: boolean;
}
export interface IConfirmResponse {
  result: string;
}

export interface IInfoWp {
  phoneNumber: string;
  messageToSend: string;
}
