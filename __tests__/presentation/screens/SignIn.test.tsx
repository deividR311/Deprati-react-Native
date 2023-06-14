import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '../../../src/presentation/screens/SignIn/SignIn';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';

describe('SignIn', () => {
  let screenTest: any;

  beforeEach(() => {
    screenTest = render(<NavigationWrapper screen={SignIn} />);
  });

  it('renders correctly in Snapshot', () => {
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const { getByTestId } = screenTest;
    expect(getByTestId('iniciar_sesion_email')).toBeTruthy();
    expect(getByTestId('iniciar_sesion_password')).toBeTruthy();
    expect(getByTestId('iniciar_sesion_button')).toBeTruthy();
  });

  /* it('shows an error message when the email is invalid', () => {
    const { getByTestId, getByText, queryByText } = screenTest
    const emailInput = getByTestId('iniciar_sesion_email')
    const passwordInput = getByTestId('iniciar_sesion_password')
    const submitButton = getByTestId('iniciar_sesion_button')

    fireEvent.changeText(emailInput, 'email')
    fireEvent.changeText(passwordInput, 'password')
    fireEvent.press(submitButton)

    waitFor(() =>
      expect(queryByText('El correo electrónico no es válido')).toBeTruthy(),
    )

    // Corregir el email inválido y presionar el botón de inicio de sesión
    fireEvent.changeText(emailInput, 'correo@ejemplo.com')
    fireEvent.press(submitButton)

    // Verificar que el mensaje de error haya desaparecido
    waitFor(() =>
      expect(queryByText('El correo electrónico no es válido')).toBeNull(),
    )
  }) */
});
