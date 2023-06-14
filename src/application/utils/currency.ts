import { Platform } from 'react-native';
export const formatToCurrecy = (value: number = 0) => {
  return currencyFormatter(value);
  // if (Platform.OS === 'android') {
  //   return (
  //     '$' +
  //     value?.toLocaleString('es-ES', {
  //       style: 'currency',
  //       currency: 'COP',
  //       signDisplay: 'never',
  //       currencyDisplay: 'symbol',
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: 2,
  //     })
  //   )
  // } else {
  //   try {
  //     const respose = `$${value?.toFixed(2) ?? 0}`
  //     return respose
  //   } catch (error) {
  //     return `$${value}`
  //   }
  // }
};

/**
 * @param amount Number that represent the amount to convert.
 * @param format Options to format value, that is represented using ISO codes.
 * @returns string formatted in currency style.
 */
export const currencyFormatter = (
  amount: number,
  format = { locale: 'es-EC', currency: 'USD' }
): string => {
  try {
    const formatter = new Intl.NumberFormat(format.locale, {
      currency: format.currency,
      style: 'currency',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
    const isNegative = amount < 0 ? '-' : '';
    const value = formatter.format(Math.abs(amount));
    return value !== '$NaN' ? `${isNegative}${value}` : `$${amount}`;
    // return formatter.format(amount)
  } catch (_) {
    return `$${amount}`;
  }
};
