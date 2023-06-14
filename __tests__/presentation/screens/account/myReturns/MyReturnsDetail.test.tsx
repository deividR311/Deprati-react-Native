import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { MyReturnsDetailScreen } from '../../../../../src/presentation/screens/account/MyReturns/screens/MyReturnsDetailScreen';
import { DataMock_MyReturnsDetail } from '../../../../../__mocks__/dataMock-MyReturns';
import { useMyReturnsDetail } from '../../../../../src/presentation/screens/account/MyReturns/hooks/useMyReturnsDetail.hook';

jest.mock(
  '../../../../../src/presentation/screens/account/MyReturns/hooks/useMyReturnsDetail.hook'
);
jest.mock(
  '../../../../../src/presentation/screens/account/MyReturns/screens/stylesMyReturns.tsx'
);
describe('MyReturnsDetailScreen', () => {
  it('renders correctly in Snapshot', () => {
    useMyReturnsDetail.mockImplementation(() => {
      return {
        getDetailReturn: jest.fn(),
        dataDetailReturn: DataMock_MyReturnsDetail,
        isLoadingDetailReturn: false,
        isErrorDetailReturn: false,
        handleToAccept: jest.fn()
      };
    });
    const screenTest = render(
      <NavigationWrapper screen={MyReturnsDetailScreen} />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
