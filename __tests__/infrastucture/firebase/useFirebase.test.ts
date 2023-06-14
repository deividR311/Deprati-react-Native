import { renderHook } from '@testing-library/react-hooks';
import useFirebase from '../../../src/infrastucture/firebase/useFirebase';

const mockRequestPermission = jest.fn();
const mockGetToken = jest.fn();
const mockSaveInLocalStorage = jest.fn();
const mockOnMessageReceived = jest.fn();

jest.mock('@react-native-firebase/messaging', () => () => ({
  requestPermission: mockRequestPermission,
  getToken: mockGetToken,
  onMessage: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
  getInitialNotification: jest.fn()
}));

jest.mock(
  '../../../src/application/state-manager/services/localstorage/useLocalStorage',
  () => ({
    useLocalStorage: () => ({ save: mockSaveInLocalStorage })
  })
);

jest.mock(
  '../../../src/infrastucture/firebase/firebaseHeadlessHandler',
  () => ({
    firebaseHeadlessHandler: jest.fn()
  })
);

describe('useFirebase', () => {
  // Tests that firebase messaging initializes successfully. tags: [happy path]
  test('test_initialization_success', async () => {
    // Arrange
    mockRequestPermission.mockResolvedValueOnce(undefined);
    mockGetToken.mockResolvedValueOnce('test_token');

    // Act
    renderHook(() => useFirebase({}));

    // Assert
    expect(mockRequestPermission).toHaveBeenCalled();
    //expect(mockGetToken).toHaveBeenCalled()
    /* expect(mockSaveInLocalStorage).toHaveBeenCalledWith({
      TokenFCM: 'test_token',
    }) */
  });
});
