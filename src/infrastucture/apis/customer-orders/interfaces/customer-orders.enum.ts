export enum DeliveryStatusDisplay {
  DELIVERED = 'Entregado',
  SLOPE = 'Pendiente',
  PREPARING_FOR_SHIPPING = 'Preparando para envío'
}

export enum StockLevelStatus {
  IN_STOCK = 'inStock'
}

export enum VariantType {
  GENERIC_VARIANT_PRODUCT = 'GenericVariantProduct',
  GIFT_CARD_VARIANT_PRODUCT = 'GiftCardVariantProduct'
}
export enum CurrencyISO {
  USD = 'USD'
}

export enum PriceType {
  BUY = 'BUY'
}

export enum Code {
  STANDARD = 'standard'
}

export const DeliveryModeCodeMap = {
  standard: 'Estándar',
  express: 'Envío express',
  pickup: 'Retiro en tienda'
};

export enum PaymentStatusDisplay {
  PAID = 'Pagado',
  REJECTED = 'Rechazado',
  SLOPE = 'Pendiente'
}

export const PaymentStatusDisplayMap = {
  PENDING: 'Pendiente',
  PAID: 'Pagado',
  CANCELLED: 'Cancelado',
  REJECTED: 'Rechazado'
};

export enum Status {
  PAID = 'PAID',
  PAYMENT_CAPTURED = 'PAYMENT_CAPTURED',
  REJECTED = 'REJECTED'
}

export enum StatusDisplay {
  PAID = 'paid',
  PROCESSING = 'processing',
  REJECTED = 'rejected'
}

export enum TypeErrorCustomerOrders {
  INVALID_TOKEN_ERROR = 'InvalidTokenError'
}
