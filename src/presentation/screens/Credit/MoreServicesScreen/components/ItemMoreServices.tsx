import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { stylesCredit } from '../../stylesCredit';
import { FontStyles } from '../../../../../application/common/fonts';
import { COLORS } from '../../../../../application/common/colors';
import useOpenLinkInApp from '../../../../../application/common/hooksCommons/useOpenLinkInApp';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Iprops {
  item: any;
}
export default function ItemMoreServices({ item }: Iprops) {
  const openLink = useOpenLinkInApp();
  const navigation = useNavigation();
  const goTo = (link: string) => {
    if (item.link !== null) {
      if (link?.startsWith('https://')) {
        openLink(link);
        return;
      }
      navigation.navigate(link);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => goTo(item.link)}
      activeOpacity={0.9}
      style={{
        ...stylesCredit.shadow,
        ...stylesCredit.container_moreservices,
        shadowColor: COLORS.DARK
      }}>
      <View>
        <Text
          style={{
            ...FontStyles.H3_Headline
          }}>
          {item.title}
        </Text>
      </View>
      <Icon name="arrow-forward-ios" size={15} color={COLORS.DARK70} />
    </TouchableOpacity>
  );
}
