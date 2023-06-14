import { MapperDTO_To_Model } from '../common/mapper-dto-to-model';
import { PurchaseConfirmationResponse } from './purchase.type';

export interface PurchaseConfirmModel {
  message: string;
  data: Record<string, unknown> | string;
}

export function mapPurchaseConfirmationModelfromDTO(
  rawData: Pick<PurchaseConfirmationResponse, 'message' | 'data'>
): PurchaseConfirmModel {
  return new MapperDTO_To_Model<
    Pick<PurchaseConfirmationResponse, 'message' | 'data'>,
    PurchaseConfirmModel
  >(rawData, {
    message: 'message',
    data: 'data'
  }).get();
}
