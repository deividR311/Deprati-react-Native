import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { IRender } from '../../../../../__mocks__/IRender.interface';
import { SkeletonPage } from '../../../../../src/presentation/screens/dashboard/PDP/skeletons/ProductPageSkeleton';

let screenTest: IRender;

describe('Skeletons PDP', () => {
  it('renders correctly in Snapshot Skeletons PDP', () => {
    screenTest = render(<NavigationWrapper screen={SkeletonPage} />);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
