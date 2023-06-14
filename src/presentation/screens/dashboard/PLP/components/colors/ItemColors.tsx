import React, { useMemo } from 'react';
//Libs
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageBackground
} from 'react-native';
import CheckSvg from '../../../../../../../assets/icons/Plp/CheckSvg';
import { getUrlImageHybris } from '../../../../../../application/utils/urls';
import { styles } from './styles/stylesItemColors';
//Styles

export default function ItemColors({
  styleContainer = {},
  styleContentImage = {},
  styleCheck = {},
  size = 20,
  dataUri,
  isCheck,
  onPress,
  disabled = false
}: {
  styleCheck?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  styleContentImage?: StyleProp<ViewStyle>;
  size?: number;
  dataUri: string;
  isCheck?: boolean;
  onPress(): void;
  disabled?: boolean;
}) {
  const sizeCheckWidth = size ? size - 6 : 14;
  const sizeCheckHeight = size ? size - 11 : 9;
  const currentUri = useMemo(() => getUrlImageHybris(dataUri), [dataUri]);
  return (
    <View style={[styles.container, styleContainer]}>
      <View
        style={[
          styles.contentImage,
          { height: size, width: size },
          styleContentImage
        ]}>
        <TouchableOpacity disabled={disabled} onPress={() => onPress()}>
          <ImageBackground
            style={styles.image}
            imageStyle={{ borderRadius: 20 }}
            source={{ uri: currentUri }}>
            {isCheck && (
              <View testID="iconCheck" style={[styles.check, styleCheck]}>
                <CheckSvg width={sizeCheckWidth} height={sizeCheckHeight} />
              </View>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}
