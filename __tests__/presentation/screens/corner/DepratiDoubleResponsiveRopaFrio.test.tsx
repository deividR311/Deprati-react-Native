import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import DepratiDoubleResponsiveRopaFrio from '../../../../src/presentation/screens/Corner/components/DepratiDoubleResponsiveRopaFrio';
import { DataMock_CornerRopaFrio } from '../../../../__mocks__/dataMock-Corner';

let screenTest: IRender;
describe('CMSParagraph', () => {
  it('renders correctly CMSParagraph in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <DepratiDoubleResponsiveRopaFrio
            customProps={DataMock_CornerRopaFrio}
          />
        )}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
