import _Config from 'react-native-config-encrypted';
import {
  ENV,
  API_URL_HYBRIS,
  API_URL_ECCOMMERCE,
  API_URL_SAP,
  HYBRIS_CLIENT_ID_IOS,
  HYBRIS_CLIENT_ID_ANDROID,
  AUTH_GOOGLE_IOS_CLIENT_ID,
  AUTH_GOOGLE_WEB_CLIENT_ID,
  HYBRIS_CLIENT_SECRET,
  API_KEY_AWS,
  PAYMENTEZ_CLIENT_CODE,
  PAYMENTEZ_CLIENT_SECRET_KEY,
  EMARSYS_CONTACT_FIELD_ID,
  EMARSYS_APPLICATION_CODE,
  EMARSYS_MERCHANTID,
  EMMA_KEY
} from 'react-native-dotenv';

/** 
 - node_modules/.bin/env-config-encrypt .env Y3JoaXN0aWFuIGRhdmlkIHZlcmdhcmEgZ29tZXo NAME_ENV_VAR
*/

_Config.configure({
  key: 'Y3JoaXN0aWFuIGRhdmlkIHZlcmdhcmEgZ29tZXo',
  provider: {
    HYBRIS_CLIENT_SECRET,
    API_KEY_AWS,
    PAYMENTEZ_CLIENT_CODE,
    PAYMENTEZ_CLIENT_SECRET_KEY,
    EMARSYS_CONTACT_FIELD_ID,
    EMARSYS_APPLICATION_CODE,
    EMARSYS_MERCHANTID,
    EMMA_KEY
  }
});

export class Config {
  static get ENV() {
    return ENV;
  }
  static get API_URL_HYBRIS() {
    return API_URL_HYBRIS;
  }
  static get API_URL_ECCOMMERCE() {
    return API_URL_ECCOMMERCE;
  }
  static get API_URL_SAP() {
    return API_URL_SAP;
  }
  static get HYBRIS_CLIENT_ID_IOS() {
    return HYBRIS_CLIENT_ID_IOS;
  }
  static get HYBRIS_CLIENT_ID_ANDROID() {
    return HYBRIS_CLIENT_ID_ANDROID;
  }
  static get AUTH_GOOGLE_IOS_CLIENT_ID() {
    return AUTH_GOOGLE_IOS_CLIENT_ID;
  }
  static get AUTH_GOOGLE_WEB_CLIENT_ID() {
    return AUTH_GOOGLE_WEB_CLIENT_ID;
  }
  static get HYBRIS_CLIENT_SECRET() {
    return _Config.get('HYBRIS_CLIENT_SECRET');
  }
  static get API_KEY_AWS() {
    return _Config.get('API_KEY_AWS');
  }
  static get PAYMENTEZ_CLIENT_CODE() {
    return _Config.get('PAYMENTEZ_CLIENT_CODE');
  }
  static get PAYMENTEZ_CLIENT_SECRET_KEY() {
    return _Config.get('PAYMENTEZ_CLIENT_SECRET_KEY');
  }
  static get EMARSYS_CONTACT_FIELD_ID() {
    return _Config.get('EMARSYS_CONTACT_FIELD_ID');
  }
  static get EMARSYS_APPLICATION_CODE() {
    return _Config.get('EMARSYS_APPLICATION_CODE');
  }
  static get EMARSYS_MERCHANTID() {
    return _Config.get('EMARSYS_MERCHANTID');
  }
  static get EMMA_KEY() {
    return _Config.get('EMMA_KEY');
  }
}

export default Config;
