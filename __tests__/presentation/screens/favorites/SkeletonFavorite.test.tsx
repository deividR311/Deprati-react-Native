import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import { IRender } from '../../../../__mocks__/IRender.interface';
import { SkeletonFavorite } from '../../../../src/presentation/screens/favorite/Favorites/View/SkeletonFavorite';

let screenTest: IRender;

describe('SkeletonFavorite', () => {
  beforeEach(() => {
    screenTest = render(<NavigationWrapper screen={SkeletonFavorite} />);
  });

  it('renders correctly GuideSize in Snapshot', () => {
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
