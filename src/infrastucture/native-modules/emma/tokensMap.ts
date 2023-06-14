import { NAV } from '../../../application/common/namesNav';
import {
  AccountNavigationRoute,
  MyReturnsNavigationRoute
} from '../../../presentation/navigation/account';
import { MyDataNavigationRoute } from '../../../presentation/navigation/account/my-data/my-data.navigator';
import { OrdersNavigationRoute } from '../../../presentation/navigation/account/my-orders/my-orders.navigator';
import { SupportTicketsNavigationRoute } from '../../../presentation/navigation/account/support-tickets/support-tickets.navigator';
import { CheckoutSteps } from '../../../presentation/navigation/checkout';
import { DeliveryNavigationRoute } from '../../../presentation/navigation/delivery';

export enum keyEventsViewModal {
  // Sección Login
  'crearcuenta_ok' = 'View:crearcuenta:resultadook',
  'crearcuenta_ko' = 'View:crearcuenta:resultadoko',

  //Sección Ecommerce - Check Out
  'ecommerce_checkout_ok' = 'View:ecommerce:checkout:confirmacion',

  //Sección Credito
  'credito_screen_anonimo' = 'View:credito:anonimo',
  'credito_screen_logueado' = 'View:credito:logueado',
  'credito_screen_identificado' = 'View:credito:identificado',
  'credito_pagosincontacto_qr' = 'View:credito:identificado:pagosincontacto:qr',
  'credito_pagosincontacto_confirmacion' = 'View:credito:identificado:pagosincontacto:confirmacion',
  'credito_aumentocupo_ok' = 'View:credito:identificadoaumentocupo:resultadook',
  'credito_aumentocupo_ko' = 'View:credito:identificadoaumentocupo:resultadoko',
  'credito_fechavencimiento_ok' = 'View:credito:identificado:fechavencimiento:resultadook',
  'credito_precancelardiferidos_confirmacion' = 'View:credito:identificado:precancelardiferidos:confirmacion',
  'credito_precancelardiferidos_error' = 'View:credito:identificado:precancelardiferidos:error',

  // Pago sin contacto.
  'contactless_payment' = 'View:credito:identificado:pagosincontacto:cup'
}

export const tokensEmma: {
  [any: string]: any;
} = {
  // Sección Login
  [NAV.WELCOME]: 'ae84743071bd3fce1ac6cfed8c54b05esta', // View:prelogin
  [NAV.SIGNIN]: 'abd2a327779826d5a5c1e5fabc6c3964', // View:login
  [NAV.HOME]: '4b8de74e734b4fa21485e8e50402ecff', // View:home

  // Sección Crear Cuenta
  [NAV.SIGNUP]: '860088d027991222bb41b3a9f45caac4', // View:crearcuenta:inicio
  'View:crearcuenta:resultadook': '5e687a20ac192f66bc11f1078cb3b7f2',
  'View:crearcuenta:resultadoko': '347873643ea4679a0ba186194a0606da',

  //Sección Home
  // solo son eventos tipo click

  //Sección Mi Cuenta
  [AccountNavigationRoute.Home]: 'eccd2380c10cfb94bd87cd4bedd67e37', // View:micuenta:pantallaprincipal
  [OrdersNavigationRoute.MyOrders]: '1bd60ecb3034ac2cb658168dc081442b', // View:micuenta:mispedidos
  [AccountNavigationRoute.Notifications]: 'bbccb3b63e76b70367df86ca04bb5043', // View:micuenta:misnotificaciones
  [AccountNavigationRoute.AddressDelivery]: '07f6159b975477170397067ecc9e12ab', // View:micuenta:misdirecciones
  [MyDataNavigationRoute.Home]: '2d55a1fafe60e6b4b5612d9c00c61a7e', // View:micuenta:misdatos
  [AccountNavigationRoute.StoresList]: '15a02f7fd70a696ac03c3b563154c25f', // View:micuenta:tiendas
  [AccountNavigationRoute.CostumerService]: 'be69363689937569f34feabdf18b1f5f', // View:micuenta:servicioalcliente
  [SupportTicketsNavigationRoute.Tickets]: '4015cc91a1c175f77b2aa367bd717cbd', // View:micuenta:misreclamos
  [MyReturnsNavigationRoute.ListReturn]: '0897e59d5b3b632fa923420819dddd61', // View:micuenta:misdevoluciones

  //Sección Ecommerce - Check Out
  [NAV.PLP]: '45b5a280aeab1735861a68a3147f535a', // View:ecommerce:catalogo
  [NAV.CART]: '3bc919e745396d8b0063adcab9de44cc', // View:ecommerce:checkout:carrito
  [DeliveryNavigationRoute.DeliveryAddress]: '4f43f68946957bc89d696560b841cf34', // View:ecommerce:checkout:envio
  [CheckoutSteps.ChoosePaymentMethod]: '175671ed3a03c66414ca8ed155c5e810', // View:ecommerce:checkout:pago
  'View:ecommerce:checkout:confirmacion': '611af1e9836ab1224d4bc61eb900da95', // View:ecommerce:checkout:confirmacion

  //Sección Credito
  'View:credito:anonimo': '6cb80a3aeefba831641992be211c81d8', // View:credito:anonimo
  'View:credito:logueado': 'cfb2099d4c52510220016e53737c70f4', // View:credito:logueado
  'View:credito:identificado': '27e7727940cd55d95277475b32347c00', //View:credito:identificado
  'View:credito:identificado:pagosincontacto:cupo':
    'c02153f0a6c05d0d38b87b0d01f6ab54', //View:credito:identificado:pagosincontacto:cupo
  'View:credito:identificado:pagosincontacto:qr':
    '5c7a4169bcdd71ad48652cbde3bc4377', //View:credito:identificado:pagosincontacto:qr
  'View:credito:identificado:pagosincontacto:confirmacion':
    '40ece45d6ba206236d413d2802914209', //View:credito:identificado:pagosincontacto:confirmacion
  [NAV.CreditLimitIncrease]: '2e14320160e2c37099ca82a94fdd64bd', //View:credito:identificado:aumentocupo:inicio
  'View:credito:identificadoaumentocupo:resultadook':
    '6b318c33893075e9e723d1c6acce17b9',
  'View:credito:identificado:aumentocupo:resultadoko':
    'f9c61e145a5017a096b808eebd330979',
  [NAV.QUOTA_CONSULTATION]: 'e34a84ae6611ed619d2a27786a4d79ed', //View:credito:identificado:calculocuotas:inicio
  [NAV.CreditChangeExpirationDate]: '5bbf731d30d32a8c08c0a132c8ea125b', //View:credito:identificado:fechavencimiento
  'View:credito:identificado:fechavencimiento:resultadook':
    '828a9c02b0404e976b23a111a06ce281',
  [NAV.CREDIT_MOVEMENTS]: '0e60491ee54c3d65d953e544f3a85d2e', // View:credito:identificado:mismovimientos
  [NAV.CreditPreCancel]: 'd87219f3cf73cd544ef32903ebed0496', // View:credito:identificado:precancelardiferidos
  'View:credito:identificado:precancelardiferidos:confirmacion':
    '3495c750072ee463036bde0d9aae18b7', // View:credito:identificado:precancelardiferidos:confirmación
  'View:credito:identificado:precancelardiferidos:error':
    'c9925f42e6a11e78fad78433064ad670' // View:credito:identificado:precancelardiferidos:error
};
