import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface IExpirationDayError {
  status: number;
  data: DataExpirationDay;
}

export interface DataExpirationDay {
  Success: boolean;
  Message: string;
  Errors: string[] | null;
  Data: null;
}

export interface CurrentDateRequestBody extends RequestBodyBase {
  deviceId: string;
  identification: string;
}

export interface ChangeDateRequestBody extends CurrentDateRequestBody {
  cuttingDay: number;
}

export interface CurrentDateResponse extends ResponseBase {
  data: DataCurrentDate | null;
}
export interface DataCurrentDate {
  cuttingDay: number;
  dueDate: string;
}
export interface IDataCurrentDate extends DataCurrentDate {
  day?: string;
}

export interface ChangeDateResponse extends ResponseBase {
  data: {
    cuttingDay: number;
  };
}
