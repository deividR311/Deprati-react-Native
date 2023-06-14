import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import ItemColors from '../../../../../../src/presentation/screens/dashboard/PLP/components/colors/ItemColors';

let screenTest: IRender;
const uriColor =
  'https://imagestg.deprati.com.ec/sys-master/images/h31/hb9/8868769923102/14919122_color.jpg';

function handleRender(isCheck: boolean): IRender {
  return render(
    <NavigationWrapper
      screen={() => (
        <ItemColors isCheck={isCheck} dataUri={uriColor} onPress={jest.fn()} />
      )}
    />
  );
}

describe('ItemColors', () => {
  it('renders correctly in Snapshot ItemColors', () => {
    screenTest = handleRender(false);
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });

  it('Icon Checked not render', () => {
    screenTest = handleRender(false);
    const { queryByTestId } = screenTest;
    expect(queryByTestId('iconCheck')).toBeNull();
  });

  it('Icon Checked', () => {
    screenTest = handleRender(true);
    const { getByTestId } = screenTest;
    expect(getByTestId('iconCheck')).toBeDefined();
  });
});
