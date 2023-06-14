import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { IRender } from '../../../../../__mocks__/IRender.interface';
import SkeletonsPLP from '../../../../../src/presentation/screens/dashboard/PLP/components/skeletons/SkeletonsPLP';
import { OPTION_SELECTED } from '../../../../../src/presentation/screens/dashboard/PLP/components/utils';

let screenTest: IRender;

describe('Skeletons PLP', () => {
  it('renders correctly in Snapshot OPTION_SELECTED.GRID', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <SkeletonsPLP loading={true} selectOp={OPTION_SELECTED.GRID} />
        )}
      />
    );
    const { getByTestId } = screenTest;
    expect(getByTestId('skeleton-grid')).toBeDefined();

    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
  it('renders correctly in Snapshot OPTION_SELECTED.SQUARE', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <SkeletonsPLP loading={true} selectOp={OPTION_SELECTED.SQUARE} />
        )}
      />
    );
    const { getByTestId } = screenTest;
    expect(getByTestId('skeleton-big-photo')).toBeDefined();

    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in Snapshot OPTION_SELECTED.LIST', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <SkeletonsPLP loading={true} selectOp={OPTION_SELECTED.LIST} />
        )}
      />
    );
    const { getByTestId } = screenTest;
    expect(getByTestId('skeleton-list')).toBeDefined();

    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
