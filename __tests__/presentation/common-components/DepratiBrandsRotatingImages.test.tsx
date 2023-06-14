import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import DepratiBrandsRotatingImages from '../../../src/presentation/common-components/DepratiBrandsRotatingImages/DepratiBrandsRotatingImages';
import { DataMock_CustomProps } from '../../../__mocks__/dataMock-CommonComponents';

let screenTest: any;
describe('DepratiBrandsRotatingImages', () => {
  it('renders correctly DepratiBrandsRotatingImages in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <DepratiBrandsRotatingImages customProps={DataMock_CustomProps} />
        )}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
