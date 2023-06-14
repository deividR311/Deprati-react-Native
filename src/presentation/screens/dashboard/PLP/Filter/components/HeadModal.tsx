import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../stylesModalFilter';

const HeadModal = ({ totalResults }: { totalResults: number }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <View style={styles.line} />
      <View style={[styles.container__title]}>
        <Text style={styles.container__title_text}>{'Filtros'}</Text>
      </View>
      <View>
        <Text style={styles.container__subtitle}>{totalResults} Artículos</Text>
      </View>
    </View>
  );
};

export default HeadModal;
