import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Share,
  ActivityIndicator,
  Platform
} from 'react-native';
import { COLORS } from '../../../../../application/common/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import useFavorite from '../../../favorite/Favorites/hook/useFavorite.hook';
import { productResponse } from '../../../../../infrastucture/apis/product';
import { trackEventclick } from '../../../../../infrastucture/native-modules/emma/useEmma.hook';
import { keyEvents } from '../../../../../infrastucture/native-modules/emma/clickEventMap';
import Config from '../../../../../application/common/dotEnv';
import { ShoppingCartIcon } from '../../../../common-components/shopping-cart';
import layout from '../../../../../application/common/layout';

interface Props {
  contentProduct: productResponse;
  isFavorite?: boolean;
}

export const ActionsHeader = ({ contentProduct, isFavorite }: Props) => {
  const { localStorageData } = useLocalStorage();
  const {
    handleIsLogin: onHandleFavorite,
    select,
    setSelect,
    loadingAdd,
    loadingDelete
  } = useFavorite();

  useEffect(() => {
    setSelect(isFavorite ?? false);
  }, []);

  const onHandleShare = () => {
    const { url } = contentProduct;
    let message = `${Config.API_URL_HYBRIS}${url}`;
    if (Platform.OS === 'ios') {
      Share.share({ url: message });
    } else {
      Share.share({ message });
    }
  };

  const handleOnPress = () => {
    if (!loadingAdd && !loadingDelete) {
      !select && trackEventclick(keyEvents.ecommerce_fichadeproducto_favoritos);
      onHandleFavorite(contentProduct.code, select);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icons} onPress={onHandleShare}>
        <Icon name={'share'} size={22} color={COLORS.DARK} />
      </TouchableOpacity>
      {!contentProduct.isGiftProduct &&
        !contentProduct.isPromotionSpecialPrice && (
          <TouchableOpacity style={styles.icons} onPress={handleOnPress}>
            {loadingAdd || loadingDelete ? (
              <ActivityIndicator
                size="small"
                color={COLORS.DARKBRAND}
                style={{
                  display: loadingAdd || loadingDelete ? 'flex' : 'none'
                }}
              />
            ) : (
              <Icon
                name={!select ? 'favorite-border' : 'favorite'}
                size={22}
                color={!select ? COLORS.DARK : COLORS.DARKBRAND}
              />
            )}
          </TouchableOpacity>
        )}
      <ShoppingCartIcon style={styles.icons} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: -layout.window.width * 0.05
  },
  icons: {
    marginRight: layout.window.width * 0.04
  },
  cart: {}
});
