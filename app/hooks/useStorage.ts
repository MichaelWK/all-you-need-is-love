import { useEffect, useState } from "react";

export const useStorage = <T>(key: string, onChange: (value: T | null) => void) => {
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
      if (event.key !== key) return;

      const newValue = event.newValue === null ? null : (JSON.parse(event.newValue) as T);
      if (newValue !== null) {
        onChange(newValue);
      }
    });
    return () => {
      window.removeEventListener("storage", () => {});
    };
  }, [key, onChange]);

  return [getStorageValue, setStorageValue] as const;
};
