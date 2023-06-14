import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import TextRow from './TextRow';
import CheckboxComp from '../../../../common-components/checkboxs';
import { COLORS } from '../../../../../application/common';
import { ButtonText } from '../../../../common-components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigationRoute } from '../../../../navigation/account';
import { AddressDto } from '../../../../../infrastucture/apis/address';
import { useGenericModal } from '../../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../../common-components/modal/modal.interfaces';
import useAddressDelivery from '../hooks/useAddressDelivery';
import { useLocalStorage } from '../../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../../application/state-manager/services/localstorage';
import AddressForm from '../AddressForm';
import sleep from '../../../../../application/utils/sleep';

interface Props {
  item: AddressDto;
  showCheckbox?: boolean;
  showFormModal?: boolean;
  showActions?: boolean;
  onDelete?: (completed: boolean, id: string, errors?: any) => Promise<void>;
  onAction?(
    arg?: {
      onCallbackSuccess?: () => Promise<void>;
      onCallbackError?: () => Promise<void>;
      isSuccess?: boolean;
      simpleCancel?: boolean;
    } & Partial<AddressDto>
  ): void;
}

export default function AddressInfo({
  item,
  showCheckbox = true,
  showFormModal = false,
  showActions = true,
  onDelete: onAddressDeleted,
  onAction
}: Props) {
  const [check, setcheck] = useState(false);
  const navigation = useNavigation();
  const { hideModal, showModal } = useGenericModal();
  const { deleteAddressDelivery, setDefaultAddress, defaultLoading } =
    useAddressDelivery();
  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const handleDelete = () => {
    showModal(ModalsType.DeleteAddress, {
      buttonAction: async () => {
        hideModal();
        await sleep(500);
        onAddressDeleted?.(false, item?.id ?? '', undefined);
        const { error }: any = await deleteAddressDelivery({
          id: item?.id ?? '',
          username: username
        });
        onAddressDeleted?.(true, item?.id ?? '', error);
      }
    });
  };

  const handleForm = () => {
    const _route = { params: { inforAddress: item } };
    showModal(ModalsType.AddressPaymentModal, {
      title: `Editar dirección`,
      textComponent: () => (
        <AddressForm
          isModal={true}
          enableKeyBoardAvoiding={true}
          style={{ marginHorizontal: -20 }}
          contentButtonsStyle={{ marginTop: 0 }}
          route={_route}
          onAction={args => {
            if (args?.isSuccess) {
              args?.onCallbackSuccess?.().finally(() => onAction?.(args));
            } else {
              onAction?.(args);
            }
          }}
        />
      )
    });
  };

  return (
    <View style={{ paddingHorizontal: 16, width: '100%' }}>
      <TextRow title={item.firstName} />
      <TextRow title="Dirección: " text={item.line1} />
      <TextRow title="Manzana, callejón o No. de casa: " text={item.line2} />
      <View style={{ flexDirection: 'row' }}>
        <TextRow title="Provincia: " text={`${item.region?.name} - `} />
        <TextRow title="Ciudad: " text={`${item?.town}`} />
      </View>

      <TextRow
        title="Teléfono celular: "
        text={item.cellphonePreffix + item.cellphoneNumber}
      />
      <TextRow title="Referencias: " text={item.otherInfo} />

      {item.defaultAddress !== true && showCheckbox && (
        <CheckboxComp
          value={false}
          onPress={() => {
            setcheck(!check);
            setDefaultAddress({ username, ...item });
          }}
          color={COLORS.BRAND}
          status={check ? 'checked' : 'unchecked'}
          styleContainer={styles.checkBox}
          label={'Marcar como dirección principal.'}
          disabled={defaultLoading}
        />
      )}
      {showActions && (
        <View style={{ flexDirection: 'row' }}>
          <ButtonText
            style={{ marginRight: 8 }}
            onPress={() =>
              showFormModal
                ? handleForm()
                : navigation.navigate(
                    AccountNavigationRoute.AdressForm as never,
                    {
                      inforAddress: item
                    } as never
                  )
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
      )}
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
  },
  textLine: {
    flex: 1,
    flexDirection: 'row'
  }
});
