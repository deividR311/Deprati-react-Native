import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { VariantColors } from '../../../../../src/presentation/screens/dashboard/PDPSap/components';
import { mockStateAction } from '../../../../../__mocks__/mockFunctions';

const mockVariantColors = [
  {
    codigo: '11111111',
    descrip: 'article1',
    art_Con: '',
    inv_Tda: 11111
  },
  {
    codigo: '2222222',
    descrip: 'article2',
    art_Con: '',
    inv_Tda: 222222
  }
];

describe('VariantColorsSAP', () => {
  it('renders correctly in Snapshot VariantColorsSAP', () => {
    const screenTest = render(
      <NavigationWrapper
        screen={() => (
          <VariantColors
            variantColors={mockVariantColors}
            useColor={mockStateAction('colorSelect')}
          />
        )}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
