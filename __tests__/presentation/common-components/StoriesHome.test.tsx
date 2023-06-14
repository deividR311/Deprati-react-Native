import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import StoriesHome from '../../../src/presentation/common-components/stories-home';
import { ExtensionComponentProps } from '../../../src/presentation/common-components/extension-component';
import { IRender } from '../../../__mocks__/IRender.interface';

let extentionProp: ExtensionComponentProps;
let screenTest: IRender;

describe('StoriesHome test', () => {
  let storieCustomProp: any = {
    customProps: extentionProp
  };
  it('renders correctly StoriesHome in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => <StoriesHome customProps={storieCustomProp} />}
      />
    );

    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
