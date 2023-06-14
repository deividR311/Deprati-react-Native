import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { SearchProduct } from '../../../../../src/presentation/screens/dashboard/SearchProduct';
import { mockhookApi } from '../../../../../__mocks__/mock-apis';

jest.mock('../../../../../src/infrastucture/apis/article/article.api', () => ({
  useArticleMutationRequest: () => mockhookApi
}));

let screenTest: any;
const searchProduct_Params = {
  searchID: 'ROPA DEPORTIVA'
};

describe('SearchProduct', () => {
  beforeEach(() => {
    screenTest = render(
      <NavigationWrapper
        initialParams={searchProduct_Params}
        screen={SearchProduct}
      />
    );
  });

  it('renders correctly in Snapshot', () => {
    screenTest = render(<NavigationWrapper screen={SearchProduct} />);
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
