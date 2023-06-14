import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import InputBase from '../../../common-components/inputs/InputBase';
import SelectInput from '../../../common-components/inputs/SelectInput';
import { MainButton } from '../../../common-components/buttons/Button';
import { COLORS } from '../../../../application/common/colors';
import {
  HEIGHT_TAB_BAR,
  MARING_HORIZONTAL
} from '../../../../application/common/layout';
import { FontStyles, FONTS_FAMILY } from '../../../../application/common/fonts';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { Box, Row } from '../../../common-components/table';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import useConsultationQuotas from './hooks/useConsultationQuotas';
import { NAV } from '../../../../application/common/namesNav';
import SelectDropdown from 'react-native-select-dropdown';
import TextInputMask, { createNumberMask } from 'react-native-mask-input';
import ButtonRelatedCredit from '../components/ButtonRelatedCredit';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';
import { useTranslation } from 'react-i18next';

export default function QuotaConsultation() {
  const { t } = useTranslation();
  const route = useRoute();
  useEmmaSdk({ route });
  const {
    onConsultation,
    isLoading,
    data: dataCons,
    isError,
    isLoadingList,
    dataList,
    isErrorList
  } = useConsultationQuotas();
  const [values, setvalues] = useState({
    amount: '',
    amountSend: '',
    deferred: {}
  });
  let ref = useRef<SelectDropdown>();
  const [consultingCount, setconsultingCount] = useState(false);
  const { showModal } = useGenericModal();
  const {
    localStorageData: {
      [LocalStorageKey.IsLogin]: IsLogin,
      [LocalStorageKey.IsAccountAuthenticated]: IsAccountAuthenticated
    }
  } = useLocalStorage();
  const navigation = useNavigation();
  const validateFields =
    values.amount.length > 0 && Object.keys(values.deferred).length > 0;
  const { capitalQuote, nextPayments, quotes, totalToPay } =
    dataCons?.data ?? {};

  const dollarMask = createNumberMask({
    delimiter: '.',
    separator: ',',
    precision: 2
  });

  useEffect(() => {
    if (isError) {
      showModal(ModalsType.ErrorSignUp, {
        title: 'Ups, algo pasa con la conexión, intenta de nuevo'
      });
    }
  }, [isError]);

  return (
    <ScrollView>
      <View style={{ paddingBottom: HEIGHT_TAB_BAR + 40 }}>
        <View style={{ paddingHorizontal: MARING_HORIZONTAL }}>
          <Text style={{ ...FontStyles.Body_1, marginVertical: 24 }}>
            { t('deferPurchases') }
          </Text>
          <InputBase
            focusable={true}
            autoFocus={true}
            style={{
              marginBottom: 16,
              backgroundColor: COLORS.WHITE
            }}
            dense={true}
            label={'Monto en dólares'}
            keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'number-pad'}
            value={values.amount}
            maxLength={9}
            multiline={false}
            onChangeText={(value: string) => {
              // const setDolar = new Intl.NumberFormat('en-US', {
              //   minimumFractionDigits: 0
              // }).format(value);
              setvalues({ ...values, amount: value });
            }}
            render={_props => (
              <TextInputMask
                {..._props}
                keyboardType={
                  Platform.OS === 'ios' ? 'decimal-pad' : 'number-pad'
                }
                mask={dollarMask}
                value={values.amount}
                onEndEditing={e => {
                  const setNumberSend = e.nativeEvent.text.replace(/,/g, '_');
                  const deleltePoint = setNumberSend.replace(/\./g, '');
                  const deleteGuion = deleltePoint.replace(/_/g, '.');
                  setvalues({ ...values, amountSend: deleteGuion });
                }}
              />
            )}
          />
          <SelectInput
            ref={ref}
            useOnlyPlaceHolder
            value={values.deferred}
            disabled={isLoadingList}
            namePropertyDisplay="description"
            label="Plazo"
            items={dataList?.data ?? []}
            onChange={(value: string) => {
              setvalues({ ...values, deferred: value });
            }}
          />
          <MainButton
            onPress={() => {
              onConsultation({
                amount: values.amountSend,
                // amount: parseInt(values.amount, 10),
                deferred: values.deferred.deferred,
                deferredOrder: values.deferred.deferredOrder
              });

              setconsultingCount(true);
            }}
            disabled={isLoading || (!consultingCount && !validateFields)}
            style={styles.button}
            title={'CALCULAR'}
          />
        </View>
        {dataCons?.data ? (
          <View style={styles.shadow}>
            <View style={styles.view_result}>
              <Text style={styles.title_result}>Cálculo de cuotas</Text>
              <View style={{ marginBottom: 37, width: '100%' }}>
                {/* <Row
                  title="Cuota Capital"
                  value={`$${capitalQuote?.toString()}`}
                /> */}
                <Row
                  maxWithRowTitle={200}
                  title="Cuota mensual estimada"
                  value={`$${quotes?.toString()}`}
                />

                <Row
                  title="Total a pagar"
                  value={`$${totalToPay?.toString()}`}
                />
              </View>
            </View>
            {nextPayments?.length > 0 && (
              <Box
                key={'order-detail'}
                titleStyle={{ ...FontStyles.Subtitle, color: COLORS.DARK }}
                title={'Próximos pagos estimados'}
                separator
                boxStyle={{
                  paddingHorizontal: 0
                }}
                initialRowComponent={
                  <View style={styles.view_initialRow}>
                    <Text
                      style={{
                        ...FontStyles.Subtitle,
                        color: COLORS.DARK,
                        marginRight: 65
                      }}>
                      Fecha
                    </Text>
                    <Text
                      style={{
                        ...FontStyles.Subtitle,
                        color: COLORS.DARK,
                        paddingRight: 8
                      }}>
                      Monto
                    </Text>
                  </View>
                }
                rows={[
                  {
                    title: nextPayments?.[0]?.date,
                    value: `$${nextPayments?.[0]?.value}`,
                    semicolom: false,
                    style: styles.row_result
                  },
                  {
                    title: nextPayments?.[1]?.date,
                    value: `$${nextPayments?.[1]?.value}`,
                    semicolom: false,
                    style: styles.row_result
                  }
                ]}
              />
            )}
          </View>
        ) : (
          <View
            style={{
              height: HEIGHT_TAB_BAR + 170
            }}
          />
        )}

        <View style={{ marginTop: 34, marginHorizontal: MARING_HORIZONTAL }}>
          {!IsAccountAuthenticated || !IsLogin ? (
            <>
              {IsLogin ? (
                <ButtonRelatedCredit />
              ) : (
                <MainButton
                  onPress={() => navigation.navigate(NAV.AUTH_NAVIGATION)}
                  style={{ width: '100%', marginBottom: 15 }}
                  title={'Ingresa a tu cuenta aquí'.toUpperCase()}
                />
              )}
            </>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view_result: {
    paddingHorizontal: 24,
    width: '100%'
  },
  shadow: {
    backgroundColor: COLORS.GRAYDARK20,
    shadowColor: '#000',
    marginTop: 37,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,

    elevation: 8
  },
  row_result: {
    flexDirection: 'row',
    width: '87%',
    marginTop: 6,
    paddingLeft: 16
  },
  row_first: { flexDirection: 'row', justifyContent: 'space-between' },

  text_total: {
    ...FontStyles.Body_1,
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    fontWeight: 'bold'
  },
  view_initialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.DEPRATYGRAY,
    padding: 8,
    width: '100%'
  },
  title_result: {
    ...FontStyles.H3_Headline,
    textAlign: 'left',
    color: COLORS.BRAND,
    marginVertical: 16
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.DARK70,
    width: '100%'
  },
  inputQuota: {
    // borderWidth: 1,
    // borderColor: COLORS.GRAYDARK60,
    // borderRadius: 3,
    paddingHorizontal: 16
    // fontSize: FONTS_SIZES.input,
    // // marginBottom: 20
  }
});
