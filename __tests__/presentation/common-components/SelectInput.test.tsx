import React from 'react';
import { render } from '@testing-library/react-native';
import SelectInput from '../../../src/presentation/common-components/inputs/SelectInput';

const mockProps = {
  items: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ],
  onChange: jest.fn(),
  label: 'Select an option'
};

describe('SelectInput', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly with label and default value', () => {
    const { getByText } = render(
      <SelectInput {...mockProps} value="option1" />
    );
    expect(getByText('Select an option')).toBeTruthy();
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('renders correctly with custom label and selected value', () => {
    const { getByText } = render(
      <SelectInput {...mockProps} label="Custom label" value="option2" />
    );
    expect(getByText('Custom label')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
  });
});
