import React, { FC, useEffect, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { ButtonText } from '../buttons/Button';
import AddressPayment from './components/AddressPayment';
import useBillingAddress from './useBillingAddress.hook';
import {
  AddressEmpty as BillingAddressEmpty,
  AddressPaymentSkeleton,
  BillingAddressProps,
  stylesAddressEmpty,
  stylesBillingAddressComponent as styles
} from './components';
import { COLORS, FontStyles, FONTS_SIZES } from '../../../application/common';
import { handleChangeColorBold } from '../../../application/utils/functionsChangeColor';
import { Popup } from '../poppup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const BillingAddressComponent: FC<BillingAddressProps> = (
  props: BillingAddressProps
) => {
  const {
    style = {},
    onSelected,
    emptyStyle = {},
    showTitle = true,
    enableHandleEnableButton,
    onIsEnable,
    paymentAddress,
    paymentCredit = {}
  } = props;
  const [showModalLoading, setShowModalLoading] = useState<boolean>(false);
  const [showHandleAddEdit, setShowHandleAddEdit] = useState<boolean>(false);

  const {
    addressSelected,
    isLoading,
    addressPaymentList,
    buttonChangeData,
    handleChangeData,
    changeAddress,
    handleDelete,
    handleAddEdit,
    isLoadingByDeleting,
    handleBillingAddressList
  } = useBillingAddress({
    handleEnableButton: enableHandleEnableButton,
    onChangeLoadingState: setShowModalLoading,
    paymentAddress: paymentAddress
  });

  useEffect(() => {
    onSelected?.(!!addressSelected, addressSelected);
    if (addressSelected) return onIsEnable?.(true);
    return onIsEnable?.(false);
  }, [addressSelected]);

  if (isLoading) return <AddressPaymentSkeleton />;

  if (!addressPaymentList.loading && !addressPaymentList.existsAddress)
    return (
      <BillingAddressEmpty
        style={emptyStyle}
        onPress={handleAddEdit}
        styleSecundaryButton={
          typeof paymentCredit?.showAlerAddressPayment !== 'undefined'
        }>
        <Popup
          visible={paymentCredit?.showAlerAddressPayment ?? false}
          icon={
            <View style={stylesAddressEmpty.contentCart}>
              <Icon name="map-marker" size={80} color={COLORS.BRAND} />
            </View>
          }
          textComponent={() => (
            <Text
              style={[
                stylesAddressEmpty.textEmpty,
                {
                  ...FontStyles.Regular,
                  fontSize: FONTS_SIZES.subtitle1,
                  textAlign: 'center',
                  paddingHorizontal: 8,
                  marginBottom: 16,
                  maxWidth: 300,
                  alignSelf: 'center'
                }
              ]}>
              {'Actualmente no cuentas con dirección de facturación guardada.'}
              {handleChangeColorBold(
                ' Para continuar es necesario que agregues una dirección.',
                COLORS.DARK
              )}
            </Text>
          )}
          showCloseButton={true}
          closeAction={() => {
            paymentCredit?.setShowAlerAddressPayment?.(false);
          }}
          buttonAction={() => {
            setShowHandleAddEdit(true);
            paymentCredit?.setShowAlerAddressPayment?.(false);
          }}
          onCloseRequest={() => {
            if (showHandleAddEdit) {
              handleAddEdit(false);
            }
          }}
          buttonText={'AGREGAR DIRECCIÓN DE FACTURACIÓN'}
          buttonType={'full'}
          titleStyle={FontStyles.Justify}
        />
      </BillingAddressEmpty>
    );

  return (
    <View style={style}>
      {showTitle && (
        <Text style={styles.header_info}>Datos de facturación</Text>
      )}
      {buttonChangeData ? (
        <AddressPayment
          item={addressSelected}
          isButtonChangeData={buttonChangeData}
          onChangeData={handleChangeData}
          changeAddress={changeAddress}
          textEditAction={props?.textEditAction}
        />
      ) : (
        handleBillingAddressList().map(x => (
          <AddressPayment
            key={`address-${x.id}`}
            item={x}
            isButtonChangeData={buttonChangeData}
            onChangeData={handleChangeData}
            changeAddress={changeAddress}
            handleDelete={handleDelete}
            handleAddEdit={handleAddEdit}
          />
        ))
      )}
      {!buttonChangeData && (
        <>
          <Divider style={styles.divider} />
          <ButtonText
            title="Agregar dirección de facturación"
            onPress={() => handleAddEdit(false)}
            styleText={styles.text_button}
          />
        </>
      )}
      <Modal transparent visible={showModalLoading || isLoadingByDeleting}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffffb3',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <ActivityIndicator size="large" color={COLORS.BRAND} />
        </View>
      </Modal>
    </View>
  );
};

export const BillingAddressComponentMemo = React.memo(BillingAddressComponent);
