import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import CMSLinkButton from '../../../src/presentation/common-components/CMSLinkButton/CMSLinkButton';
import { DataMock_CustomProps } from '../../../__mocks__/dataMock-CommonComponents';

let screenTest: any;
describe('CMSLinkButton', () => {
  it('renders correctly CMSLinkButton in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <CMSLinkButton
            customProps={{ ...DataMock_CustomProps, linkName: 'linkName' }}
          />
        )}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
    fireEvent.press(screenTest.getByText('linkName'));
  });

  it('No renders CMSLinkButton if no linkName', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => <CMSLinkButton customProps={DataMock_CustomProps} />}
      />
    );
    expect(screenTest.queryByText('linkName')).toBeNull();
  });
});
