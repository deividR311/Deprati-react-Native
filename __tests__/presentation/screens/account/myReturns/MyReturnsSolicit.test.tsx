import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { DataMock_MyReturnsSolicit } from '../../../../../__mocks__/dataMock-MyReturns';
import { useMyReturnsSolicit } from '../../../../../src/presentation/screens/account/MyReturns/hooks/useMyReturnsSolicit.hook';
import { MyReturnsSolicitScreen } from '../../../../../src/presentation/screens/account/MyReturns/screens/MyReturnsSolicitScreen';

jest.mock(
  '../../../../../src/presentation/screens/account/MyReturns/hooks/useMyReturnsSolicit.hook'
);

describe('MyReturnsSolicitScreen', () => {
  it('renders correctly in Snapshot', () => {
    useMyReturnsSolicit.mockImplementation(() => {
      return {
        getDetailReturn: jest.fn(),
        MAX_ORDER: 5,
        isLoadingReturnableOrders: false,
        isErrorReturnableOrders: false,
        ordersReturns: DataMock_MyReturnsSolicit,
        getReturnableOrders: jest.fn(),
        filteredOrdersMade: jest.fn(() => DataMock_MyReturnsSolicit),
        handleMaxPage: jest.fn(),
        prevPage: jest.fn(),
        nextPage: jest.fn(),
        changePage: jest.fn(),
        handleGoEnterReturn: jest.fn(),
        padding: 0
      };
    });
    const screenTest = render(
      <NavigationWrapper screen={MyReturnsSolicitScreen} />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
