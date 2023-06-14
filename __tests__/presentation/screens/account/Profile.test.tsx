import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import { Profile } from '../../../../src/presentation/screens/account/MyProfile';

describe('Profile', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(<NavigationWrapper screen={Profile} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
