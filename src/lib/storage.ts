import { useCallback, useState } from 'react';
import { STORAGE_KEY } from './constants';

const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(`${STORAGE_KEY}/${key}`);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(
        `${STORAGE_KEY}/${key}`,
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

const useLocaleState = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedData, setStoredData] = useLocalStorage(key, initialValue);
  const [stateData, setStateData] = useState<T>(storedData);

  const setData = useCallback(
    (newData: T | ((existing: T) => T)) => {
      if (newData instanceof Function) {
        newData = newData(stateData);
      }

      setStoredData(newData);
      setStateData(newData);
    },
    [stateData, setStoredData]
  );

  return [stateData, setData];
};

export { useLocaleState };
