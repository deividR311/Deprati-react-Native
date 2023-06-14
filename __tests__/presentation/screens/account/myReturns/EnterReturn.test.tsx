import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { DataMock_EnterReturn } from '../../../../../__mocks__/dataMock-MyReturns';
import EnterReturnScreen from '../../../../../src/presentation/screens/account/MyReturns/screens/EnterReturnScreen';
import { useMyReturnsSearch } from '../../../../../src/presentation/screens/account/MyReturns/hooks/useMyReturnsSearch.hook';

jest.mock(
  '../../../../../src/presentation/screens/account/MyReturns/hooks/useMyReturnsSearch.hook'
);

describe('EnterReturnScreen', () => {
  it('renders correctly in Snapshot', () => {
    useMyReturnsSearch.mockImplementation(() => {
      return {
        getDetailReturn: jest.fn(),
        searchReturnOrders: jest.fn(),
        handleToAccept: jest.fn(),
        handleReturnAll: jest.fn(),
        OrderDetail: DataMock_EnterReturn,
        isLoadingSearchReturn: false,
        isErrorSearchReturn: false,

        handleGlobal: jest.fn(),
        isAllItems: false,
        isLoadingEnterReturn: false,
        isDisabledAll: false,
        isSuccesEnterReturn: false,
        isErrorEnterReturn: false,
        handleBottomSheet: jest.fn()
      };
    });
    const screenTest = render(<NavigationWrapper screen={EnterReturnScreen} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
