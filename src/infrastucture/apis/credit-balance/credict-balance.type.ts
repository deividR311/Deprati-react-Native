import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface BalanceByIdentificationBody extends RequestBodyBase {
  identificacion: string;
}

export interface BalanceByAccountNumberBody extends RequestBodyBase {
  numeroCuenta: string;
  adicional: string;
  identificacion: string;
  deviceId: string;
}

export interface BalanceResponse extends ResponseBase {
  data: {
    cuenta: string;
    adicional: string;
    nombreCliente: string;
    fechaClienteDesde: string;
    cupo: number;
    cupoDisponible: number;
    cupoUtilizado: number;
    diasVencidos: number;
    fechaProximoPago: string;
    proximoPago: number;
    celularCtaDisplay?: string;
  };
}
