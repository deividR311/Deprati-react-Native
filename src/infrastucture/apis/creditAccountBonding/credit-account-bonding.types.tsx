import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface AccountBondingVinculateBody extends RequestBodyBase {
  cuenta: string;
  adicional: string;
  idDispositivo: string;
  identificacion: string;
}

export interface AccountBondingVinculateBody extends RequestBodyBase {
  cuenta: string;
  adicional: string;
  idDispositivo: string;
  identificacion: string;
}

export interface AccountBondingSummaryBody extends RequestBodyBase {
  cuenta: string;
  adicional: string;
  idDispositivo: string;
  identificacion: string;
}

export interface AccountBondingVinculateResponse {
  id: number;
  cuenta: string;
  adicional: string;
  usuario: string;
  idDispositivo: string;
  celular: string;
  identificacion: string;
  fechaRegistro: string;
  estado: string;
}

export interface AccountBondingUpdateStateBody extends RequestBodyBase {
  cuenta: string;
  adicional: string;
  idDispositivo: string;
  pin: string;
}
export interface AccountBondingUpdateStateResponse extends ResponseBase {
  data?: {
    mensaje: string;
  };
  /**
   * status 200: Cuenta vinculada en otro dispositivo
   *
   * status ok: No existe cuenta vinculada - Dar paso a vinculacion
   */
  status?: number | 'ok';
}

export interface AccountBondingUnlinkBody extends RequestBodyBase {
  cuenta: string;
  adicional: string;
  idDispositivo: string;
}

export interface AccountBondingUnlinkResponse extends ResponseBase {
  data?: {
    mensaje: string;
  };
}

export interface AccountBondingResentCodeBody extends RequestBodyBase {
  cuenta: string;
  adicional: string;
  idDispositivo: string;
}

export interface AccountBondingResentCodeResponse extends ResponseBase {
  data?: {
    mensaje: boolean;
  };
  /**
   * status 200: Cuenta vinculada en otro dispositivo
   *
   * status ok: No existe cuenta vinculada - Dar paso a vinculacion
   */
  status?: number | 'ok';
}

/// get credit account bonding
export interface GetAccountCreditUsersBody extends RequestBodyBase {
  identificacion: string;
}
export interface GetAccountCreditUsersResponse extends ResponseBase {
  data: CreditsUserAccount[];
}

interface CreditsUserAccount {
  posicion: number;
  nombreCliente: string;
  numeroTarjetaAdicionalDisplay: string;
  numeroTarjeta: string;
  adicional: string;
  identificacion: string;
  celularCtaDisplay?: string;
}
