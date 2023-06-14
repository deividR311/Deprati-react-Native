import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationProp,
  TabActions,
  useNavigation
} from '@react-navigation/native';
import { TabBarNavigation } from '../../common-components/tab-bar-navigation';
import { HomeNavigation } from '../home.navigator';
import { COLORS, NAV } from '../../../application/common';
import { CreditNavigation } from '../credit';
import { AccountNavigation, AccountNavigationRoute } from '../account';
import FavoritesScreen from '../../screens/favorite/Favorites/FavoritesScreen';
import { HeaderNavigation } from '../../common-components/header/headerNav';
import useGetIndications from '../../screens/Splash/hooks/indications/useGetIndications';
import { useListenerAccount } from '../../../application/state-manager/services/listenerAccount/useListenerAccount.hook';
import { useValidContactlesspaymentHook } from '../../../infrastucture/apis/creditAccountBonding/validContactlesspayment.hook';
import { useLocalStorage } from '../../../application/state-manager/services/localstorage';
import { ContactlessPaymentNavigator } from '../contactless-payment';
import LoginBottomSheet from '../../common-components/LoginBottomSheet';
import { useContactlessPaymentState } from '../../../application/state-manager/services/contactless-payment/useContactlessPayment.hook';
import { LABEL_TAB } from '../../../application/utils';
import { TabIcon } from '../../common-components/tabIcon';

export type HomeNavigationProps = {
  [NAV.DASHBOARD_INICIO]: {
    relatedAction: false;
  };
  [NAV.FAVORITES]: undefined;
  [NAV.DASHBOARD_CREDIT]: undefined;
  [NAV.ACCOUNT]: undefined;
};

const Tab = createBottomTabNavigator<HomeNavigationProps>();

