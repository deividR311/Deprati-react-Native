import { View, Text, ViewStyle, StyleProp } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectInput from '../../../../../../common-components/inputs/SelectInput';
import { setCreditOption } from '../../../../../../../application/state-manager/services/signUp';
import { stylesModalSelect } from '../../../../../SignUp/components/styles/stylesModalSelect';
import { creditState } from '../../../../../../../application/state-manager/services/credit';

interface Props {
  selectedDisabled?: (state: boolean) => void;
  wrapperStyle?: StyleProp<ViewStyle>;
  onSelectAccount?: (
    accountInfo: UserCreditInformation,
    index?: number
  ) => void;
}

export interface UserCreditInformation {
  posicion: number | string;
  nombreCliente: string;
  numeroTarjetaAdicionalDisplay: string;
  numeroTarjeta: string;
  adicional: string;
  identificacion: string;
  celularCtaDisplay?: string;
}

const CustomRow = (item: UserCreditInformation) => {
  return (
    <View style={stylesModalSelect.rowContainer}>
      <View style={stylesModalSelect.rowInfo}>
        <Text style={stylesModalSelect.text}>{item.nombreCliente}</Text>
        <Text style={stylesModalSelect.text2}>
          {item.adicional === '00' ? 'Titular' : 'Adicional'}
        </Text>
      </View>
      <Text style={stylesModalSelect.text}>
        Crédito No.{item.numeroTarjetaAdicionalDisplay}
      </Text>
    </View>
  );
};

export default function ModalSelectContent(props: Props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState<UserCreditInformation>();
  const userInfo = (useSelector(creditState) as UserCreditInformation[]) ?? [];

  const creditInfoSelected = (
    _userInfo: UserCreditInformation,
    _index: number = 0
  ) => {
    setValue(_userInfo);
    dispatch(setCreditOption(_index));
    props?.selectedDisabled?.(true);
    props?.onSelectAccount?.(_userInfo);
  };

  useEffect(() => {
    if (!userInfo) return;
    if (userInfo?.length >= 2) return;
    if (value) return;
    creditInfoSelected(userInfo[0], 0);
  }, [userInfo, value]);

  return (
    <>
      <View style={[{ width: '100%', marginVertical: 16 }, props.wrapperStyle]}>
        <SelectInput
          styles={{ marginTop: 8, marginBottom: 0 }}
          value={value}
          namePropertyDisplay="numeroTarjetaAdicionalDisplay"
          items={userInfo}
          disabled={userInfo.length <= 1}
          onChange={creditInfoSelected}
          customRow={CustomRow}
          label="Selecciona la cuenta"
        />
      </View>
    </>
  );
}
