//libs
import React, { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
//components
import TemplatePage from '../../../common-components/template-page';
//styles
import { styles } from './stylesMyOrders';
//utils
import { useRoute } from '@react-navigation/native';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';
import SelectInput from '../../../common-components/inputs/SelectInput';
import OrderOnline from './components/OrderOnline';
import OrderContactless from './components/OrderContactless';
import { t } from 'i18next';

export type TypeOrder = 'tienda' | 'contacto';
export enum TypeOrderEnum {
  TIENDA = 'tienda',
  CONTACTO = 'contacto'
}

interface TypeOrderSelect {
  label: string;
  value: TypeOrder;
}

const IdOrders: TypeOrderSelect[] = [
  {
    label: t('buyOnline'),
    value: TypeOrderEnum.TIENDA
  },
  {
    label: t('depratiContactlessPayment'),
    value: TypeOrderEnum.CONTACTO
  }
];

export default function MyOrdersScreen() {
  const route = useRoute();
  useEmmaSdk({ route });
  const { selectTypeOrder } = route?.params ?? {};
  const [selectOrder, setSelectOrder] = useState<TypeOrder>(
    selectTypeOrder ?? TypeOrderEnum.TIENDA
  );
  const scrollRef = useRef<ScrollView>(null);

  const onScrollToInital = () => {
    scrollRef.current?.scrollTo({ y: 0 });
  };

  return (
    <TemplatePage loading={false} skeleton={null} error={false}>
      <ScrollView ref={scrollRef} style={{ marginBottom: 80 }}>
        <View style={styles.container__typeOrder}>
          <Text style={styles.container__typeOrder_title}>
            {t('purchaseType')}
          </Text>
          <Text style={styles.container__typeOrder_subtitle}>
            {t('selectResultOption')}
          </Text>
          <SelectInput
            showLabel={false}
            label=""
            items={IdOrders}
            value={selectOrder}
            onChange={(text: TypeOrder) => {
              setSelectOrder(text);
            }}
          />
        </View>
        <Divider style={styles.row__separator} />
        {selectOrder === 'contacto' ? (
          <OrderContactless />
        ) : (
          <OrderOnline onScroll={onScrollToInital} />
        )}
      </ScrollView>
    </TemplatePage>
  );
}
