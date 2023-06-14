import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import Dior from '../../../../src/presentation/screens/Corner/screens/Dior';
import { DataMock_DiorContent } from '../../../../__mocks__/dataMock-Dior';

let screenTest: any;
describe('Dior', () => {
  beforeEach(() => {
    screenTest = render(<Dior content={DataMock_DiorContent} />, {
      wrapper: NavigationWrapper
    });
  });

  it('renders correctly in Snapshot', () => {
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
