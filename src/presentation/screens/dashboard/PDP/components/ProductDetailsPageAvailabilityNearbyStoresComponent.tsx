import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { COLORS } from '../../../../../application/common/colors';
import {
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../../application/common/fonts';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { useArticleMutationRequest } from '../../../../../infrastucture/apis/article';
import useGetLocation from '../../../account/Stores/hooks/useGetLocation';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { fontFamilyOS, fontWeightOS } from '../../../../../application/utils';

interface Props {
  stock: {
    stockLevel: number;
    stockLevelStatus: string;
  };
}

export const ProductDetailsPageAvailabilityNearbyStoresComponent = (
  _props: Props
) => {
  const { contentProduct: props } = _props ?? {};
  const animationHeightValue = useRef(new Animated.Value(100)).current;
  const [expanded, setexpanded] = useState(false);
  const [nearStores, setNearStores] = useState<
    {
      cod_Tienda: number | string;
      descripcion: string;
      ean: string | number;
      cantidad: number;
      art_Con: string;
    }[]
  >();

  const [sizeSelected] = _props?.useSizeSelected;
  const { location, loading: isWaitingGPS } = useGetLocation();
  const {
    localStorageData: { [LocalStorageKey.MessagesApp]: messagesApp }
  } = useLocalStorage();

  const [
    _getProductsNearblyStore,
    {
      isLoading: loadingNearStore,
      isError: errorNearStore,
      data: dataNearbyStore,
      reset
    }
  ] = useArticleMutationRequest();

  const onLoadProducts = () => {
    if (!expanded) {
      setNearStores([]);
      reset();
      _getProductsNearblyStore({
        codigoTienda: 20,
        eanArticulo: props?.ean,
        latitud: location.latitude,
        longitud: location.longitude
      });
    }
    setexpanded(!expanded);
  };

  useEffect(() => {
    const durationS = 100;
    const heigthValue = expanded ? (nearStores?.length || 0) * 30 : 10;

    Animated.spring(animationHeightValue, {
      toValue: heigthValue,
      useNativeDriver: false,
      delay: durationS
    }).start();
  }, [expanded, nearStores]);

  useEffect(() => {
    if (!dataNearbyStore) return;
    setexpanded(true);
    setNearStores(dataNearbyStore?.data.dato.listaInventario);
  }, [loadingNearStore, dataNearbyStore]);

  useEffect(() => {
    setexpanded(false);
  }, [props?.ean]);

  return loadingNearStore && !errorNearStore ? (
    <SkeletonContent
      isLoading={true}
      containerStyle={{ marginHorizontal: 16 }}
      layout={[
        {
          marginTop: 5,
          width: '100%',
          paddingHorizontal: 16,
          height: 50
        }
      ]}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.container__title}>Disponible en tiendas</Text>
      <Animated.View style={{ height: animationHeightValue }}>
        {nearStores?.map(item => {
          return (
            <Text style={styles.container__subtitle}>
              {item.cantidad} artículos en {item.descripcion}
            </Text>
          );
        })}
      </Animated.View>

      {expanded && nearStores?.length === 0 ? (
        messagesApp?.Item_Not_Available?.description && (
          <Text style={styles.container__store_avoid}>
            {messagesApp?.Item_Not_Available?.description ??
              'El artículo no se encuentra disponible en otras tiendas'}
          </Text>
        )
      ) : (
        <TouchableOpacity
          onPress={onLoadProducts}
          disabled={!sizeSelected || isWaitingGPS}>
          <Text
            style={[
              styles.container__link,
              !sizeSelected || isWaitingGPS
                ? { color: COLORS.GRAYDARK }
                : undefined
            ]}>
            {expanded ? 'Ocultar tiendas cercanas' : 'Ver tiendas cercanas'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: MARING_HORIZONTAL,
    paddingVertical: 12,
    marginHorizontal: MARING_HORIZONTAL,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GRAYDARK20,
    overflow: 'hidden',
    borderRadius: 4,
    paddingLeft: 16
  },
  container__title: {
    ...FontStyles.H3_Headline
  },
  container__store_avoid: {
    ...FontStyles.H6_Headline,
    color: COLORS.GRAYDARK60,
    paddingTop: 8
  },
  container__subtitle: {
    textAlign: 'center',
    ...FontStyles.Body_2,
    paddingTop: 8
  },
  container__link: {
    paddingTop: 8,
    fontFamily: fontFamilyOS(),
    fontWeight: fontWeightOS('700'),
    fontSize: FONTS_SIZES.label,
    letterSpacing: 0.75,
    color: COLORS.BRAND,
    textDecorationLine: 'underline'
  }
});
