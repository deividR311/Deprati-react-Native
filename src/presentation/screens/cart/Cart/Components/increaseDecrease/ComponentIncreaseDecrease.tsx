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
import { COLORS, FontStyles } from '../../../../../../application/common';

interface ComponentIncreaseDecreaseProps {
  style?: ViewStyle;
  styleContent?: ViewStyle;
  styleAction?: ViewStyle;
  styleText?: TextStyle;
  sizeIcon?: number;
  colorIcon?: string;
  amount: number;
  disableIncreaseButton: boolean;
  disableDecreaseButton: boolean;
  code: string;
  onDelete(): void;
  onModifyAmount(quantity: string): void;
  stock: number;
}

export default function ComponentIncreaseDecrease({
  style = {},
  styleContent = {},
  styleAction = {},
  styleText = {},
  sizeIcon = 22,
  colorIcon,
  amount,
  disableIncreaseButton = false,
  disableDecreaseButton = false,
  onDelete,
  onModifyAmount,
  stock = 0
}: ComponentIncreaseDecreaseProps) {
  const [temporalAmountItems, setTemporalAmountItems] = useState(amount);

  useEffect(() => {
    setTemporalAmountItems(amount);
  }, [amount]);

  const handleIncreaseItem = () => {
    const totalStockToIncrease =
      stock > temporalAmountItems ? temporalAmountItems + 1 : stock;
    setTemporalAmountItems(totalStockToIncrease);
    onModifyAmount(`${totalStockToIncrease}`);
  };

  const handleDecreaseItem = () => {
    let newAmount = temporalAmountItems - 1;
    if (newAmount <= 0) {
      onDelete();
      return;
    }
    setTemporalAmountItems(newAmount);
    onModifyAmount(`${newAmount}`);
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

        <Text style={[styles.cant_number, styleText]}>
          {temporalAmountItems}
        </Text>

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
