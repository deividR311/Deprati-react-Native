import { MapperDTO_To_Model } from '../common/mapper-dto-to-model';
import { movementResponse } from './credit-movement.api';

export interface CreditBalanceModel {
  clientName: string;
  cardNumber: string;
  affiliateDate: string;
  totalAmount: number;
  amountSpent: number;
  aditional: string;
  availableAmount: number;
  pastDueDays: number;
  nextPayDay: Date;
  nextAmountToPay: number;
}

export function mapCreditBalanceModelfromDTO(
  rawData: movementResponse['data']
): CreditBalanceModel {
  return new MapperDTO_To_Model<movementResponse['data'], CreditBalanceModel>(
    rawData,
    {
      nombreCliente: 'clientName',
      cuenta: 'cardNumber',
      fechaClienteDesde: 'affiliateDate',
      cupo: 'totalAmount',
      cupoUtilizado: 'amountSpent',
      adicional: 'aditional',
      cupoDisponible: 'availableAmount',
      diasVencidos: 'pastDueDays',
      fechaProximoPago: 'nextPayDay',
      proximoPago: 'nextAmountToPay'
    }
  ).get();
}
