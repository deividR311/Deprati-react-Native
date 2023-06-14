import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import TextRow from './TextRow';
import CheckboxComp from '../../../../common-components/checkboxs';
import { COLORS } from '../../../../../application/common';
import { ButtonText } from '../../../../common-components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigationRoute } from '../../../../navigation/account';
import {
  AddressPaymentDto,
  useDeleteAddressMutation
} from '../../../../../infrastucture/apis/address';
import { useGenericModal } from '../../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../../common-components/modal/modal.interfaces';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import { capitalize } from '../../../../../application/utils/string-formater';

interface Props {
  item: AddressPaymentDto;
  reloadAddress?: () => void;
}

export default function AddressInfoPayment({ item, reloadAddress }: Props) {
  const [check, setcheck] = useState(false);
  const navigation = useNavigation();
  const { hideModal, showModal } = useGenericModal();
  const [deleteAddress] = useDeleteAddressMutation();

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const handleDelete = () => {
    showModal(ModalsType.DeleteAddress, {
      buttonAction: () => {
        hideModal();
        deleteAddress({ id: item?.id, username });
        if (reloadAddress) reloadAddress();
      }
    });
  };

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
      <TextRow title="Nombre / Razón social: " text={item?.firstName} />
      <TextRow
        title="Tipo de identificación:"
        text={
          item?.idType === 'CEDULA' ? 'Cédula' : capitalize(item?.idType ?? '')
        }
      />
      <TextRow title="Número documento: " text={item?.idNumber} />
      <TextRow title="Dirección: " text={item?.line1} />
      <TextRow title="Manzana, callejón o No. de casa: " text={item?.line2} />
      <TextRow
        title="Teléfono: "
        text={`${item?.phonePreffix} ${item?.phone}`}
      />

      {/* {item.defaultAddress !== true && (
        <CheckboxComp
          value={false}
          onPress={() => setcheck(!check)}
          color={COLORS.BRAND}
          status={check ? 'checked' : 'unchecked'}
          styleContainer={styles.checkBox}
          label={'Marcar como dirección principal.'}
        />
      )} */}
      <View style={{ flexDirection: 'row' }}>
        <ButtonText
          style={{ marginRight: 8 }}
          onPress={() =>
            navigation.navigate(AccountNavigationRoute.AddressPaymentForm, {
              inforAddress: item
            })
          }
          styleText={styles.text_button}
          title="Editar dirección"
        />
        <ButtonText
          onPress={handleDelete}
          styleText={{
            color: COLORS.BRAND
          }}
          title="Eliminar dirección"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    marginLeft: -12,
    marginTop: 14
  },
  text_button: {
    color: COLORS.BRAND
  }
});
