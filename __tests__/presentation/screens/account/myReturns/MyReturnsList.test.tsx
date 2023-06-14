import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { MyReturnsListScreen } from '../../../../../src/presentation/screens/account/MyReturns/screens/MyReturnsListScreen';
import { DataMock_MyReturnsList } from '../../../../../__mocks__/dataMock-MyReturns';
import { useMyReturnsList } from '../../../../../src/presentation/screens/account/MyReturns/hooks/useMyReturnsList.hook';

jest.mock('../../../../../src/infrastucture/native-modules/emma/useEmma.hook');
jest.mock('../../../../../src/infrastucture/native-modules/emma/tokensMap.ts');
jest.mock(
  '../../../../../src/presentation/screens/account/MyReturns/hooks/useMyReturnsList.hook'
);
describe('MyReturnsListScreen', () => {
  it('renders correctly in Snapshot', () => {
    useMyReturnsList.mockImplementation(() => {
      return {
        getMyReturnsList: jest.fn(),
        returnsList: DataMock_MyReturnsList,
        dataMyReturnsList: DataMock_MyReturnsList,
        isLoadingMyReturnsList: false,
        isErrorMyReturnsList: false,
        MAX_RETURS: 5,
        handleGoDetails: jest.fn(),
        handleGoSolicit: jest.fn(),
        filteredReturnsMade: jest.fn(() => DataMock_MyReturnsList),
        nextPage: jest.fn(),
        prevPage: jest.fn(),
        changePage: jest.fn(),
        handleMaxPage: jest.fn(),
        currentPage: 1
      };
    });
    const screenTest = render(
      <NavigationWrapper screen={MyReturnsListScreen} />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
