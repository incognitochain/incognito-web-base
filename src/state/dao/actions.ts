import Types, { Proposal } from './types';

// Modify the return types for each action
const create = (): any => {
  return {
    type: Types.CREATE,
  };
};

const createSuccess = (): any => {
  return {
    type: Types.CREATE_SUCCESS,
  };
};

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

export { create, createSuccess, getProposalsFailure, getProposalsRequest, getProposalsSuccess };
