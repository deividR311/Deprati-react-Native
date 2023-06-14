import React, { useEffect, useState } from 'react';
import { Popup } from './poppup';
import { COLORS } from '../../../application/common';
import { useWhatsapp } from '../../../application/common/hooksCommons/useOpenLinkInApp';
import {
  LocalStorageKey,
  useLocalStorage
} from '../../../application/state-manager/services/localstorage';
import { Alert, Image } from 'react-native';

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export const PopupWhatsapp = ({ visible = false, title, onClose }: Props) => {
  const [visibleModal, setVisibleModal] = useState(visible);

  useEffect(() => {
    if (visible) setVisibleModal(visible);
  }, [visible]);

  const [openWhatsapp] = useWhatsapp();
  const {
    localStorageData: {
      [LocalStorageKey.Whatsapp]: {
        message: WhatsappMessage,
        phone: WhatsappPhone
      }
    }
  } = useLocalStorage();

  const onLinkWhatsapp = async () => {
    openWhatsapp(WhatsappPhone, WhatsappMessage).catch(() => {
      Alert.alert('Por favor instale la aplicación de WhatsApp');
    });
  };

  const handleClose = () => {
    setVisibleModal(false);
    onClose();
  };

  const handleAction = () => {
    onLinkWhatsapp();
    onClose();
  };

  return (
    <Popup
      visible={visibleModal}
      title={title}
      icon="error"
      hideButton={false}
      iconColor={COLORS.REDICON}
      closeAction={handleClose}
      showCloseButton={true}
      buttonType={'full'}
      buttonAction={handleAction}
      buttonText="ESCRÍBENOS POR WHATSAPP"
      iconButton={
        <Image
          style={{ width: 20, height: 20, marginRight: 10 }}
          source={require('../../../../assets/icons/whatsappIcon.png')}
        />
      }
    />
  );
};
