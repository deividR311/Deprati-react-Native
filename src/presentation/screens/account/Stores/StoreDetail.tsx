import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { stylesStore } from './store.stylesheet';
import StatusBradge from './components/Status-bradge';
import {
  HEIGHT_TAB_BAR,
  MARING_HORIZONTAL
} from '../../../../application/common/layout';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ButtonOption from './components/ButtonOption';
import useOpenInApp from './hooks/useOpenInApp';

export default function StoreDetail() {
  const navigation = useNavigation();
  const [region, setregion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  const route = useRoute();
  //@ts-ignore
  const store = route?.params?.item;
  const { openUrl } = useOpenInApp();
  //@ts-ignore
  const urls = route?.params?.urls;
  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: store?.nombre_Tienda
    });
    setregion({
      latitude: store?.latitud,
      longitude: store?.longitud,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  }, [store]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ paddingBottom: HEIGHT_TAB_BAR + 60 }}>
        <View
          style={{ paddingHorizontal: MARING_HORIZONTAL, marginBottom: 16 }}>
          <View>
            <View style={stylesStore.content_card}>
              <Text style={stylesStore.addressTitle}>{store?.direccion}</Text>
              <StatusBradge status={store?.status} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text style={stylesStore.schedule}>
                {store?.horarios[0]}
                {'\n'}
                {store?.horarios[1]}
              </Text>
            </View>
          </View>
          <View style={{ borderRadius: 8 }}>
            <MapView
              zoomTapEnabled={true}
              focusable
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{
                width: '100%',
                height: 427,
                marginTop: 30,
                borderRadius: 4
              }}
              region={region}>
              <Marker
                coordinate={{
                  latitude: store?.latitud,
                  longitude: store?.longitud
                }}
                title={store?.nombre_Tienda}
                description={store?.direccion}
              />
            </MapView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 60,
              alignSelf: 'center'
            }}>
            <ButtonOption
              icon="directions"
              title="CÓMO LLEGAR"
              onPress={() => openUrl(urls.urlMaps)}
            />
            <ButtonOption
              icon="phone"
              title="LLAMAR"
              onPress={() => openUrl(urls.urlTel)}
            />
          </View>
          <View />

          <View />
        </View>
      </View>
    </ScrollView>
  );
}
