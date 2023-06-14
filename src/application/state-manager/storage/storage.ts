import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveStorage(key: string, value: any) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getStorage(key: string, initialValue: any = null) {
  const value = await AsyncStorage.getItem(key);
  return value != null ? JSON.parse(value) : initialValue;
}

export async function removeStorage(key: string) {
  await AsyncStorage.removeItem(key);
}
