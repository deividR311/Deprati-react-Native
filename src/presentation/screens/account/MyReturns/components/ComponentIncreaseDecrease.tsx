import React, { useEffect, useState } from 'react';
//Libs
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FontStyles } from '../../../../../application/common';
import { IHandleGlobal } from '../interfaces/IMyReturnsSearch.interface';

interface ComponentIncreaseDecreaseProps {
  style?: ViewStyle;
  styleContent?: ViewStyle;
  styleAction?: ViewStyle;
  styleText?: TextStyle;
  sizeIcon?: number;
  colorIcon?: string;
  amount: number;
  disableDecreaseButton: boolean;
  disableIncreaseButton: boolean;
  onModifyAmount(quantity: number): void;
  handleGlobal: IHandleGlobal;
}

export default function ComponentIncreaseDecrease({
  style = {},
  styleContent = {},
  styleAction = {},
  styleText = {},
  sizeIcon = 22,
  colorIcon,
  amount,
  disableDecreaseButton,
  disableIncreaseButton,
  onModifyAmount,
  handleGlobal
}: ComponentIncreaseDecreaseProps) {
  const { sumGlobal, setSumGlobal, isAllItems, setIsAllItems } = handleGlobal;

  const handleIncreaseItem = () => {
    onModifyAmount(amount + 1);
    setSumGlobal(sumGlobal + 1);
    // onModifyAmount(`${amount + 1}`)
  };

  const handleDecreaseItem = () => {
    if (amount - 1 < 0) {
      return;
    }
    isAllItems && setIsAllItems(false);
    onModifyAmount(amount - 1);
    setSumGlobal(sumGlobal - 1);
    // onModifyAmount(`${amount - 1}`)
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.content, styleContent]}>
        <TouchableOpacity
          disabled={disableDecreaseButton}
          style={[styles.cant_action, styleAction]}
          onPress={handleDecreaseItem}>
          <SmallIconButton
            icon="minus"
            sizeIcon={sizeIcon}
            color={disableDecreaseButton ? COLORS.BACKDROP : colorIcon}
          />
        </TouchableOpacity>
        <Text style={[styles.cant_number, styleText]}>{amount}</Text>
        <TouchableOpacity
          disabled={disableIncreaseButton}
          style={[styles.cant_action, styleAction]}
          onPress={handleIncreaseItem}>
          <SmallIconButton
            icon="plus"
            sizeIcon={sizeIcon}
            color={disableIncreaseButton ? COLORS.BACKDROP : colorIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SmallIconButton = ({
  disable = false,
  isLoading = false,
  icon = 'plus',
  color = COLORS.DARKBRAND,
  sizeIcon = 24
}) => {
  return (
    <View>
      <ActivityIndicator
        size="small"
        color={color}
        style={{ display: isLoading ? 'flex' : 'none' }}
      />
      <Icon
        style={[
          styles.cant_action_icon,
          { display: isLoading ? 'none' : 'flex' }
        ]}
        name={icon}
        size={sizeIcon}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%'
    // backgroundColor:'cyan'
  },
  content: {
    // marginTop:-2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '90%',
    borderRadius: 5,
    backgroundColor: COLORS.WHITE
  },
  cant_action: {
    backgroundColor: COLORS.DEPRATYGRAY,
    width: '25%',
    height: '70%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  cant_action_icon: { textAlign: 'center' },
  cant_number: {
    width: '50%',
    alignSelf: 'center',
    ...FontStyles.Body_1,
    // fontSize: 18,
    backgroundColor: COLORS.WHITE,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SmallIconButton: {
    flexDirection: 'row'
  }
});
