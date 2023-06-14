import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import SearchListProduct from '../../../../../src/presentation/screens/dashboard/SLP/SearchListProduct';
import { IRender } from '../../../../../__mocks__/IRender.interface';

let screenTest: IRender;
describe('SLP Screen', () => {
  beforeEach(() => {
    screenTest = render(
      <NavigationWrapper
        // initialParams={{ searchID: 'Ropa' }}
        screen={SearchListProduct}
      />
    );
  });

  it('select OrderBy', () => {
    const { getByText } = screenTest;
    expect(getByText('Ordenar por')).toBeDefined();
  });

  it('SearchInput', () => {
    const { getByText } = screenTest;
    expect(getByText(/busca aquí/i)).toBeDefined();
  });
});
