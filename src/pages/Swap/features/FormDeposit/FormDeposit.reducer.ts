import { Reducer } from 'redux';

import { FormDepositActions, IFormDepositReducer } from './FormDeposit.types';

const initialState: IFormDepositReducer = {
  isFetching: false,
};

export const reducer: Reducer<IFormDepositReducer, FormDepositActions & any> = (
  state = initialState,
  action: FormDepositActions
): IFormDepositReducer => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
