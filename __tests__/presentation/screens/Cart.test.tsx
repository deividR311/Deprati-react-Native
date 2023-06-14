import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../__mocks__/navigation-wrapper';
import CartScreen from '../../../src/presentation/screens/cart/Cart/CartScreen';
import { DataMock_Cart } from '../../../__mocks__/dataMock-Cart';

describe('Cart', () => {
  // Tests that the cartempty component is rendered when the shopping cart is empty. tags: [edge case]
  it('test_cart_screen_empty_cart', () => {
    const { getByTestId } = render(<NavigationWrapper screen={CartScreen} />);
    expect(getByTestId('cart-empty')).toBeDefined();
  });
});
