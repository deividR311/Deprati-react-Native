import { View, Text, FlatList } from 'react-native';
import React from 'react';
import {
  HEIGHT_TAB_BAR,
  MARING_HORIZONTAL
} from '../../../../application/common/layout';

import ItemStore from './components/ItemStore';
import { stylesStore } from './store.stylesheet';
import useFinderStores from './hooks/useFinderStores';
import SkeletonStores from './SkeletonStores';
import TemplatePage from '../../../common-components/template-page';
import { useRoute } from '@react-navigation/native';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';

export default function StoreList() {
  const { data, isError, isLoading } = useFinderStores();
  const route = useRoute();
  useEmmaSdk({ route });

  return (
    <TemplatePage
      loading={isLoading}
      skeleton={<SkeletonStores />}
      error={isError}>
      <Text style={stylesStore.title}>Cerca de mi</Text>
      <FlatList
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingBottom: HEIGHT_TAB_BAR + 60,
          paddingHorizontal: MARING_HORIZONTAL
        }}
        style={{
          flex: 1
        }}
        data={data?.data}
        renderItem={({ item }) => <ItemStore item={item} />}
      />
    </TemplatePage>
  );
}
