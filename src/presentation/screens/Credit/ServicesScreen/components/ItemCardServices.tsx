import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { stylesCredit } from '../../stylesCredit';
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
export default function ItemCardServices({ item }: IProps) {
  const navigation = useNavigation();

  const goTo = (link: string) => {
    if (link === null) return;
    if (item?.actionLink) {
      item.actionLink();
      return;
    }
    if (link?.startsWith('https://')) {
      Linking.openURL(link);
      return;
    }

    if (!link?.startsWith('https://')) {
      navigation.navigate(link);
    }
  };
  return (
    <TouchableOpacity
      style={[stylesCredit.shadow, stylesCredit.cardMoreServices_container]}
      onPress={() => goTo(item?.link)}>
      <View>
        <Image
          source={{ uri: item?.image1 }}
          style={{
            width: '100%',
            height: 135,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4
          }}
        />
        <View style={stylesCredit?.cardMoreServices_containerText}>
          <Text style={stylesCredit?.cardMoreServices_textTitle}>
            {item?.title}
          </Text>

          {/* <Text style={stylesCredit.cardMoreServices_textDesc}>
            {item?.description}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}
