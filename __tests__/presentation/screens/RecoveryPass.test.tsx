import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import RecoveryPass from '../../../src/presentation/screens/RecoveryPass';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}));

describe('RecoveryPass', () => {
  let screenTest: any;

  beforeEach(() => {
    jest.clearAllMocks();
    screenTest = render(<RecoveryPass />);
  });

  it('renders correctly', () => {
    const { getByTestId } = screenTest;
    expect(getByTestId('emailRecovery')).toBeTruthy();
    expect(getByTestId('recovery-button')).toBeTruthy();
  });

  /* it('shows error message for invalid email', () => {
    const { getByTestId, getByText } = screenTest
    const emailInput = getByTestId('emailRecovery')

    fireEvent.changeText(emailInput, 'invalid-email')
    fireEvent(emailInput, 'onBlur')

    waitFor(() =>
      expect(getByText('El correo electrónico no es válido')).toBeTruthy(),
    )
  }) */
});
