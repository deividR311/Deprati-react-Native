import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface articleBody extends RequestBodyBase {
  codigoTienda: number;
  eanArticulo: string;
  latitud?: number | string;
  longitud?: number | string;
}

export interface articleResponse extends ResponseBase {
  data: {
    dato: {
      listaArticulo: any[];
      listaTalla: any[];
      listaColor: any[];
      listaInventario: any[];
      listaEAN: any[];
    };
  };
}
