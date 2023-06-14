import { View, FlatList } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MARING_HORIZONTAL } from '../../../../application/common/layout';
import ItemMoreServices from './components/ItemMoreServices';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { NAV } from '../../../../application/common';
import { getUrlCreditTerms } from '../../../../application/utils/urls';

export default function MoreServices() {
  const navigation = useNavigation();
  const [dataFilted, setdataFilted] = useState([]);
  const {
    localStorageData: {
      [LocalStorageKey.IsAccountAuthenticated]: IsAccountAuthenticated,
      [LocalStorageKey.IsLogin]: IS_LOGIN,
      [LocalStorageKey.AccountAdditionalNumber]: aditionalAccount
    }
  } = useLocalStorage();
  const dataMock = [
    {
      title: 'Solicitud de estado del crédito',
      desc: '',
      link: NAV.CREDIT_STATUS,
      isLoggedIn: true,
      isLinkedToDirectCredit: true
    },
    {
      title: 'Solicitud de certificados',
      desc: 'Texto explicativo',
      link: NAV.CERTIFICATE_CREDIT,
      isLoggedIn: true,
      isLinkedToDirectCredit: true
    },
    {
      title: 'Mira el contrato de crédito',
      desc: '',
      link: 'https://s3.amazonaws.com/galleryobjdevapp.deprati.com.ec/contratocredito_0.pdf',
      isLoggedIn: false,
      isLinkedToDirectCredit: false
    },
    {
      title: 'Términos de uso',
      desc: '',
      link: getUrlCreditTerms(),
      isLoggedIn: false,
      isLinkedToDirectCredit: false
    }
  ];

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: 'Más servicios de crédito'
    });
  }, []);

  useEffect(() => {
    let dataNotauth = dataMock.filter(item => {
      if (item?.isLoggedIn && !IS_LOGIN) return false;
      if (item?.isLoggedIn === false) return true;

      if (item?.isLinkedToDirectCredit && IsAccountAuthenticated) {
        const isPrincipal = aditionalAccount === '00' ? true : false;
        if (isPrincipal) return true;
        else return false;
      }

      if (item?.isLoggedIn && IS_LOGIN && !item?.isLinkedToDirectCredit)
        return true;

      return false;
    });
    setdataFilted(dataNotauth);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: MARING_HORIZONTAL
        }}
        data={dataFilted}
        renderItem={({ item, index }) => {
          return <ItemMoreServices item={item} />;
        }}
      />
    </View>
  );
}
