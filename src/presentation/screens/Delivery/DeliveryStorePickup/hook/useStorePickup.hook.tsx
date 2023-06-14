import { useState, useEffect, useRef, RefObject, useCallback } from 'react';
import {
  useFocusEffect,
  useIsFocused,
  useRoute
} from '@react-navigation/native';
import { FormikErrors, useFormik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import {
  IPosGroup,
  IPosList,
  ISchedule,
  usePointOfService
} from '../../../../../infrastucture/apis/checkout/pickupStore';

import { IDropDown, IExpanded, IValues } from '../interfaces';
import { MapAbrvDay, storePickupValidation } from '../utils/utilsStorePickup';
import { CartData } from '../../../../../infrastucture/apis/shopping-cart';
import { useCheckoutState } from '../../../../../application/state-manager/services/checkout/useCheckout.hook';
import { NAV } from '../../../../../application/common';
import { CheckoutSteps } from '../../../../navigation/checkout';
import { DeliveryNavigationRoute } from '../../../../navigation/delivery';
import { useAppSelector } from '../../../../../application/state-manager';
import { ShoppingCartStateSelector } from '../../../../../application/state-manager/services/checkout';
import { useNavigationSummary } from '../../hooks/navigationSummary.hook';

export const STORE = 'store';
export const CITY = 'city';

export default function useStorePickup(getPointsFlag = true): StorePickupHook {
  const { onContinueButtonTrigger } = useCheckoutState();
  const route = useRoute();
  const dataCart = useAppSelector(ShoppingCartStateSelector);
  const focused = useIsFocused();
  const {
    name: currentScreen,
    params: { enableContinueButton, showActivityIndicatorContinueButton }
  } = route;

  const {
    getPickupStore,
    dataPickup,
    setSelectStore,
    isLoading,
    isLoadingSelectPOS,
    isSuccesSelectPOS
  } = usePointOfService();
  const validNavigateSummary = useNavigationSummary();
  const cityRef = useRef<SelectDropdown>(null);
  const storeRef = useRef<SelectDropdown>(null);
  const [cities, setCities] = useState<IDropDown[]>([]);
  const [stores, setStores] = useState<IDropDown[]>([]);

  const [currentStore, setCurrentStore] = useState<IPosList | null>(null);
  const [currentCity, setCurrentCity] = useState<string>('');

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [listStore, setListStore] = useState();
  const [needValidateForm, setNeedValidateForm] = useState<boolean>(false);
  const [padding, setpadding] = useState<number>(160);
  const [selectPOS, setSelectPOS] = useState({
    posCode: '',
    deliveryMethodCode: 'standard',
    retireId: '',
    retireName: ''
  });

  const {
    values,
    errors: errorsFormik,
    setFieldValue,
    isValid: isValidFormik,
    validateForm,
    resetForm
  } = useFormik({
    initialValues: {
      city: '',
      store: '',
      fullName: '',
      numID: ''
    },
    validationSchema: storePickupValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => undefined
  });

  useEffect(() => {
    if (getPointsFlag) {
      getPickupStore();
    }
  }, []);

  useEffect(() => {
    showActivityIndicatorContinueButton(isLoadingSelectPOS);
  }, [isLoadingSelectPOS]);

  useEffect(() => {
    if (isSuccesSelectPOS) {
      validNavigateSummary(route);
    }
  }, [isSuccesSelectPOS]);

  useEffect(() => {
    if (focused) {
      if (!onContinueButtonTrigger || onContinueButtonTrigger !== NAV.DELIVERY)
        return;

      if (currentScreen !== DeliveryNavigationRoute.DeliveryStorePickup) return;

      handleContinueshopping(dataCart.code);
    }
  }, [onContinueButtonTrigger, focused]);

  useEffect(() => {
    if (dataPickup?.length) setCities(getCities());
  }, [dataPickup]);

  useEffect(() => {
    if (focused) {
      const whoReceiveInPickUpHasError =
        (!!values?.fullName && !values.numID) ||
        (!values?.fullName && !!values?.numID);

      enableContinueButton(
        isValidFormik &&
          !!values.city &&
          !!values.store &&
          !isLoadingSelectPOS &&
          !whoReceiveInPickUpHasError
      );
      if (!isValidFormik) setIsExpanded(false);
    }
  }, [isValidFormik, isLoadingSelectPOS, values, focused]);

  useFocusEffect(
    useCallback(() => {
      needValidateForm && validateForm();
      !needValidateForm && setNeedValidateForm(true);
    }, [values])
  );

  const onChange = (name: string, value: string) => {
    setFieldValue(name, value);
    if (name === CITY) {
      if (stores.length && currentCity !== value) handleResetStore();

      getStores(value);
      setCurrentCity(value);
    } else {
      setSelectPOS({ ...selectPOS, posCode: value });
      handleItemStore(value);
    }
  };

  const onChangeText = (name: string, value: string) => {
    setFieldValue(name, value?.trim());
  };
  //limpia campo de tiendas
  const handleResetStore = () => {
    setStores([]);
    storeRef.current?.reset();
    setFieldValue(STORE, '');
    setCurrentStore(null);
  };
  //limpia campos select inputs ciudad y tienda
  const handleReset = () => {
    //console.log('globalValues', values)
    setNeedValidateForm(false);

    setStores([]);
    storeRef.current?.reset();
    cityRef.current?.reset();
    setStores([]);
    setCurrentStore(null);
    enableContinueButton(false);
    resetForm();
  };

  const getCities = () => {
    return dataPickup.map((city: IPosGroup) => ({
      label: city.name,
      value: city.code
    }));
  };

  const getStores = (_currentCity: string) => {
    const _stores = dataPickup.find(
      (city: IPosGroup) => city.code === _currentCity
    );
    const _listStore = _stores?.posList.map((store: IPosList) => ({
      label: store.displayName,
      value: store.name
    }));
    setListStore(_stores ?? {});
    setStores(_listStore ?? []);
  };

  const handleItemStore = (_currentStore: string) => {
    let itemStore: IPosList = listStore?.posList.find(
      (store: IPosList) => store.name === _currentStore
    );
    // itemStore.schedule = handleGroupSchedule(itemStore)
    // setCurrentStore(itemStore)
    setCurrentStore({
      ...itemStore,
      schedule: handleGroupSchedule(itemStore)
    });
  };

  const handleGroupSchedule = (item: IPosList) => {
    const newItem = item?.openingHours?.weekDayOpeningList
      .filter(x => !x.closed)
      .reduce((previous: ISchedule[], current) => {
        const index = previous.findIndex(
          time =>
            time.openingTime.hour === current.openingTime?.hour &&
            time.closingTime.hour === current.closingTime?.hour &&
            !current.closed
        );
        if (index >= 0) {
          previous[index].days.push(
            MapAbrvDay.get(current.weekDay) ?? current.weekDay
          );
        } else {
          previous.push({
            openingTime: {
              hour: current.openingTime?.hour ?? 0,
              formattedHour: current.openingTime?.formattedHour ?? ''
            },
            closingTime: {
              hour: current.closingTime?.hour ?? 0,
              formattedHour: current.closingTime?.formattedHour ?? ''
            },
            days: [MapAbrvDay.get(current.weekDay) ?? current.weekDay]
          });
        }
        return previous;
      }, []);
    //console.log('newItem', newItem)
    return newItem ?? [];
    // return (item.schedule = newItem)
  };

  const handleContinueshopping = (codeCart: string) => {
    const request = {
      cartId: codeCart,
      posCode: selectPOS.posCode,
      retireId: values.numID,
      retireName: values.fullName
    };
    if (request?.posCode) {
      setSelectStore(request);
    }
  };

  return {
    dataCart,
    //formik
    values,
    errorsFormik,
    isValidFormik,
    onChange,
    onChangeText,
    isLoading,
    //ref
    storeRef,
    cityRef,
    handleReset,
    //
    cities,
    //Store
    stores,
    currentStore,
    //
    getCities,
    setCities,
    setStores,
    //continuar compra
    handleContinueshopping,
    // disabledContinue,
    isLoadingSelectPOS,
    accordion: {
      isExpanded: isExpanded,
      setIsExpanded: setIsExpanded
    },
    padding
  };
}

interface StorePickupHook {
  dataCart: CartData;
  //formik
  values: IValues;
  isValidFormik: boolean;
  errorsFormik: FormikErrors<IValues>;
  onChange(name: string, value: string): void;
  onChangeText(name: string, value: string): void;
  isLoading: boolean;

  //ref
  storeRef: RefObject<SelectDropdown>;
  cityRef: RefObject<SelectDropdown>;
  handleReset(): void;

  cities: IDropDown[];
  stores: IDropDown[];

  currentStore: IPosList | null;

  getCities(): IDropDown[];
  setCities(x: IDropDown[]): void;
  setStores(x: IDropDown[]): void;
  //
  handleContinueshopping(cartId: string): void;
  // disabledContinue: boolean
  isLoadingSelectPOS: boolean;

  accordion: IExpanded;
  padding: number;
}
