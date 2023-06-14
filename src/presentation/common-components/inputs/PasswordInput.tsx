import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import InputBase from './InputBase';
import EyeIcon from '../../../../assets/icons/EyeIcon';
import { COLORS } from '../../../application/common/colors';
import { EyeClose } from '../../../../assets/icons';
import { TextInput } from 'react-native-paper';

export default function PasswordInput(props) {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <View accessible accessibilityLabel={props?.testID}>
      <TextInput
        accessible
        nativeID={props?.testID}
        testID={props?.testID}
        accessibilityLabel={props?.testID}
        placeholderTextColor={COLORS.GRAYDARK60}
        mode="outlined"
        {...props}
        style={{
          ...props.style,
          backgroundColor: props.error ? COLORS.ERRORBACKGROUND : COLORS.WHITE,
          borderRadius: 4
        }}
        right={
          props.isVisible ? (
            <TextInput.Icon
              onPress={() => setIsVisible(!isVisible)}
              name={() => (
                <View>{!isVisible ? <EyeIcon /> : <EyeClose />}</View>
              )}
            />
          ) : null
        }
        accessible
        secureTextEntry={!isVisible}
        outlineColor={COLORS.GRAYDARK60}
        activeOutlineColor={props.error ? COLORS.BRAND : COLORS.DARK70}
      />
    </View>
  );
}
