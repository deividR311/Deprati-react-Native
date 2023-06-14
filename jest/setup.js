import 'react-native-gesture-handler/jestSetup';
import 'cross-fetch/polyfill';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('@react-native-firebase/crashlytics', () =>
  jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    recordError: jest.fn()
  }))
);
jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock')
);
jest.mock('emma-react-native-sdk', () => {
  return {
    startSession: jest.fn()
  };
});
jest.mock('react-native-qrcode-scanner', () => 'QRCodeScanner');

jest.mock('@react-native-community/netinfo', () =>
  require('@react-native-community/netinfo/jest/netinfo-mock.js')
);

jest.mock('react-native-device-info', () =>
  require('react-native-device-info/jest/react-native-device-info-mock.js')
);

jest.mock('appcenter-crashes', () =>
  require('appcenter-crashes/test/AppCenterCrashesMock.js')
);

jest.mock(
  'react-native-fbsdk-next',
  () => require('react-native-fbsdk-next/jest/mocks/index.js').default
);

jest.mock('react-native-video', () => 'Video');
