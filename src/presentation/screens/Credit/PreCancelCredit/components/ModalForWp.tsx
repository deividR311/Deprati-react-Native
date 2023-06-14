//Libs
import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
//components
import { Popup } from '../../../../common-components/poppup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//hooks
import useContentServiceRequest from '../../../../../infrastucture/apis/contentService/useContentServiceRequest.hook';
import { useWhatsapp } from '../../../../../application/common/hooksCommons/useOpenLinkInApp';
//utils
import { COLORS } from '../../../../../application/common';
import { IInfoWp } from '../../../../../infrastucture/apis/precancellation/precancellation.type';

interface ModalForWpProps {
  onPress?(): void;
  onClose(): void;
  visible: boolean;
}

export default function ModalForWp({
  onPress,
  onClose,
  visible
}: ModalForWpProps) {
  const { getContentCustomer, dataCustomer, isLoadingContentService } =
    useContentServiceRequest();
  const [openWhatsapp] = useWhatsapp();

  const [infoWp, setInfoWp] = useState<IInfoWp>({
    phoneNumber: '',
    messageToSend: ''
  });
  useEffect(() => {
    getContentCustomer();
  }, []);

  useEffect(() => {
    if (dataCustomer) {
      setInfoWp({
        phoneNumber: dataCustomer.customerService.whatsappPhoneNumber,
        messageToSend: dataCustomer.customerService.whatsappMessage
      });
    }
  }, [dataCustomer]);
  const onLinkWhatsapp = () => {
    openWhatsapp(infoWp.phoneNumber, infoWp.messageToSend).catch(() => {
      Alert.alert('Por favor instale la aplicación de WhatsApp');
    });
    // handleClose()
  };
  const handleAction = () => {
    onLinkWhatsapp();
    onPress?.();
  };
  return (
    <Popup
      visible={visible}
      closeAction={onClose}
      buttonAction={handleAction}
      buttonLoading={isLoadingContentService}
      buttonDisabled={isLoadingContentService}
      icon={<Icon name="alert-circle" size={110} color={COLORS.BRAND} />}
      iconButton={
        <Icon
          style={styles.iconButton}
          name="whatsapp"
          size={22}
          color={COLORS.WHITE}
        />
      }
      textContentStyle={styles.textContent}
      iconColor={COLORS.GREENOK}
      title={'Actualmente no podemos\nprocesar tu solicitud.'}
      textContent={'Comunícate con Servicio al Cliente para aclarar dudas.'}
      showCloseButton={true}
      buttonType="full"
      buttonText="ESCRÍBENOS POR WHATSAPP"
    />
  );
}

const styles = StyleSheet.create({
  iconButton: {
    marginRight: 10
  },
  textContent: { textAlign: 'center', paddingVertical: 10 }
});
