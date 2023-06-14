import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { OrdersScreen } from '../../../../../src/presentation/screens/account/support-tickets/orders.screens';
jest.mock('../../../../../src/infrastucture/native-modules/emma/useEmma.hook');
jest.mock('../../../../../src/infrastucture/native-modules/emma/tokensMap.ts');
describe('SupportOrdersScreen ', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={OrdersScreen} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
