import { RequestBodyBase, ResponseBase } from '../common/request-response.type';
import { PurchaseTicketModel } from './purchase-ticket.model';

export interface PurchaseConfirmationBody extends RequestBodyBase {
  idTicket: string;
  account: string;
  additional: string;
  //cellphone: string
  deviceId: string;
}

export interface PurchaseConfirmationResponse extends ResponseBase {
  data?: {
    uniqueIdTicket: string;
    numeroTicket: string;
  };
}

export interface PurchaseCancelBody extends RequestBodyBase {
  idTicket: string;
  account: string;
  additional: string;
  deviceId?: string;
}

export interface RegisteTokenBody extends RequestBodyBase {
  account: string;
  additional: string;
  token: string;
  deviceId: string;
}

export interface RegisteTokenResponse extends ResponseBase {
  data: Record<string, unknown> | string;
}

export interface PurchaseCancelResponse extends ResponseBase {
  data: {
    token: string;
  };
}
