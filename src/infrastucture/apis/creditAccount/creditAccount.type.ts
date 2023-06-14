import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface creditAccountBody extends RequestBodyBase {
  identificacion: string;
}

export interface creditAccountResponse extends ResponseBase {
  data: CardData[];
}

export interface CardData {
  posicion: number;
  nombreCliente: string;
  numeroTarjetaAdicionalDisplay: string;
  numeroTarjeta: string;
  adicional: string;
  identificacion: string;
  celularCtaDisplay?: string;
}

export interface ListServicesResponse extends ResponseBase {
  data: ListServicesRes[];
}
export interface ListServicesRes {
  id: string;
  isActive: boolean;
  presentationOrder: number;
  link?: string;
  showForPrincipal: boolean;
  showForAdditional: boolean;
  isLoggedIn: boolean;
  isLinkedToDirectCredit: boolean;
  isVisibleForUser: boolean;
}
