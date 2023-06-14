import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { useLocalStorage } from '../../../../../src/application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../src/application/state-manager/services/localstorage';
import CertificateCredit from '../../../../../src/presentation/screens/Credit/MoreServicesScreen/content/CertificateCredit/CertificateCredit';

jest.mock(
  '../../../../../src/application/state-manager/services/localstorage/useLocalStorage'
);
let screenTest: any;
describe('renders correctly in Snapshot CertificateCredit', () => {
  it('renders correctly in Snapshot', () => {
    useLocalStorage.mockImplementation(() => ({
      save: jest.fn(),
      localStorageData: {
        [LocalStorageKey.IsLogin]: true,
        [LocalStorageKey.User]: { UserDocumentId: 999222258 },
        [LocalStorageKey.Whatsapp]: {
          message: 'Hola',
          phone: '+593979461435'
        },
        [LocalStorageKey.MessagesApp]: {
          Certificate_Commercial_Reference: {
            title: 'Este servicio será cobrado de tu crédito De Prati.',
            description: 'Costo: $1,00 + IVA'
          },
          Certificate_Credit_at_day: {
            title: 'Este servicio será cobrado de tu crédito De Prati.',
            description: 'Costo: $0,63 + IVA'
          }
        }
      }
    }));

    screenTest = render(<NavigationWrapper screen={CertificateCredit} />);
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
