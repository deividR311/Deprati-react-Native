import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { COLORS } from '../../../../../application/common';
import { ButtonText } from '../../../../common-components/buttons/Button';
import AddressInfo from '../../../account/MyAddress/components/AddressInfo';
import TextRow from '../../../account/MyAddress/components/TextRow';
import { styles } from '../summaryPurchase.style';

interface Props {
  onAction: () => void;
  address: any;
  deliveryMode: string;
  pickupAddress: any;
  textEditAction?: string;
}

export default function DeliveryAddress(props: Props) {
  return (
    <View style={[styles.summaryPurchase_delivery_accordion_content]}>
      {props.deliveryMode === 'thirdParty' && (
        <View>
          <TextRow title="Retiro en agencias autorizadas:" />
          <TextRow title="Sucursal:" text={props?.pickupAddress?.displayName} />
          <TextRow
            title="Dirección: "
            text={props?.address?.formattedAddress}
          />
          <TextRow
            title="Provincia: "
            text={`${props?.address?.region?.name} - ${props?.address?.town}`}
          />
        </View>
      )}
      {!['thirdParty', 'pickup'].includes(props.deliveryMode) && (
        <AddressInfo
          item={props.address}
          showCheckbox={false}
          showFormModal={false}
          showActions={false}
        />
      )}
      {!['thirdParty'].includes(props.deliveryMode) &&
        props?.pickupAddress?.displayName && (
          <View>
            <TextRow
              title="Retiro en Tienda:"
              text={props.pickupAddress?.displayName}
            />
            {props?.pickupAddress?.pickupRetireId ? (
              <>
                <TextRow
                  title="Retira:"
                  text={props.pickupAddress?.pickupRetireName}
                />
                <TextRow
                  title="Cédula:"
                  text={props.pickupAddress?.pickupRetireId}
                />
              </>
            ) : null}
          </View>
        )}
      <ButtonText
        style={{ paddingVertical: 8, alignSelf: 'flex-start' }}
        onPress={() => props.onAction?.()}
        styleText={{ color: COLORS.BRAND }}
        title={props?.textEditAction ?? 'Editar dirección'}
      />
    </View>
  );
}
