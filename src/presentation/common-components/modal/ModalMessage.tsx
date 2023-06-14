import React from 'react';
import CustomModal from '.';

interface IPROPS {
  message: string;
  title: string;
  textButton: string;
  onPress?: () => void;
}
export default function ModalMessage({
  message,
  title,
  textButton,
  onPress
}: IPROPS) {
  return (
    <CustomModal
      title={title}
      message={message}
      textButton={textButton}
      onPress={() => onPress?.()}
    />
  );
}
