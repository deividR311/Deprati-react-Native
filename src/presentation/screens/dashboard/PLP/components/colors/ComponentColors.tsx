import React from 'react';
//Libs
import { View, FlatList, StyleProp, ViewStyle } from 'react-native';
import ItemColors from './ItemColors';
//Styles
import { styles } from './styles/stylesComponentColors';

interface ComponentColorsProps {
  dataColors: string[] | undefined;
  style?: StyleProp<ViewStyle>;
}

export default function ComponentColors({
  dataColors,
  style = {}
}: ComponentColorsProps) {
  if (dataColors === undefined) return null;
  return (
    <View style={style}>
      <FlatList
        style={styles.list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={dataColors}
        renderItem={({ item }) => (
          <ItemColors disabled={true} dataUri={item} onPress={() => {}} />
        )}
      />
    </View>
  );
}
