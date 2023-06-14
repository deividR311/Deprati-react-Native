import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import { DonutChart } from '../../../src/presentation/common-components/credit-information-chart';

let screenTest: any;
describe('DonutChart', () => {
  it('renders correctly DonutChart in Snapshot', () => {
    screenTest = render(<NavigationWrapper screen={() => <DonutChart />} />);
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
