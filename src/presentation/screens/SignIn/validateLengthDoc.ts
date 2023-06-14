export const validateLengthDoc = (value: string) => {
  if (value === 'Cedula') return 10;
  if (value === 'PASAPORTE') return 10;
  if (value === 'Ruc') return 13;
};
