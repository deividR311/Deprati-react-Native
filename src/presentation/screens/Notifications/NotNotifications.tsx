import { View, Text } from 'react-native';
import React from 'react';
import { MessageIcon } from '../../../../assets/icons';
import { FontStyles } from '../../../application/common';

export default function NotNotifications() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 46
      }}>
      <MessageIcon />
      <Text
        style={{
          ...FontStyles.H6_Headline,
          marginTop: 20,
          width: '50%'
        }}>
        No tienes mensajes en este momento
      </Text>
    </View>
  );
}
