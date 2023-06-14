import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { DataMock_MyReturnsSolicit } from '../../../../../__mocks__/dataMock-MyReturns';
import { SupportTicketsScreen } from '../../../../../src/presentation/screens/account/support-tickets/tickets.screen';
jest.mock('../../../../../src/infrastucture/native-modules/emma/useEmma.hook');
jest.mock('../../../../../src/infrastucture/native-modules/emma/tokensMap.ts');
describe('SupportTicketsScreen ', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(
      <NavigationWrapper screen={SupportTicketsScreen} />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
