import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigationRoute } from '../../../../navigation/account';
import StatusBradge from './Status-bradge';
import useOpenInApp from '../hooks/useOpenInApp';
import { stylesStore } from '../store.stylesheet';
interface IProps {
  item: any;
}
export default function ItemStore({ item }: IProps) {
  const navigation = useNavigation();
  const [region, setregion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  });
  const { openUrl } = useOpenInApp();
  const urlTel = `tel:+${item.numero_Contacto}`;

  const urlMaps = Platform.select({
    ios: `maps:${item.latitud},${item.longitud}?q=${item.nombre_Tienda}`,
    android: `geo:${item.latitud},${item.longitud}?q=${item.nombre_Tienda}`
  });
  useLayoutEffect(() => {
    setregion({
      latitude: item.latitud,
      longitude: item.longitud,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  }, []);
  return (
    <View style={stylesStore.viewCard}>
      {item.latitud !== 0 && item.longitud !== 0 && (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={stylesStore.mapView}
          followsUserLocation
          maxDelta={0.01}
          minZoomLevel={16}
          maxZoomLevel={18}
          zoomEnabled={false}
          region={region}>
          <Marker
            coordinate={{
              latitude: item.latitud,
              longitude: item.longitud
            }}
            title={item.nombre_Tienda}
            description={item.direccion}
          />
        </MapView>
      )}

      <View style={stylesStore.contentDescription}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            // @ts-ignore
            navigation.navigate(AccountNavigationRoute.StoreDetail, {
              item: item,
              urls: {
                urlMaps,
                urlTel
              }
            })
          }>
          <View style={stylesStore.content_card}>
            <Text style={stylesStore.content_title}>
              {item.nombre_Tienda.length > 0
                ? item.nombre_Tienda.slice(0, 25)
                : item.nombre_Tienda}
            </Text>

            <StatusBradge status={item.status} />
          </View>
        </TouchableOpacity>

        <View>
          <Text style={stylesStore.addressTitle}>{item.direccion}</Text>

          <View style={stylesStore.contentSchedule}>
            <View style={stylesStore.schedule}>
              <Text style={stylesStore.textSchedule}>
                {item.horarios[0]}
                {'\n'}
                {item.horarios[1]}
              </Text>
            </View>
            <View style={stylesStore.contentIcons}>
              <TouchableOpacity
                onPress={() => openUrl(urlMaps!)}
                activeOpacity={0.5}>
                <Icon name="directions" size={18} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openUrl(urlTel!)}
                activeOpacity={0.5}>
                <Icon name="phone" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
