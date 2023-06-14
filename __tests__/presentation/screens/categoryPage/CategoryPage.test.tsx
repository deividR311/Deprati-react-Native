import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import CategoryPage from '../../../../src/presentation/screens/CategoryPage';
import {
  DataMock_CategoryContent,
  DataMock_CategoryData
} from '../../../../__mocks__/dataMock-CategoryPage';
import { usePageContent } from '../../../../src/infrastucture/apis/contentPage';

let screenTest: any;
const categoryPage_Params = {
  category: '01',
  categoryData: DataMock_CategoryData
};
describe('CategoryPage', () => {
  beforeEach(() => {
    usePageContent.mockImplementation(() => ({
      loading: false,
      error: false,
      pageContent: DataMock_CategoryContent,
      getDataContent: jest.fn()
    }));

    screenTest = render(
      <NavigationWrapper
        initialParams={categoryPage_Params}
        screen={CategoryPage}
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
