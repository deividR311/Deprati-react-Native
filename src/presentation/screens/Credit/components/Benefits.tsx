import React, { useEffect, useMemo } from 'react';
import CarouselItem from './CarouselItem';
import { View } from 'react-native';
import { useContentServiceMutation } from '../../../../infrastucture/apis/contentService';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';

export default function Benefits() {
  const { localStorageData } = useLocalStorage();
  const [doGetServicesList, { data: dataRequestContent }] =
    useContentServiceMutation();
  const { [LocalStorageKey.IsLogin]: IS_LOGIN } = localStorageData;

  useEffect(() => {
    // old code: IS_LOGIN? 'creditServicesBanner' : 'creditServicesBenefits',
    doGetServicesList({
      content: 'creditServicesBenefits'
    });
  }, [IS_LOGIN]);

  const data = useMemo(() => {
    if (dataRequestContent?.success) {
      // old code: IS_LOGIN? 'creditServicesBanner' : 'creditServicesBenefits',
      const namekey = 'creditServicesBenefits';
      const items = dataRequestContent?.data?.[namekey]?.items ?? [];
      const dataService = items?.map(item => {
        return {
          title: item?.desciption,
          image: item?.imageUrl
        };
      });
      return dataService;
    }
    return dataMock;
  }, [dataRequestContent]);

  const dataMock = [
    {
      title: 'Comparte tu crédito De Prati hasta con 5 personas',
      image: require('../../../../../assets/images/creditCarrouselNotLogin/image1.png')
    },
    {
      title: 'Beneficio de Desgravamen',
      image: require('../../../../../assets/images/creditCarrouselNotLogin/image1.png')
    },
    {
      title: 'Descuento por cumpleaños',
      image: require('../../../../../assets/images/creditCarrouselNotLogin/image1.png')
    },
    {
      title: 'Beneficio en comercios aliados',
      image: require('../../../../../assets/images/creditCarrouselNotLogin/image1.png')
    }
  ];

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignSelf: 'center'
      }}>
      {data?.map((item: any, index: number) => (
        <View key={index}>
          <CarouselItem item={item} />
        </View>
      ))}
    </View>
  );
}
