import { combineReducers } from '@reduxjs/toolkit';

import { reducer as fromDeposit } from './features/FormDeposit';

const swapReducer = combineReducers({
  fromDeposit,
});

export default swapReducer;
