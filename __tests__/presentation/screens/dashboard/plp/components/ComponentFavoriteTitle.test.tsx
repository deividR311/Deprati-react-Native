import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import {
  DataMock_LoadingFavorite,
  DataMock_PLP_Item
} from '../../../../../../__mocks__/dataMock-Plp';
import ComponentFavoriteTitle from '../../../../../../src/presentation/screens/dashboard/PLP/components/favorite-title/ComponentFavoriteTitle';

let screenTest: IRender;
describe('ComponentFavoriteTitle', () => {
  it('renders correctly in Snapshot ComponentFavoriteTitle', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <ComponentFavoriteTitle
            title={DataMock_PLP_Item.name}
            codeProduct={DataMock_PLP_Item.code}
            onAddFavorite={jest.fn()}
            loadingFavorite={DataMock_LoadingFavorite}
          />
        )}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
