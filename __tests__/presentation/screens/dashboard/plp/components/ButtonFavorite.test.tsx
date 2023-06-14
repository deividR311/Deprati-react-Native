import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import { ButtonFavorite } from '../../../../../../src/presentation/screens/dashboard/PLP/components';
import {
  DataMock_LoadingFavorite,
  DataMock_PLP_Item
} from '../../../../../../__mocks__/dataMock-Plp';
import {
  LocalStorageKey,
  useLocalStorage
} from '../../../../../../src/application/state-manager/services/localstorage';

// jest.mock(
//   '../../../../../../src/application/state-manager/services/localstorage/useLocalStorage'
// );
jest.mock(
  '../../../../../../src/application/state-manager/services/localstorage/useLocalStorage',
  () => ({
    useLocalStorage: () => ({
      localStorageData: {
        IS_LOGIN: true
      }
    })
  })
);
let screenTest: IRender;
describe('ButtonFavorite', () => {
  beforeEach(() => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <ButtonFavorite
            code={DataMock_PLP_Item.code}
            onAddFavorite={jest.fn()}
            isFavorite={DataMock_PLP_Item.isFavorite}
            loadingFavorite={DataMock_LoadingFavorite}
          />
        )}
      />
    );
  });

  it('renders correctly in Snapshot ButtonFavorite', () => {
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('Icon favorite', () => {
    const { getByTestId } = screenTest;
    const iconFavorite = getByTestId('plp-icon-favorite');
    expect(iconFavorite).toBeDefined();
  });

  it('Add Favorite', async () => {
    const { getByTestId } = screenTest;
    const buttonFavorite = getByTestId('plp-button-favorite');
    expect(buttonFavorite).toBeDefined();

    fireEvent.press(buttonFavorite);

    const iconLoading = getByTestId('plp-loading-favorite');
    expect(iconLoading).toBeDefined();
  });
  it('Loading Delete Favorite', async () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <ButtonFavorite
            code={DataMock_PLP_Item.code}
            onAddFavorite={jest.fn()}
            isFavorite={true}
            loadingFavorite={{
              ...DataMock_LoadingFavorite,
              loadingDelete: true
            }}
          />
        )}
      />
    );
    const { getByTestId } = screenTest;
    const buttonFavorite = getByTestId('plp-button-favorite');
    expect(buttonFavorite).toBeDefined();

    fireEvent.press(buttonFavorite);

    const iconLoading = getByTestId('plp-loading-favorite');
    expect(iconLoading).toBeDefined();
  });
});
