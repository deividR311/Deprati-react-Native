import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import { CreditInformationChart } from '../../../src/presentation/common-components/credit-information-chart';
import { DataMock_Charts } from '../../../__mocks__/dataMock-CommonComponents';

let screenTest: any;
describe('CreditInformationChart', () => {
  it('renders correctly CreditInformationChart in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <CreditInformationChart
            constentChart={DataMock_Charts.constentChart}
          />
        )}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });

  it('renders alternative params', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <CreditInformationChart
            {...DataMock_Charts}
            displayCartType="large"
          />
        )}
      />
    );
    expect(screenTest.queryByText(DataMock_Charts.ownerFullname)).toBeDefined();
  });
});
