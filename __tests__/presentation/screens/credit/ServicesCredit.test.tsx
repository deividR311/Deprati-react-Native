import React from 'react';
import { render } from '@testing-library/react-native';
import ServicesCredit from '../../../../src/presentation/screens/Credit/ServicesScreen/ServicesCredit';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';

describe('ServicesCredit', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={ServicesCredit} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
