import { ResponseBase } from '../common/request-response.type';

export interface MessageResponseWS {
  code: string;
  area: string;
  service: string;
  title: string;
  description: string;
  type: string;
}

export interface MessageResponse extends ResponseBase {
  data: MessageResponseWS[];
}
