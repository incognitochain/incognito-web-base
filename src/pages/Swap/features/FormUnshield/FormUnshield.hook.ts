import { useAppSelector } from 'state/hooks';

import { unshieldDataSelector } from './FormUnshield.selectors';

export interface IUnshield {
  inputAddress: string;
}

export const useUnshield = (): IUnshield => {
  const data = useAppSelector(unshieldDataSelector);
  return {
    inputAddress: '',
  };
};
