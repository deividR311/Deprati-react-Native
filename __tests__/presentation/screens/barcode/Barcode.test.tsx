import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import Barcode from '../../../../src/presentation/screens/Barcode/Barcode';

let screenTest: any;

describe('Barcode', () => {
  beforeEach(() => {
    screenTest = render(<NavigationWrapper screen={Barcode} />);
  });
  it('renders correctly in Snapshot', () => {
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
