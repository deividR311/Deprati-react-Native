import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import InputBase from '../../../common-components/inputs/InputBase';
import { COLORS, HEIGHT_TAB_BAR } from '../../../../application/common';
import SelectInput from '../../../common-components/inputs/SelectInput';
import Button from '../../../common-components/buttons/Button';
import { IDTYPES } from '../../../../application/utils/constants';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import {
  useCreateAddressPaymentMutation,
  useUpdateAddressPaymentMutation
} from '../../../../infrastucture/apis/address';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import { addressPaymentValidation } from '../../../../application/common/yup-validations/addressPayment.validation';
import { validatePhone } from './validatePhone';
import { changeKeyboardNumDoc } from '../../../../application/utils/changeKeyboardNumDoc';
import { AdressPaymentFormProps, IModalInfo } from './hooks/interfaces';
import { Popup as ModalError } from '../../../common-components/poppup';
import useErrorDescription, {
  IErrorService
} from '../../../../application/common/hooksCommons/useErrorDescription';
import { CustomKeyboardAvoidingView } from '../support-tickets/components/custom-keyboard-avoiding-view';
import { FormLegend } from '../../../common-components/legend/FormLegend';

const TEXT_ERROR = 'Ha ocurrido un error.';

export default function AdressPaymentForm({
  route,
  style = {},
  contentButtonsStyle = {},
  isModal = false,
  onAction
}: AdressPaymentFormProps) {
  // const route = useRoute()
  const navigation = useNavigation();
  const params = route?.params?.inforAddress ?? {};
  const formik = useFormik({
    initialValues: {
      firstName: params?.firstName ?? '',
      idNumber: params?.idNumber ?? '',
      idType: params?.idType ?? '',
      line1: params?.line1 ?? '',
      line2: params?.line2 ?? '',
      phonePreffix: params?.phonePreffix ?? '',
      phone: params?.phone ?? ''
    },
    initialErrors: {},
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    validate(_values) {
      const parsePrefux = parseInt(_values.phonePreffix, 10);
      return validatePhone(parsePrefux, _values);
    },
    validationSchema: addressPaymentValidation,
    onSubmit: () => handledSubmit()
  });

  const { values, errors, validateField, setFieldValue } = formik;

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const { hideModal, showModal } = useGenericModal();
  const { handleErrorsText } = useErrorDescription();

  const [modalError, setModalError] = useState<IModalInfo | null>(null);
  // const [showModalError, setShowModalError] = useState<boolean>(false)
  // const [msgError, setMsgError] = useState<string>('')

  const handledSubmit = () => {
    let values_init = { ...values, idType: values?.idType?.toUpperCase() };
    if (params?.id) {
      updateAddress({ ...values_init, username, id: params?.id });
    } else {
      saveCreateAddress({ ...values_init, username });
    }
  };

  const [
    saveCreateAddress,
    {
      isLoading: isLoadingCreateAddress,
      isSuccess: isSuccessCreateAddress,
      isError: isErrorCreateAddress,
      error: errorCreateAddress
    }
  ] = useCreateAddressPaymentMutation();

  const [
    updateAddress,
    {
      isLoading: isLoadingUpdateAddress,
      isSuccess: isSuccessUpdateAddress,
      isError: isErrorUpdateAddress,
      error: errorUpdateAddress
    }
  ] = useUpdateAddressPaymentMutation();

  useEffect(() => {
    if (!isLoadingCreateAddress && isSuccessCreateAddress) {
      if (isModal) {
        handleOnPress();
      } else {
        showModal(ModalsType.SuccessAddress, {
          closeAction: () => {
            hideModal();
            handleOnPress();
          }
        });
      }
    }
  }, [isLoadingCreateAddress]);

  useEffect(() => {
    if (!isLoadingUpdateAddress && isSuccessUpdateAddress) {
      if (isModal) {
        handleOnPress();
      } else {
        showModal(ModalsType.SuccessAddress, {
          title: ' La dirección ha sido editada con éxito.',
          closeAction: () => {
            hideModal();
            handleOnPress();
          }
        });
      }
    }
  }, [isLoadingUpdateAddress]);

  useLayoutEffect(() => {
    if (params?.firstName && !isModal) {
      navigation?.setOptions({
        headerTitle: 'Editar dirección'
      });
    }
  }, []);

  const handleOnPress = () => {
    if (isModal) {
      onAction?.();
    } else navigation.goBack();
  };

  useEffect(() => {
    if (isErrorCreateAddress) {
      handleModalError(errorCreateAddress);
    }

    if (isErrorUpdateAddress) {
      handleModalError(errorUpdateAddress);
    }
  }, [isErrorCreateAddress, isErrorUpdateAddress]);

  const handleModalError = (errorAddress: IErrorService) => {
    if (isModal) {
      setModalError({
        showModal: true,
        message: handleErrorsText(errorAddress.data.errors)
      });
    } else {
      showModal(ModalsType.IsErrorAddress, {
        hideButton: true,
        title: TEXT_ERROR,
        textContent: handleErrorsText(errorAddress.data.errors),
        textContentStyle: { marginBottom: 10 },
        buttonText: 'Vuélve a intentar',
        buttonAction: () => {
          hideModal();
        }
      });
    }
  };

  const handleChanges = (name: string, value: any) => {
    setFieldValue(name, value);
    setTimeout(() => {
      value && validateField(name);
    }, 100);
  };

  const handleOnBlur = (name: string) => {
    setTimeout(() => {
      validateField(name);
    }, 100);
  };

  return (
    <ScrollView style={[styles.container, style]}>
      <CustomKeyboardAvoidingView>
        <View style={styles.content}>
          <FormLegend
            text="Por favor complete los siguientes campos."
            subtitle="* Todos los campos son obligatorios."
          />

          <InputBase
            value={values.firstName}
            error={Object.keys(errors).includes('firstName')}
            onChangeText={(text: string) => {
              handleChanges('firstName', text);
            }}
            keyboardType="email-address"
            label="Nombre / Razón social"
            style={styles.content_inputFirst}
            maxLength={30}
            onBlur={e => {
              handleOnBlur('firstName');
            }}
          />

          <SelectInput
            testID="idType"
            styles={styles.content_selectInput}
            error={Object.keys(errors).includes('idType')}
            items={IDTYPES}
            onChange={async (text: string) => {
              handleChanges('idType', text);
            }}
            // disabled={params?.idType ? true : false}
            value={values.idType}
            label="Tipo de identificación"
            onBlur={() => {
              handleOnBlur('idType');
            }}
          />
          <InputBase
            value={values.idNumber}
            error={Object.keys(errors).includes('idNumber')}
            onChangeText={(text: string) => {
              handleChanges('idNumber', text);
            }}
            // disabled={params?.idType ? true : false}
            keyboardType={changeKeyboardNumDoc(values.idType)}
            label="Número de identificación"
            style={styles.content_input}
            maxLength={16}
            onBlur={() => {
              handleOnBlur('idNumber');
            }}
          />
          <InputBase
            value={values.line1}
            error={Object.keys(errors).includes('line1')}
            onChangeText={(text: string) => {
              handleChanges('line1', text);
            }}
            label="Dirección"
            style={styles.content_input}
            maxLength={34}
            onBlur={() => {
              handleOnBlur('line1');
            }}
          />

          <InputBase
            value={values.line2}
            error={Object.keys(errors).includes('line2')}
            onChangeText={(text: string) => {
              handleChanges('line2', text);
            }}
            label="# de casa, Mz o callejón"
            style={styles.content_input}
            maxLength={10}
            onBlur={() => {
              handleOnBlur('line2');
            }}
          />

          <View style={styles.content_contentPhone}>
            <View
              style={isModal ? styles.viewPreffixModal : styles.viewPreffix}>
              <InputBase
                value={values.phonePreffix}
                error={Object.keys(errors).includes('phonePreffix')}
                onChangeText={(text: string) => {
                  handleChanges('phonePreffix', text);
                }}
                keyboardType="phone-pad"
                label="Indicativo"
                style={[styles.content_input]}
                maxLength={2}
                onBlur={() => {
                  handleOnBlur('phonePreffix');
                }}
              />
            </View>
            <View style={isModal ? styles.viewPhoneModal : styles.viewPhone}>
              <InputBase
                value={values.phone}
                right="phone"
                error={Object.keys(errors).includes('phone')}
                onChangeText={(text: string) => {
                  handleChanges('phone', text);
                }}
                keyboardType="phone-pad"
                label="Teléfono celular"
                style={styles.content_input}
                maxLength={8}
                onBlur={() => {
                  handleOnBlur('phone');
                }}
              />
            </View>
          </View>
          <View style={[styles.content_contentButton, contentButtonsStyle]}>
            <Button
              // marginTop={140}
              backgroundColor={COLORS.BRAND}
              linkName={
                route?.params
                  ? 'EDITAR Y SEGUIR LA COMPRA'
                  : 'AGREGAR Y SEGUIR LA COMPRA'
              }
              textColor={COLORS.WHITE}
              onPress={() => {
                handledSubmit();
              }}
              showActivityIndicator={
                isLoadingCreateAddress || isLoadingUpdateAddress
              }
              disabled={
                isLoadingCreateAddress ||
                isLoadingUpdateAddress ||
                Object.keys(errors).length > 0 ||
                !values.firstName ||
                !values.idType ||
                !values.idNumber ||
                !values.line1 ||
                !values.phonePreffix ||
                !values.phone
              }
            />

            <Button
              marginTop={12}
              backgroundColor={COLORS.WHITE}
              containerStyle={{
                borderWidth: 1,
                borderColor: COLORS.DARK
              }}
              linkName="CANCELAR"
              textColor={COLORS.DARK}
              onPress={handleOnPress}
            />
          </View>
        </View>
        <ModalError
          visible={modalError?.showModal ?? false}
          textContent={modalError?.message}
          hideButton={true}
          title={TEXT_ERROR}
          showCloseButton={true}
          textContentStyle={{ marginBottom: 10 }}
          closeAction={() => setModalError(null)}
          icon={'error'}
          iconColor={COLORS.BRAND}
        />
      </CustomKeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: HEIGHT_TAB_BAR + 30
  },
  content_inputFirst: { marginTop: 14 },
  content_selectInput: { marginTop: 14 },
  content_input: { marginTop: 10 },
  content_contentPhone: { flexDirection: 'row', width: '100%' },
  content_contentButton: { marginTop: 12 },

  viewPreffixModal: { width: '34%' },
  viewPreffix: { width: '30%' },
  viewPhoneModal: { width: '66%', paddingLeft: 16 },
  viewPhone: { width: '70%', paddingLeft: 16 }
});
