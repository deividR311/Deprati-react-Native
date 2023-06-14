export * from './screen-back-button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SIZE_ICON_TAB } from '../../../application/common/fonts';
import { testProps } from '../../../application/utils/accessibleId';

interface IBackButtonProps extends NativeStackHeaderProps {
  onPress?(): void;
}
export const BackButton: React.FC<IBackButtonProps> = props => {
  const navigation = useNavigation();

  function handleOnPress() {
    if (props?.onPress) return props.onPress();
    return navigation.canGoBack() && navigation.goBack();
  }

  return (
    <Icon
      accessible
      {...testProps('boton_goback')}
      style={{ paddingHorizontal: 0 }}
      name="arrow-left"
      size={SIZE_ICON_TAB}
      {...props}
      onPress={handleOnPress}
    />
  );
};

export default BackButton;
