import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import CameraIcon from '../../../../../../assets/icons/CameraIcon';
import { COLORS } from '../../../../../application/common/colors';
import { FontStyles } from '../../../../../application/common/fonts';

export const UploadImageButton: React.FC<UploadImageButtonProps> = ({
  text = 'Sube una foto',
  disabled = false,
  onPress
}) => {
  return (
    <TouchableRipple disabled={disabled} onPress={onPress} style={Styles.card}>
      <>
        <Text style={[FontStyles.H1_Headline, Styles.text]}>{text}</Text>
        <CameraIcon width={64} height={64} />
      </>
    </TouchableRipple>
  );
};

const Styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.GRAYBRAND,
    flexDirection: 'row',
    elevation: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  text: {
    flex: 1,
    textAlign: 'left',
    paddingHorizontal: 16
  }
});

export interface UploadImageButtonProps {
  text: string;
  disabled?: boolean;
  onPress: () => void;
}
