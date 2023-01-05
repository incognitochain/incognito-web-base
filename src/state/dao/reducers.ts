import Types, { Dao } from './types';

const initialState: Dao = {
  isFetchingProposals: false,
  proposals: [],
};

const reducer = (state = initialState, action: any): any => {
  let { type } = action;
  let newState: any = state;
  switch (type) {
    case Types.GET_PROPOSALS_REQUEST:
      return {
        ...state,
        isFetchingProposals: true,
      };

    case Types.GET_PROPOSALS_FAILURE:
      return {
        ...state,
        isFetchingProposals: false,
        proposals: [],
      };

    case Types.GET_PROPOSAL_SUCCESS:
      return {
        ...state,
        isFetchingProposals: false,
        proposals: action.payload,
      };

    default:
      break;
  }
  return newState;
};

export { reducer };

export default reducer;
