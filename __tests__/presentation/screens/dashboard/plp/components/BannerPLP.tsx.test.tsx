import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import { DataMock_CustomProps } from '../../../../../../__mocks__/dataMock-Plp';
import BannerPLP from '../../../../../../src/presentation/screens/dashboard/PLP/components/BannerPLP/BannerPLP';

let screenTest: IRender;
describe('BannerPLP', () => {
  it('renders correctly in Snapshot BannerPLP', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => <BannerPLP {...DataMock_CustomProps} />}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
