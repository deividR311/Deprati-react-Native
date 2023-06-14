import React from 'react';
import { render } from '@testing-library/react-native';
import { IRender } from '../../../../../../__mocks__/IRender.interface';
import { NavigationWrapper } from '../../../../../../__mocks__/navigation-wrapper';
import ComponentColors from '../../../../../../src/presentation/screens/dashboard/PLP/components/colors/ComponentColors';

let screenTest: IRender;
const dataColors = [
  'https://imagestg.deprati.com.ec/sys-master/images/h27/h78/8868765237278/14919116_color.jpg',
  'https://imagestg.deprati.com.ec/sys-master/images/h01/hd4/8890904576030/15291416_color.jpg',
  'https://imagestg.deprati.com.ec/sys-master/images/h8d/h69/8821513977886/14856309_color.jpg',
  'https://imagestg.deprati.com.ec/sys-master/images/h31/hb9/8868769923102/14919122_color.jpg',
  'https://imagestg.deprati.com.ec/sys-master/images/h44/h7f/8891489550366/15366487_color.jpg'
];

describe('ComponentColors', () => {
  it('renders correctly in Snapshot ComponentColors', () => {
    screenTest = render(
      <NavigationWrapper
        screen={() => <ComponentColors dataColors={dataColors} />}
      />
    );
    expect(screenTest?.toJSON()).toMatchSnapshot();
  });
});
