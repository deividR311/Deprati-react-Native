import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import { useLocalStorage } from '../../../../src/application/state-manager/services/localstorage/useLocalStorage';
import useFavorite from '../../../../src/presentation/screens/favorite/Favorites/hook/useFavorite.hook';
import FavoriteScreen from '../../../../src/presentation/screens/favorite/Favorites/FavoritesScreen';
import { DataMock_EntryWishList } from '../../../../__mocks__/dataMock-Favorite';
import { IRender } from '../../../../__mocks__/IRender.interface';

jest.mock(
  '../../../../src/application/state-manager/services/localstorage/useLocalStorage'
);
jest.mock(
  '../../../../src/presentation/screens/favorite/Favorites/hook/useFavorite.hook'
);
let screenTest: IRender;
let isWitList: boolean = false;

describe('FavoriteScreen', () => {
  beforeEach(() => {
    // mockear useLocalStorage
    useLocalStorage.mockImplementation(() => ({
      save: jest.fn(),
      localStorageData: {
        IS_LOGIN: true // valor inicial de IS_LOGIN
      }
    }));
    // mockear useFavorite
    useFavorite.mockImplementation(() => {
      return {
        handleGetAllFavorites: jest.fn(),
        entryWishList: isWitList ? DataMock_EntryWishList : [],
        setProductSelect: (x: any) => jest.fn(x)
      };
    });
    screenTest = render(<NavigationWrapper screen={FavoriteScreen} />);
  });

  it('renders correctly FavoriteScreen in Snapshot', () => {
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('Empty Favorites', () => {
    const { getByTestId } = screenTest;
    expect(getByTestId('textEmpty')).toBeDefined();
    isWitList = true;
  });

  it('List With Favorites', () => {
    const { getByTestId } = screenTest;
    expect(getByTestId('listFavorites')).toBeDefined();
  });

  it('Item Favorite', async () => {
    const { getByTestId } = screenTest;
    expect(getByTestId('itemfavorite-6')).toBeDefined();
    expect(getByTestId('add-itemfavorite-6')).toBeDefined();
  });

  it('Item Favorite with size and color', async () => {
    const { getByTestId, getByText } = screenTest;

    expect(getByTestId('itemfavorite-0')).toBeDefined();
    expect(getByTestId('add-itemfavorite-0')).toBeDefined();

    const btnAdd = getByTestId('add-itemfavorite-0');
    fireEvent.press(btnAdd);
    expect(getByText('Confirma talla y color')).toBeDefined();
  });

  it('Item Favorite with size', async () => {
    const { getByTestId, getByText } = screenTest;
    expect(getByTestId('itemfavorite-1')).toBeDefined();
    expect(getByTestId('add-itemfavorite-1')).toBeDefined();

    const btnAdd = getByTestId('add-itemfavorite-1');
    fireEvent.press(btnAdd);

    expect(getByText('Confirma talla y color')).toBeDefined();

    const btnConfirm = getByText(/confirmar/i);
    expect(btnConfirm).toBeDefined();
  });

  it('Icon Shopping Cart', () => {
    const { getByTestId } = screenTest;
    expect(getByTestId('shopping-cart')).toBeDefined();
  });
});
