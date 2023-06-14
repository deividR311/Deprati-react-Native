import React, { useRef, FC, useMemo, useEffect } from 'react';
import { Text, View } from 'react-native';
import InfoStoreComponent from '../DeliveryStorePickup/components/InfoStoreComponent';
import InfoPersonalComponent from '../DeliveryStorePickup/components/InfoPersonalComponent';
import SelectInput from '../../../common-components/inputs/SelectInput';
import { ButtonOutlined } from '../../../common-components/buttons/Button';
import { styles } from '../DeliveryStorePickup/StorePickup.StyleSheet';
import { useFormHandler } from '../../../../application/common/hooksCommons/useFormHandler';
import { storePickupValidation } from '../DeliveryStorePickup/utils/utilsStorePickup';
import SelectDropdown from 'react-native-select-dropdown';
import { IPosGroup as PointOfServicesInCity } from '../../../../infrastucture/apis/checkout/pickupStore';

export const StorePickupComponent: FC<Props> = ({
  onChangeFieldsFormStorePickup,
  onError,
  pointOfServices = [],
  storePickupData = {
    city: '',
    fullName: '',
    numID: '',
    store: ''
  }
}) => {
  const {
    formValues,
    formErrors,
    setState,
    setField,
    setFieldError,
    clearFieldError
  } = useFormHandler<FormStorePickup>({
    initialValues: {
      city: storePickupData.city,
      store: storePickupData.store,
      fullName: storePickupData.fullName,
      numID: storePickupData.numID
    },
    validationSchema: storePickupValidation
  });
  const { city, store, fullName, numID } = formValues;
  const cityRef = useRef<SelectDropdown>(null);
  const storeRef = useRef<SelectDropdown>(null);

  const cities = useMemo(() => {
    return pointOfServices.map(({ code: value, name: label }) => ({
      value,
      label
    }));
  }, [pointOfServices]);

  const stores = useMemo(() => {
    return (
      pointOfServices
        .find(p => p.code === city)
        ?.posList.map(({ name: value, displayName: label }) => ({
          value,
          label
        })) || []
    );
  }, [pointOfServices, city]);

  const pointOfServiceSelected = useMemo(() => {
    for (const posInCity of pointOfServices) {
      const _store = posInCity.posList.find(pos => pos.name === store);
      if (_store) return _store;
    }
  }, [pointOfServices, store]);

  const onResetForm = () => {
    setState({
      city: '',
      fullName: '',
      numID: '',
      store: ''
    });
    onChangeFieldsFormStorePickup?.(undefined);
    storeRef.current?.reset();
    cityRef.current?.reset();
    storeRef?.current?.reset();
  };

  useEffect(() => {
    const hasSameStore = pointOfServices
      .find(p => p.code === city)
      ?.posList.some(pl => pl.name === formValues.store);
    const state = hasSameStore ? formValues : { ...formValues, store: '' };
    setState(state);
    if (!hasSameStore) {
      storeRef?.current?.reset();
    }
  }, [city]);

  useEffect(() => {
    if (!formErrors.fullName && !formErrors.numID) {
      clearFieldError('fullName');
      clearFieldError('numID');
    }
    onChangeFieldsFormStorePickup?.(formValues);
  }, [city, store, fullName, numID, formValues]);

  useEffect(() => {
    const hasErrors = Object.values(formErrors ?? {}).some(e => e);
    onError?.(hasErrors);
  }, [formErrors]);

  return (
    <View style={styles.content}>
      <View style={styles.contentTitle}>
        <Text style={styles.title}>Elige la tienda más cercana para ti.</Text>
      </View>
      <View>
        <SelectInput
          testID={'deliverythirdparty_city'}
          selectRef={cityRef}
          styles={styles.inputCity}
          items={cities}
          error={!!formErrors.city}
          onChange={(text: string) => setField('city', text)}
          value={city}
          label="Selecciona ciudad"
        />
        <SelectInput
          testID={'deliverythirdparty_store'}
          selectRef={storeRef}
          styles={styles.inputStore}
          error={!!formErrors.store}
          items={stores}
          onChange={(text: string) => setField('store', text)}
          value={store}
          label="Selecciona la tienda"
        />
        {!pointOfServiceSelected && (
          <ButtonOutlined
            title="LIMPIAR"
            style={{
              ...styles.buttonClean,
              width: 180,
              marginVertical: 14
            }}
            onPress={onResetForm}
          />
        )}
        {!!pointOfServiceSelected && (
          <>
            <InfoStoreComponent store={pointOfServiceSelected} />
            <View style={styles.contentButton}>
              <ButtonOutlined
                title="LIMPIAR"
                style={styles.buttonClean}
                onPress={onResetForm}
              />
            </View>
            <InfoPersonalComponent
              values={formValues}
              onChangeText={(fieldName, fieldValue) =>
                setField(fieldName, fieldValue?.trim())
              }
              errors={{}}
              // errors={formErrors as any}
              onError={errors => {
                console.log('>>> Informacion Personal Errors: ', errors);
                // if (errors.fullName) setFieldError('fullName', '')
                // if (errors.numID) setFieldError('numID', '')
                // if (!errors.fullName && !errors.numID) {
                //   clearFieldError('fullName')
                //   clearFieldError('numID')
                // }
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

interface Props {
  pointOfServices: PointOfServicesInCity[];
  storePickupData?: FormStorePickup;
  onChangeFieldsFormStorePickup?: (fields?: FormStorePickup) => void;
  onError?: (hasError: boolean) => void;
}

export interface FormStorePickup {
  city: string;
  store: string;
  fullName: string;
  numID: string;
}

export default StorePickupComponent;
