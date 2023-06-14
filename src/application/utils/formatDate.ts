import moment from 'moment';
import { capitalize } from './string-formater';

const FORMAT_DATE_PAYMENT = 'MMMM DD [de] YYYY';
const FORMAT_DATE_ORDERS = 'MMMM [DE] YYYY';
const FORMAT_DATE_ORDERS_DDMMYY = 'DD/MM/YY';
const FORMAT_DATE_SOLICITPRECANCEL = 'DD / MMM / YYYY';

export const formatDatePayment = (date: string) => {
  if (date) return moment(date).format(FORMAT_DATE_PAYMENT);
  return '';
};

export const formatDateOrders = (date: Date | string) => {
  if (date) return moment(date).format(FORMAT_DATE_ORDERS).toUpperCase();
  return '';
};
export const formatDateOrdersDDMMYY = (date: Date | string) => {
  if (date) return moment(date).format(FORMAT_DATE_ORDERS_DDMMYY);
  return '';
};

const FORMAT_DATE_REVIEW = 'DD [de] MMMM YYYY';
export const formatDateReview = (date: Date | string) => {
  if (date) return moment(date).format(FORMAT_DATE_REVIEW);
  return '';
};

export const getMothOfDate = (date: string) => {
  if (date) return moment(date, 'YYYYMM').format('MMMM');
  return '';
};

export const formatDatePrecancel = () => {
  const dateConvert = moment(new Date()).format(FORMAT_DATE_SOLICITPRECANCEL);
  const arrDateConvert = dateConvert.split('/');
  const month = capitalize(arrDateConvert[1], true).replace('.', '');
  return ` ${arrDateConvert[0]}/${month}/${arrDateConvert[2]}`;
};
