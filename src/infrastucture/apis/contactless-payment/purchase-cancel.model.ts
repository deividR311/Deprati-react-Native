import { MapperDTO_To_Model } from '../common/mapper-dto-to-model';
import { PurchaseCancelResponse } from './purchase.type';

export interface PurchaseCancelModel {
  message: string;
  data: Record<string, unknown>;
}

export function mapPurchaseCancelModelfromDTO(
  rawData: Pick<PurchaseCancelResponse, 'message' | 'data'>
): PurchaseCancelModel {
  return new MapperDTO_To_Model<
    Pick<PurchaseCancelResponse, 'message' | 'data'>,
    PurchaseCancelModel
  >(rawData, {
    message: 'message',
    data: 'data'
  }).get();
}
