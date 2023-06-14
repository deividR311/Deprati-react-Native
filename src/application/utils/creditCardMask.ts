export const credicardMask = (value: string, masklength = 1): string => {
  if (value.length > 0) {
    const firstNumbers = value.slice(0, masklength);
    const lastNumbers = value.slice(-masklength);
    const middleNumbers = value.slice(masklength, -masklength);
    return `${firstNumbers}${middleNumbers.replace(/./g, 'x')}${lastNumbers}`;
  }
  return value;
};

export default credicardMask;
