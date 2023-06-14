import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { PurchaseItemReview } from '../../../../../src/presentation/screens/account/purchase-item-review';

let screenTest: any;

describe('PurchaseItemReview', () => {
  beforeEach(() => {
    screenTest = render(<NavigationWrapper screen={PurchaseItemReview} />);
  });
  it('renders correctly in Snapshot', () => {
    expect(screenTest.toJSON()).toMatchSnapshot();
  });
});
