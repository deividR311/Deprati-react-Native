import React from 'react';
import store from '../src/application/state-manager';
import { Provider } from 'react-redux';

jest.useFakeTimers();

export const ProvideWrapper = ({ children }: any) => (
  <Provider store={store}>{children}</Provider>
);
