import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import {
  COLORS,
  FONTS_FAMILY,
  FONTS_SIZES,
  FontStyles,
  HEIGHT_TAB_BAR
} from '../../../../application/common';
import useCountriesAndOthers from '../../../../application/common/hooksCommons/useCountries';
import {
  useNavigation,
  RouteProp,
  ParamListBase
} from '@react-navigation/native';
import {
  addressDeliveryValidations,
  AddressFormFields
} from '../../../../application/common/yup-validations/address.validations';
import Button from '../../../common-components/buttons/Button';
import CheckboxComp from '../../../common-components/checkboxs';
import InputBase from '../../../common-components/inputs/InputBase';
import SelectInput from '../../../common-components/inputs/SelectInput';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import useAddressDelivery from './hooks/useAddressDelivery';
import SelectDropdown from 'react-native-select-dropdown';
import { useFormHandler } from '../../../../application/common/hooksCommons/useFormHandler';
import { CustomKeyboardAvoidingView } from '../support-tickets/components/custom-keyboard-avoiding-view';
import { AddressDto } from '../../../../infrastucture/apis/address';
import sleep from '../../../../application/utils/sleep';
import { FormLegend } from '../../../common-components/legend/FormLegend';
import { fontFamilyOS } from '../../../../application/utils';

export default function AddressForm(props: AdressFormProps) {
  const {
    route,
    onAction,
    isModal = false,
    showButtomCancel = true,
    enableKeyBoardAvoiding = false,
    style = {},
    customStyle = {},
    inputPhoneStyle = {}
  } = props;

  //@ts-ignore
  const params = route?.params?.inforAddress as RouteParams;

  const {
    setField,
    setState,
    clearField,
    clearFieldError,
    formValues,
    formErrors,
    resetForm
  } = useFormHandler<AddressFormFields>({
    initialValues: {
      names: params?.firstName ?? '',
      address: params?.line1 ?? '',
      numberHouse: params?.line2 ?? '',
      province: params?.region?.isocode ?? '',
      city: params?.city ?? '',
      prefffixCellNumber: params?.cellphonePreffix ?? '',
      cellPhone: params?.cellphoneNumber ?? '',
      prefffixPhoneNumber: params?.phonePreffix ?? '',
      phone: params?.phone ?? '',
      infoAdress: params?.otherInfo ?? ''
    },
    validationSchema: addressDeliveryValidations
  });

  const navigation = useNavigation();
  const { hideModal, showModal } = useGenericModal();
  let ref = useRef<SelectDropdown>();
  const { getRegions, getCities, cities, regions } = useCountriesAndOthers();
  const {
    createAddressDelivery,
    updateAddressDelivery,
    isLoadCreateAddressDelivery,
    isLoadUpdateAddressDelivery,
    responseCreateAddress,
    isSuccessCreateAddressDelivery,
    isSuccessUpdateAddressDelivery,
    isErrorCreateAddressDelivery,
    isErrorUpdateAddressDelivery
  } = useAddressDelivery();

  const [checkDefault, setcheckDefault] = useState(params?.defaultAddress);

  const getSelectItemDataByCode = (
    combo: { label: string; value: string }[],
    code?: string
  ) => {
    // !formIsDirty && setFormDirty(true)
    const item = combo.find(
      option => option.value.toLocaleLowerCase() === code?.toLocaleLowerCase()
    );
    return item;
  };

  const getLocations = async () => {
    await getRegions();
    if (params)
      await getCities({
        region: params?.region.isocode
      });
  };

  const onPressSaveAddress = () => {
    if (!params) {
      createAddressDelivery({ ...formValues, checkDefault: checkDefault });
      return;
    }

    updateAddressDelivery({
      ...formValues,
      checkDefault: checkDefault,
      id: params.id
    });
  };

  const onCallbackSuccess = () => {
    if (params) {
      showModal(ModalsType.SuccessAddress, {
        closeAction: () => {
          handleOnPress();
          hideModal();
        },
        title: 'La dirección ha sido editada con éxito.'
      });
      return;
    }

    showModal(ModalsType.SuccessAddress, {
      closeAction: () => {
        handleOnPress();
        hideModal();
      }
    });
  };

  const onCallbackError = () => {
    showModal(ModalsType.IsErrorAddress, {
      hideButton: true,
      title: 'Ha ocurrido un error de conexión.',
      buttonText: 'Vuélve a intentar',
      buttonAction: () => {
        hideModal();
      }
    });
  };

  const handleOnPress = async (simpleCancel = false) => {
    if (!isModal) {
      navigation.goBack();
      return;
    }

    const msToWaitToClose = 500;
    await sleep(msToWaitToClose);
    hideModal();
    await sleep(msToWaitToClose);

    resetForm();

    onAction?.({
      id: params?.id?.toString(),
      defaultAddress: params?.defaultAddress,
      ...responseCreateAddress,
      isSuccess:
        isSuccessCreateAddressDelivery || isSuccessUpdateAddressDelivery,
      simpleCancel,
      onCallbackSuccess: () =>
        new Promise<void>(_resolve => {
          setTimeout(() => {
            showModal(ModalsType.SuccessAddress, {
              closeAction: async () => {
                hideModal();
                await sleep(2 * msToWaitToClose);
                _resolve();
              }
            });
          }, msToWaitToClose);
        }),
      onCallbackError: async () => onCallbackError()
    });
  };

  useEffect(() => {
    if (params && !isModal) {
      navigation?.setOptions({ headerTitle: 'Editar dirección' });
    }
    getLocations();
  }, []);

  useEffect(() => {
    if (isSuccessCreateAddressDelivery || isSuccessUpdateAddressDelivery) {
      if (isModal) {
        handleOnPress();
        return;
      }
      onCallbackSuccess();
    }
  }, [
    isSuccessCreateAddressDelivery,
    isSuccessUpdateAddressDelivery,
    responseCreateAddress
  ]);

  useEffect(() => {
    if (isErrorCreateAddressDelivery || isErrorUpdateAddressDelivery) {
      if (isModal) {
        handleOnPress();
        return;
      }
      onCallbackError();
    }
  }, [isErrorCreateAddressDelivery, isErrorUpdateAddressDelivery]);

  const content = (
    <View style={[styles.content, customStyle?.content]}>
      <FormLegend text="Por favor complete los siguientes campos." />

      <InputBase
        label="Nombre del destinatario"
        value={formValues.names}
        error={!!formErrors.names}
        onChangeText={text => setField('names', text)}
        keyboardType="email-address"
        maxLength={50}
        // onBlur={handleBlur}
        style={{ marginTop: 14 }}
      />

      <InputBase
        label="Dirección"
        value={formValues.address}
        error={!!formErrors.address}
        onChangeText={text => setField('address', text)}
        keyboardType="email-address"
        maxLength={140}
        // onBlur={handleBlur}
        style={{ marginTop: 10 }}
      />

      <InputBase
        label="# de casa, Mz, Callejón"
        value={formValues.numberHouse}
        error={!!formErrors.numberHouse}
        onChangeText={text => setField('numberHouse', text)}
        keyboardType="email-address"
        maxLength={10}
        style={{
          marginTop: 10
        }}
        // onBlur={handleBlur}
      />

      <SelectInput
        label="Provincia"
        styles={{ marginTop: 14 }}
        error={!!formErrors.province}
        items={
          regions.length
            ? regions
            : params?.region
            ? [
                {
                  label: params?.region.name,
                  value: params?.region.isocode
                }
              ]
            : []
        }
        onChange={async province => {
          ref.current?.reset();
          clearField('city');
          setState({
            province,
            city: province !== formValues.province ? '' : formValues.city
          });
          await getCities({ region: province });
        }}
        value={
          getSelectItemDataByCode(
            regions.length
              ? regions
              : params?.region
              ? [
                  {
                    label: params?.region.name,
                    value: params?.region.isocode
                  }
                ]
              : [],
            formValues.province || params?.region.isocode
          )?.value
        }
        testID={''}
      />

      {cities.length > 0 && (
        <SelectInput
          label="Ciudad"
          selectRef={ref}
          error={!!formErrors.city}
          items={
            cities.length
              ? cities
              : params?.city && params.town
              ? [
                  {
                    label: params.town,
                    value: params?.city
                  }
                ]
              : []
          }
          onChange={text => setField('city', text)}
          value={
            getSelectItemDataByCode(
              cities.length
                ? cities
                : params?.city && params.town
                ? [
                    {
                      label: params.town,
                      value: params?.city
                    }
                  ]
                : [],
              formValues.city || params?.city
            )?.value
          }
          disabled={!cities.length}
          styles={{ marginTop: 16 }}
          testID={''}
        />
      )}

      <View style={[styles.content_input_tel]}>
        <InputBase
          style={styles.content_input_tel_ind}
          value={formValues.prefffixCellNumber?.toString()}
          error={!!formErrors.prefffixCellNumber}
          onChangeText={(text: string) => setField('prefffixCellNumber', text)}
          keyboardType="numeric"
          label="Indicativo"
          maxLength={2}
          // onBlur={handleBlur}
        />

        <InputBase
          style={[styles.content_input_tel_phone, inputPhoneStyle]}
          right="phone"
          value={formValues.cellPhone?.toString()}
          error={!!formErrors.cellPhone}
          onChangeText={(text: string) => setField('cellPhone', text)}
          keyboardType="number-pad"
          label="Teléfono Celular"
          maxLength={8}
          multiline={false}
          // onBlur={handleBlur}
        />
      </View>

      <View style={[styles.content_input_tel]}>
        <View
          style={{ flexDirection: 'column', display: 'flex', width: '30%' }}>
          <InputBase
            value={formValues.prefffixPhoneNumber?.toString()}
            error={!!formErrors.prefffixPhoneNumber}
            onChangeText={(text: string) =>
              setField('prefffixPhoneNumber', text)
            }
            keyboardType="number-pad"
            label="Indicativo"
            maxLength={2}
            // onEndEditing={(
            //   event: NativeSyntheticEvent<TextInputEndEditingEventData>,
            // ) => {
            //   if (values?.phone === '') {
            //     setFieldError('phone', 'Invalid')
            //   }
            // }}
          />
          <Text style={styles.optional}>Opcional</Text>
        </View>
        <View
          style={{ flexDirection: 'column', display: 'flex', width: '66%' }}>
          <InputBase
            right="phone"
            value={formValues.phone?.toString()}
            error={!!formErrors.phone}
            onChangeText={(text: string) => setField('phone', text)}
            keyboardType="number-pad"
            label="Teléfono"
            maxLength={7}
            multiline={false}
            // onEndEditing={(
            //   event: NativeSyntheticEvent<TextInputEndEditingEventData>,
            // ) => {
            //   if (values.prefffixPhoneNumber === '') {
            //      setFieldError('prefffixPhoneNumber', 'Invalid')
            //   }
            // }}
          />
          <Text style={styles.optional}>Opcional</Text>
        </View>
      </View>

      <View>
        <InputBase
          testID="review-comment"
          value={formValues.infoAdress}
          dense
          multiline={true}
          style={{
            marginTop: 10,
            maxHeight: 130,
            minHeight: 130
          }}
          numberOfLines={6}
          label="Indicaciones de cómo llegar"
          error={!!formErrors.infoAdress}
          onChangeText={(text: string) => setField('infoAdress', text)}
          maxLength={140}
          textAlignVertical="top"
          // onBlur={handleBlur}
        />
        <View style={styles.view_caracters}>
          <Text style={styles.caractersAllowed}>Caracteres permitidos</Text>
          <Text
            style={{
              color: COLORS.GRAYDARK60,
              fontFamily: FONTS_FAMILY.Roboto
            }}>
            {formValues.infoAdress?.length ?? 0} / 140{' '}
          </Text>
        </View>
      </View>

      {!params?.defaultAddress && (
        <CheckboxComp
          value={
            checkDefault || params?.defaultAddress ? 'checked' : 'unchecked'
          }
          onPress={() => setcheckDefault(!checkDefault)}
          color={COLORS.BRAND}
          status={checkDefault ? 'checked' : 'unchecked'}
          label={'Marcar como dirección principal.'}
          styleContainer={{ marginTop: 12 }}
        />
      )}

      <Button
        marginTop={28}
        backgroundColor={COLORS.BRAND}
        linkName={params ? 'EDITAR Y CONTINUAR' : 'GUARDAR Y CONTINUAR'}
        disabled={
          isLoadCreateAddressDelivery ||
          isLoadUpdateAddressDelivery ||
          Object.values(formErrors).some(e => !!e) ||
          !formValues.names ||
          !formValues.address ||
          !formValues.numberHouse ||
          !formValues.province ||
          !formValues.city ||
          !formValues.prefffixCellNumber ||
          !formValues.cellPhone ||
          !formValues.infoAdress
        }
        showActivityIndicator={
          isLoadCreateAddressDelivery || isLoadUpdateAddressDelivery
        }
        activityIndicator={{
          color: COLORS.WHITE,
          size: 'small'
        }}
        textColor={COLORS.WHITE}
        onPress={() => onPressSaveAddress()}
      />

      {showButtomCancel && (
        <Button
          marginTop={12}
          backgroundColor={COLORS.WHITE}
          containerStyle={styles.button_canceler}
          linkName="CANCELAR"
          textColor={COLORS.DARK}
          onPress={() => handleOnPress(true)}
        />
      )}
    </View>
  );

  return (
    <ScrollView style={[styles.container, style, customStyle?.container]}>
      {isModal && enableKeyBoardAvoiding ? (
        <CustomKeyboardAvoidingView>{content}</CustomKeyboardAvoidingView>
      ) : (
        content
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: HEIGHT_TAB_BAR + 40
  },
  optional: {
    marginLeft: 5,
    fontFamily: fontFamilyOS('Regular'),
    fontSize: FONTS_SIZES.label,
    color: '#979797'
  },
  content_input_tel: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content_input_tel_ind: {
    width: '30%',
    marginRight: 8
  },
  content_input_tel_phone: {
    minWidth: '66%'
  },
  view_caracters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5
  },
  caractersAllowed: {
    ...FontStyles.Subtitle,
    color: COLORS.BRAND,
    textAlign: 'left',
    marginLeft: 15
  },
  button_canceler: {
    borderWidth: 1,
    borderColor: COLORS.DARK
  }
});
interface AdressFormProps {
  route?: RouteProp<ParamListBase, string>;
  style?: ViewStyle;
  customStyle?: {
    [name: string]: ViewStyle;
  };
  contentButtonsStyle?: ViewStyle;
  inputPhoneStyle?: TextStyle;
  isModal?: boolean;
  enableKeyBoardAvoiding?: boolean;
  showButtomCancel?: boolean;
  onAction?(
    arg?: {
      onCallbackSuccess?: () => Promise<void>;
      onCallbackError?: () => Promise<void>;
      isSuccess?: boolean;
      simpleCancel?: boolean;
    } & Partial<AddressDto>
  ): void;
}

export interface RouteParams {
  cellphoneNumber: string | number;
  cellphonePreffix: string | number;
  city: string;
  country: {
    isocode: string;
    name: string;
  };
  defaultAddress: boolean;
  email: string;
  firstName: string;
  formattedAddress: string;
  id: string | number;
  idNumber: string | number;
  idType: string;
  line1: string;
  line2: string;
  otherInfo: string;
  phone: string;
  phonePreffix: string;
  region: {
    countryIso: string;
    isocode: string;
    isocodeShort: string;
    name: string;
  };
  shippingAddress: boolean;
  town: string;
  visibleInAddressBook: boolean;
}
