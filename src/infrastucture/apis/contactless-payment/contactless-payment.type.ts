import { RequestBodyBase, ResponseBase } from '../common/request-response.type';

export interface TicketByAccountBody extends RequestBodyBase {
  account: string;
  additional: string;
  deviceId: string;
  token: string;
  timestamp?: number;
}

export interface TicketsBody extends RequestBodyBase {
  account: string;
  additional: string;
  fromDate: string;
  toDate: string;
  currentPage: number;
  pageSize: number;
}

export interface TicketByIdBody extends RequestBodyBase {
  idTicket: string;
}

export interface TicketResponse extends ResponseBase {
  data: Ticket;
}

export interface TicketsResponse extends ResponseBase {
  data: {
    paginacion: {
      paginaActual: number;
      cantidadRegistrosPagina: number;
      totalPagina: number;
      totalRegistros: number;
    };
    tickets: Ticket[];
  };
}

export interface Ticket {
  codigoTienda: number;
  codigoCaja: number;
  idEvento: number;
  codigoCliente: string;
  noAdicional: string;
  codigoDispositivo: string;
  cantidad: number;
  totalConIva: number;
  fecha: string;
  fechaCadena: string;
  tienda: string;
  nombreCliente: string;
  cedulaRuc: string;
  factura: string;
  cajero: string;
  metodoPago: string;
  cuenta: string;
  noCuotas: number;
  noCuotasCadena: string;
  valorCuota: number;
  descuentos: number;
  ventaCeroP: number;
  ventaDoceP: number;
  interes: number;
  iva: number;
  total: number;
  estado: string;
  orden: number;
  observacion: string;
  uniqueIdTicket: string;
  ordenCadena: string;
  saldoConInteres: number;
  saldoCapital: number;
  disponible: number;
  valorAPagar: number;
  fechaMaxPago: string;
  pagoEstimadoMes1: string;
  pagoEstimadoMes2: string;
  observacionTicketCreditodirecto: string;
  leyenda1: string;
  leyenda2: string;
  arregloDetalle: Details[];
  arregloPromocion: Promotions[];
  pagO_ESTIMADO_MES1_DISPLAY: string;
  pagO_ESTIMADO_MES1_VALUE: number;
  pagO_ESTIMADO_MES2_DISPLAY: string;
  pagO_ESTIMADO_MES2_VALUE: number;
  account: string;
  additionalNumber: string;
}

export interface Details {
  codigoTienda: number;
  codigoCaja: number;
  idEvento: number;
  codigoCliente: string;
  noAdicional: string;
  posicion: number;
  codigo: number;
  nombreItem: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  descuento: number;
  totalSinIva: number;
  porcDescuentoDisplay: string;
  descDePrati: number;
}

export interface Promotions {
  posicion: number;
  descripcion: string;
  valor: number;
  tienda?: string;
  valorDisplay: number | null;
}
