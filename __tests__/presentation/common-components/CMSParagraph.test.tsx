import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import CMSParagraph from '../../../src/presentation/common-components/CMSParagraph/CMSParagraph';
import { DataMock_CustomProps } from '../../../__mocks__/dataMock-CommonComponents';

let screenTest: any;
describe('CMSParagraph', () => {
  it('renders correctly CMSParagraph in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => <CMSParagraph customProps={DataMock_CustomProps} />}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
