export const validatePhone = (parsePrefux: number, _values: any) => {
  if (parsePrefux >= 2 && parsePrefux <= 8) {
    if (_values.phone && _values.phone.length > 7) {
      return {
        phone: 'Invalid phone number provided'
      };
    }
  } else if (parsePrefux === 9) {
    if (_values.phone && _values.phone.length < 8) {
      return {
        phone: 'Invalid phone number provided'
      };
    }
  }
};
