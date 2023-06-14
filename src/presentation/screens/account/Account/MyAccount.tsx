import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../../../application/common/colors';
import {
  FontStyles,
  FONTS_FAMILY,
  FONTS_SIZES
} from '../../../../application/common/fonts';
import { NAV } from '../../../../application/common/namesNav';
import { loadIndications } from '../../../../application/state-manager/services/indications/indications.slice';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { Badge } from '../../../common-components/badge';
import { Popup } from '../../../common-components/poppup';
import { AccountNavigationRoute } from '../../../navigation/account';
import useGetIndications from '../../Splash/hooks/indications/useGetIndications';
import ModalPassword from '../../../common-components/moda-password/ModalPassWord';
import { useGenericModal } from '../../../common-components/modal/ModalProvider';
import { ModalsType } from '../../../common-components/modal/modal.interfaces';
import { clearCreditInfo } from '../../../../application/state-manager/services/credit';
import { USER_DEFAULT_DATA } from '../../../../infrastucture/apis/user/user.interface';
import TemplatePage from '../../../common-components/template-page';
import { setCartInfo } from '../../../../application/state-manager/services/checkout';
import { useEmmaSdk } from '../../../../infrastucture/native-modules/emma';
import ButtonSession from './ButtonSession';

export default function MyAccount() {
  const navigation = useNavigation();
  const [showModalLocal, setshowModalLocal] = useState(false);
  const [showModaPassword, setShowModaPassword] = useState<boolean>(false);

  useEmmaSdk({});

  const {
    localStorageData: {
      [LocalStorageKey.IsLogin]: IS_LOGIN,
      [LocalStorageKey.User]: UserData
    },
    save: saveInLocalStoarge
  } = useLocalStorage();

  const dispatch = useDispatch();
  const indications = useGetIndications();
  const { hideModal, showModal: globalShowModal } = useGenericModal();

  ///funcion mostrar modalLogin
  const handleShowLogin = (item: any, link: string) => {
    globalShowModal(ModalsType.LoginModal, {
      buttonAction: () => {
        if (item?.actionLink) {
          item.actionLink();
          hideModal();
          return;
        }

        if (!link?.startsWith('https://')) {
          navigation.navigate(link as never);
          hideModal();
          return;
        }
      }
    });
  };

  const onLinkPreguntasFrecuentes = () =>
    Linking.openURL(`https://www.deprati.com.ec/PreguntasFrecuentes`);

  const data = [
    {
      title: 'Mis compras',
      link: AccountNavigationRoute.Orders,
      isLoggedIn: true
    },
    {
      title: 'Mis notificaciones',
      link: AccountNavigationRoute.Notifications,
      isLoggedIn: true
    },
    {
      title: 'Mis direcciones',
      link: AccountNavigationRoute.AddressDelivery,
      isLoggedIn: true
    },

    {
      title: 'Mis reclamos',
      link: AccountNavigationRoute.SupportTickets,
      isLoggedIn: true
    },
    {
      title: 'Mis devoluciones',
      link: AccountNavigationRoute.MyReturns,
      isLoggedIn: true
    },
    {
      title: 'Mis datos',
      link: AccountNavigationRoute.MyData,
      isLoggedIn: true
    },
    {
      title: 'Cambio de contraseña',
      link: '',
      actionLink: () => {
        setShowModaPassword(true);
      },
      isLoggedIn: true
    },
    {
      title: 'Preguntas frecuentes',
      link: '',
      actionLink: () => {
        onLinkPreguntasFrecuentes();
      },
      isLoggedIn: false
    },

    {
      title: 'Servicio al cliente',
      link: AccountNavigationRoute.CostumerService,
      isLoggedIn: false
    },
    {
      title: 'Encuentra la tienda más cercana',
      link: AccountNavigationRoute.StoresList,
      isLoggedIn: false
    }
  ];

  const logOut = async () => {
    setshowModalLocal(false);
    saveInLocalStoarge({
      // User Session
      [LocalStorageKey.Token]: '',
      [LocalStorageKey.RefreshToken]: '',
      [LocalStorageKey.UserEmail]: '',
      [LocalStorageKey.ExpiresIn]: 0,
      [LocalStorageKey.ExpiresAt]: '',
      [LocalStorageKey.User]: USER_DEFAULT_DATA,
      [LocalStorageKey.IsLogin]: false,
      // Shopping Cart
      [LocalStorageKey.AnonymousCartGuid]: '',
      // Contactless Payment
      [LocalStorageKey.IsEnableConfirmPurchaseButtonInQRScreen]: false,
      [LocalStorageKey.TicketNumberContactLessPayment]: '',
      // Credit Session
      [LocalStorageKey.LastCustomerId]: UserData.customerId
    });
    dispatch(setCartInfo({}));
    dispatch(clearCreditInfo());
    dispatch(
      loadIndications({
        notifications: 0,
        cart: 0,
        favorities: 0
      })
    );
    /* navigation.navigate(NAV.DASHBOARD_INICIO, {
      screen: NAV.LOADINGLOGOUT as never,
    }) */
    navigation.navigate(NAV.SPLASH as never);
  };

  const handledNav = async () => {
    IS_LOGIN
      ? setshowModalLocal(true)
      : navigation.navigate(NAV.AUTH_NAVIGATION as never);
  };

  return (
    <TemplatePage loading={false}>
      <View style={{ paddingBottom: 80 }}>
        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              if (!IS_LOGIN || !UserData?.firstName)
                return (
                  <ButtonSession isLogin={IS_LOGIN} onPress={handledNav} />
                );

              const message_welcome =
                UserData?.genderCode === 'FEMALE' ? 'Bienvenida' : 'Bienvenido';
              return (
                <View style={styles.welcome}>
                  <Text style={styles.welcome_text}>
                    ¡{message_welcome}&nbsp;
                    <Text style={styles.welcome_text_bold}>
                      {UserData?.firstName?.trim()}!
                    </Text>
                  </Text>
                </View>
              );
            }}
            renderItem={({ item }) => {
              const goTo = (link: string) => {
                if (!IS_LOGIN && item?.isLoggedIn) {
                  handleShowLogin(item, link);
                } else {
                  if (link === null) return;
                  if (item?.actionLink) {
                    item.actionLink();
                    return;
                  }

                  if (!link?.startsWith('https://')) {
                    navigation.navigate(link as never);
                  }
                }
              };
              return (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => goTo(item?.link)}>
                    <View style={styles.item_container}>
                      <Text
                        style={{
                          fontSize: FONTS_SIZES.subtitle1,
                          color: COLORS.DARK,
                          fontFamily: FONTS_FAMILY.Roboto
                        }}>
                        {item.title}
                      </Text>
                      <View>
                        {item.title === 'Mis notificaciones' &&
                        indications.notifications > 0 ? (
                          <Badge
                            style={styles.badget}
                            score={indications.notifications}
                          />
                        ) : (
                          <Icon name="arrow-forward-ios" size={15} />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
            ListFooterComponent={
              <>
                <LinearGradient
                  colors={['#FFFFFF01', '#FFFFFF20', '#0000001A']}
                  style={styles.gradient}
                />
                {IS_LOGIN && (
                  <ButtonSession isLogin={IS_LOGIN} onPress={handledNav} />
                )}
              </>
            }
          />
        </View>

        <Popup
          visible={showModalLocal}
          iconColor="#00CF14"
          titleStyle={{ textAlign: 'left', alignSelf: 'flex-start' }}
          title="Cerrar Sesión"
          textContent="Estás a punto de salir de la aplicación De Prati, ¿Deseas continuar?"
          showCloseButton={true}
          textContentStyle={{ marginBottom: 16 }}
          buttonType="full"
          buttonText={'CONTINUAR'}
          buttonAction={() => {
            setshowModalLocal(false);
            logOut();
          }}
          closeAction={() => {
            setshowModalLocal(false);
          }}
          hideButton={false}
        />
        <ModalPassword
          showModaPassword={showModaPassword}
          setShowModaPassword={setShowModaPassword}
          onCloseRequest={() => setShowModaPassword(false)}
        />
      </View>
    </TemplatePage>
  );
}

const styles = StyleSheet.create({
  viewCard: {
    borderRadius: 4,
    marginTop: 21,
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  welcome: {
    backgroundColor: COLORS.GRAYDARK20,
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  welcome_text: {
    ...FontStyles.H3_Headline,
    fontFamily: FONTS_FAMILY.Roboto,
    fontWeight: '400',
    textAlign: 'left'
  },
  welcome_text_bold: {
    ...FontStyles.H3_Headline,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  textLocalizator: {
    fontSize: FONTS_SIZES.super,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Bold']
  },

  containerTitle: {
    fontSize: FONTS_SIZES.extra,
    color: COLORS.DARK,
    fontFamily: FONTS_FAMILY['Roboto-Medium']
  },

  subtitle: {
    fontSize: FONTS_SIZES.subtitle1,
    color: COLORS.DARK
  },
  badget: {
    position: 'relative',
    left: -2,
    top: -2,
    borderRadius: 4
  },
  gradient: {
    top: -10,
    width: '100%',
    height: 9
  },
  item_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,

    paddingHorizontal: 24
  }
});
