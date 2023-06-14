//libs
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
//component
import CheckboxComp from '../../../../common-components/checkboxs';
//styles
import { stylesCardDeferred as styles } from './stylesComponets';
//utils
import { COLORS } from '../../../../../application/common';
import { MARING_HORIZONTAL } from '../../../../../application/common/layout';
import { IDeferredList } from '../../../../../infrastucture/apis/precancellation/precancellation.type';
import {
  IHandleGlobalPreCancel,
  ISelected
} from '../interfaces/IPreCancelCredit';

interface CardDeferredProps {
  item: IDeferredList;
  infoSelected: ISelected;
  handleGlobal: IHandleGlobalPreCancel;
}
export default function CardDeferred({
  item,
  handleGlobal,
  infoSelected
}: CardDeferredProps) {
  const [selected, setSelected] = useState<boolean>(infoSelected.isSelected);
  const { purchaseDate, quotaValueFormated, quota, pendingValueFormated } =
    item;

  const {
    isAllItems,
    isPressButtonAll,
    setIsPressButtonAll,
    handleItemsSelected
  } = handleGlobal;

  useEffect(() => {
    if (isAllItems && infoSelected.isModify) setSelected(true);
    else if (!isAllItems && isPressButtonAll && infoSelected.isModify)
      setSelected(false);
  }, [isAllItems]);

  const dateOfPurchase = useMemo(() => {
    const dateDay: string = purchaseDate.replace(/\//g, '-');
    return moment(dateDay).format('DD/MM/YYYY');
  }, [purchaseDate]);

  const handleSelect = () => {
    setIsPressButtonAll(false);
    setSelected(!selected);
    handleItemsSelected(item, !selected);
  };

  return (
    <View style={[styles.viewCard, { marginHorizontal: MARING_HORIZONTAL }]}>
      <View
        style={[
          styles.container,
          selected ? styles.checked : styles.unchecked
        ]}>
        <View style={[styles.left, styles.justifyContent]}>
          <CheckboxComp
            disabled={!infoSelected.isModify}
            status={selected ? 'checked' : 'unchecked'}
            onPress={handleSelect}
            color={COLORS.BRAND}
            uncheckedColor={COLORS.GRAYCHECK}
            // styleContainer={styles.checkBox}
            // textStyle={}
            label={''}
          />
        </View>
        <View style={[styles.right, styles.justifyContent]}>
          <Text style={styles.subtitle}>Fecha de compra: {dateOfPurchase}</Text>
          <Text style={styles.subtitle}>
            Valor cuota: {`$${quotaValueFormated}`}
          </Text>
          <Text style={styles.subtitle}>Cuotas: {quota}</Text>
          <Text style={styles.pending}>
            Valor pendiente: {`$${pendingValueFormated}`}
          </Text>
        </View>
      </View>
    </View>
  );
}
