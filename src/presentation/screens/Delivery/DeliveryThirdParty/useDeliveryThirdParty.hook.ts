import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';
import {
  useGetCitiesMutation,
  useGetProvincesMutation,
  useGetThirdPartyAgenciesListMutation,
  useSelectThirdPartyAgencyMutation,
  useUpdateThirdPartyAgencyMutation
} from '../../../../infrastucture/apis/delivery-thirdparty';
import { deliveryThirdPartyValidation } from './deliveryThirdParty.validations';
import SelectDropdown from 'react-native-select-dropdown';
import { handleGroupSchedule } from '../utils/groupSchedule';
import { useCheckoutState } from '../../../../application/state-manager/services/checkout/useCheckout.hook';
import { NAV } from '../../../../application/common';
import { CheckoutSteps } from '../../../navigation/checkout';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import { useFormHandler } from '../../../../application/common/hooksCommons/useFormHandler';
import { useAppDispatch } from '../../../../application/state-manager';
import { useLazyGetShoppingCartRequest } from '../../../../infrastucture/apis/shopping-cart';
import {
  setCartInfo,
  setShowLoadingScreen
} from '../../../../application/state-manager/services/checkout';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import sleep from '../../../../application/utils/sleep';
import { useNavigationSummary } from '../hooks/navigationSummary.hook';

