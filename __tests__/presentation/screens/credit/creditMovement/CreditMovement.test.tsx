import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import CreditMovement from '../../../../../src/presentation/screens/CreditMovement/CreditMovement';

let screenTest: any;
describe('renders CreditMovement', () => {
  it('renders correctly in Snapshot', () => {
    screenTest = render(<NavigationWrapper screen={CreditMovement} />);
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
