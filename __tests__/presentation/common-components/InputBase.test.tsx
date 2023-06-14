import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import InputBase from '../../../src/presentation/common-components/inputs/InputBase';

const mockPropsArea = {
  testID: 'review-comment',
  value: 'Por la farmacia Cruz azul\n',
  dense: true,
  multiline: true,
  style: {
    marginTop: 10,
    maxHeight: 130,
    minHeight: 130
  },
  numberOfLines: 6,
  label: 'Indicaciones de cómo llegar',
  error: false,
  onChangeText: jest.fn(),
  maxLength: 140,
  textAlignVertical: 'top'
};

const mockPropPhone = {
  testID: 'phone',
  style: [{ minWidth: '66%' }],
  right: 'phone',
  value: '69749429',
  error: false,
  onChangeText: jest.fn(),
  keyboardType: 'number-pad',
  label: 'Teléfono Celular',
  maxLength: 8,
  multiline: false
};

describe('InputBase', () => {
  it('renders correctly InputBase textArea', () => {
    const { getByTestId } = render(<InputBase {...mockPropsArea} />);
    expect(getByTestId(mockPropsArea.testID)).toBeTruthy();
  });

  it('renders correctly InputBase Phone', () => {
    const { getByTestId } = render(<InputBase {...mockPropPhone} />);
    expect(getByTestId(mockPropPhone.testID)).toBeTruthy();
  });

  it('InputBase change value', () => {
    const { getByTestId } = render(<InputBase {...mockPropPhone} />);
    const phoneInput = getByTestId(mockPropPhone.testID);
    expect(phoneInput).toBeTruthy();

    fireEvent.changeText(phoneInput, '123456789');
    expect(phoneInput.props.value).toBe('123456789');
  });
});
