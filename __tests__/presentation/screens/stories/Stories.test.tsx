import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import Stories from '../../../../src/presentation/screens/Stories';
import { dataMockStories } from '../../../../__mocks__/dataMock-Stories';

let screenTest: any;

describe('Stories', () => {
  it('renders correctly in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper screen={Stories} initialParams={dataMockStories} />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
