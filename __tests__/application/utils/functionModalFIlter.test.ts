import {
  decodeTitle,
  decodeURISelect,
  decodeURIUnSelect
} from '../../../__mocks__/dataMock-functionModalFIlter';
import {
  handleDecodeURI,
  handleDecodeTitle
} from '../../../src/presentation/screens/dashboard/PLP/components/utils';

describe('functionModalFIlter', () => {
  it('handleDecodeURI selected false', () => {
    const imgResponse =
      'https://imagestg.deprati.com.ec/sys-master/images/h9b/h72/8891007598622/15307890_color.jpg';
    const { name, uri, breadcrumbs } = decodeURIUnSelect;
    expect(handleDecodeURI(name, false, uri, breadcrumbs)).toBe(imgResponse);
  });

  it('handleDecodeURI selected true', () => {
    const imgResponse =
      'https://imagestg.deprati.com.ec/sys-master/images/he7/h4c/8894192779294/15543260_color.jpg';
    const { name, uri, breadcrumbs } = decodeURISelect;
    expect(handleDecodeURI(name, true, uri, breadcrumbs)).toBe(imgResponse);
  });

  it('handleDecodeTitle', () => {
    const { breadcrumbs, codeCategory } = decodeTitle;
    expect(handleDecodeTitle(breadcrumbs, codeCategory)).toBe('AEROPOSTALE');
  });
});
