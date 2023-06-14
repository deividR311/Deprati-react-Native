import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { IHandleGlobal } from '../interfaces/IMyReturnsSearch.interface';
import ComponentIncreaseDecrease from './ComponentIncreaseDecrease';
import { stylesOrderEnter as styles } from './stylesOrdersReturn';

interface CardOrderEnterProps {
  code: string;
  nameItem: string;
  availableQuantity: number;
  entryNumber: number;
  handleGlobal: IHandleGlobal;
}
export default function CardOrderEnter({
  code,
  nameItem,
  availableQuantity,
  entryNumber,
  handleGlobal
}: CardOrderEnterProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const {
    isDisabledAll,
    isAllItems,
    handleChangeValue,
    isPressButtonAll,
    setIsPressButtonAll
  } = handleGlobal;

  const handleModifyAmount = (value: number) => {
    setIsPressButtonAll(false);
    handleChangeValue(entryNumber, value);
    setSelectedAmount(value);
  };

  useEffect(() => {
    if (isAllItems) setSelectedAmount(availableQuantity);
    else if (!isAllItems && isPressButtonAll) setSelectedAmount(0);
  }, [isAllItems]);

  return (
    <View style={[styles.viewCard, { marginHorizontal: MARING_HORIZONTAL }]}>
      <View style={styles.viewCard__content}>
        <View style={styles.viewCard__content_info}>
          <View style={styles.viewCard__content_info_view}>
            <Text style={styles.containerTitle}>Código: #{code}</Text>
            <Text style={[styles.subtitle, styles.nameItem]}>{nameItem}</Text>
            <View style={styles.rowContainer}>
              <View style={styles.rowContainer_cant}>
                <Text style={styles.subtitle}>
                  Cantidad Disponible: {availableQuantity}
                </Text>
              </View>
              <View style={styles.rowContainer_Increase}>
                <ComponentIncreaseDecrease
                  amount={selectedAmount}
                  disableDecreaseButton={isDisabledAll || isAllItems}
                  disableIncreaseButton={selectedAmount === availableQuantity}
                  onModifyAmount={x => handleModifyAmount(x)}
                  handleGlobal={handleGlobal}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
