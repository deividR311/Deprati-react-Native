import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import CreditStatus from '../../../../../src/presentation/screens/Credit/MoreServicesScreen/content/CreditStatus/CreditStatus';
import { useLocalStorage } from '../../../../../src/application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../src/application/state-manager/services/localstorage';

jest.mock(
  '../../../../../src/application/state-manager/services/localstorage/useLocalStorage'
);
const message = 'Hola';
const phone = '+593979461435';

let screenTest: any;
/*describe('renders correctly in Snapshot CreditStatus', () => {
  it('renders correctly in Snapshot', () => {
    useLocalStorage.mockImplementation(() => ({
      save: jest.fn(),
      localStorageData: {
        [LocalStorageKey.IsLogin]: true,
        [LocalStorageKey.User]: { UserDocumentId: 999222258 },
      },
    }))

    const screenTest2 = render(<NavigationWrapper screen={CreditStatus} />)
    expect(screenTest2.toJSON()).toMatchSnapshot()
  })
})
*/
describe('CreditStatus', () => {
  beforeEach(() => {
    // mockear useLocalStorage
    useLocalStorage.mockImplementation(() => ({
      save: jest.fn(),
      localStorageData: {
        [LocalStorageKey.IsLogin]: true, // valor inicial de IS_LOGIN
        [LocalStorageKey.User]: { UserDocumentId: 999222258 },
        [LocalStorageKey.Whatsapp]: {
          message,
          phone
        }
      }
    }));

    screenTest = render(<NavigationWrapper screen={CreditStatus} />);
  });

  it('select period', async () => {
    const { getByTestId, getByText } = screenTest;

    expect(
      getByText('Selecciona el periodo que deseas solicitar.')
    ).toBeDefined();
  });

  it('Period to consult', async () => {
    const { getByTestId, getByText } = screenTest;

    expect(getByText('Periodo a consultar')).toBeDefined();
    expect(getByTestId('selectperiod')).toBeDefined();
    const btnSel = getByTestId('selectperiod');
    fireEvent.press(btnSel);
  });

  it('I accept the terms', async () => {
    const { getByTestId, getByText } = screenTest;

    expect(getByTestId('accept_terms')).toBeDefined();
    const btnSel = getByTestId('accept_terms');
    fireEvent.press(btnSel);
  });

  it('Button Send', async () => {
    const { getByTestId, getByText } = screenTest;
    const btnAdd = getByText(/enviar estado del crédito/i);
    fireEvent.press(btnAdd);
  });
});
