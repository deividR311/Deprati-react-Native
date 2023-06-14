import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FontStyles } from '../../../../../application/common';

export const ClientInfoCard: FC<ClientInfoCardProps> = props => {
  return (
    <View style={Styles.clientInfoCard}>
      <Image
        width={106}
        height={64}
        style={Styles.cardImage}
        source={require('../../../../../../assets/images/cardCredito.png')}
      />
      <View style={Styles.clienteCardInfoText}>
        <Text
          style={[FontStyles.Overline, FontStyles.Caption, Styles.flexGrow]}>
          {`${props.clientName}\n${props.accountNumber}`}
        </Text>
        <Text style={[FontStyles.Caption, FontStyles.MutedColor]}>
          {`Cliente desde ${props.clientSince}`}
        </Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  clientInfoCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 3,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff'
  },
  cardImage: {
    width: 106,
    height: 64
  },
  clienteCardInfoText: {
    marginLeft: 17,
    height: 62
  },
  flexGrow: {
    flexGrow: 1
  }
});

interface ClientInfoCardProps {
  clientName: string;
  accountNumber: string;
  clientSince: string;
}
