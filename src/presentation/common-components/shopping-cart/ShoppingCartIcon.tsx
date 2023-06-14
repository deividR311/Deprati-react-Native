import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Badge } from '../badge';
import { useNavigation } from '@react-navigation/native';
import { indicationsSelector } from '../../../application/state-manager/services/indications';
import {
  LocalStorageKey,
  useLocalStorage
} from '../../../application/state-manager/services/localstorage';
import { FONTS_SIZES, NAV } from '../../../application/common';

interface ShoppingCartIconProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const ShoppingCartIcon = ({ size = 26, style }: ShoppingCartIconProps) => {
  const navigation = useNavigation();
  const indications = useSelector(indicationsSelector);

  const {
    localStorageData: { [LocalStorageKey.IsLogin]: IS_LOGIN }
  } = useLocalStorage();

  const handleGoToCart = () => {
    if (IS_LOGIN) {
      navigation.navigate(NAV.CART as never);
    } else {
      navigation.navigate(
        NAV.AUTH_NAVIGATION as never,
        {
          screen: NAV.SIGNIN,
          params: { navGoToSuccess: NAV.CART }
        } as never
      );
    }
  };

  const styleBadge = useMemo(() => {
    if (indications.cart < 10) return styles.unit;
    if (indications.cart < 100) return styles.ten;
    return styles.hundred;
  }, [indications.cart]);

  const score = useMemo(() => {
    if (indications.cart < 100)
      return {
        cart: indications.cart,
        text: undefined
      };
    return {
      cart: 99,
      text: '+'
    };
  }, [indications.cart]);

  return (
    <TouchableOpacity
      testID="shopping-cart"
      style={style}
      onPress={handleGoToCart}>
      <Badge
        style={styleBadge}
        textStyle={styles.text}
        score={score.cart}
        lastText={score.text}
      />
      <Icon name="shopping-cart" size={size} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  unit: {
    right: -3,
    minWidth: 12,
    minHeight: 12
  },
  ten: {
    right: -5,
    top: -8,
    minWidth: 15,
    minHeight: 15
  },
  hundred: {
    right: -6,
    top: -10,
    minWidth: 18,
    minHeight: 18
  },
  text: {
    fontSize: FONTS_SIZES.badge2,
    paddingBottom: undefined
  }
});
export default ShoppingCartIcon;
