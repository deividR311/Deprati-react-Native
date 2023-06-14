import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import MyAccount from '../../../../src/presentation/screens/account/Account/MyAccount';
import { useLocalStorage } from '../../../../src/application/state-manager/services/localstorage/useLocalStorage';

jest.mock(
  '../../../../src/application/state-manager/services/localstorage/useLocalStorage'
);

describe('MyAccount', () => {
  let screenTest: any;
  beforeEach(() => {
    // mockear useLocalStorage
    useLocalStorage.mockImplementation(() => ({
      save: jest.fn(),
      localStorageData: {
        IS_LOGIN: false // valor inicial de IS_LOGIN
      }
    }));

    screenTest = render(<NavigationWrapper screen={MyAccount} />);
  });

  it('renders correctly in Snapshot', () => {
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const { getByTestId, getByText } = screenTest;
    expect(getByTestId('btn_sesion')).toBeTruthy();
    expect(getByText('INICIAR SESIÓN')).toBeTruthy();
    //elements menu
    expect(getByText('Mis compras')).toBeTruthy();
    expect(getByText('Mis notificaciones')).toBeTruthy();
    expect(getByText('Mis direcciones')).toBeTruthy();
    expect(getByText('Mis reclamos')).toBeTruthy();
    expect(getByText('Mis devoluciones')).toBeTruthy();
    expect(getByText('Mis datos')).toBeTruthy();
    expect(getByText('Cambio de contraseña')).toBeTruthy();
    expect(getByText('Preguntas frecuentes')).toBeTruthy();
    expect(getByText('Servicio al cliente')).toBeTruthy();
    expect(getByText('Encuentra la tienda más cercana')).toBeTruthy();
  });

  /* it('change button of login', () => {
    const { getByTestId, getByText, queryByTestId, queryByText } = screenTest
    expect(getByTestId('btn_sesion')).toBeTruthy()
    expect(getByText('INICIAR SESIÓN')).toBeTruthy()
    act(() => {
      useLocalStorage.mockImplementation(() => ({
        save: jest.fn(),
        localStorageData: {
          IS_LOGIN: true,
        },
      }))
    })
    waitFor(() => {
      expect(queryByTestId('btn_sesion')).toBeNull()
      expect(queryByText('CERRAR SESIÓN')).toBeTruthy()
    })
  }) */
});
