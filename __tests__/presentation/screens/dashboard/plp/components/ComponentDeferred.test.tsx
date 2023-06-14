import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import ComponentDeferred from '../../../../../../src/presentation/screens/dashboard/PLP/components/deferred/ComponentDeferred';

let screenTest: IRender;

describe('ComponentDeferred', () => {
  it('renders correctly in Snapshot ComponentDeferred', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => <ComponentDeferred deferred={'24|$54,57|$1.309,68'} />}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
