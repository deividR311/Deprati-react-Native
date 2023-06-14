import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface creditLockReasonRequest extends RequestBodyBase {
  deviceId: string;
}

export interface BlockCardRequest extends RequestBodyBase {
  identification: string;
  blockMotive: string;
  deviceId: string;
  account: string;
}
