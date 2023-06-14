import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useReduxPlp } from '../../../../../../application/state-manager/services/plp';
import ButtonFilter from './ButtonFilter';
import { ShoppingCartIcon } from '../../../../../common-components/shopping-cart';
import { SearchIcon } from '../../../../../common-components/toolBar';
interface IButtonsHeaderProps {
  onPress(): void;
  onSearch(): void;
}
export default function ButtonsHeader(props: IButtonsHeaderProps) {
  const { isCategoryGiftCard } = useReduxPlp();

  return (
    <View style={styles.container}>
      {!isCategoryGiftCard && <ButtonFilter onPress={props.onPress} />}
      <View style={styles.space} />
      {!isCategoryGiftCard && <SearchIcon onPress={props.onSearch} />}
      <ShoppingCartIcon />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -100,
    justifyContent: 'space-between',
    marginRight: 5
  },
  space: { width: 3, marginLeft: -8 }
  // searchIcon: {
  //   marginRight: 3,
  //   marginLeft: 10,
  // },
});
