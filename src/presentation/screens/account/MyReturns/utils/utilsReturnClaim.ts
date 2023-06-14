import { STATUS_RETURN } from '../interfaces/IMyReturnsDetail.interface';

export const MapStatesCard = new Map([
  [
    'myReturns',
    {
      reasonOrItem: 'Artículos:',
      titleButton: 'SOLICITAR DEVOLUCIÓN'
    }
  ],
  [
    'myClaims',
    {
      reasonOrItem: 'Motivo:',
      titleButton: 'SOLICITAR RECLAMO'
    }
  ]
]);

export type AllTypesCard = 'myReturns' | 'myClaims';

export const handleIsSingular = (itemNumber: number) => {
  if (itemNumber === 1) return `${itemNumber} item`;
  return `${itemNumber} items`;
};

export const handleStatus = (keyStatus: string) => {
  return STATUS_RETURN[keyStatus] ?? keyStatus;
};
