import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

let reactotron;

if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const scriptHostname = scriptURL?.split('://')[1].split(':')[0];

  const { reactotronRedux } = require('reactotron-redux');
  Reactotron.configure({
    name: 'SWO_DEPRATI'
  }); // controls connection & communication settings

  Reactotron.setAsyncStorageHandler(AsyncStorage);

  Reactotron.useReactNative({
    asyncStorage: {
      ignore: ['ignore-me']
    }, // there are more options to the async storage.
    errors: true // or turn it off with false
  }); // add all built-in react native plugins
  Reactotron.trackGlobalErrors({
    veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
  }); // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  Reactotron.use(reactotronRedux());
  Reactotron.use(trackGlobalErrors());
  if (scriptHostname) {
    Reactotron.configure({ host: scriptHostname }).connect();
  }

  Reactotron.clear();

  reactotron = Reactotron;
  console.tron = Reactotron;
  console.log = Reactotron.log;
} else {
  console.tron = console;
  console.tron.logImportant = console.log;
}

export default reactotron;
