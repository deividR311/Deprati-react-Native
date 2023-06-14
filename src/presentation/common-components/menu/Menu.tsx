import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, NAV } from '../../../application/common';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const handleMenu = () => {
    navigation.navigate(NAV.MENU as never, {} as never);
  };

  return (
    <TouchableOpacity onPress={() => handleMenu()}>
      <Icon
        name="menu"
        size={28}
        style={styles.menu__icon}
        color={COLORS.DARK70}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menu__icon: {
    marginHorizontal: 5
  }
});

export default Menu;
