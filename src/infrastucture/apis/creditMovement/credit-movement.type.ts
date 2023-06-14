import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface movementBody extends RequestBodyBase {
  accountNumber: string;
  additional: string;
}
export interface MovementPeriodsBody extends RequestBodyBase {
  identification: string;
  deviceId: string;
}

export interface movementResponse extends ResponseBase {
  data: movementsData[];
}

export interface MovementPeriodResponse extends ResponseBase {
  data: MovementPeriod[];
}

export interface movementsData {
  fechaMovimiento: string;
  descripcionMovimiento: string;
  tipoMovimiento: 'PAGO' | 'COMPRA' | string;
  valor: number;
}

export interface MovementPeriod {
  data?: {
    period: number;
    periodName: string;
    periodYear: number;
    periodMonth: number;
  }[];
}
