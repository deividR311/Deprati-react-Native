import React from 'react';
//Libs
import { View } from 'react-native';
import StarRatingSvg from '../../../../../../../assets/icons/Plp/StarRatingSvg';
//Styles
import { styles } from './styles/stylesItemStar';

interface Props {
  colorStar?: string;
}

export default function ItemStar(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <StarRatingSvg color={props?.colorStar} />
      </View>
    </View>
  );
}
