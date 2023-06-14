import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { List } from 'react-native-paper';
import { COLORS, FONTS_FAMILY } from '../../../../application/common';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';
import Button from '../../../common-components/buttons/Button';
import {
  RightIconAccordion,
  stylesAccordion
} from '../../../common-components/RightIconAccordion/RightIconAccordion';
import { AccountNavigationRoute } from '../../../navigation/account';
import { styles as stylesModalFilter } from '../../dashboard/PLP/Filter/stylesModalFilter';
import AddressInfo from './components/AddressInfo';
import AddressInfoPayment from './components/AddressInfoPayment';
import useAddressDelivery from './hooks/useAddressDelivery';
import { useAddressPayment } from './hooks/useAddressPayment.hook';

export const Address: React.FC = () => {
  const navigation = useNavigation();
  const { addressDeliveryList } = useAddressDelivery();
  const { addressPaymentList, loading } = useAddressPayment();
  const route = useRoute();
  useEmmaSdk({ route });

  const addressAccordion = useMemo(() => {
    return [
      {
        title: 'Direcciones de envío',
        addressList: addressDeliveryList
      },

      {
        title: 'Direcciones de facturación',
        addressList: addressPaymentList
      }
    ];
  }, [addressPaymentList, addressDeliveryList]);

  return (
    <View>
      <ScrollView style={styles.container}>
        {addressAccordion.map((addressItem, index) => {
          return (
            <List.Accordion
              key={'adressList.accordion' + index}
              style={[styles.accordion, stylesAccordion.container__accordion]}
              titleStyle={{
                ...stylesModalFilter.content__accordion_title,
                fontFamily: FONTS_FAMILY['Roboto-Medium']
              }}
              title={<Text>{addressItem.title}</Text>}
              right={RightIconAccordion}>
              <View style={styles.infoBox}>
                {addressItem?.addressList?.default && (
                  <>
                    <Text style={styles.header_info}>Dirección principal</Text>
                    {addressItem.title === 'Direcciones de envío' ? (
                      <AddressInfo item={addressItem?.addressList?.default} />
                    ) : (
                      <AddressInfoPayment
                        item={addressItem?.addressList?.default}
                      />
                    )}
                  </>
                )}
                {addressItem?.addressList?.others?.length > 0 && (
                  <>
                    {addressItem.title === 'Direcciones de envío' ? (
                      <Text style={styles.header_info}>Otras direcciones</Text>
                    ) : null}

                    <FlatList
                      data={addressItem?.addressList?.others}
                      renderItem={({ item }) => {
                        return addressItem.title === 'Direcciones de envío' ? (
                          <AddressInfo item={item} />
                        ) : (
                          <AddressInfoPayment item={item} />
                        );
                      }}
                    />
                  </>
                )}
                <Button
                  marginTop={12}
                  containerStyle={{ marginHorizontal: 16, marginBottom: 24 }}
                  backgroundColor={COLORS.BRAND}
                  linkName="AGREGAR NUEVA DIRECCIÓN"
                  textColor={COLORS.WHITE}
                  onPress={() =>
                    addressItem.title === 'Direcciones de envío'
                      ? navigation.navigate(AccountNavigationRoute.AdressForm)
                      : navigation.navigate(
                          AccountNavigationRoute.AddressPaymentForm
                        )
                  }
                />
              </View>
            </List.Accordion>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  accordion: {
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.GRAYDARK60
    // marginBottom: 10,
  },
  header_info: {
    color: COLORS.BRAND,
    fontSize: 18,
    marginTop: 16,
    marginBottom: 10,
    marginLeft: 16,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  infoBox: {
    paddingBottom: 6
  },
  container: {
    marginBottom: 80
  }
});
