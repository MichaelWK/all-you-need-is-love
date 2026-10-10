import { useEffect, useState } from "react";

export const useStorage = <T>(key: string) => {
  const [receivedValue, setReceivedValue] = useState<T | null>(null);
  const getStorageValue = (): T | null => {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue ? JSON.parse(localStorageValue) : null;
  };
  const setStorageValue = (value: T) => {
    console.log("Setting value:", value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  useEffect(() => {
    window.addEventListener("storage", (event) => {
      console.log("Storage event:", event);
      if (event.isTrusted && event.key === key && event.newValue) {
        const newValue: T = JSON.parse(event.newValue);
        if (newValue) {
          setReceivedValue(newValue);
        }
      }
    });
    return () => {
      window.removeEventListener("storage", () => {});
    };
  }, []);

  return [getStorageValue, setStorageValue, receivedValue] as const;
};
