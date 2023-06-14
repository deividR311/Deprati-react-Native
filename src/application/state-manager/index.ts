import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as Reactotron from '../../../ReactotronConfig';
import { apiMiddleware, reducer } from './services/index';

const storeSettings: ConfigureStoreOptions = {
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiMiddleware)
};

if (__DEV__) {
  storeSettings.devTools = __DEV__;
  storeSettings.enhancers = [
    composeWithDevTools(Reactotron.default?.createEnhancer())
  ];
}

const store = configureStore({
  reducer,
  devTools: storeSettings.devTools,
  enhancers: storeSettings.enhancers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiMiddleware)
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