export const DashboardNavigation = () => {
  const {
    localStorageData: { IS_LOGIN, IS_ACCOUNT_AUTHENTICATED }
  } = useLocalStorage();

  const indications = useGetIndications();

  const {
    showIdentityValidation: setShowLoginBottomSheet,
    identityValidationIsOpen: showLoginBottomSheet
  } = useContactlessPaymentState();

  const { isComesFromPaying, onIsComesFromPaying } = useListenerAccount();

  const _navigation = useNavigation();

  const StackListener = ({
    navigation
  }: {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
  }) => ({
    tabPress: (e: React.TouchEvent) => {
      e.preventDefault();
      const navGoTo = handleJumpTo(e.target);
      if (navGoTo === NAV.CONTACTLESS_PAYMENT) {
        handleJumpToContaclessPayment(navigation, navGoTo);
      } else if (!IS_LOGIN && navGoTo !== NAV.ACCOUNT) {
        navigation.navigate(NAV.AUTH_NAVIGATION, {
          screen: NAV.SIGNIN,
          params: { navGoToSuccess: navGoTo }
        });
      } else {
        navigation.dispatch(
          TabActions.jumpTo(navGoTo, handleJumpScreen(navGoTo))
        );
      }
    }
  });

  const StackCreditListener = ({
    navigation
  }: {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
  }) => ({
    tabPress: (e: React.TouchEvent) => {
      e.preventDefault();
      const navGoTo = handleJumpTo(e.target);
      if (!IS_ACCOUNT_AUTHENTICATED) {
        navigation.navigate(NAV.DASHBOARD_CREDIT, {
          screen: NAV.CREDIT_SCREEN
        });
      } else {
        navigation.dispatch(
          TabActions.jumpTo(navGoTo, handleJumpScreen(navGoTo))
        );
      }
    }
  });

  const handleJumpTo = (targetPress: EventTarget): string => {
    let navTo = '';
    const target = targetPress.toString();

    if (target.indexOf(NAV.FAVORITES) === 0) navTo = NAV.FAVORITES;
    else if (target.indexOf(NAV.ACCOUNT) === 0) navTo = NAV.ACCOUNT;
    else if (target.indexOf(NAV.DASHBOARD_CREDIT) === 0)
      navTo = NAV.DASHBOARD_CREDIT;
    else if (target.indexOf(NAV.CONTACTLESS_PAYMENT) === 0)
      navTo = NAV.CONTACTLESS_PAYMENT;
    return navTo;
  };

  const handleJumpScreen = (nav: string) => {
    if (nav === NAV.ACCOUNT) {
      if (isComesFromPaying) {
        onIsComesFromPaying(false);
        return { screen: AccountNavigationRoute.Home };
      }
    }
    return {};
  };

  const handleJumpToContaclessPayment = (
    navigation: NavigationProp<ReactNavigation.RootParamList>,
    route: string
  ) => {
    if (!IS_LOGIN) {
      navigation.navigate(
        NAV.AUTH_NAVIGATION as never,
        {
          screen: NAV.SIGNIN,
          params: { navGoToSuccess: route }
        } as never
      );
      return;
    }
    setShowLoginBottomSheet(true);
  };

  const { validVinculation } = useValidContactlesspaymentHook();

  React.useEffect(() => {
    IS_LOGIN && validVinculation();
  }, [IS_LOGIN]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <>
        <Tab.Navigator
          detachInactiveScreens={true}
          screenOptions={{
            headerShadowVisible: false,
            tabBarAllowFontScaling: false,
            tabBarHideOnKeyboard: true,
            headerTitleAllowFontScaling: false,
            headerShown: true,
            header: (props: NativeStackHeaderProps) => (
              <HeaderNavigation {...props} />
            )
          }}
          tabBar={props => <TabBarNavigation {...props} />}>
          <Tab.Screen
            name={NAV.DASHBOARD_INICIO}
            options={{
              headerShown: false,
              title: LABEL_TAB.HOME,
              tabBarIcon: props => (
                <TabIcon focused={props.focused} nameIcon={LABEL_TAB.HOME} />
              )
            }}
            component={HomeNavigation}
          />
          <Tab.Screen
            name={NAV.FAVORITES as never}
            options={{
              title: LABEL_TAB.FAVORITES,
              tabBarIcon: props => (
                <TabIcon
                  score={indications.favorities}
                  focused={props.focused}
                  nameIcon={LABEL_TAB.FAVORITES}
                />
              )
            }}
            component={FavoritesScreen}
            listeners={StackListener}
          />
          <Tab.Screen
            name={NAV.CONTACTLESS_PAYMENT as never}
            options={{
              title: LABEL_TAB.CONTACTLESSPAYMENT,
              headerTitle: LABEL_TAB.CONTACTLESSPAYMENT,
              tabBarIcon: props => (
                <TabIcon
                  focused={props.focused}
                  nameIcon={LABEL_TAB.CONTACTLESSPAYMENT}
                />
              )
            }}
            component={ContactlessPaymentNavigator}
            listeners={StackListener}
          />
          <Tab.Screen
            name={NAV.DASHBOARD_CREDIT}
            options={{
              title: LABEL_TAB.CREDIT,
              headerShown: false,
              headerTitle: LABEL_TAB.CREDITPRATI,
              tabBarIcon: props => (
                <TabIcon focused={props.focused} nameIcon={LABEL_TAB.CREDIT} />
              )
            }}
            component={CreditNavigation}
            listeners={StackCreditListener}
          />
          <Tab.Screen
            name={NAV.ACCOUNT}
            options={{
              title: LABEL_TAB.MYACCOUNT,
              headerTitle: LABEL_TAB.MYACCOUNT,
              tabBarHideOnKeyboard: true,
              headerShown: false,
              tabBarIcon: props => (
                <TabIcon
                  score={indications.notifications}
                  focused={props.focused}
                  nameIcon={LABEL_TAB.MYACCOUNT}
                />
              )
            }}
            component={AccountNavigation}
            listeners={StackListener}
          />
        </Tab.Navigator>
        <LoginBottomSheet
          show={showLoginBottomSheet}
          onRequestClose={success => {
            if (success && showLoginBottomSheet) {
              setShowLoginBottomSheet(false);
              _navigation.navigate(NAV.CONTACTLESS_PAYMENT as never);
            } else {
              setShowLoginBottomSheet(false);
            }
          }}
        />
      </>
    </SafeAreaView>
  );
};
