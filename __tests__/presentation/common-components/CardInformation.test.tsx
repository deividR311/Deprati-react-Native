import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import CardInformation from '../../../src/presentation/common-components/cardInformation/CardInformation';
import CardReload from '../../../src/presentation/common-components/cardReload/cardReload';

let screenTest: any;
describe('CardInformation', () => {
  it('renders correctly CardInformation in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <CardInformation text={'Texto de prueba'} onPress={jest.fn()} />
        )}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
    fireEvent.press(screenTest.getByTestId('test-onPress-ID'));
  });

  it('renders alternative paths', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <CardInformation
            text={'<a href="">Texto de prueba</a>'}
            typeCard={'todayOffer'}
          />
        )}
      />
    );
    expect(screenTest.getByTestId('test-onPress-ID')).toBeDefined();
  });

  it('renders correctly CardReload in Snapshot', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <CardReload
            isVisible
            text={'<a href="">Texto de prueba</a>'}
            typeCard={'todayOffer'}
            onPress={jest.fn()}
          />
        )}
      />
    );
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
