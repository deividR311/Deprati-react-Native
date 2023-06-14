import React, { FC } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import RenderHTML from '../../../../common-components/renderHtml/RenderHTML';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FontStyles } from '../../../../../application/common';
import { useWhatsapp } from '../../../../../application/common/hooksCommons/useOpenLinkInApp';
import Button from '../../../../common-components/buttons/Button';

export const TextSuccessIncreaseCreditLimit: FC<{
  text?: string;
}> = ({ text }) => {
  return (
    <View style={styles.container}>
      <RenderHTML
        text={`<div>${text}</div>`}
        tagsStyles={{
          div: {
            paddingHorizontal: 24,
            ...FontStyles.Body_1,
            ...FontStyles.Center,
            marginTop: -8
          }
        }}
      />
      <View style={styles.space} />
    </View>
  );
};

export const TextErrorIncreaseCreditLimit: FC<{
  phoneNumber?: string;
  text?: string;
  messageToSend?: string;
}> = ({ phoneNumber = '', messageToSend = '', text }) => {
  const [openWhatsapp] = useWhatsapp();

  const onPressSendMessage = () => {
    openWhatsapp(phoneNumber, messageToSend).catch(() => {
      Alert.alert('Por favor instale la aplicación de WhatsApp');
    });
  };

  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="error" size={72} color={COLORS.BRAND} />
      {text?.split('\\n').map(item => (
        <>
          <Text style={[FontStyles.H6_Headline, FontStyles.Center]}>
            {item}
          </Text>
          <View style={styles.space} />
        </>
      ))}
      <View style={styles.space} />
      <View style={styles.space} />
      <Button
        onPress={onPressSendMessage}
        marginTop={6}
        linkName="ESCRÍBENOS POR WHATSAPP"
        backgroundColor={COLORS.BRAND}
        textColor={COLORS.WHITE}
        icon={<IconCommunity style={styles.iconWp} name="whatsapp" size={22} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  space: {
    height: 12
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 30
  },
  iconWp: {
    marginTop: -1,
    color: FontStyles.LightColor.color,
    marginRight: 7
  }
});
