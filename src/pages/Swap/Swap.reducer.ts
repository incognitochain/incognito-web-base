import { combineReducers } from '@reduxjs/toolkit';

import config from '../../config/Configs.reducer';
import theme from '../../theme/Theme.reducer';
import { reducer as fromDeposit } from './features/FormDeposit';
import { reducer as fromUnshield } from './features/FormUnshield';

const swapReducer = combineReducers({
  fromDeposit,
  fromUnshield,
  config,
  theme,
});

export default swapReducer;
