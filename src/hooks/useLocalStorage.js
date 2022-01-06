import { useEffect, useState } from 'react';

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);

  if (saved) {
    const initial = JSON.parse(saved);
    return initial;
  }

  return defaultValue;
}

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
