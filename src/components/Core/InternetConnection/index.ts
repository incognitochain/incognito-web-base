import { useState } from 'react';

export function useInternetConnnection() {
  const [isOnline, setIsOnline] = useState<boolean>(window.navigator.onLine);
  window.addEventListener('offline', function (e) {
    setIsOnline(false);
  });

  window.addEventListener('online', function (e) {
    setIsOnline(true);
  });
  return isOnline;
}
