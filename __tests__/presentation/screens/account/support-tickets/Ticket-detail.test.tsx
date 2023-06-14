import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../../__mocks__/navigation-wrapper';
import { TicketDetailsScreen } from '../../../../../src/presentation/screens/account/support-tickets/ticket-detail.screen';

describe('TicketDetailsScreen ', () => {
  it('renders correctly in Snapshot', () => {
    const screenTest = render(
      <NavigationWrapper screen={TicketDetailsScreen} />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
