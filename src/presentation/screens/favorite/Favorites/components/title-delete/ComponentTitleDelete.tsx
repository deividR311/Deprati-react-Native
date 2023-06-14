import React, { useEffect, useMemo, useState } from 'react';
//Libs
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import PlusSvg from '../../../../../../../assets/icons/Plp/PlusSvg';
import { capitalize } from '../../../../../../application/utils/string-formater';
import { ICON } from '../../../../../../application/utils/enums';
import { COLORS } from '../../../../../../application/common';

interface ComponentTitleDeleteProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleViewDelete?: StyleProp<ViewStyle>;
  styleViewText?: StyleProp<ViewStyle>;
  sizeDelete?: number;
  onDelete(): void;
  loadingDelete: boolean;
  isItemFavorite?: boolean;
}

const OPACITY = 0.5;

export default function ComponentTitleDelete({
  title,
  onDelete,
  style = {},
  styleText = {},
  styleViewDelete = {},
  styleViewText = {},
  sizeDelete = 14,
  loadingDelete,
  isItemFavorite = false
}: ComponentTitleDeleteProps) {
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  useEffect(() => {
    if (loadingDelete) return;
    setIsRemoving(false);
  }, [loadingDelete]);

  const handleDelete = () => {
    setIsRemoving(true);
    onDelete();
  };

  const TOUCHABLE_CONFIG = useMemo(() => {
    if (isItemFavorite)
      return {
        activeOpacity: OPACITY,
        hitSlop: {
          top: 23,
          left: 23,
          bottom: 23,
          right: 23
        }
      };
    return { activeOpacity: OPACITY };
  }, [isItemFavorite]);

  return (
    <View style={style}>
      <View style={styleViewText}>
        <Text style={styleText} numberOfLines={2}>
          {capitalize(title)}
        </Text>
      </View>
      <View style={styleViewDelete}>
        <TouchableOpacity
          testID="delete-favorite"
          onPress={handleDelete}
          {...TOUCHABLE_CONFIG}>
          {isRemoving ? (
            <ActivityIndicator
              testID="loading-removing"
              size="small"
              color={COLORS.DARKBRAND}
              style={{ display: isRemoving ? 'flex' : 'none' }}
            />
          ) : (
            <PlusSvg
              testID="icon-delete"
              width={sizeDelete}
              height={sizeDelete}
              rotation={ICON.OPENED}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
