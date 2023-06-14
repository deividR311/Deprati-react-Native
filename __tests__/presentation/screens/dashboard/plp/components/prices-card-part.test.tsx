import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import PriceCardPart from '../../../../../../src/presentation/screens/dashboard/PLP/components/price/prices-card-part';

let screenTest: IRender;

describe('PriceCardPart', () => {
  it('renders correctly in Snapshot PriceCardPart', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <PriceCardPart
            unitPrice={{ formattedValue: '$2.4' }}
            price={{ formattedValue: '$4.8' }}
          />
        )}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
