import { useEffect, useState } from 'react';

let timeoutId;

export function useNowTime(updateInterval = 1000) {
  const [nowTime, setNowTime] = useState(new Date());

  useEffect(() => {
    timeoutId = setTimeout(() => setNowTime(new Date()), updateInterval);
    return () => clearTimeout(timeoutId);
  }, [nowTime]);

  return nowTime;
}
