export const NativeModules = {};

jest.mock('react-native', () => ({
  NativeModules: {
    CustomPaymentezModule: {
      initializeSDK: jest.fn(),
      addCard: jest.fn()
    }
  }
}));
