import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import Storie from '../../../src/presentation/common-components/stories';
import { IRender } from '../../../__mocks__/IRender.interface';

let screenTest: IRender;

describe('Storie test', () => {
  it('renders correctly Storie in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <Storie
            customProps={undefined}
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        )}
      />
    );

    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
