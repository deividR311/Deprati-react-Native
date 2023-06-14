import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { stylesCustomerServices } from '../stylesCustomerServices';
import useOpenLinkInApp from '../../../../application/common/hooksCommons/useOpenLinkInApp';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  item: {
    image: string;
    title: string;
    desc: string;
    actionLink?: () => void;
    [key: string]: any;
  };
}
export default function ItemCardCustomerServices({ item }: IProps) {
  const openLink = useOpenLinkInApp();
  const navigation = useNavigation();

  const goTo = (link: string) => {
    if (link === null) return;
    if (item?.actionLink) {
      item.actionLink();
      return;
    }
    if (link?.startsWith('https://')) {
      openLink(link);
      return;
    }

    if (!link?.startsWith('https://')) {
      navigation.navigate(link);
    }
  };
  return (
    <TouchableOpacity
      style={[
        stylesCustomerServices.shadow,
        stylesCustomerServices.cardMoreServices_container
      ]}
      onPress={() => goTo(item.link)}>
      <View>
        <Image
          source={{ uri: item.image1 }}
          style={{
            width: '100%',
            height: 135,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4
          }}
        />
        <View style={stylesCustomerServices.cardMoreServices_containerText}>
          <Text style={stylesCustomerServices.cardMoreServices_textTitle}>
            {item.title}
          </Text>
          {/* <Text style={stylesCustomerServices.cardMoreServices_textDesc}>
            {item.desc}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}
