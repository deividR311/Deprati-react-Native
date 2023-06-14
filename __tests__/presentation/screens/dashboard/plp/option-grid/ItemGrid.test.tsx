import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import {
  DataMock_LoadingFavorite,
  DataMock_PLP_Item
} from '../../../../../../__mocks__/dataMock-Plp';
import { ItemGrid } from '../../../../../../src/presentation/screens/dashboard/PLP';

let screenTest: IRender;
describe('ItemGrid', () => {
  it('renders correctly in Snapshot ItemGrid', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <ItemGrid
            data={DataMock_PLP_Item}
            onAddFavorite={jest.fn()}
            loadingFavorite={DataMock_LoadingFavorite}
            testId={''}
          />
        )}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
