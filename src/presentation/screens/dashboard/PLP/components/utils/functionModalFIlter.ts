import { Breadcrumb } from '../../interfaces/iProducts';

export const handleDecodeURI = (
  name: string,
  selected: boolean,
  uri: string,
  breadcrumbs: Breadcrumb[]
) => {
  if (selected === false) {
    let str2: any = uri;
    str2 = decodeURIComponent(str2);

    str2 = str2.split(':color:');

    let obj: any = {};
    let url = '';
    for (let i = 1; i < str2.length; i++) {
      url = str2[i].split('|+|')[1];
      obj = {
        ...obj,
        [name]: url
      };
    }
    return obj[name];
  } else {
    var _breadcrumbs = breadcrumbs?.length
      ? breadcrumbs?.filter(x => x.facetCode === 'color')
      : [];
    var _colors = _breadcrumbs.map(x => x.facetValueCode);
    let dataUri;
    _colors.forEach(x => {
      let dataColor = x.split('| |');
      if (dataColor[0] === name) {
        dataUri = dataColor[1];
      }
    });
    return dataUri;
  }
};

export const handleDecodeTitle = (
  breadcrumbs: any[],
  codeCategory?: string
) => {
  let facet = breadcrumbs?.find(bread => bread?.categoryCode === codeCategory);
  if (!codeCategory) {
    if (breadcrumbs.length === 1)
      facet = { name: breadcrumbs[0]?.facetValueName };
    else facet = { name: breadcrumbs[0]?.facetName };
  }
  return facet?.name ?? '';
};
