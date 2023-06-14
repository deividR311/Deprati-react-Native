import React, { FC } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FontStyles } from '../../../../../application/common';

export const ImageNameCard: FC<{
  filename?: string;
  onClose?: () => void;
  size?: number;
  marginBottom?: number;
}> = ({
  filename,
  onClose,
  size = Dimensions.get('screen').width - 40,
  marginBottom = 0
}) => {
  return (
    <View style={[{ width: size, marginBottom }, styles.filenameContainer]}>
      <View style={styles.filename}>
        <Text style={[FontStyles.Body_2]}>{filename}</Text>
      </View>
      <TouchableOpacity style={styles.closeButtonText} onPress={onClose}>
        <Icon name="close" size={20} color={FontStyles.DarkColor.color} />
      </TouchableOpacity>
    </View>
  );
};

export const ImageCard: FC<ImageCardProps> = ({
  onPressClose,
  image,
  size = Dimensions.get('screen').width - 40
}) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          width: size,
          height: size,
          uri: image
        }}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.closeButton} onPress={onPressClose}>
        <Icon name="close" size={20} color={FontStyles.DarkColor.color} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 8
  },
  image: {
    borderRadius: 8
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GRAYBRAND,
    borderRadius: 36,
    marginRight: 16,
    marginTop: 16
  },
  filenameContainer: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: COLORS.GRAYBRAND,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  filename: {
    flex: 1,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {}
});

interface ImageCardProps {
  image?: string;
  size?: number;
  onPressClose?: () => void;
}
