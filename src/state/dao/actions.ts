import Types, { Proposal } from './types';

const getProposalsRequest = (): any => {
  return {
    type: Types.GET_PROPOSALS_REQUEST,
  };
};

const getProposalsSuccess = (proposals: Proposal[]): any => {
  return {
    type: Types.GET_PROPOSAL_SUCCESS,
    payload: proposals,
  };
};

const getProposalsFailure = (): any => {
  return {
    type: Types.GET_PROPOSALS_FAILURE,
  };
};

export { getProposalsFailure, getProposalsRequest, getProposalsSuccess };
