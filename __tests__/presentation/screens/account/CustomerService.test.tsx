import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import CustomerService from '../../../../src/presentation/screens/customerService/CustomerService';

describe('CustomerService', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={CustomerService} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
