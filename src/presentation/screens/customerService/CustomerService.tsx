import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  Item as CustomerServiceItem,
  DataCustomerService,
  useContentServiceMutation,
  Item
} from '../../../infrastucture/apis/contentService';
import TemplatePage from '../../common-components/template-page';
import { HEIGHT_TAB_BAR } from '../../../application/common/layout';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { ListCardButton } from '../../common-components/ListCardButton/ListCardButton';
import { stylesCustomerServices } from './stylesCustomerServices';
import { COLORS, FontStyles, FONTS_FAMILY } from '../../../application/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEmmaSdk } from '../../../infrastucture/native-modules/emma';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWhatsapp } from '../../../application/common/hooksCommons/useOpenLinkInApp';
import { useLinkPress } from '../../../application/common/hooksCommons/useLinkPress';
import { fontFamilyOS, fontWeightOS } from '../../../application/utils';

const CustomerService = () => {
  const route = useRoute();
  useEmmaSdk({ route });
  const [data, setData] = useState<CustomerServiceItem[]>([]);
  const [serviceInfo, setServiceInfo] = useState<DataCustomerService>();
  const [whatsappInfo, setUrlWhatsapp] = useState({ phone: '', text: '' });
  const { goLink } = useLinkPress();
  const navigation = useNavigation();
  const [openWhatsapp] = useWhatsapp();
  const [doGetServicesList, { data: dataRequest, isError, isLoading, error }] =
    useContentServiceMutation();

  const onPressCardItem = (item: Item) => {
    if (item.link === null) return;
    if (!item.link?.startsWith('http'))
      return navigation.navigate(item.link as never);
    goLink(item.link);
  };

  useLayoutEffect(() => {
    doGetServicesList({
      content: 'customerService'
    });
  }, []);

  useEffect(() => {
    if (!dataRequest?.data) return;
    const _data = dataRequest.data as unknown as DataCustomerService;
    setServiceInfo(_data);

    const {
      whatsappMessage: text,
      whatsappPhoneNumber: phone,
      items
    } = _data.customerService;

    setUrlWhatsapp({ phone, text });
    const orderDataRequest = items?.sort(
      (a, b) => a.presentationOrder - b.presentationOrder
    );
    setData(orderDataRequest);
  }, [dataRequest]);

  return (
    <TemplatePage
      error={isError}
      loading={isLoading}
      skeleton={
        <SkeletonContent isLoading={isLoading} layout={[styles.skeleton]} />
      }>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={styles.contentContainer}
        numColumns={3}
        renderItem={({ item }) => (
          <ListCardButton
            containerStyle={{ width: '29.9%' }}
            text={item.title}
            image={item.image1}
            flagVisible={item.showFlag}
            onPress={() => onPressCardItem(item)}
          />
        )}
        ListFooterComponent={
          <View style={{ marginTop: 34 }}>
            <View>
              <Text style={stylesCustomerServices.containerTitle}>
                {serviceInfo?.customerService?.title}
              </Text>
              <Text style={stylesCustomerServices.containerText}>
                {serviceInfo?.customerService?.legend}
              </Text>
            </View>
            <View>
              {/* {serviceInfo?.customerService?.phones.map(phone => (
                  <TouchableOpacity
                    style={stylesCustomerServices.boxInfo}
                    key={phone?.number}
                    onPress={() => goToUrlPhoneNumber(phone?.number)}>
                    <PhoneIcon />
                    <View style={stylesCustomerServices.containerNumber}>
                      <Text style={stylesCustomerServices.containerTitle}>
                        {phone?.cityName}
                      </Text>
                      <Text style={stylesCustomerServices.containerTitle}>
                        {phone?.number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))} */}
            </View>
            <TouchableOpacity
              style={styles.buttonWhatsapp}
              onPress={() => {
                openWhatsapp(whatsappInfo.phone, whatsappInfo.text);
              }}
              activeOpacity={0.5}>
              <Icon style={styles.iconStyles} name="whatsapp" size={22} />
              <Text style={styles.textWhite}>{'ESCRÍBENOS POR WHATSAPP'}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </TemplatePage>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: HEIGHT_TAB_BAR + 25,
    alignSelf: 'center',
    width: '92%'
  },
  buttonWhatsapp: {
    borderRadius: 5,
    backgroundColor: COLORS.BRAND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 25,
    height: 40,
    flexDirection: 'row'
  },
  textWhite: {
    color: FontStyles.LightColor.color,
    fontSize: 14,
    fontWeight: fontWeightOS('700'),
    fontFamily: fontFamilyOS(),
    fontStyle: 'normal',
    letterSpacing: 0.6
  },
  iconStyles: {
    paddingHorizontal: 0,
    color: FontStyles.LightColor.color,
    marginRight: 7
  },
  skeleton: { width: '100%', height: 200 }
});

export default CustomerService;
