import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationWrapper } from '../../../../__mocks__/navigation-wrapper';
import { IRender } from '../../../../__mocks__/IRender.interface';
import ComponentTitleDelete from '../../../../src/presentation/screens/favorite/Favorites/components/title-delete/ComponentTitleDelete';

let screenTest: IRender;
const titleProduct: string = 'Camisero h&o';

describe('ComponentTitleDelete Favorites', () => {
  beforeEach(() => {
    screenTest = render(
      <NavigationWrapper
        screen={() => (
          <ComponentTitleDelete
            title={titleProduct}
            onDelete={jest.fn()}
            loadingDelete={false}
          />
        )}
      />
    );
  });

  it('renders correctly ComponentTitleDelete in Snapshot', () => {
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('Defined title product favorites', () => {
    const { getByText } = screenTest;
    expect(getByText(titleProduct)).toBeDefined();
  });

  it('Defined delete product favorites', () => {
    const { getByTestId } = screenTest;
    const deleteButton = getByTestId('delete-favorite');
    expect(deleteButton).toBeDefined();
  });

  it('action delete product favorites', () => {
    const { getByTestId } = screenTest;
    const deleteButton = getByTestId('delete-favorite');
    expect(deleteButton).toBeDefined();

    fireEvent.press(deleteButton);

    const iconLoading = getByTestId('loading-removing');
    expect(iconLoading).toBeDefined();
  });
});
