import React from 'react';
//Libs
import { View } from 'react-native';
import { SearchInput } from '../../../../../common-components/search-input';
import { SortBy } from '../../interfaces/iProducts';
import ButtonsViewPlp from '../Buttons/ButtonsViewPlp';
import ExtensionSlot from '../../../../../common-components/extension-slot';
import BannerPLP from '../BannerPLP/BannerPLP';
import { AnimatedSearchInput } from '../../../../../common-components/toolBar';

interface ISubHeader {
  showElementCategory: boolean;
  OnCurrentSort(x: string): void;
  onChange(x: string): void;
  sorts: SortBy[];
  viewSelect: string;
  sortByCurrent: string;
  pageContent?: any;
  hideSearch: boolean;
}
export default function ComponentSubHeader({
  showElementCategory,
  OnCurrentSort,
  onChange,
  sorts,
  viewSelect,
  sortByCurrent,
  pageContent,
  hideSearch
}: ISubHeader) {
  const SECTION_PAGE_PLP = {
    section_1: 'Section1'
  };

  const customRenderItem = ({ item, index, typeCode }) => {
    if (typeCode === 'DepratiDoubleResponsiveBannerComponent') {
      const componentContent = pageContent?.components[item];
      return <BannerPLP key={index} customProps={componentContent} />;
    }

    return null;
  };

  return (
    <View style={[{ marginBottom: 10 }]}>
      <ButtonsViewPlp
        OnCurrentSort={x => OnCurrentSort(x)}
        onChange={x => onChange(x)}
        sorts={sorts}
        viewSelect={viewSelect}
        sortByCurrent={sortByCurrent}
      />
      {showElementCategory && <AnimatedSearchInput collapse={hideSearch} />}
      <ExtensionSlot
        key={'section_1'}
        slot={pageContent?.slots?.[SECTION_PAGE_PLP.section_1]}
        content={pageContent}
        hasScroll={false}
        customRenderItem={customRenderItem}
      />
    </View>
  );
}
