import React from 'react';
import { Text } from 'react-native';
import { capitalize } from '../../../../../../application/utils/string-formater';
import { Facet, ValueFacet } from '../../interfaces/iProducts';
import { styles } from '../stylesModalFilter';

const TitleAcordion = ({ xList }: { xList: Facet }) => {
  const handleCountSel = (items: ValueFacet[]) => {
    let countSel = 0;
    items.forEach(x => {
      if (x.selected) countSel++;
    });
    // console.log('countSel', countSel)
    return countSel !== 0 ? `  ${countSel} Seleccionados` : null;
  };

  return (
    <>
      <Text>{capitalize(xList.name)}</Text>
      <Text style={styles.textSelected}>{handleCountSel(xList.values)}</Text>
    </>
  );
};

export default TitleAcordion;
