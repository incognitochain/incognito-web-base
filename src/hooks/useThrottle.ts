import { throttle } from 'lodash';

//throttleTime => miliseconds

const useThrottle = (func: (params?: any) => any, throttleTime = 1000) => {
  return throttle(func, throttleTime, {
    leading: true,
    trailing: false,
  });
};

export default useThrottle;
