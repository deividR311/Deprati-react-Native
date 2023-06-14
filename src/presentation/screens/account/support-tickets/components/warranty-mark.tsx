import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
export const WarrantyMark: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          width: width,
          height: 130,
          uri: 'https://imagesdevapp.deprati.com.ec/appstatics/garantiaincondicionalbaner.jpg'
        }}
        resizeMethod="scale"
        resizeMode="cover"
        width={width}
        height={130}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130
  }
});
