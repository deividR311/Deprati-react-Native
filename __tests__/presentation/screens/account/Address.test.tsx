import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import { Address } from '../../../../src/presentation/screens/account/MyAddress/Address';

describe('Address', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={Address} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
