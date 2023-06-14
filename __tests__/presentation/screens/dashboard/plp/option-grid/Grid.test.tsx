import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import { Grid } from '../../../../../../src/presentation/screens/dashboard/PLP';
import {
  DataMock_LoadingFavorite,
  DataMock_PLP
} from '../../../../../../__mocks__/dataMock-Plp';

let screenTest: IRender;
describe('View Grid', () => {
  it('renders correctly in Snapshot View Grid', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <Grid
            listProducts={DataMock_PLP.products}
            loading={false}
            nextPage={jest.fn()}
            onAddFavorite={jest.fn()}
            loadingFavorite={DataMock_LoadingFavorite}
          />
        )}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
