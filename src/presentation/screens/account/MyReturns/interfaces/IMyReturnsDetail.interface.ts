import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  MyReturnsNavigationParams,
  MyReturnsNavigationRoute
} from '../../../../navigation/account/my-returns/my-returns.navigator';

export interface IMyReturnsDetailProps
  extends NativeStackScreenProps<
    MyReturnsNavigationParams,
    MyReturnsNavigationRoute.DetailReturn
  > {}

export interface IEnterReturnProps
  extends NativeStackScreenProps<
    MyReturnsNavigationParams,
    MyReturnsNavigationRoute.EnterReturn
  > {}

export const STATUS_RETURN = {
  CANCELED: 'No aprobado',
  CANCELLING: 'No aprobado',
  WAIT: 'En espera',
  RECEIVED: 'Recibida',
  RECEIVING: 'Recibiendo',
  APPROVAL_PENDING: 'Pendiente',
  APPROVING: 'En proceso',
  REVERSING_PAYMENT: 'Anulando pago',
  PAYMENT_REVERSED: 'Pago anulado',
  PAYMENT_REVERSAL_FAILED: 'Falló anulación de pago',
  REVERSING_TAX: 'Anulando impuesto',
  TAX_REVERSED: 'Impuesto anulado',
  TAX_REVERSAL_FAILED: 'Falló anulación de impuestos',
  COMPLETED: 'Finalizado',
  CREATED: 'Creada',
  PENDING: 'Pendiente',
  PAID: 'Pagado'
};

export enum DESTIN_DETAIL {
  APPROVAL_PENDING = 'Pendiente',
  APPROVING = 'En proceso',
  REVERSING_PAYMENT = 'Anulando pago',
  PAYMENT_NOT_CAPTURED = 'Pago no capturado',
  PAYMENT_REVERSED = 'Pago anulado',
  PAYMENT_REVERSAL_FAILED = 'Falló anulación de pago',
  REVERSING_TAX = 'Anulando impuesto',
  TAX_REVERSED = 'Impuesto anulado',
  TAX_REVERSAL_FAILED = 'Falló anulación de impuestos',
  COMPLETED = 'Finalizado',
  CREATED = 'Creada',
  PENDING = 'Pendiente',
  PAID = 'Pagado'
}

export enum ORIGIN_STATUS {
  APPROVAL_PENDING = 'APPROVAL_PENDING',
  APPROVING = 'APPROVING',
  REVERSING_PAYMENT = 'REVERSING_PAYMENT',
  PAYMENT_NOT_CAPTURED = 'PAYMENT_NOT_CAPTURED',
  PAYMENT_REVERSED = 'PPAYMENT_REVERSED',
  PAYMENT_REVERSAL_FAILED = 'PAYMENT_REVERSAL_FAILED',
  REVERSING_TAX = 'REVERSING_TAX',
  TAX_REVERSED = 'TAX_REVERSED',
  TAX_REVERSAL_FAILED = 'TAX_REVERSAL_FAILED',
  COMPLETED = 'COMPLETED',
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  PAID = 'PAID'
}
