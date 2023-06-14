import React from 'react';
import { Text, View } from 'react-native';
import { Styles } from './profile-card.styles';

export const ProfileCardRow: React.FC<{ title: string; text?: string }> = ({
  title,
  text
}) => (
  <View style={[Styles.cardProfile_container_data]}>
    <Text style={[Styles.cardProfile_container_data_title]}>
      {`${title}: `}
      <Text style={[Styles.cardProfile_container_data_value]}>{text}</Text>
    </Text>
  </View>
);
