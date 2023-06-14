import React, { useCallback, useEffect, useState } from 'react';
import { NativeModules, Platform } from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useRoute
} from '@react-navigation/native';
import { IAddressPayment, IChangeAddress } from './components';
import { LocalStorageKey } from '../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage/useLocalStorage';
import {
  AddressPaymentDto,
  useDeleteAddressMutation
} from '../../../infrastucture/apis/address';
import AdressPaymentForm from '../../screens/account/MyAddress/AdressPaymentForm';
import {
  ListAddressPayment,
  useAddressPayment
} from '../../screens/account/MyAddress/hooks/useAddressPayment.hook';
import { ModalsType } from '../modal/modal.interfaces';
import { useGenericModal } from '../modal/ModalProvider';
import { usePaymentAddressRequest } from '../../../infrastucture/apis/checkout/payments/addressPayment';
import { CheckoutSteps } from '../../navigation/checkout';
import { BasicAddress } from '../../../infrastucture/apis/customer-orders/interfaces/customer-order-detail.type';
import {
  useAppDispatch,
  useAppSelector
} from '../../../application/state-manager';
import {
  setShowLoadingScreen,
  ShoppingCartStateSelector
} from '../../../application/state-manager/services/checkout';
const TEXT_ADDRESSPAYMENT = 'dirección de facturación';
const TEXT_ADDRESS_ADD = `Nueva ${TEXT_ADDRESSPAYMENT}`;
const TEXT_ADDRESS_EDIT = `Editar ${TEXT_ADDRESSPAYMENT}`;

export const useBillingAddress = ({
  handleEnableButton,
  onChangeLoadingState = () => undefined,
  paymentAddress = undefined
}: BillingAddressProps = {}): BillingAddressHook => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { StatusBarManager } = NativeModules;
  const dataCart = useAppSelector(ShoppingCartStateSelector);
  const {
    name: currentScreen,
    params: {
      cartId,
      enableContinueButton,
      showActivityIndicatorContinueButton
    }
  } = route;

  const {
    localStorageData: { [LocalStorageKey.UserEmail]: USER_EMAIL }
  } = useLocalStorage();

  const { hideModal, showModal } = useGenericModal();
  const [deleteAddress, { isLoading: isLoadingByDeleting }] =
    useDeleteAddressMutation();

  const { addressPaymentList, isLoadingAddressPaymentList } =
    useAddressPayment();

  const {
    setPaymentAddress,
    isErrorPaymentAddress,
    isLoadingPaymentAddress,
    isSuccessPaymentAddress
  } = usePaymentAddressRequest();

  const [addressSelected, setAddressSelected] = useState<AddressPaymentDto>();
  const [buttonChangeData, setButtonChangeData] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoadingAddressPaymentList) {
      if (addressPaymentList.existsAddress)
        handleAddressSelected(addressPaymentList);
      else setAddressSelected(undefined);
    }
  }, [addressPaymentList, isLoadingAddressPaymentList]);

  const setLoadPayment = async () => {
    if (!addressSelected) return;
    dispatch(setShowLoadingScreen(true));
    await setPaymentAddress(cartId ?? dataCart?.code, addressSelected.id);
    setTimeout(() => {
      dispatch(setShowLoadingScreen(false));
    }, 500);
  };

  useEffect(() => {
    setLoadPayment();
  }, [addressSelected]);

  const focused = useIsFocused();
  useEffect(() => {
    if (currentScreen !== CheckoutSteps.PurchaseConfirmation && focused) {
      if (!isLoadingPaymentAddress && isSuccessPaymentAddress) {
        handleEnableButton && enableContinueButton(isSuccessPaymentAddress);
      }
      if (isLoadingPaymentAddress) {
        handleEnableButton && enableContinueButton(false);
      }
      handleEnableButton &&
        showActivityIndicatorContinueButton(isLoadingPaymentAddress);
      onChangeLoadingState?.(isLoadingPaymentAddress);
    }
  }, [isLoadingPaymentAddress]);

  useEffect(() => {
    if (handleEnableButton && isErrorPaymentAddress)
      enableContinueButton(false);
  }, [isErrorPaymentAddress]);

  const handleAddressSelected = (res: ListAddressPayment) => {
    if (paymentAddress) {
      setAddressSelected(paymentAddress);
    } else if (res.default) setAddressSelected(res.default);
    else if (res.others?.length) setAddressSelected(res?.others[0]);
  };

  const handleSelected = (item: IAddressPayment) => {
    //setButtonChangeData(true)
    setAddressSelected(item);
  };

  const handleChangeData = () => {
    setButtonChangeData(!buttonChangeData);
  };

  const handleBillingAddressList = () => {
    if (addressPaymentList?.others?.length) {
      if (addressPaymentList.default)
        return [addressPaymentList.default].concat(addressPaymentList?.others);
      return addressPaymentList.others;
    }
    return [addressSelected];
  };

  const handleDelete = (idItem: string) => {
    showModal(ModalsType.DeleteAddress, {
      buttonAction: () => {
        deleteAddress({ id: idItem, username: USER_EMAIL });
        hideModal();
        setAddressSelected(undefined);
      }
    });
  };

  const handleAddEdit = (isEdit: boolean, item?: IAddressPayment) => {
    const _route = { params: { inforAddress: item } };

    showModal(ModalsType.AddressPaymentModal, {
      title: isEdit ? TEXT_ADDRESS_EDIT : TEXT_ADDRESS_ADD,
      containerStyle: {
        marginTop: Platform.OS === 'ios' ? StatusBarManager.HEIGHT : 0
      },
      textComponent: () => (
        <AdressPaymentForm
          isModal={true}
          style={{ marginHorizontal: -20 }}
          contentButtonsStyle={{ marginTop: 0 }}
          route={isEdit ? _route : {}}
          onAction={() => {
            hideModal();
          }}
        />
      )
    });
  };
  return {
    addressSelected,
    isLoadingByDeleting,

    addressPaymentList,
    isLoading: isLoadingAddressPaymentList,

    buttonChangeData,
    handleChangeData,

    changeAddress: {
      handleSelected,
      addressSelected
    },

    handleDelete,
    handleAddEdit,

    handleBillingAddressList
  };
};

interface BillingAddressProps {
  handleEnableButton?: boolean;
  onChangeLoadingState?(state: boolean): void;
  paymentAddress?: BasicAddress;
}

interface BillingAddressHook {
  addressSelected: IAddressPayment;
  isLoadingByDeleting: boolean;
  addressPaymentList: ListAddressPayment;
  isLoading: boolean;

  buttonChangeData: boolean;
  handleChangeData(): void;
  changeAddress: IChangeAddress;
  handleDelete(idItem: string): void;
  handleAddEdit(isEdit: boolean, item?: IAddressPayment): void;

  handleBillingAddressList(): IAddressPayment[];
}

export default useBillingAddress;
