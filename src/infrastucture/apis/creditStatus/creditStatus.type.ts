import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface creditStatusBody {
  identification: string;
  year: string;
  month: string;
  email: string;
  deviceId: string;
}

export interface creditStusResponse {
  message: string;
}
