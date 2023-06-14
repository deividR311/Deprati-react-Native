import React, { useEffect } from 'react';
//Libs
import { useNavigation, useRoute } from '@react-navigation/native';
//components
import PLPScreen from '../PLP/PLPScreen';
import { trackSearchTerm } from '../../../../infrastucture/native-modules/emarsys/emarsys';

export default function SearchListProduct() {
  //SLP
  const route = useRoute();
  useEffect(() => {
    if (route?.params?.searchID?.length > 0) {
      trackSearchTerm(route.params.searchID);
    }
  }, [route?.params?.searchID]);

  return <PLPScreen />;
}
