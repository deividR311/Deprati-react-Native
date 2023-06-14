import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import { SkeletonList } from '../../../../../../src/presentation/screens/dashboard/PLP';

let screenTest: IRender;

describe('Skeleton PLP', () => {
  it('renders correctly in Snapshot Skeleton List', () => {
    screenTest = render(<NavigationWrapper screen={SkeletonList} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
