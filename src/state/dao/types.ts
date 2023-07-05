// eslint-disable-next-line no-restricted-imports
import { BigNumber as EthersBN } from 'ethers';

enum TransactionType {
  CREATE_PROPOSAL = 'CREATE_PROPOSAL',
  VOTE = 'VOTE',
}

const Types = {
  GET_PROPOSALS_REQUEST: 'dao/GET_PROPOSALS_REQUEST',
  GET_PROPOSALS_FAILURE: 'dao/GET_PROPOSALS_FAILURE',
  GET_PROPOSAL_SUCCESS: 'dao/GET_PROPOSAL_SUCCESS',

  GET_PROPOSAL_DETAIL_REQUEST: 'dao/GET_PROPOSAL_DETAIL_REQUEST',
  GET_PROPOSAL_DETAIL_FAILURE: 'dao/GET_PROPOSAL_DETAIL_FAILURE',
  GET_PROPOSAL_DETAIL_SUCCESS: 'dao/GET_PROPOSAL_DETAIL_SUCCESS',

  CREATE_PROPOSAL_REQUEST: 'dao/CREATE_PROPOSAL_REQUEST',
  CREATE_PROPOSAL_FAILURE: 'dao/CREATE_PROPOSAL_FAILURE',
  CREATE_PROPOSAL_SUCCESS: 'dao/CREATE_PROPOSAL_SUCCESS',
};

interface Dao {
  isFetchingProposals: boolean;
  proposals: Proposal[];
}

interface ProposalCallResult {
  id: EthersBN;
  abstainVotes: EthersBN;
  againstVotes: EthersBN;
  forVotes: EthersBN;
  canceled: boolean;
  vetoed: boolean;
  executed: boolean;
  startBlock: EthersBN;
  endBlock: EthersBN;
  eta: EthersBN;
  proposalThreshold: EthersBN;
  proposer: string;
  quorumVotes: EthersBN;
}

interface ProposalAPIResponse {
  id: string;
  PID: number;
  created_at: string;
  updated_at: string;
  SubmitBurnTx: string;
  SubmitProposalTx: string;
  Status: ProposalStatusBackEnd;
  ProposalID: string;
  Proposer: string;
  Targets: string;
  Values: string;
  Signatures: string;
  Calldatas: string;
  CreatePropSignature: string;
  Description: string;
  Title: string;
  Reshield: string;
  VoteAgainst: number;
  VoteFor: number;
  VoteForAmount: number;
  VoteAgainstAmount: number;
}

interface Fee {
  feeAddress: string;
  feeAddressShardID: number;
  tokenid: string;
  feeAmount: number;
}

enum ProposalStatusBackEnd {
  submit_failed = 'submit_failed',
  pending = 'pending',
  executing = 'executing',
  rejected = 'rejected',
  accepted = 'accepted',
  waiting = 'waiting',
  outchain_failed = 'pdao_outchain_failed',
  outchain_success = 'pdao_outchain_success',
}

enum ProposalStatus {
  UNDETERMINED = -1,
  PENDING = 'Pending',
  ACTIVE = 'Active',
  CANCELLED = 'Canceled',
  DEFEATED = 'Defeated',
  SUCCEEDED = 'Succeeded',
  QUEUED = 'Queued',
  EXPIRED = 'Expired',
  EXECUTED = 'Executed',
  VETOED = 'Vetoed',
}

interface Proposal {
  id: string | undefined;
  proposalId: string | undefined;
  title: string;
  description: string;
  submitProposalTx: string;
  proposer: string | undefined;
  status: ProposalStatus | undefined;
  forCount: number;
  againstCount: number;
  abstainCount: number;
  createdBlock: number;
  startBlock: number;
  endBlock: number;
  quorumVotes: number;
  voteAgainst: number;
  voteFor: number;
  voteAgainstAmount: number;
  voteForAmount: number;
}

interface CreateProposalParams {
  Txhash: string;
  TxRaw: string;
  Description: string;
  Title: string;
  ReShieldSignature: string;
  CreatePropSignature: string;
  PropVoteSignature: string;
  Targets: string[];
  Values: string[];
  Calldatas: string[];
  ProposalID: string;
}

interface SubmitVoteRequestAPIParam {
  ProposalID: string;
  Txhash: string;
  TxRaw: string;
  ReShieldSignature: string;
  PropVoteSignature: string;
  Vote: number;
}

export { ProposalStatus, ProposalStatusBackEnd, TransactionType, Types };
export type {
  CreateProposalParams,
  Dao,
  Fee,
  Proposal,
  ProposalAPIResponse,
  ProposalCallResult,
  SubmitVoteRequestAPIParam,
};
export default Types;
