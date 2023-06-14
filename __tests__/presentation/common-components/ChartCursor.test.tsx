import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import Cursor from '../../../src/presentation/common-components/charts/arc/chart-cursor';
import { IRender } from '../../../__mocks__/IRender.interface';

let screenTest: IRender;

describe('ChartCursor test', () => {
  it('renders correctly ChartCursor in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <Cursor
            radius={0}
            alpha={0}
            maxValue={0}
            area={0}
            beta={0}
            onChangeValue={function (value: number): void {
              throw new Error('Function not implemented.');
            }}
          />
        )}
      />
    );

    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
