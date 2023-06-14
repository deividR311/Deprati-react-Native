import 'intl';
import 'intl/locale-data/jsonp/es-EC';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { firebaseHeadlessHandler } from './src/infrastucture/firebase/firebaseHeadlessHandler';
import './src/application/utils/locales/i18n';

messaging().setBackgroundMessageHandler(firebaseHeadlessHandler);

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);
