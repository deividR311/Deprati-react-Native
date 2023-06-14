import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import ProductPageSAP from '../../../../../src/presentation/screens/dashboard/PDPSap';

describe('ProductPageSAP', () => {
  it('renders correctly in Snapshot ProductPageSAP', () => {
    const screenTest = render(<NavigationWrapper screen={ProductPageSAP} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
