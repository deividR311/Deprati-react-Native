import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import CornerScreen from '../../../../src/presentation/screens/Corner/CornerScreen';
import { usePageContent } from '../../../../src/infrastucture/apis/contentPage';
import {
  DataMock_CornerContent,
  DataMock_CornerParams
} from '../../../../__mocks__/dataMock-Corner';

let screenTest: any;
describe('CornerScreen', () => {
  beforeEach(() => {
    usePageContent.mockImplementation(() => ({
      loading: false,
      error: false,
      pageContent: DataMock_CornerContent,
      getDataContent: jest.fn()
    }));
    screenTest = render(
      <NavigationWrapper
        initialParams={DataMock_CornerParams}
        screen={CornerScreen}
      />
    );
  });
  it('renders correctly in Snapshot', () => {
    expect(screenTest.toJSON()).toMatchSnapshot();
  });

  it('Icon Shopping Cart', () => {
    const { getByTestId } = screenTest;
    expect(getByTestId('shopping-cart')).toBeDefined();
  });
});
