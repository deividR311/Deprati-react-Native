import { signUpSlice } from './signUp';
import { loadingPlpSlice, filterPlpSlice } from './plp';
import { ContactlessPaymentSlice } from './contactless-payment';
import {
  SAP_API,
  HYBRISS_API
} from '../../../infrastucture/apis/common/hybriss.api';
import { LocalStorageSlice } from './localstorage';
import { creditSlice } from './credit';
import { modalSlice } from './credit/modal.slice';
import { favoriteSlice } from './favorite/favorite.redux';
import { indicationsSlice } from './indications/indications.slice';
import { CheckoutSlice } from './checkout/checkout.slice';
import { listenerAccountSlice } from './listenerAccount/listenerAccount.redux';
import { creditBalanceSlice } from './credit/creditBalance.redux';
import { LocationGPSSlice } from './location/location.slice';
import { servicesCreditSlice } from './credit/servicesCredit.slice';
import { pdpSlice } from './pdp/pdp.slice';

export const reducer = {
  [LocalStorageSlice.name]: LocalStorageSlice.reducer,
  [LocationGPSSlice.name]: LocationGPSSlice.reducer,
  [signUpSlice.name]: signUpSlice.reducer,
  [filterPlpSlice.name]: filterPlpSlice.reducer,
  [loadingPlpSlice.name]: loadingPlpSlice.reducer,
  [creditSlice.name]: creditSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [ContactlessPaymentSlice.name]: ContactlessPaymentSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer,
  [indicationsSlice.name]: indicationsSlice.reducer,
  [CheckoutSlice.name]: CheckoutSlice.reducer,
  [listenerAccountSlice.name]: listenerAccountSlice.reducer,
  [creditBalanceSlice.name]: creditBalanceSlice.reducer,
  [servicesCreditSlice.name]: servicesCreditSlice.reducer,
  [pdpSlice.name]: pdpSlice.reducer,
  [HYBRISS_API.reducerPath]: HYBRISS_API.reducer,
  [SAP_API.reducerPath]: SAP_API.reducer
};

export const apiMiddleware = [SAP_API.middleware, HYBRISS_API.middleware];
