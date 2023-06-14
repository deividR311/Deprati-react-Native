export interface PaymentRequest {
  user: string;
  cartId: string;
}
export interface PaymentSelectBody {
  netBankingForm?: IPaymentForm;
  cashInDeliveryForm?: IPaymentForm;
  directCreditForm?: IPaymentForm;
  selectedPaymentGroup: string;
}
export interface PaymentSelectRequest
  extends PaymentRequest,
    PaymentSelectBody {}

export interface IPaymentSelect extends PaymentSelectBody {
  cartId: string;
}

export interface IPaymentForm {}

export interface SuccessPaymentResponse {
  status: number;
}

export interface ErrorGetBankingResponse {
  status: number;
  data: dataError;
}
export interface dataError {
  errors: ErrorGetBanking[];
}

export interface ErrorGetBanking {
  type: TypeErrorGetBanking;
  message: string;
}
export enum TypeErrorGetBanking {
  INVALID_TOKEN_ERROR = 'InvalidTokenError'
}
/*********************************
 *********************************
 *********************************/
export interface GetBankingResponse {
  component: Component[];
  pagination: Pagination;
  sorts: Sort[];
}

export interface Component {
  uid: string;
  typeCode: string;
  modifiedTime: string;
  name: string;
  container: string;
  content: string;
}

export interface Pagination {
  count: number;
  page: number;
  totalCount: number;
  totalPages: number;
}

export interface Sort {
  code: string;
  name: string;
  selected: boolean;
}
