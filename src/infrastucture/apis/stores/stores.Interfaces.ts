import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

interface StoreResponse {
  codTienda: number;
  codTiendaSAP: string;
  nombre_Tienda: string;
  direccion: string;
  numero_Contacto: string;
  latitud: number;
  longitud: number;
  ciudad: string;
  distancia: number;
}

export interface StoresApiResponse extends ResponseBase {
  data: StoreResponse[];
}

export interface StoreRequestBody extends RequestBodyBase {
  latitud: number | string;
  longitud: number | string;
  horaUsuario: Date;
}
