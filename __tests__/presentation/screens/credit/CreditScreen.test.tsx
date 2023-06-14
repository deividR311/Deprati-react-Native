import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import { useLocalStorage } from '../../../../src/application/state-manager/services/localstorage/useLocalStorage';
import CreditScreen from '../../../../src/presentation/screens/Credit/CreditScreen';
import { LocalStorageKey } from '../../../../src/application/state-manager/services/localstorage';

jest.mock(
  '../../../../src/application/state-manager/services/localstorage/useLocalStorage'
);
const message = 'Hola';
const phone = '+593979461435';

describe('CreditScreen', () => {
  beforeEach(() => {
    useLocalStorage.mockImplementation(() => ({
      save: jest.fn(),
      localStorageData: {
        [LocalStorageKey.IsLogin]: false,
        [LocalStorageKey.IsAccountAuthenticated]: false,
        [LocalStorageKey.Whatsapp]: {
          message,
          phone
        }
      }
    }));
  });

  it('renders correctly anonymus and Snapshot', async () => {
    expect.assertions(4);
    const screenTest = render(<NavigationWrapper screen={CreditScreen} />);
    const { findByTestId, findByText, queryByText } = screenTest;
    expect(screenTest?.toJSON()).toMatchSnapshot();
    expect(await findByText('INICIAR SESIÓN')).toBeTruthy();
    expect(await findByTestId('credit_solicitar_btn')).toBeTruthy();
    expect(queryByText('Bloquear tu crédito De Prati')).toBeNull();
  });

  it('renders correctly login and Snapshot', () => {
    expect.assertions(3);
    useLocalStorage.mockImplementation(() => ({
      save: jest.fn(),
      localStorageData: {
        [LocalStorageKey.IsLogin]: true,
        [LocalStorageKey.IsAccountAuthenticated]: false,
        [LocalStorageKey.Whatsapp]: {
          message,
          phone
        }
      }
    }));
    const screenTest = render(<NavigationWrapper screen={CreditScreen} />);
    const { getByText, queryByText } = screenTest;
    expect(screenTest?.toJSON()).toMatchSnapshot();
    expect(queryByText('INICIAR SESIÓN')).toBeNull();
    expect(getByText('VINCULA TU CRÉDITO DE PRATI')).toBeTruthy();
  });

  it('renders correctly vinculation and Snapshot', () => {
    expect.assertions(6);
    useLocalStorage.mockImplementation(() => ({
      save: jest.fn(),
      localStorageData: {
        [LocalStorageKey.IsLogin]: true,
        [LocalStorageKey.IsAccountAuthenticated]: true,
        [LocalStorageKey.Whatsapp]: {
          message,
          phone
        }
      }
    }));
    const screenTest = render(<NavigationWrapper screen={CreditScreen} />);
    const { getByTestId, getByText, queryByText, queryByTestId } = screenTest;
    expect(screenTest?.toJSON()).toMatchSnapshot();
    expect(getByTestId('credit_services_btn')).toBeTruthy();
    expect(queryByText('INICIAR SESIÓN')).toBeNull();
    expect(queryByText('VINCULA TU CRÉDITO DE PRATI')).toBeNull();
    expect(queryByText('Si aún no tienes tu crédito De Prati')).toBeNull();
    expect(queryByTestId('credit_solicitar_btn')).toBeNull();
  });
});
