import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import { ScreenBackButton } from '../../../src/presentation/common-components/backButton';

let screenTest: any;

describe('ScreenBackButton test', () => {
  it('renders correctly ScreenBackButton in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper screen={() => <ScreenBackButton />} />
    );

    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
