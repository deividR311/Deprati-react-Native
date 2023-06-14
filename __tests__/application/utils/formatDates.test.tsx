import moment from 'moment';
import { capitalize } from '../../../src/application/utils/string-formater';
import {
  formatDateOrders,
  formatDateOrdersDDMMYY,
  formatDatePayment,
  formatDatePrecancel,
  formatDateReview,
  getMothOfDate
} from '../../../src/application/utils/formatDate';

describe('formatDates', () => {
  describe('formatDatePayment', () => {
    it('formatDatePayment date exists', () => {
      expect(formatDatePayment('20230601')).toBe('June 01 de 2023');
    });
    it('formatDatePayment date not exists', () => {
      expect(formatDatePayment('')).toBe('');
    });
  });

  describe('formatDateOrders', () => {
    it('formatDateOrders date exists', () => {
      expect(formatDateOrders('20230601')).toBe('JUNE DE 2023');
    });
    it('formatDateOrders date not exists', () => {
      expect(formatDateOrders('')).toBe('');
    });
  });

  describe('formatDateOrdersDDMMYY', () => {
    it('formatDateOrdersDDMMYY date exists', () => {
      expect(formatDateOrdersDDMMYY('20230601')).toBe('01/06/23');
    });
    it('formatDateOrdersDDMMYY date not exists', () => {
      expect(formatDateOrdersDDMMYY('')).toBe('');
    });
  });

  describe('formatDateReview', () => {
    it('formatDateReview date exists', () => {
      expect(formatDateReview('20230601')).toBe('01 de June 2023');
    });
    it('formatDateReview date not exists', () => {
      expect(formatDateReview('')).toBe('');
    });
  });

  describe('getMothOfDate', () => {
    it('getMothOfDate date exists', () => {
      expect(getMothOfDate('20230601')).toBe('June');
    });
    it('getMothOfDate date not exists', () => {
      expect(getMothOfDate('')).toBe('');
    });
  });

  describe('formatDatePrecancel', () => {
    const dateConvert = moment(new Date()).format('DD / MMM / YYYY');
    const arrDateConvert = dateConvert.split('/');
    const month = capitalize(arrDateConvert[1], true).replace('.', '');

    it('formatDatePrecancel date exists', () => {
      expect(formatDatePrecancel()).toBe(
        ` ${arrDateConvert[0]}/${month}/${arrDateConvert[2]}`
      );
    });
  });
});
