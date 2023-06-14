import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import NoFoundPage from '../../../../src/presentation/screens/NoFoundPage/NoFoundPage';

let screenTest: any;
describe('NoFoundPage', () => {
  it('renders correctly in Snapshot', () => {
    screenTest = render(<NavigationWrapper screen={NoFoundPage} />);
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
