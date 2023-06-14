import React from 'react';
//Libs
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import PlusSvg from '../../../../../../../assets/icons/Plp/PlusSvg';
import { COLORS } from '../../../../../../application/common/colors';
import { capitalize } from '../../../../../../application/utils/string-formater';
import ModalLoading from '../../../../../common-components/modal/ModalLoading';
import { ICON } from '../../../../../../application/utils/enums';
import { ActivityIndicator } from 'react-native-paper';
import { testProps } from '../../../../../../application/utils/accessibleId';

//Styles

interface ComponentTitleDeleteProps {
  title: string;
  disableDelete?: boolean;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  styleViewDelete?: StyleProp<ViewStyle>;
  sizeDelete?: number;
  onDelete(): void;
  testID: string;
}

export default function ComponentTitleDelete({
  title,
  onDelete,
  disableDelete = false,
  style = {},
  styleText = {},
  styleViewDelete = {},
  sizeDelete = 14,
  testID = ''
}: ComponentTitleDeleteProps) {
  return (
    <View style={[style]}>
      <View style={[{ flex: 1 }]}>
        <Text style={[styleText]} selectable={false} numberOfLines={2}>
          {capitalize(title)}
        </Text>
      </View>
      <View style={[styleViewDelete, disableDelete && styles.hidden]}>
        <TouchableOpacity
          {...testProps(testID)}
          activeOpacity={0.5}
          disabled={disableDelete}
          onPress={() => onDelete()}>
          <View style={[styles.content_close_x]}>
            <PlusSvg
              width={sizeDelete}
              height={sizeDelete}
              rotation={ICON.OPENED}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content_close_x: {
    width: 64,
    height: 64,
    paddingRight: 25,
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  hidden: {
    display: 'none'
  }
});
