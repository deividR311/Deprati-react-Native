import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

// prerelatedApi: credit
interface PreRelatedRes {
  id: number;
  cuenta: string;
  adicional: string;
  usuario: string;
  idDispositivo: string;
  celular: string;
  identificacion: string;
  fechaRegistro: string;
  estado: string;
}
export interface PreRelatedResponseApi extends ResponseBase {
  data: PreRelatedRes[];
}

export interface PreRelatedBodyAPI extends RequestBodyBase {
  cuenta: string;
  adicional: string;
  idDispositivo: string;
  identificacion: string;
}

// consulta de cuotas

export interface QuotaConsultationBodyAPI extends RequestBodyBase {
  identification: string;
  amount: number;
  deferred: number;
  deferredOrder: number;
  account: string;
  additional: string;
  deviceId: string;
}

export interface QuotaConsultationResponseAPI extends ResponseBase {
  data: {
    capitalQuote: number;
    quotes: number;
    totalToPay: number;
    nextPayments: NextPayment[];
  };
}

export interface NextPayment {
  date: string;
  value: number;
}

// quotas list

export interface QuotasListResponse extends ResponseBase {
  data: List[];
}

export interface List {
  deferred: number;
  deferredOrder: number;
  description: string;
}

export interface CurrentCreditLimitResponse extends ResponseBase {
  Success?: boolean;
  Message?: string;
  Code?: string;
  code?: string;
  data: {
    clientQuota: number;
    maxQuota: number;
    description: string;
  };
}

export interface CurrentCreditLimitBody extends RequestBodyBase {
  deviceId: string;
  identification: string;
}

export interface IncreaseCreditLimitResponse extends ResponseBase {
  data: null | unknown;
}

export interface IncreaseCreditLimitBody extends RequestBodyBase {
  identification: string;
  newQuota: string;
  deviceId: string;
}
