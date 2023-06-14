export interface CreditInformationChartProps {
  ownerFullname?: string;
  cardNumber?: string;
  affiliateDate?: string;
  totalAmount?: number;
  amountSpent?: number;
  availableAmount?: number;
  numeroTarjetaAdicionalDisplay?: string;
  showAffiliateDate?: boolean;
  showDisplayCard?: boolean;
  displayCartType?: 'small' | 'large';
  invertValues?: boolean;
  constentChart: any;
  wrapperChartInCard?: boolean;
}

export interface DonutChartProps {
  indicatorValue?: number;
  maxIndicatorValue?: number;
  color?: string;
  dialColor?: string;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  invertValues?: boolean;
}
