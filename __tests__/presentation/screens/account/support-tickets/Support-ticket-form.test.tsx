import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { SupportTicketFormScreen } from '../../../../../src/presentation/screens/account/support-tickets/support-ticket-form.screen';

jest.mock('../../../../../src/infrastucture/native-modules/emma/useEmma.hook');
jest.mock('../../../../../src/infrastucture/native-modules/emma/tokensMap.ts');

let screenTest: any;

describe('SupportTicketFormScreen ', () => {
  beforeEach(() => {
    screenTest = render(<NavigationWrapper screen={SupportTicketFormScreen} />);
  });
  it('render label order', async () => {
    const { getByTestId, getByText } = screenTest;

    expect(getByText(/Pedido/i)).toBeDefined();
  });
  it('render ButtonSend', async () => {
    const { getByTestId, getByText } = screenTest;

    expect(getByText(/ENVIAR/i)).toBeDefined();
  });
});
