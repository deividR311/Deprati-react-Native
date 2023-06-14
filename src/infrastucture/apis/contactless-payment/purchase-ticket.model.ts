import { MapperDTO_To_Model } from '../common/mapper-dto-to-model';
import {
  TicketResponse,
  Details as TicketDetailsResponse,
  Promotions as TicketPromotionsResponse
} from './contactless-payment.type';

export interface PurchaseTicketModel {
  shopCode: number;
  cashierPointCode: number;
  eventId: number;
  clientCode: string;
  additionalNumber: string;
  deviceCode: string;
  amount: number;
  totalIVAIncluded: number;
  date: string;
  stringDate: string;
  shop: string;
  clientName: string;
  documentIdRUC: string;
  invoice: string;
  cashier: string;
  paymentMethod: string;
  account: string;
  installmentsNumber: string;
  installmentValue: number;
  discount: number;
  saleZeroPercent: number;
  saleTwelvePercent: number;
  interest: number;
  IVA: number;
  total: number;
  state: string;
  order: number;
  observations: string;
  uniqueIdTicket: string;
  stringOrder: string;
  balanceInterestIncluded: number;
  capitalBalance: number;
  available: number;
  amountToPay: number;
  maxPaymentDay: string;
  estimatedPaymentMonth_1: string;
  estimatedPaymentMonth_2: string;
  observationsTicketDirectCredict: string;
  stringInstallmentsNumber: string;
  leyend_1: string;
  leyend_2: string;
  details: PurchaseDetail[];
  promotions: PurchasePromotion[];
}

export interface PurchaseDetail {
  shopCode: number;
  cashierPointCode: number;
  eventId: number;
  clientCode: string;
  additionalNumber: string;
  position: number;
  code: number;
  itemName: string;
  amount: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  totalIVAExcluded: number;
  discountPercentageToDisplay: string;
  discountDePrati: number;
  iva?: number;
  review?: {
    score?: number;
    title?: string;
    comment?: string;
  };
}

export interface PurchasePromotion {
  position: number;
  description: string;
  value: number;
  shop: string;
}

export function mapTicketModelfromDTO(
  rawData: TicketResponse['data']
): PurchaseTicketModel {
  const { arregloDetalle, arregloPromociones, ..._ticker } = rawData;
  const details = arregloDetalle.map(detail =>
    new MapperDTO_To_Model<TicketDetailsResponse, PurchaseDetail>(detail, {
      cantidad: 'amount',
      codigo: 'code',
      codigoCaja: 'cashierPointCode',
      codigoCliente: 'clientCode',
      codigoTienda: 'shopCode',
      descDePrati: 'discountDePrati',
      descuento: 'discount',
      idEvento: 'eventId',
      noAdicional: 'additionalNumber',
      nombreItem: 'itemName',
      porcDescuentoDisplay: 'discountPercentageToDisplay',
      posicion: 'position',
      precioUnitario: 'unitPrice',
      subtotal: 'subtotal',
      totalSinIva: 'totalIVAExcluded'
    }).get()
  );

  const promotions = arregloPromociones.map(promotion =>
    new MapperDTO_To_Model<TicketPromotionsResponse, PurchasePromotion>(
      promotion,
      {
        descripcion: 'description',
        posicion: 'position',
        valor: 'value',
        tienda: 'shop'
      }
    ).get()
  );

  const ticket = new MapperDTO_To_Model<
    Omit<TicketResponse['data'], 'arregloDetalle' | 'arregloPromociones'>,
    Omit<PurchaseTicketModel, 'details' | 'promotions'>
  >(_ticker, {
    codigoTienda: 'shopCode',
    codigoCaja: 'cashierPointCode',
    idEvento: 'eventId',
    codigoCliente: 'clientCode',
    noAdicional: 'additionalNumber',
    codigoDispositivo: 'deviceCode',
    cantidad: 'amount',
    totalConIva: 'totalIVAIncluded',
    fecha: 'date',
    fechaCadena: 'stringDate',
    tienda: 'shop',
    nombreCliente: 'clientName',
    cedulaRuc: 'documentIdRUC',
    factura: 'invoice',
    cajero: 'cashier',
    metodoPago: 'paymentMethod',
    cuenta: 'account',
    noCuotasCadena: 'installmentsNumber',
    valorCuota: 'installmentValue',
    descuentos: 'discount',
    ventaCeroP: 'saleZeroPercent',
    ventaDoceP: 'saleTwelvePercent',
    interes: 'interest',
    iva: 'IVA',
    total: 'total',
    estado: 'state',
    orden: 'order',
    observacion: 'observations',
    uniqueIdTicket: 'uniqueIdTicket',
    ordenCadena: 'stringOrder',
    saldoConInteres: 'balanceInterestIncluded',
    saldoCapital: 'capitalBalance',
    disponible: 'available',
    valorAPagar: 'amountToPay',
    fechaMaxPago: 'maxPaymentDay',
    pagoEstimadoMes1: 'estimatedPaymentMonth_1',
    pagoEstimadoMes2: 'estimatedPaymentMonth_2',
    leyenda1: 'leyend_1',
    leyenda2: 'leyend_2',
    observacionTicketCreditodirecto: 'observationsTicketDirectCredict'
  }).get();

  return { ...ticket, details, promotions };
}
