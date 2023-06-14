import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import ListCardButton from '../../../src/presentation/common-components/ListCardButton/ListCardButton';

let screenTest: any;
describe('ListCardButton', () => {
  let customProp = {
    onPress: () => jest.fn(),
    image: 'string',
    text: 'string',
    flagText: 'string',
    flagTextStyle: {},
    flagContainerStyle: {},
    textStyle: {},
    containerStyle: {},
    testID: 'string;'
  };
  it('renders correctly ListCardButton in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper screen={() => <ListCardButton {...customProp} />} />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });

  it('render flagText', () => {
    let visibleProps = {
      image: 'image.svg',
      text: 'string',
      flagVisible: true,
      disabled: true
    };
    const flagTextDefault = 'Nuevo';
    screenTest = render(
      <NavigationWrapper screen={() => <ListCardButton {...visibleProps} />} />
    );
    expect(screenTest.getByText(flagTextDefault)).toBeDefined();
  });
});
