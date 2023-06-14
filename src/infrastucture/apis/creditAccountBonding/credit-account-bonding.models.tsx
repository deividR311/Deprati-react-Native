import { MapperDTO_To_Model } from '../common/mapper-dto-to-model';
import { AccountBondingVinculateResponse } from './credit-account-bonding.types';

export interface AccountBondingModel {
  id: number;
  accountNumber: string;
  accountAdictionalNumber: string;
  userEmail: string;
  deviceId: string;
  phoneNumber: string;
  userIdentification: string;
  registerDate: string;
  accountState: string;
}

export function mapCreditAccountBoundingModelfromDTO(
  rawData: AccountBondingVinculateResponse
): AccountBondingModel {
  return new MapperDTO_To_Model<
    AccountBondingVinculateResponse,
    AccountBondingModel
  >(rawData, {
    id: 'id',
    adicional: 'accountAdictionalNumber',
    cuenta: 'accountNumber',
    usuario: 'userEmail',
    idDispositivo: 'deviceId',
    celular: 'phoneNumber',
    identificacion: 'userIdentification',
    fechaRegistro: 'registerDate',
    estado: 'accountState'
  }).get();
}
