/**
 * @description To see more issuer, you need go to:
 * @link https://paymentez.github.io/api-doc/#payment-methods-cards-card-brands-colombia */
export enum CardBrands {
  /** @description INTERNATIONAL ISSUERS */
  Visa = 'vi',
  MasterCard = 'mc',
  Diners = 'di',
  Discover = 'dc',
  AmericanExpress = 'ax',
  //   Maestro = 'mc',

  /** @description LOCAL ISSUERS Only in ECUADOR */
  Solidario = 'so'
  //   Credisensa = 'cs',
  //   UnionPay = 'up',
}

export const CardBrandNames: Record<CardBrands, string> = {
  [CardBrands.Visa]: 'visa',
  [CardBrands.MasterCard]: 'mastercard',
  [CardBrands.Discover]: 'discover',
  [CardBrands.AmericanExpress]: 'american_express',
  [CardBrands.Solidario]: 'solidario',
  [CardBrands.Diners]: 'diners'
};
