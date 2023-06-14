import { currencyFormatter } from '../../../src/application/utils/currency';

describe('currencyFormatter', () => {
  it('should format positive amount correctly', () => {
    expect(currencyFormatter(1000)).toBe('$1.000,00');
  });

  it('should return $NaN for invalid amount', () => {
    expect(currencyFormatter(NaN)).toBe('$NaN');
  });

  it('should format negative amount correctly', () => {
    expect(currencyFormatter(-1000)).toBe('-$1.000,00');
  });

  it('should format positive decimal amount correctly', () => {
    expect(currencyFormatter(3.69)).toBe('$3,69');
  });

  it('should format negative decimal amount correctly', () => {
    expect(currencyFormatter(-3.64)).toBe('-$3,64');
  });
});
