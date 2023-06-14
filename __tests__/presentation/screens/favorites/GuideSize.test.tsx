import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import GuideSize from '../../../../src/presentation/screens/favorite/Favorites/modals/components/guideSize/GuideSize';
import { IRender } from '../../../../__mocks__/IRender.interface';

let screenTest: IRender;

describe('GuideSize Component', () => {
  beforeEach(() => {
    screenTest = render(<NavigationWrapper screen={GuideSize} />);
  });

  it('renders correctly GuideSize in Snapshot', () => {
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('Defined component Image', () => {
    const { getByTestId } = screenTest;
    expect(getByTestId('guide-size-image')).toBeDefined();
  });

  it('Defined url GuideSize', () => {
    const { getByTestId } = screenTest;
    const imageComponent = getByTestId('guide-size-image');
    expect(imageComponent).toBeDefined();
    expect(imageComponent.props.source.testUri).toContain('GuideSize.png');
  });
});
