import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { ButtonsHeader } from '../../../../../src/presentation/screens/dashboard/PLP/components';

const ButtonsHeader_Props = {
  onPress: jest.fn(),
  onSearch: jest.fn()
};

let screenTest: any;
describe('ButtonsHeader', () => {
  beforeEach(() => {
    screenTest = render(
      <NavigationWrapper
        screen={() => <ButtonsHeader {...ButtonsHeader_Props} />}
      />
    );
  });

  it('renders correctly in Snapshot', () => {
    expect(screenTest.toJSON()).toMatchSnapshot();
  });

  it('Icon Shopping Cart', () => {
    const { getByTestId } = screenTest;
    expect(getByTestId('shopping-cart')).toBeDefined();
  });
});
