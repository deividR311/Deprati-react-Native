import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import { SignUp } from '../../../src/presentation/screens';

jest.mock('react-native-select-dropdown', () => {
  const { View } = require('react-native');
  const MockSelectDropdown = (props: any) => {
    return <View>{props.children}</View>;
  };

  return MockSelectDropdown;
});

describe('SignUp', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={SignUp} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
