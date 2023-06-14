import { MapperDTO_To_Model } from '../common/mapper-dto-to-model';
import { BalanceResponse } from './credict-balance.type';

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
  celularCtaDisplay?: string;
}

export function mapCreditBalanceModelfromDTO(
  rawData: BalanceResponse['data']
): CreditBalanceModel {
  return new MapperDTO_To_Model<BalanceResponse['data'], CreditBalanceModel>(
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
      proximoPago: 'nextAmountToPay',
      celularCtaDisplay: 'celularCtaDisplay'
    }
  ).get();
}
