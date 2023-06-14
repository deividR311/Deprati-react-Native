import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import {
  DataMock_LoadingFavorite,
  DataMock_PLP_Item
} from '../../../../../../__mocks__/dataMock-Plp';
import { ItemList } from '../../../../../../src/presentation/screens/dashboard/PLP';

let screenTest: IRender;
describe('ItemList', () => {
  it('renders correctly in Snapshot ItemList', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <ItemList
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
