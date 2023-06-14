import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import AddressForm from '../../../../src/presentation/screens/account/MyAddress/AddressForm';
import AdressPaymentForm from '../../../../src/presentation/screens/account/MyAddress/AdressPaymentForm';
import FormSignUp from '../../../../src/presentation/screens/SignUp/FormSignUp';

describe('Is legend defined', () => {
  it('Address form', () => {
    const { getByText, queryByText } = render(
      <NavigationWrapper screen={AddressForm} />
    );
    expect(
      getByText('Por favor complete los siguientes campos.')
    ).toBeDefined();
    expect(queryByText('* Todos los campos son obligatorios.')).toBeNull();
  });

  it('Address Payment form', () => {
    const { getByText } = render(
      <NavigationWrapper screen={AdressPaymentForm} />
    );
    expect(
      getByText('Por favor complete los siguientes campos.')
    ).toBeDefined();
    expect(getByText('* Todos los campos son obligatorios.')).toBeDefined();
  });

  it('Sing up form', () => {
    const { getByText } = render(<NavigationWrapper screen={FormSignUp} />);
    expect(
      getByText('Por favor complete los siguientes campos.')
    ).toBeDefined();
    expect(getByText('* Todos los campos son obligatorios.')).toBeDefined();
  });
});
