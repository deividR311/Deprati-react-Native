import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RootNavigation from '../../../src/presentation/navigation';
import { ProvideWrapper } from '../../../__mocks__/provider-wrapper';
import {
  NavigationContainer,
  NavigationContainerRef
} from '@react-navigation/native';
import { NAV } from '../../../src/application/common';

describe('Navigations', () => {
  let navigationRef: NavigationContainerRef | null = null;
  it('navegations correctly in dashboard', async () => {
    const { findByText, findByTestId } = render(
      <NavigationContainer
        ref={ref => {
          navigationRef = ref;
        }}>
        <RootNavigation />
      </NavigationContainer>,
      { wrapper: ProvideWrapper }
    );
    // WelcomeScreen
    await navigationRef?.navigate(NAV.WELCOME);
    const goToIniciarSesion = await findByTestId('welcome_iniciar_sesion');
    expect(goToIniciarSesion).toBeTruthy();
    //SingInScrenn
    await fireEvent.press(goToIniciarSesion);
    const thisSignIn = await findByText('Iniciar sesión con');
    expect(thisSignIn).toBeTruthy();
    // HomeScreen
    await navigationRef?.navigate(NAV.DASHBOARD_NAVIGATION);
    const thisDashboard = await findByText('Inicio');
    expect(thisDashboard).toBeTruthy();
    // FavoriteScreen
    await navigationRef?.navigate(NAV.FAVORITES);
    const thisFavorite = await findByText('Mi lista de deseos');
    expect(thisFavorite).toBeTruthy();
    //CartScreen
    await navigationRef?.navigate(NAV.CART);
    const thisCart = await findByTestId('cart_init_cart');
    expect(thisCart).toBeTruthy();
    //CreditScreen
    await navigationRef?.navigate(NAV.DASHBOARD_CREDIT);
    const thisCredit = await findByText('Crédito De Prati');
    expect(thisCredit).toBeTruthy();
    //AccountScreen
    await navigationRef?.navigate(NAV.ACCOUNT);
    const thisAccount = await findByText('Mis compras');
    expect(thisAccount).toBeTruthy();
  });

  it('navegations correctly go to Contactless Payment', async () => {
    const { findByText } = render(
      <NavigationContainer
        ref={ref => {
          navigationRef = ref;
        }}>
        <RootNavigation />
      </NavigationContainer>,
      { wrapper: ProvideWrapper }
    );
    // HomeScreen
    await navigationRef?.navigate(NAV.DASHBOARD_NAVIGATION);
    const thisDashboard = await findByText('Inicio');
    expect(thisDashboard).toBeTruthy();
  });
});
