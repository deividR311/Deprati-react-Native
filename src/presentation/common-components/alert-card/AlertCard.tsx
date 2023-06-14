import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';

export const AlertCard: FC<AlertCard> = props => {
  const {
    backgroundColor = '#FFC70033',
    borderColor = '#FFC700',
    icon,
    iconAlign = 'top',
    text
  } = props;
  return (
    <View
      style={{
        backgroundColor,
        borderColor,
        borderWidth: 1,
        padding: 12,
        borderRadius: 4,
        flexDirection: 'row'
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: iconAlign === 'top' ? 'flex-start' : 'center'
        }}>
        {icon}
      </View>
      <View
        style={{
          paddingHorizontal: 12,
          paddingLeft: 8,
          flex: 1
        }}>
        {text}
      </View>
    </View>
  );
};

interface AlertCard {
  backgroundColor?: string;
  borderColor?: string;
  icon: ReactNode;
  iconAlign?: 'center' | 'top';
  text: ReactNode;
}
