import { combineReducers } from '@reduxjs/toolkit';

import { reducer as fromDeposit } from './features/FormDeposit';
import { reducer as fromUnshield } from './features/FormUnshield';

const swapReducer = combineReducers({
  fromDeposit,
  fromUnshield,
});

export default swapReducer;