export const useDeliveryThirdParty = (): InfoHook => {
  const route = useRoute();
  const focused = useIsFocused();
  const { showModal } = useGenericModal();
  const { onContinueButtonTrigger } = useCheckoutState();
  const { cartId, enableContinueButton, showActivityIndicatorContinueButton } =
    route.params;
  const validNavigateSummary = useNavigationSummary();
  const [loading, setLoading] = useState<boolean>(true);
  const provinceRef = useRef<SelectDropdown>(null);
  const cityRef = useRef<SelectDropdown>(null);
  const agencyRef = useRef<SelectDropdown>(null);
  const pointOfServiceRef = useRef<SelectDropdown>(null);

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: username }
  } = useLocalStorage();

  const dispatch = useAppDispatch();

  const {
    formErrors,
    formValues,
    setField,
    setFieldError,
    clearField,
    setState,
    resetForm
  } = useFormHandler({
    initialValues: {
      agency: '',
      agencyName: '',
      city: '',
      pointOfService: '',
      province: '',
      retireName: '',
      retirePhone: '',
      retireId: ''
    },
    validationSchema: deliveryThirdPartyValidation
  });

  const [
    _selectThirdPartyAgency,
    { data: dataItemsDelivery, isLoading: isLoadingSelectThirdParty }
  ] = useSelectThirdPartyAgencyMutation();

  const [getShoppingCart] = useLazyGetShoppingCartRequest();

  const [
    _updateAgency,
    { isSuccess: isSuccessUpdateAgency, isLoading: isLoadingUpdateAgency }
  ] = useUpdateThirdPartyAgencyMutation();

  const [
    _getProvinces,
    {
      data: dataProvinces,
      isSuccess: isSuccessProvinces,
      isLoading: isLoadingProvinces
    }
  ] = useGetProvincesMutation();

  const [
    _getCities,
    { data: dataCities, isSuccess: isSuccessCities, isLoading: isLoadingCities }
  ] = useGetCitiesMutation();

  const [
    _getThirdPartyAgencies,
    {
      data: dataThirdPartyAgencies,
      isSuccess: isSuccessThirdPartyAgencies,
      isLoading: isLoadingThirdPartyAgencies
    }
  ] = useGetThirdPartyAgenciesListMutation();

  const provincesList = useMemo(() => {
    if (!isLoadingProvinces && isSuccessProvinces) {
      setLoading(isLoadingProvinces);
      return dataProvinces?.regions ?? [];
    }
    return [];
  }, [isLoadingProvinces]);

  const citiesList = useMemo(() => {
    if (!isLoadingCities && isSuccessCities) {
      return dataCities?.regions ?? [];
    }
    return [];
  }, [isLoadingCities]);

  const thirdPartyAgenciesList = useMemo(() => {
    if (!isLoadingThirdPartyAgencies && isSuccessThirdPartyAgencies) {
      return dataThirdPartyAgencies?.posGroups ?? [];
    }
    return [];
  }, [isLoadingThirdPartyAgencies]);

  const thirdPartyAgenciesBranchList = useMemo(() => {
    if (formValues?.agency && thirdPartyAgenciesList?.length > 0) {
      const agency = thirdPartyAgenciesList?.find(
        a => a.code === formValues?.agency
      );
      return agency?.posList ?? [];
    }
    return [];
  }, [formValues?.agency, thirdPartyAgenciesList]);

  const doSubmit = async values => {
    showActivityIndicatorContinueButton(true);
    await _updateAgency({ ...values, cartId });
  };

  const getCitiesLoad = useCallback(
    async option => {
      if (option?.isocode === formValues?.province || !option?.isocode) return;
      _getCities({ provinceCode: option?.isocode });
      setState({
        province: option?.isocode,
        city: undefined,
        agency: undefined,
        agencyName: undefined,
        pointOfService: undefined
      });
      cityRef?.current?.reset();
      agencyRef.current?.reset();
      pointOfServiceRef.current?.reset();
    },
    [formValues]
  );

  const thirdPartyAgenciesLoad = useCallback(
    async option => {
      if (option?.isocode === formValues?.city) return;
      agencyRef?.current?.reset();
      pointOfServiceRef.current?.reset();
      setState({
        agency: undefined,
        agencyName: undefined,
        pointOfService: undefined,
        city: option?.isocode ? option?.isocode : formValues.city
      });
      if (!option?.isocode) return;
      _getThirdPartyAgencies({ cityCode: option?.isocode, fields: 'FULL' });
    },
    [formValues]
  );

  const setAgencyData = useCallback(
    ({ code, name }: any) => {
      pointOfServiceRef?.current?.reset();
      setState({
        agency: code,
        agencyName: name,
        pointOfService: undefined
      });
    },
    [formValues]
  );

  const getDeliveryItemsLoad = useCallback(
    async (posCode: string) => {
      dispatch(setShowLoadingScreen(true));
      await _selectThirdPartyAgency({ cartId, posCode });
      const { data, error } = await getShoppingCart({ username });
      if (data) dispatch(setCartInfo(data));
      dispatch(setShowLoadingScreen(false));
    },
    [cartId, formValues?.pointOfService]
  );

  const deliveryBranchData = useMemo(() => {
    if (formValues?.pointOfService) {
      const pointOfService = thirdPartyAgenciesBranchList?.find(
        a => a.name === formValues?.pointOfService
      );
      const schedule = handleGroupSchedule(pointOfService);
      getDeliveryItemsLoad(formValues.pointOfService);
      return { ...pointOfService, schedule };
    }
    return {};
  }, [formValues?.pointOfService, thirdPartyAgenciesBranchList]);

  useEffect(() => {
    _getProvinces();
  }, []);

  useEffect(() => {
    if (!isLoadingUpdateAgency && isSuccessUpdateAgency) {
      validNavigateSummary(route);
    }
    showActivityIndicatorContinueButton(isLoadingUpdateAgency);
  }, [isLoadingUpdateAgency]);

  useEffect(() => {
    if (focused) {
      if (!onContinueButtonTrigger || onContinueButtonTrigger !== NAV.DELIVERY)
        return;

      handleNextStep();
    }
  }, [onContinueButtonTrigger, focused]);

  useEffect(() => {
    if (
      !isLoadingSelectThirdParty &&
      dataItemsDelivery?.productsShippingDisabled
    ) {
      sleep(600).then(() => {
        showModal(ModalsType.ErrorService, {
          title:
            'La ciudad seleccionada no tiene cobertura. Ingrese una nueva ciudad destino.'
        });
        setState({
          pointOfService: undefined
        });
        pointOfServiceRef.current?.reset();
      });
    }
  }, [dataItemsDelivery, isLoadingSelectThirdParty]);

  useEffect(() => {
    showActivityIndicatorContinueButton(isLoadingUpdateAgency);

    if (isLoadingUpdateAgency) return;

    const validateForm =
      formValues.retireId && formValues.retireName && formValues.retirePhone;
    const hasErrors = Object.values(formErrors).some(v => v);
    if (focused) {
      enableContinueButton(
        validateForm &&
          !hasErrors &&
          formValues?.pointOfService &&
          !isLoadingSelectThirdParty &&
          !dataItemsDelivery?.productsShippingDisabled
      );
    }
  }, [
    formErrors,
    formValues,
    dataItemsDelivery,
    isLoadingSelectThirdParty,
    focused
  ]);

  const handleNextStep = async () => {
    const hasErrors = Object.values(formErrors).some(v => v);
    if (!hasErrors) {
      doSubmit(formValues);
    } else {
      enableContinueButton(false);
    }
  };

  const handleReset = () => {
    provinceRef.current?.reset();
    cityRef.current?.reset();
    agencyRef.current?.reset();
    pointOfServiceRef.current?.reset();
    resetForm();
  };

  return {
    //list data
    provincesList,
    citiesList,
    getCitiesLoad,
    thirdPartyAgenciesList,
    thirdPartyAgenciesLoad,
    setAgencyData,
    thirdPartyAgenciesBranchList,
    deliveryBranchData,
    isLoadingUpdateAgency,
    dataItemsDelivery,
    // form data
    values: formValues,
    errors: formErrors,
    setFieldValue: setField,
    setFieldError,
    handleReset,
    //states
    loading,
    //ref
    provinceRef,
    cityRef,
    agencyRef,
    pointOfServiceRef
  };
};

export interface InfoHook {
  //list data
  provincesList: any;
  citiesList: any;
  getCitiesLoad: (option: any) => void;
  thirdPartyAgenciesList: any;
  thirdPartyAgenciesLoad: (option: any) => void;
  thirdPartyAgenciesBranchList: any;
  deliveryBranchData: any;
  isLoadingUpdateAgency: boolean;
  dataItemsDelivery: any;
  // form data
  handleReset: () => void;
  values: any;
  errors: any;
  setFieldValue: any;
  loading: boolean;
  error: boolean;
}
