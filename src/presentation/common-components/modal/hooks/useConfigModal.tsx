import {
  StackActions,
  TabActions,
  useNavigation
} from '@react-navigation/native';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { COLORS } from '../../../../application/common/colors';
import useOpenLinkInApp from '../../../../application/common/hooksCommons/useOpenLinkInApp';
import { NAV } from '../../../../application/common/namesNav';
import { LocalStorageKey } from '../../../../application/state-manager/services/localstorage';
import { useLocalStorage } from '../../../../application/state-manager/services/localstorage/useLocalStorage';
import { creditWeb } from '../../../../application/utils/urls';
import ModalSelectContent from '../../../screens/Credit/components/modals/SelectModal/ModalSelectContent';
import ModalSMSContent from '../../../screens/Credit/components/modals/SMSModalCredit/ModalSMSContent';
import { Modal, ModalsType } from '../modal.interfaces';
import { useGenericModal } from '../ModalProvider';
import TextMaxmiumFavorite from '../textMaxmiumFavorite/TextMaxmiumFavorite';
import { useTranslation } from 'react-i18next';

const TEXT_ERROR = 'Ha ocurrido un error.';

export default function useConfigModal() {
  const { t } = useTranslation();
  const {
    localStorageData: { [LocalStorageKey.IsLogin]: IS_LOGIN }
  } = useLocalStorage();
  const { hideModal, showModal } = useGenericModal();
  const [closeSimpleModal, setCloseSimpleModal] = useState(false);
  const navigation = useNavigation();
  const openUrl = useOpenLinkInApp();

  const modals: Modal[] = [
    {
      id: ModalsType.CreditSuccessRelated,
      config: {
        iconColor: '#00CF14',
        icon: 'check-circle',
        title: `${t('creditLinkedSuccess')}`,
        hideButton: true,
        showCloseButton: true,
        closeAction: () => hideModal(),
        buttonAction: () => {
          hideModal();
        }
      }
    },
    {
      id: ModalsType.CreditNoFound,
      config: {
        icon: 'error',
        iconColor: COLORS.BRAND,
        textContent:
          'Estimado usuario en este momento no se tiene registrado un crédito con nosotros.',
        textContentStyle: {
          marginBottom: 16,
          paddingHorizontal: 14,
          textAlign: 'center'
        },
        showCloseButton: true,
        buttonType: 'full',
        buttonText: 'Solicita tu crédito aquí'.toLocaleUpperCase(),
        closeAction: () => {
          hideModal();
        },
        buttonAction: () => {
          setCloseSimpleModal(true);
          hideModal();
        },
        onCloseRequest: () => {
          if (closeSimpleModal) openUrl(creditWeb);
          setCloseSimpleModal(false);
        }
      }
    },
    {
      id: ModalsType.ErrorServiceCreditsUser,
      config: {
        icon: 'error',
        iconColor: COLORS.BRAND,
        title: '¡Ups! Hemos tenido problemas de conexión',
        textContent: 'Muy pronto estaremos de vuelta, inténtalo más tarde',
        textContentStyle: {
          marginBottom: 16,
          textAlign: 'center'
        },
        showCloseButton: true,
        buttonType: 'full',
        buttonText: 'ACEPTAR',
        hideButton: false,
        buttonAction: async () => {
          hideModal();
        }
      }
    },
    {
      id: ModalsType.ModalLoading,
      config: {
        isModalLoading: true,
        showCloseButton: true,
        hideButton: true
      }
    },
    {
      id: ModalsType.ErrorService,
      config: {
        icon: 'error',
        hideButton: true,
        title: TEXT_ERROR,
        iconColor: COLORS.BRAND,
        showCloseButton: true,
        textContentStyle: { marginBottom: 10, textAlign: 'justify' },
        // buttonText: 'Vuélve a intentar',
        // buttonType: 'full',
        closeAction: () => hideModal(),
        buttonAction: () => hideModal()
      }
    },
    {
      id: ModalsType.CartDeliveryAddressError,
      config: {
        icon: 'error',
        hideButton: false,
        title:
          'La ciudad seleccionada no tiene cobertura. Ingrese una nueva ciudad destino.',
        iconColor: COLORS.BRAND,
        showCloseButton: true,
        textContentStyle: { marginBottom: 10, textAlign: 'justify' },
        buttonText: 'VUELVE A INTENTAR',
        buttonType: 'full',
        closeAction: () => hideModal(),
        buttonAction: async () => hideModal()
      }
    },
    {
      id: ModalsType.CreditSelect,
      config: {
        hideButton: false,
        title: '¿Qué cuenta quieres vincular?',
        titleStyle: { textAlign: 'left', alignSelf: 'flex-start' },
        textContent: 'Selecciona tu cuenta como titular o adicional',
        textComponent: props => <ModalSelectContent {...props} />,
        showCloseButton: true,
        closeAction: () => {
          hideModal();
        },
        buttonType: 'full',
        buttonText: 'VINCULAR'
      }
    },
    {
      id: ModalsType.modalPassword,
      config: {
        hideButton: false,
        title: '¡Tu contraseña se cambió exitosamente!',
        titleStyle: { textAlign: 'left', alignSelf: 'flex-start' },
        closeAction: () => {
          hideModal();
        },
        buttonAction: () => {
          hideModal();
        }
      }
    },
    {
      id: ModalsType.CreditMovement,
      config: {
        hideButton: false,
        title: `${t('lastBalanceMovements')}`,
        titleStyle: { textAlign: 'left', alignSelf: 'flex-start' },
        textContent: `${t('callCostumerServices')}`,
        showCloseButton: true,
        buttonAction: () => {
          hideModal();
          navigation.navigate(NAV.CREDIT_MOVEMENTS);
        },
        closeAction: () => {
          hideModal();
        },
        buttonText: 'Entiendo'.toUpperCase()
      }
    },

    {
      id: ModalsType.CreditNewDevice,
      config: {
        titleStyle: { textAlign: 'left', alignSelf: 'flex-start' },
        textContent:
          'Los datos ingresados ya se encuentran registrado en otro dispositivo. ¿Deseas registrar tu crédito De Prati en este dispositivo ?',
        closeAction: () => {
          hideModal();
        },
        buttonAction: () => {
          setCloseSimpleModal(true);
          hideModal();
        },
        showCloseButton: true,
        buttonType: 'full',
        buttonText: 'ACEPTAR',
        onCloseRequest: () => {
          if (closeSimpleModal) {
            showModal(ModalsType.CreditSMS);
          }
          setCloseSimpleModal(false);
        }
      }
    },

    {
      id: ModalsType.CreditSMS,
      config: {
        title: 'Confirma tu identidad',
        titleStyle: { textAlign: 'left', alignSelf: 'flex-start' },
        textContent:
          'Ingresa el código de confirmación que enviamos a tu celular vía mensaje de texto.',
        textComponent: props => <ModalSMSContent {...props} />,
        closeAction: () => {
          hideModal();
        },
        buttonAction: () => {
          setCloseSimpleModal(true);
          hideModal();
        },
        behaviorCustom: 'position',
        showCloseButton: true,
        hideButton: true,
        buttonType: 'full',
        hasInput: true,
        onCloseRequest: () => {
          if (closeSimpleModal) {
            showModal(ModalsType.CreditSuccessRelated);
          }
          setCloseSimpleModal(false);
        }
      }
    },

    {
      id: ModalsType.VerifyAccount,
      config: {
        title: `${t('registerConfirm')}`,
        titleStyle: { textAlign: 'left', alignSelf: 'flex-start' },
        buttonText: 'Ok',
        buttonAction: () => {
          hideModal();
        },
        closeAction: () => {
          setCloseSimpleModal(true);
          hideModal();
        },
        onCloseRequest: () => {
          if (closeSimpleModal) return;
          showModal(ModalsType.SucessSignUp);
          setCloseSimpleModal(false);
        },
        showCloseButton: true,
        hideButton: false,
        buttonType: 'short'
      }
    },

    {
      id: ModalsType.SucessSignUp,
      config: {
        title: '¡Felicitaciones, tu cuenta ha sido creada!',
        textContent:
          'Navega en nuestro catálogo en línea y descubre los productos que tenemos para ti en moda y hogar.',
        icon: 'check-circle',
        iconColor: COLORS.GREENOK,
        buttonType: 'full',
        buttonText: 'Empieza aquí',
        buttonAction: () => {
          navigation.navigate(NAV.HOME);
          hideModal();
        },
        closeAction: () => {
          hideModal();
          navigation.navigate(NAV.HOME);
        },
        showCloseButton: true
      }
    },

    {
      id: ModalsType.ErrorSignUp,
      config: {
        icon: 'error',
        iconColor: COLORS.BRAND,

        showCloseButton: true,
        hideButton: true,
        buttonType: 'short'
      }
    },
    {
      id: ModalsType.MaximumFavorite,
      config: {
        title: '¡Llenaste tu lista de favoritos!',
        titleStyle: { marginTop: 15 },
        buttonText: 'Ok',
        textComponent: () => <TextMaxmiumFavorite />,
        buttonAction: () => hideModal(),
        showCloseButton: false,
        hideButton: false,
        buttonType: 'short'
      }
    },
    {
      id: ModalsType.OutStock,
      config: {
        icon: 'error',
        iconColor: COLORS.BRAND,
        title: '¡Tienes un excelente gusto!',
        textContent: 'El producto que agregaste a tus favoritos ya se terminó.',
        textContentStyle: {
          textAlign: 'center',
          paddingHorizontal: 20,
          marginBottom: 20
        },
        buttonText: 'Elimínalo ahora'.toUpperCase(),
        // buttonAction: () => hideModal(),
        closeAction: () => hideModal(),
        showCloseButton: true,
        hideButton: false,
        buttonType: 'full'
      }
    },
    {
      id: ModalsType.LoginModal,
      config: {
        isLoginModal: true,
        title: 'Inicio de sesión',
        closeAction: () => hideModal()
      }
    },
    {
      id: ModalsType.ToastAddCart,
      config: {
        isToast: true,
        textContent: 'El producto ha sido añadido a tu carrito de compras.',
        buttonText: 'VER CARRITO',
        styleContentToast: {
          marginBottom: Platform.select?.({
            ios: 120,
            android: 80
          })
        },
        buttonAction: () => {
          hideModal();
          navigation.dispatch(StackActions.pop());
          if (IS_LOGIN) {
            //navigation.dispatch(TabActions.jumpTo(NAV.CART))
            navigation.navigate(NAV.CART as never);
          } else {
            navigation.navigate(NAV.AUTH_NAVIGATION, {
              screen: NAV.SIGNIN,
              params: { navGoToSuccess: NAV.CART }
            });
          }
        }
      }
    },
    {
      id: ModalsType.ToastDeleteFavorite,
      config: {
        isToast: true,
        textContent: 'El producto ha sido eliminado de tu lista de favoritos',
        buttonText: 'OK',
        buttonAction: () => hideModal()
      }
    },
    {
      id: ModalsType.ToastAddFavorite,
      config: {
        isToast: true,
        textContent: 'El producto ha sido añadido a tu lista de deseos.',
        buttonText: 'VER LISTA',
        buttonAction: () => {
          hideModal();
          navigation.navigate(NAV.FAVORITES as never);
        }
      }
    },
    {
      id: ModalsType.ToastDeleteProductCart,
      config: {
        isToast: true,
        textContent:
          'Estás a punto de borrar un producto de tu carrito, ¿Quieres seguir?',
        buttonText: 'ACEPTAR'
        // closeAction: () => hideModal(),
      }
    },
    {
      id: ModalsType.DeleteAddress,
      config: {
        icon: 'error',
        iconColor: COLORS.BRAND,
        title: '¿Estás seguro que deseas eliminar estos datos?',
        buttonText: 'ACEPTAR',
        showCloseButton: true,
        buttonType: 'full',
        closeAction: () => hideModal()
      }
    },
    {
      id: ModalsType.IsErrorAddress,
      config: {
        icon: 'error',
        iconColor: COLORS.BRAND,
        title: 'Ha ocurrido un error de conexión.',
        hideButton: true,
        showCloseButton: true,
        buttonType: 'full',
        closeAction: () => hideModal()
      }
    },
    {
      id: ModalsType.IsErrorGifCard,
      config: {
        icon: 'error',
        iconColor: COLORS.BRAND,
        title: 'Uno de los datos ingresados es incorrecto',
        buttonText: 'ACEPTAR',
        showCloseButton: true,
        buttonType: 'full',
        closeAction: () => hideModal()
      }
    },
    {
      id: ModalsType.SuccessAddress,
      config: {
        icon: 'check-circle',
        iconColor: COLORS.GREENOK,
        title: ' La nueva dirección ha sido guardada con éxito.',
        showCloseButton: true,
        closeAction: () => hideModal(),
        hideButton: true
      }
    },
    {
      id: ModalsType.AddressPaymentModal,
      config: {
        showCloseButton: true,
        closeAction: () => hideModal(),
        hideButton: true,
        onCloseRequest: () => {
          if (closeSimpleModal) return;

          setCloseSimpleModal(false);
        }
      }
    },
    {
      id: ModalsType.CardItemWithoutStock,
      config: {
        icon: 'error',
        iconColor: COLORS.BRAND,
        title: 'Continuar Compra',
        textContent:
          'Existen productos agotados o superan el stock actual en su carrito, elimínelos para continuar con su compra.',
        buttonText: 'REVISAR CARRITO',
        showCloseButton: true,
        buttonType: 'full',
        closeAction: () => hideModal(),
        buttonAction() {
          hideModal();
        }
      }
    },
    {
      id: ModalsType.modalInformations,
      config: {
        hideButton: true,
        showCloseButton: true,
        closeAction: () => hideModal(),
        buttonAction: () => hideModal()
      }
    }
  ];
  return modals;
}
