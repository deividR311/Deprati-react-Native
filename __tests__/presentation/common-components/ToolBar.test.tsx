import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import ToolBar from '../../../src/presentation/common-components/toolBar/ToolBar';
import {
  DataMock_HomeProps,
  DataMock_OtherProps
} from '../../../__mocks__/dataMock-ToolBar';

let screenTest: any;

describe('ToolBar Component', () => {
  it('renders correctly ToolBar Home in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper screen={() => <ToolBar {...DataMock_HomeProps} />} />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });

  it('renders correctly ToolBar Other in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper screen={() => <ToolBar {...DataMock_OtherProps} />} />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });

  it('Icon Shopping Cart', () => {
    screenTest = render(
      <NavigationWrapper screen={() => <ToolBar {...DataMock_OtherProps} />} />
    );
    const { getByTestId } = screenTest;
    expect(getByTestId('shopping-cart')).toBeDefined();
  });
});
