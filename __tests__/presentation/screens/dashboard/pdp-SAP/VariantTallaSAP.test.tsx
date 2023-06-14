import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { VariantTalla } from '../../../../../src/presentation/screens/dashboard/PDPSap/components';
import { mockStateAction } from '../../../../../__mocks__/mockFunctions';

const mockVariantTalla = [
  {
    ean: '000000',
    cod_Color: '000000',
    color: '000000',
    cod_Talla: '000000',
    talla: '000000',
    art_Con: '000000'
  },
  {
    ean: '000001',
    cod_Color: '000001',
    color: '000001',
    cod_Talla: '000001',
    talla: '000001',
    art_Con: '000001'
  }
];
describe('VariantTallaSAP', () => {
  it('renders correctly in Snapshot VariantTallaSAP', () => {
    const screenTest = render(
      <NavigationWrapper
        screen={() => (
          <VariantTalla
            variantTalla={mockVariantTalla}
            useTalla={mockStateAction('tallaSelect')}
            useEan={mockStateAction('eanSelect')}
            useSizeSelected={mockStateAction(true)}
          />
        )}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
