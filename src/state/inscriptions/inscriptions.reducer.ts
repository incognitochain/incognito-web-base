import { Reducer } from 'redux';

import { InscriptionsActionType, InscriptionsReducer } from './inscriptions.types';

const initialState: InscriptionsReducer = {
  inscriptionList: [],
  fetching: false,
};

export const reducer: Reducer<InscriptionsReducer, any> = (state = initialState, action): InscriptionsReducer => {
  switch (action.type) {
    case InscriptionsActionType.FETCHING: {
      const fetching = action.payload;
      return {
        ...state,
        fetching,
      };
    }

    case InscriptionsActionType.SET_INSCRIPTIONS: {
      const inscriptionList = action.payload;
      return {
        ...state,
        inscriptionList,
      };
    }
    default:
      return state;
  }
};

export default reducer;
