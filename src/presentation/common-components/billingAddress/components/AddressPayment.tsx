import React, { useMemo } from 'react';
import { View } from 'react-native';
import TextRowComponent from './TextRowComponent';
import { COLORS, FONTS_SIZES } from '../../../../application/common';
import { ButtonText } from '../../buttons/Button';
import RadioButtonComp from '../../radiosButton';
import { AddressPaymentProps, stylesAddressPayment as styles } from '.';
import { capitalize } from '../../../../application/utils/string-formater';

const textName = 'Nombre / Razón social: ';
const textIdType = 'Tipo de identificación: ';
const textIdNumber = 'Número documento: ';
const textAddress = 'Dirección: ';
const textLine2 = 'Manzana, callejón o No. de casa: ';
const textPhone = 'Teléfono: ';

export default function AddressPayment({
  item,
  isButtonChangeData,
  onChangeData,
  changeAddress,
  handleDelete,
  handleAddEdit,
  textEditAction
}: AddressPaymentProps) {
  const handleCheck = useMemo(() => {
    if (item?.id === changeAddress.addressSelected?.id) return 'checked';
    return 'unchecked';
  }, [item?.id, changeAddress.addressSelected?.id]);

  const handleDeleteAddress = () => {
    handleDelete?.(item.id);
  };
  if (!item) return null;
  return (
    <>
      <View style={styles.container}>
        {!isButtonChangeData && (
          <View style={styles.content_radioButton}>
            <RadioButtonComp
              label=""
              color={COLORS.BRAND}
              uncheckedColor={COLORS.BRAND}
              value={item.id}
              status={handleCheck}
              onPress={() => changeAddress.handleSelected(item)}
              textStyle={{
                fontSize: FONTS_SIZES.label,
                color: COLORS.DARK
              }}
            />
          </View>
        )}
        <View style={styles.content_textRow}>
          <TextRowComponent title={textName} text={item?.firstName} />
          <TextRowComponent
            title={textIdType}
            text={
              item?.idType === 'CEDULA'
                ? 'Cédula'
                : capitalize(item?.idType ?? '')
            }
          />
          <TextRowComponent title={textIdNumber} text={item?.idNumber} />
          <TextRowComponent title={textAddress} text={item?.line1} />
          <TextRowComponent title={textLine2} text={item?.line2} />
          <TextRowComponent
            title={textPhone}
            text={`${item?.phonePreffix} ${item?.phone}`}
          />
        </View>
      </View>

      <View style={styles.content_buttonBottom}>
        {isButtonChangeData ? (
          <ButtonText
            onPress={() => onChangeData(item)}
            styleText={styles.text_button}
            title={textEditAction ?? 'Cambiar datos'}
          />
        ) : (
          <View style={styles.content_buttonAddDelete}>
            <ButtonText
              style={{ marginRight: 8 }}
              onPress={() => handleAddEdit?.(true, item)}
              styleText={styles.text_button}
              title="Editar dirección"
            />

            <ButtonText
              onPress={handleDeleteAddress}
              styleText={{
                color: COLORS.BRAND
              }}
              title="Eliminar dirección"
            />
          </View>
        )}
      </View>
    </>
  );
}
