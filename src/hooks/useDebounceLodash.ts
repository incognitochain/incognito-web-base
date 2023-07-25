import { debounce } from 'lodash';

//debounceTime => miliseconds

const useDebounce = (func: (params: any) => any, debounceTime = 1000) => {
  return debounce(func, debounceTime);
};

export default useDebounce;
