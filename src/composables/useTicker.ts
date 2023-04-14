import { useState, useEffect } from 'react';
interface UseTickerResult {
  now: number;
  stopTicker: () => void;
}

export const useTicker = (mode: 's' | 'm' = 's'): UseTickerResult => {
  const [now, setNow] = useState(() => Date.now());

  let secInterval: NodeJS.Timeout;

  useEffect(() => {
    secInterval = setInterval(
      () => {
        setNow(Date.now());
      },
      mode === 's' ? 1000 : 60000
    );
    return () => clearInterval(secInterval);
  }, [mode === 's' ? 1000 : 60000]);

  const stopTicker = () => {
    clearInterval(secInterval);
  };

  return {
    now,
    stopTicker
  };
};
