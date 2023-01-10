import { AxiosInstance } from 'axios';
import { API_SERVICE } from 'config';
import createAxiosInstance from 'services/axios';
import { CreateProposalParams, SubmitVoteRequestAPIParam } from 'state/dao/types';

class RpcDao {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_SERVICE });
  }

  fetchProposals() {
    return this.http.get('pdao/proposal/list');
  }

  fetchProposalFee(type: 1 | 2) {
    // type = 1 => get fee create proposal, type = 2 => get fee vote proposal
    return this.http.get(`pdao/proposal/estimatefee?type=${type}`);
  }

  fetchProposalDetail(proposalId: string) {
    return this.http.get(`pdao/proposal/detail/${proposalId}`);
  }

  submitCreateProposal(createProposalParams: CreateProposalParams) {
    return this.http.post('pdao/proposal/create', createProposalParams);
  }

  submitVote(submitVoteParams: SubmitVoteRequestAPIParam) {
    return this.http.post('pdao/proposal/vote', submitVoteParams);
  }
}

const rpcDao = new RpcDao();

const fetchProposals = async (): Promise<any> => {
  const response = await rpcDao.fetchProposals();
  return response;
};

const fetchProposalFee = async (type: 1 | 2): Promise<any> => {
  // type = 1 => get fee create proposal, type = 2 => get fee vote proposal
  const response = await rpcDao.fetchProposalFee(type);
  return response;
};

const fetchProposalDetail = async (proposalId: any): Promise<any> => {
  const response = await rpcDao.fetchProposalDetail(proposalId);
  return response;
};

const submitCreateProposal = async (createProposalParams: CreateProposalParams): Promise<any> => {
  const response = await rpcDao.submitCreateProposal(createProposalParams);
  return response;
};

const submitVote = async (submitVoteParams: SubmitVoteRequestAPIParam): Promise<any> => {
  const response = await rpcDao.submitVote(submitVoteParams);
  return response;
};

export { fetchProposalDetail, fetchProposalFee, fetchProposals, submitCreateProposal, submitVote };
export default rpcDao;
