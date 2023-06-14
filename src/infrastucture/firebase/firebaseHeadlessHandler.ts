import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { LocalStorageKey } from '../../application/state-manager/services/localstorage';

export const firebaseHeadlessHandler = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) => {
  try {
    console.log('>>> Message handled in the background!', remoteMessage);

    const { enable_confirm_purchase_btn, order_number } =
      remoteMessage?.data ?? {};
    const _valueMappedToBool = ['true', '1'].includes(
      `${enable_confirm_purchase_btn}`.toLowerCase()
    );
    const enableContinueButtonContalessPayment: [string, string] = [
      LocalStorageKey.IsEnableConfirmPurchaseButtonInQRScreen,
      _valueMappedToBool ? 'true' : 'false'
    ];
    const orderNumberContalessPayment: [string, string] = [
      LocalStorageKey.TicketNumberContactLessPayment,
      _valueMappedToBool ? `${order_number}` : ''
    ];

    await AsyncStorage.multiSet([
      enableContinueButtonContalessPayment,
      orderNumberContalessPayment
    ]);
  } catch (error) {
    console.log(">>> ERROR: BG Notification don't save : ", error);
    return Promise.reject(error);
  }
};
