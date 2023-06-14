import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import { ChartIncreaseCreditLimit } from '../../../src/presentation/common-components/charts/increase-credit-limit';
import { DataMock_IncreaseCreditLimit } from '../../../__mocks__/dataMock-CommonComponents';
import { IRender } from '../../../__mocks__/IRender.interface';

let screenTest: IRender;
describe('ChartIncreaseCreditLimit', () => {
  it('renders correctly ChartIncreaseCreditLimit in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <ChartIncreaseCreditLimit {...DataMock_IncreaseCreditLimit} />
        )}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });

  it('renders correctly ChartIncreaseCreditLimit', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <ChartIncreaseCreditLimit
            {...DataMock_IncreaseCreditLimit}
            holdInValue
          />
        )}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
