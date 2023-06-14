import React, { useMemo, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import TemplatePage from '../../../common-components/template-page';
import { SkeletonPage } from '../components/SkeletonPage';
import { useDeliveryThirdParty } from './useDeliveryThirdParty.hook';
import SelectInput from '../../../common-components/inputs/SelectInput';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FontStyles,
  MARING_HORIZONTAL,
  NAV,
  SHADOW_CARD
} from '../../../../application/common';
import { MainButton } from '../../../common-components/buttons/Button';
import { DeliveryNavigationRoute } from '../../../navigation/delivery';
import { List } from 'react-native-paper';
import InputBase from '../../../common-components/inputs/InputBase';
import ItemsDeliveryThirdParty from './components/ItemsDeliveryThirdParty';

import { RightIconAccordion } from '../../../common-components/RightIconAccordion/RightIconAccordion';
import ButtonOption from '../../account/Stores/components/ButtonOption';
import useOpenInApp from '../../account/Stores/hooks/useOpenInApp';
import { handleInformationDays } from '../utils/groupSchedule';
import { ISchedule } from '../../../../infrastucture/apis/checkout/pickupStore';
import {
  alphaNumeric,
  alphaNumericWithSpaceAndAccents,
  numeric,
  phoneYup
} from '../../../../application/utils/regExp';
import useKeyBoardListener from '../../checkout/hooks/useKeyBoardListener';
import { currencyFormatter } from '../../../../application/utils/currency';
import { fontWeightOS } from '../../../../application/utils';

