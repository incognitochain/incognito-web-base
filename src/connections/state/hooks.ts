import { AppDispatch } from '@src/app-redux';
import { IRootState } from '@src/app-redux/interface';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
