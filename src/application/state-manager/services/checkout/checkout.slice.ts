import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { VariantType } from '../../../../infrastucture/apis/customer-orders';
import { DeliveryOptionsResponse } from '../../../../infrastucture/apis/delivery-address';
import { Cart } from '../../../../infrastucture/apis/shopping-cart';
import { CheckoutSteps } from '../../../../presentation/navigation/checkout';
import { INITIAL_STATE } from './interface';

export const checkoutChangeContinueButtonState = createAsyncThunk(
  'changeContinueButtonState',
  async (screenId: CheckoutSteps) => {
    return screenId;
  }
);

export const handleIsGiftCardCart = (dataCart: Partial<Cart>) => {
  try {
    return (
      dataCart?.entries?.some(x =>
        x?.product?.baseOptions?.some(
          base => base?.variantType === VariantType.GIFT_CARD_VARIANT_PRODUCT
        )
      ) ?? false
    );
  } catch (error) {}

  return true;
};

export const CheckoutSlice = createSlice({
  name: 'checkoutSlice',
  initialState: INITIAL_STATE,
  reducers: {
    setShowLoadingScreen(state, action: PayloadAction<boolean>) {
      state.showLoadingScreen = action.payload;
      return state;
    },
    setScreenInfo(
      state,
      action: PayloadAction<{
        screenId: CheckoutSteps;
        previous: CheckoutSteps;
      }>
    ) {
      state = { ...state, ...action.payload };
      return state;
    },
    setCartInfo(state, action: PayloadAction<Partial<Cart>>) {
      state.cart = action.payload;
      state.isGiftCardCart = handleIsGiftCardCart(action.payload);
      return state;
    },
    setPendingToRefreshCart(state, action: PayloadAction<boolean>) {
      state.needRefreshCart = action.payload;
      return state;
    },
    setPriceBeforeSelectDeliveryMode(
      state,
      action: PayloadAction<string | undefined>
    ) {
      state.totalPriceBeforeSelectDeliveryMode = action.payload;
      return state;
    },
    setDeliveryOptions(
      state,
      action: PayloadAction<DeliveryOptionsResponse | undefined>
    ) {
      state.deliveryOptions = action.payload;
      return state;
    },
    setCartCreditInfo(state, action: PayloadAction<any>) {
      state.creditInfo = action.payload;
      return state;
    },
    setPreviousScreen(state, action: PayloadAction<any>) {
      state.previousScreen = action.payload;
      return state;
    },
    setStackSummary(state, action: PayloadAction<any>) {
      state.stackSummary = action.payload;
      return state;
    },
    setfirstTimeSummary(state, action: PayloadAction<any>) {
      state.firstTimeSummary = action.payload;
      return state;
    }
  },
  extraReducers: builder => {
    builder.addCase(
      checkoutChangeContinueButtonState.pending,
      (state, action) => ({
        ...state,
        onClickedContinueButton: true,
        screenId: action.meta.arg
      })
    );
    builder.addCase(
      checkoutChangeContinueButtonState.fulfilled,
      (state, action) => ({
        ...state,
        onClickedContinueButton: false,
        screenId: undefined
      })
    );
  }
});

export const onContinueBottonToScreenStateSelector = (state: RootState) =>
  state.checkoutSlice.screenId;

export const onContinuePreviousScreenStateSelector = (state: RootState) =>
  state.checkoutSlice.previousScreen;

export const stackSummaryStateSelector = (state: RootState) =>
  state.checkoutSlice.stackSummary;

export const ShoppingCartStateSelector = (state: RootState) =>
  state.checkoutSlice.cart;

export const DeliveryStateSelector = (state: RootState) =>
  state.checkoutSlice.deliveryOptions;

export const TotalPriceBeforeSelectDeliveryModeSelector = (state: RootState) =>
  state.checkoutSlice.totalPriceBeforeSelectDeliveryMode;

export const CheckoutScreenStateSelector = (state: RootState) => ({
  loading: state.checkoutSlice.showLoadingScreen
});

export const isGiftCardCartShoppingCart = (state: RootState) =>
  state.checkoutSlice.isGiftCardCart;

export const CreditInfoSelector = (state: RootState) =>
  state.checkoutSlice.creditInfo;

export const firstTimeSummarySelector = (state: RootState) =>
  state.checkoutSlice.firstTimeSummary;

export const {
  setCartInfo,
  setShowLoadingScreen,
  setPriceBeforeSelectDeliveryMode,
  setScreenInfo,
  setPendingToRefreshCart,
  setDeliveryOptions,
  setCartCreditInfo,
  setPreviousScreen,
  setStackSummary,
  setfirstTimeSummary
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
