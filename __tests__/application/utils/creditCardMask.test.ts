import credicardMask from '../../../src/application/utils/creditCardMask';

describe('credicardMask', () => {
  it('should mask the credit card number correctly', () => {
    const creditCardNumber = '1234567890123456';
    const expectedMaskedNumber = '1xxxxxxxxxxxxxx6';

    const maskedNumber = credicardMask(creditCardNumber);

    expect(maskedNumber).toBe(expectedMaskedNumber);
  });

  it('should return an empty string when passed an empty string', () => {
    const maskedNumber = credicardMask('');

    expect(maskedNumber).toBe('');
  });

  it('should not mask any digits when the mask length is 0', () => {
    const creditCardNumber = '1234567890123456';
    const expectedMaskedNumber = '1234567890123456';

    const maskedNumber = credicardMask(creditCardNumber, 0);

    expect(maskedNumber).toBe(expectedMaskedNumber);
  });

  it('should not mask any digits when the mask length is 2', () => {
    const creditCardNumber = '1234567890123456';
    const expectedMaskedNumber = '12xxxxxxxxxxxx56';

    const maskedNumber = credicardMask(creditCardNumber, 2);

    expect(maskedNumber).toBe(expectedMaskedNumber);
  });
});