export default function DeliveryThirdParty() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    //list data
    provincesList,
    citiesList,
    getCitiesLoad,
    thirdPartyAgenciesList,
    thirdPartyAgenciesLoad,
    setAgencyData,
    thirdPartyAgenciesBranchList,
    deliveryBranchData,
    dataItemsDelivery,
    // form data
    // formik,
    values,
    errors,
    setFieldValue,
    setFieldError,
    handleReset,
    //states
    loading,
    error,
    //ref,
    provinceRef,
    cityRef,
    agencyRef,
    pointOfServiceRef
  } = useDeliveryThirdParty();
  const { toCall, toNavigate } = useOpenInApp();
  const { padding } = useKeyBoardListener({
    showTotalsBand: route?.params?.showTotalsBand
  });

  const nameRef = useRef<TextInput>(null);

  const renderDeliveryModes = useMemo(() => {
    const { deliveryTimeRanges } = dataItemsDelivery ?? {};
    if (!deliveryTimeRanges?.length || !values?.pointOfService) return null;
    return (
      <View style={[styles.deliveryaddress_modeDelivery]}>
        {deliveryTimeRanges?.map((item, index) => {
          return (
            <View key={index} style={[styles.deliveryaddress_methods]}>
              <View style={[styles.deliveryaddress_methods_contain]}>
                <Text style={[styles.deliveryaddress_methods_text_bold]}>
                  Costo de envío:
                </Text>
                <Text style={[styles.deliveryaddress_methods_text]}>
                  {currencyFormatter(item?.deliveryCost)}
                </Text>
              </View>
              <View>
                <View style={[styles.deliveryaddress_methods_contain]}>
                  <Text style={[styles.deliveryaddress_methods_text_bold]}>
                    Tiempo de entrega:
                  </Text>
                  <Text style={[styles.deliveryaddress_methods_text]}>
                    {item?.deliveryTimeRange}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }, [values?.pointOfService, dataItemsDelivery]);

  return (
    <TemplatePage loading={loading} skeleton={<SkeletonPage />} error={false}>
      <KeyboardAvoidingView
        contentContainerStyle={styles.deliverythirdparty}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: padding + 60 }}>
          <View style={styles.deliverythirdparty_content}>
            <Text style={styles.deliverythirdparty_title}>
              Elige la agencia más cercana para ti.
            </Text>
            <SelectInput
              testID={'deliverythirdparty_provinces'}
              selectRef={provinceRef}
              styles={styles.deliverythirdparty_select}
              error={errors.province}
              items={provincesList}
              namePropertyDisplay={'name'}
              onChange={getCitiesLoad}
              value={values?.province}
              label="Selecciona provincia"
            />
            <SelectInput
              testID={'deliverythirdparty_cities'}
              selectRef={cityRef}
              styles={styles.deliverythirdparty_select}
              error={errors.city}
              items={citiesList}
              namePropertyDisplay={'name'}
              onChange={thirdPartyAgenciesLoad}
              value={values.city}
              label="Selecciona ciudad"
            />
            <SelectInput
              testID={'deliverythirdparty_agencies'}
              selectRef={agencyRef}
              styles={styles.deliverythirdparty_select}
              error={errors.agency}
              items={thirdPartyAgenciesList}
              namePropertyDisplay={'name'}
              onChange={setAgencyData}
              value={values.agency}
              label="Selecciona la agencia"
            />

            {values?.agency ? (
              <SelectInput
                testID={'deliverythirdparty_pointservices'}
                styles={styles.deliverythirdparty_select}
                error={errors.pointOfService}
                items={thirdPartyAgenciesBranchList}
                namePropertyDisplay={'displayName'}
                selectRef={pointOfServiceRef}
                onChange={async (option: string) => {
                  await setFieldValue('pointOfService', option?.name);
                }}
                value={values?.pointOfService}
                label="Selecciona la sucursal más cercana"
              />
            ) : null}
            {deliveryBranchData?.displayName ? (
              <View
                style={[
                  styles.deliverythirdparty_card,
                  styles.deliverythirdparty_point,
                  styles.shadow
                ]}>
                <View>
                  <Text style={styles.deliverythirdparty_point_title}>
                    {deliveryBranchData?.displayName}
                  </Text>
                  <Text style={styles.deliverythirdparty_point_address}>
                    {deliveryBranchData?.address?.formattedAddress}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                    <View style={styles.deliverythirdparty_point_schedule}>
                      {deliveryBranchData?.schedule.map(
                        (x: ISchedule, index: number) => (
                          <Text
                            key={`schedule-${index}`}
                            style={
                              styles.deliverythirdparty_point_schedule_text
                            }>
                            {handleInformationDays(x.days)}
                            {`${x.openingTime.formattedHour} a ${x.closingTime.formattedHour}`}
                          </Text>
                        )
                      )}
                    </View>
                    <View style={styles.deliverythirdparty_point_action}>
                      <ButtonOption
                        icon="directions"
                        onPress={() => toNavigate(deliveryBranchData?.geoPoint)}
                      />
                      <ButtonOption
                        icon="phone"
                        onPress={() =>
                          toCall(deliveryBranchData?.address?.phone)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : null}

            <MainButton
              style={styles.deliverythirdparty_clear}
              styleText={styles.deliverythirdparty_clear_text}
              title={'LIMPIAR'}
              onPress={() => {
                handleReset();
              }}
            />

            {values?.agency ? (
              <View style={[styles.deliverythirdparty_card, styles.shadow]}>
                <Text style={styles.deliverythirdparty_card_title}>
                  DATOS DE LA PERSONA QUE VA A RETIRAR
                </Text>
                <InputBase
                  ref={nameRef}
                  testID={'deliverythirdparty_name'}
                  value={values.retireName}
                  error={errors.retireName}
                  label="Nombre completo"
                  maxLength={50}
                  style={styles.deliverythirdparty_card_input}
                  theme={undefined}
                  pattern={alphaNumericWithSpaceAndAccents}
                  dense={true}
                  validateWithPositivePattern={/^[0-9a-zA-Z -_ÁáÉéÍíÓóÚúñÑ]+$/}
                  onChangeText={(text: string) =>
                    setFieldValue('retireName', text)
                  }
                  onEndEditing={e => {
                    if (!e.nativeEvent.text) {
                      setFieldError('retireName', '');
                    }
                  }}
                />
                <InputBase
                  testID={'deliverythirdparty_phone'}
                  value={values.retirePhone}
                  error={errors.retirePhone}
                  label="Número de celular"
                  keyboardType="numeric"
                  maxLength={10}
                  multiline={false}
                  style={styles.deliverythirdparty_card_input}
                  theme={undefined}
                  dense={true}
                  onEndEditing={e => {
                    if (!e.nativeEvent.text) {
                      setFieldError('retirePhone', '');
                    }
                  }}
                  onChangeText={text => {
                    if (!text) return;
                    !text.match(phoneYup)
                      ? setFieldError('retirePhone', text)
                      : setFieldValue('retirePhone', text);
                  }}
                  validateWithPositivePattern={/^[0-9]+$/}
                  pattern={numeric}
                />
                <InputBase
                  testID={'deliverythirdparty_dni'}
                  value={values.retireId}
                  error={errors.retireId}
                  label="Número de identificación"
                  maxLength={10}
                  validateWithPositivePattern={/^[0-9a-z_]+$/gi}
                  pattern={alphaNumeric}
                  style={styles.deliverythirdparty_card_input}
                  theme={undefined}
                  dense={true}
                  onChangeText={text => setFieldValue('retireId', text)}
                  onEndEditing={e => {
                    if (!e.nativeEvent.text) {
                      setFieldError('retireId', '');
                    }
                  }}
                />
              </View>
            ) : null}
          </View>
          {renderDeliveryModes}
          <List.AccordionGroup>
            <List.Accordion
              title="Artículos para retiro en agencia autorizada"
              id="1"
              style={[styles.deliverythirdparty_delivery_accordion]}
              titleStyle={styles.deliverythirdparty_delivery_accordion_text}
              right={RightIconAccordion}>
              <ItemsDeliveryThirdParty data={dataItemsDelivery} />
            </List.Accordion>
          </List.AccordionGroup>

          <TouchableOpacity
            onPress={() => {
              navigation.replace(NAV.DELIVERY, {
                screen: DeliveryNavigationRoute.DeliveryAddress,
                params: {
                  ...route.params
                }
              });
            }}>
            <Text style={styles.deliverythirdparty_delivery_text}>
              Deseo recibir mi pedido a domicilio
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TemplatePage>
  );
}

const styles = StyleSheet.create({
  deliverythirdparty: {},
  deliverythirdparty_content: {
    paddingHorizontal: MARING_HORIZONTAL
  },
  deliverythirdparty_title: {
    ...FontStyles.Body_1,
    textAlign: 'center',
    marginTop: MARING_HORIZONTAL
  },
  deliverythirdparty_select: {
    marginTop: MARING_HORIZONTAL
  },
  deliverythirdparty_clear: {
    marginTop: MARING_HORIZONTAL,
    marginBottom: 24,
    width: '45%',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: '#565656'
  },
  deliverythirdparty_clear_text: {
    color: COLORS.DARK70
  },
  deliverythirdparty_delivery_text: {
    ...FontStyles.Regular,
    color: COLORS.BRAND,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginVertical: 24,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },
  deliverythirdparty_delivery_accordion: {
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: COLORS.GRAYDARK60,
    height: 50,
    justifyContent: 'center',
    width: '100%'
  },
  deliverythirdparty_delivery_accordion_text: {
    ...FontStyles.Regular,
    color: COLORS.DARK70,
    textTransform: 'capitalize',
    fontWeight: '600'
  },
  deliverythirdparty_card: {
    marginBottom: 24,
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderWidth: 0.2,
    borderColor: '#00000001'
  },
  shadow: {
    ...SHADOW_CARD,
    elevation: 3,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8
  },
  deliverythirdparty_card_title: {
    ...FontStyles.Subtitle,
    width: 200,
    color: COLORS.DARKBRAND,
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: MARING_HORIZONTAL
  },
  deliverythirdparty_card_input: {
    marginVertical: 4
  },
  deliverythirdparty_point: {
    marginTop: 16
  },
  deliverythirdparty_point_title: {
    ...FontStyles.H3_Headline,
    textAlign: 'left'
  },
  deliverythirdparty_point_address: {
    ...FontStyles.Body_1,
    textAlign: 'left'
  },
  deliverythirdparty_point_schedule: {},
  deliverythirdparty_point_schedule_text: {
    ...FontStyles.Body_1,
    textAlign: 'left'
  },
  deliverythirdparty_point_action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 8
  },
  deliveryaddress_modeDelivery: {
    flexDirection: 'column',
    marginHorizontal: 16,
    paddingBottom: MARING_HORIZONTAL,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.DARK70}20`
  },
  deliveryaddress_modeDelivery_title: {
    ...FontStyles.Regular,
    color: COLORS.BRAND,
    fontWeight: '700'
  },
  deliveryaddress_methods: {
    marginLeft: 8,
    width: '90%'
  },
  deliveryaddress_methods_contain: {
    flexDirection: 'row'
  },
  deliveryaddress_methods_text: {
    ...FontStyles.Regular,
    fontWeight: '400'
  },
  deliveryaddress_methods_text_bold: {
    ...FontStyles.Regular,
    fontWeight: fontWeightOS('700'),
    fontFamily: FONTS_FAMILY['Roboto-Medium'],
    marginRight: 8
  }
});
