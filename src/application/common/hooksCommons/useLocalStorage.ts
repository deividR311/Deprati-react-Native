import { remove } from 'lodash';
import { useState, useEffect } from 'react';
import { saveStorage, getStorage } from '../../state-manager/storage/storage';

export const StatusEnum = {
  pending: 'pending',
  success: 'success',
  error: 'error'
};
type StatusEnumType = keyof typeof StatusEnum;

const useLocalStorage = (key, initialValue) => {
  const [status, setStatus] = useState<StatusEnumType>(StatusEnum.pending);
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    getStorage(key, initialValue).then(storage => {
      setStoredValue(storage);
      setStatus(StatusEnum.success);
    });
  }, [key]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value, keyUid?: string) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof saveStorage !== 'undefined') {
        saveStorage(keyUid ?? key, valueToStore);
      }
    } catch (error) {}
  };
  return [storedValue, setValue, status];
};

export default useLocalStorage;
