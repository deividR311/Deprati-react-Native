import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import RelatedCreditScreen from '../../../../src/presentation/screens/Credit/RelatedCreditScreen';

describe('RelatedCreditScreen', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(
      <NavigationWrapper screen={RelatedCreditScreen} />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
