//@ts-nocheck
import INC_DAO_ABI from 'abis/inc-dao.json';
import { getIncognitoInject } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { isMainnet } from 'config';
import { PRV } from 'constants/token';
import { getTokenPayments } from 'pages/Swap/features/FormUnshield/FormUnshield.utils';
// eslint-disable-next-line no-restricted-imports
import { Dispatch } from 'redux';
import { fetchProposalDetail, fetchProposals, submitCreateProposal, submitVote } from 'services/rpcDao';
import Web3 from 'web3';

import { getProposalsFailure, getProposalsRequest, getProposalsSuccess } from './actions';
import {
  Fee,
  Proposal,
  ProposalAPIResponse,
  ProposalCallResult,
  ProposalStatus,
  ProposalStatusBackEnd,
  TransactionType,
} from './types';
import { INC_CONTRACT_ADDRESS } from './utils';
const { ACCOUNT_CONSTANT } = require('incognito-chain-web-js/build/wallet');
const NETWORK_FEE = ACCOUNT_CONSTANT.MAX_FEE_PER_TX;
const CONTRACT_ABI = INC_DAO_ABI as any;
const { BurningPRVRequestMeta } = require('incognito-chain-web-js/build/web/wallet');

const web3 = new Web3(isMainnet ? 'https://eth-fullnode.incognito.org' : 'https://eth-goerli.public.blastapi.io');

const getProposalInfoViaChain = async (proposalId: any) => {
  try {
    const instance = new web3.eth.Contract(CONTRACT_ABI, INC_CONTRACT_ADDRESS);
    const proposalDetail: ProposalCallResult = await instance.methods.proposals(web3.utils.toBN(proposalId)).call();
    return proposalDetail;
  } catch (error) {
    console.log(error);
  }
};

const getProposalStatus = async (proposalId: any) => {
  try {
    const instance = new web3.eth.Contract(CONTRACT_ABI, INC_CONTRACT_ADDRESS);
    const proposalStates = [
      ProposalStatus.PENDING,
      ProposalStatus.ACTIVE,
      ProposalStatus.CANCELLED,
      ProposalStatus.DEFEATED,
      ProposalStatus.SUCCEEDED,
      ProposalStatus.QUEUED,
      ProposalStatus.EXPIRED,
      ProposalStatus.EXECUTED,
    ];
    const result = await instance.methods.state(web3.utils.toBN(proposalId)).call();
    const proposalState = proposalStates[result];
    return proposalState;
  } catch (error) {
    console.log(error);
  }
};

const getProposals = () => {
  return async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      dispatch(getProposalsRequest());
      let proposalsResponse: ProposalAPIResponse[] = await fetchProposals();
      proposalsResponse = proposalsResponse?.filter(
        (proposal: ProposalAPIResponse) =>
          proposal?.Status !== ProposalStatusBackEnd.submit_failed &&
          proposal?.Status !== ProposalStatusBackEnd.outchain_failed
      );
      const promises = proposalsResponse.map(async (proposal) => {
        const proposalStatusBackend: ProposalStatusBackEnd = proposal?.Status;
        let proposalInfoViaChain: any = {};
        let proposalStatusViaChain: any = null;
        let quorumVotes = 0;

        if (proposalStatusBackend === ProposalStatusBackEnd.outchain_success) {
          proposalInfoViaChain = await getProposalInfoViaChain(proposal?.ProposalID);
          proposalStatusViaChain = await getProposalStatus(proposal?.ProposalID);
          quorumVotes =
            parseInt(proposalInfoViaChain?.againstVotes?.toString() ?? '0') +
            parseInt(proposalInfoViaChain?.forVotes?.toString() ?? '0') +
            parseInt(proposalInfoViaChain?.abstainVotes?.toString() ?? '0');
        } else {
          proposalStatusViaChain = null;
        }

        return {
          id: proposal?.PID,
          proposalId: proposalInfoViaChain?.id?.toString(),
          title: proposal?.Title || '',
          description: proposal?.Description ?? 'No description.',
          submitProposalTx: proposal?.SubmitProposalTx || '',
          proposer: proposalInfoViaChain?.proposer || '',
          status: proposalStatusViaChain,
          forCount: parseInt(proposalInfoViaChain?.forVotes?.toString() ?? '0'),
          againstCount: parseInt(proposalInfoViaChain?.againstVotes?.toString() ?? '0'),
          abstainCount: parseInt(proposalInfoViaChain?.abstainVotes?.toString() ?? '0'),
          createdBlock: 0,
          startBlock: parseInt(proposalInfoViaChain?.startBlock?.toString() ?? ''),
          endBlock: parseInt(proposalInfoViaChain?.endBlock?.toString() ?? ''),
          quorumVotes,
          voteAgainst: proposal?.VoteAgainst || 0,
          voteFor: proposal?.VoteFor || 0,
          voteAgainstAmount: proposal?.VoteAgainstAmount || 0,
          voteForAmount: proposal?.VoteForAmount || 0,
        };
      });
      const data = await Promise.all(promises);
      dispatch(getProposalsSuccess(data));
      return data;
    } catch (error) {
      console.log(error);
      dispatch(getProposalsFailure());
    }
  };
};

const getProposalDetail = (proposalId: any, callback?: (data: any) => void) => {
  return async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      const proposalDetailResponse: ProposalAPIResponse = await fetchProposalDetail(proposalId);
      const proposalStatusBackEnd: ProposalStatusBackEnd = proposalDetailResponse?.Status;
      let proposalViaChainInfo: any = {};
      let proposalStatusViaChain: any = null;
      let quorumVotes = 0;
      if (proposalStatusBackEnd === ProposalStatusBackEnd.outchain_success) {
        proposalViaChainInfo = await getProposalInfoViaChain(proposalDetailResponse?.ProposalID);
        proposalStatusViaChain = await getProposalStatus(proposalDetailResponse?.ProposalID);
        quorumVotes =
          parseInt(proposalViaChainInfo?.againstVotes?.toString() ?? '0') +
          parseInt(proposalViaChainInfo?.forVotes?.toString() ?? '0') +
          parseInt(proposalViaChainInfo?.abstainVotes?.toString() ?? '0');
      } else {
        proposalStatusViaChain = null;
      }
      const proposalDetail: Proposal = {
        id: proposalDetailResponse?.PID,
        proposalId: proposalDetailResponse?.ProposalID.toString(),
        title: proposalDetailResponse.Title || '',
        description: proposalDetailResponse.Description ?? 'No description.',
        submitProposalTx: proposalDetailResponse?.SubmitProposalTx || '',
        proposer: proposalViaChainInfo?.proposer,
        status: proposalStatusViaChain,
        forCount: parseInt(proposalViaChainInfo?.forVotes?.toString() ?? '0'),
        againstCount: parseInt(proposalViaChainInfo?.againstVotes?.toString() ?? '0'),
        abstainCount: parseInt(proposalViaChainInfo?.abstainVotes?.toString() ?? '0'),
        createdBlock: 0,
        startBlock: parseInt(proposalViaChainInfo?.startBlock?.toString() ?? ''),
        endBlock: parseInt(proposalViaChainInfo?.endBlock?.toString() ?? ''),
        quorumVotes,
        voteAgainst: proposalDetailResponse?.VoteAgainst || 0,
        voteFor: proposalDetailResponse?.VoteFor || 0,
        voteAgainstAmount: proposalDetailResponse?.VoteAgainstAmount || 0,
        voteForAmount: proposalDetailResponse?.VoteForAmount || 0,
      };
      if (callback) callback(proposalDetail);
      return proposalDetail;
    } catch (error) {
      console.log(error);
    }
  };
};

const burnPRVToken = ({
  transactionType,
  amount,
  fee,
  title,
  requestSignTransaction,
}: {
  transactionType: TransactionType;
  amount: number;
  fee?: Fee;
  title: string;
  requestSignTransaction: (payload: any) => void;
}) => {
  return async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      if (fee?.tokenid !== PRV.id) return;
      const { feeAddress, feeAmount } = fee;
      let prvPayments: { PaymentAddress: any; Amount: string; Message: string }[] = await getTokenPayments({
        data: [
          {
            paymentAddress: feeAddress,
            amount: feeAmount,
          },
        ],
        burnAmount: amount,
      });

      const incognito = getIncognitoInject();

      // Get OTA Receiver and Burner address
      const shardID = fee?.feeAddressShardID;
      const { result }: { result: any } = await incognito.request({
        method: 'wallet_requestAccounts',
        params: { senderShardID: shardID },
      });
      const burnerAddress = result?.burnerAddress;
      const otaReceiver = result?.otaReceiver;

      const metadata = {
        RedepositReceiver: otaReceiver,
        BurnerAddress: burnerAddress,
        BurningAmount: amount,
        TokenID: PRV.id,
        Type: BurningPRVRequestMeta,
      };

      let payload = {
        info: '',
        networkFee: NETWORK_FEE,
        metadata,
        prvPayments,
        tokenPayments: [],
        pDaoData: {
          transactionType,
          voteProposalInfo: {
            vote: 1,
            proposal: {
              targets: ['0x0000000000000000000000000000000000000000'],
              values: ['0'],
              calldatas: ['0x00'],
              description: title?.trim(),
            },
          },
        },
        tokenID: PRV.id,
        txType: 7,
        isSignAndSendTransaction: false,
      };
      if (transactionType === TransactionType.CREATE_PROPOSAL) {
        payload.pDaoData.createProposalInfo = {
          targets: ['0x0000000000000000000000000000000000000000'],
          values: ['0'],
          calldatas: ['0x00'],
          description: title?.trim(),
        };
      }
      const tx = await requestSignTransaction(payload);
      console.log(tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };
};

const genProposalId = (payload: any) => {
  let proposalId = web3.utils.keccak256(
    Buffer.from(
      web3.eth.abi
        .encodeFunctionCall(
          {
            name: 'myMethod',
            type: 'function',
            inputs: [
              {
                type: 'address[]',
                name: 'targets',
              },
              {
                name: 'values',
                type: 'uint256[]',
              },
              {
                name: 'calldatas',
                type: 'bytes[]',
              },
              {
                name: 'descriptionHash',
                type: 'bytes32',
              },
            ],
          },
          [payload.targets, payload.values, payload.calldatas, web3.utils.keccak256(payload.description)]
        )
        .slice(10),
      'hex'
    )
  );
  return web3.utils.hexToNumberString(proposalId);
};

const createProposal = (
  {
    transactionType,
    title,
    description,
    prvBurnAmount,
    fee,
    requestSignTransaction,
  }: {
    transactionType: TransactionType;
    title: string;
    description: string;
    prvBurnAmount: number;
    fee?: Fee;
    requestSignTransaction: (payload: any) => void;
  },
  callback: (data: any) => void
) => {
  return async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      // Burn prv and get 3 signature
      const tx: any = await dispatch(
        burnPRVToken({
          transactionType,
          amount: prvBurnAmount,
          title,
          fee,
          requestSignTransaction,
        })
      );
      const { txHash, rawData, pDaoSignature } = tx;

      const proposalId = genProposalId({
        targets: ['0x0000000000000000000000000000000000000000'],
        values: ['0'],
        calldatas: ['0x00'],
        description: title?.trim(),
      });

      const submitProposalResponse = await submitCreateProposal({
        Txhash: txHash,
        TxRaw: rawData,
        Description: description?.trim(),
        Title: title?.trim(),
        ReShieldSignature: pDaoSignature?.reShieldSignature,
        CreatePropSignature: pDaoSignature?.createPropSignature,
        PropVoteSignature: pDaoSignature?.propVoteSignature,
        Targets: ['0x0000000000000000000000000000000000000000'],
        Values: ['0'],
        Calldatas: ['00'],
        ProposalID: proposalId,
      });

      console.log(submitProposalResponse);
      if (callback) return callback(submitProposalResponse);
    } catch (error) {
      console.log(error);
    }
  };
};

const vote = (
  {
    proposalId,
    voteOption,
    title,
    prvBurnAmount,
    fee,
    requestSignTransaction,
  }: {
    proposalId: string;
    voteOption: number;
    title: string;
    prvBurnAmount: number;
    fee?: Fee;
    requestSignTransaction: (payload: any) => void;
  },
  callback: (data: any) => void
) => {
  return async (dispatch: Dispatch<any>): Promise<any> => {
    try {
      // Burn prv and get 3 signature
      const tx: any = await dispatch(
        burnPRVToken({
          transactionType: TransactionType.VOTE,
          amount: prvBurnAmount,
          title,
          fee,
          requestSignTransaction,
        })
      );
      const { txHash, rawData, pDaoSignature } = tx;

      const submitVoteResponse = await submitVote({
        ProposalID: proposalId,
        Txhash: txHash,
        TxRaw: rawData,
        ReShieldSignature: pDaoSignature?.reShieldSignature,
        PropVoteSignature: pDaoSignature?.propVoteSignature,
        Vote: voteOption,
      });
      if (callback) return callback(submitVoteResponse);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

type Operations = {
  getProposals: () => void;
  getProposalDetail: (proposalId: any, callback?: (data: any) => void) => void;
  burnPRVToken: ({
    transactionType,
    amount,
    fee,
    title,
    requestSignTransaction,
  }: {
    transactionType: TransactionType;
    amount: number;
    fee: Fee;
    title: string;
    requestSignTransaction: (payload: any) => void;
  }) => void;
  createProposal: (
    {
      transactionType,
      title,
      description,
      prvBurnAmount,
      fee,
      requestSignTransaction,
    }: {
      transactionType: TransactionType;
      title: string;
      description: string;
      prvBurnAmount: number;
      fee?: Fee;
      requestSignTransaction: (payload: any) => void;
    },
    callback?: (data: any) => void
  ) => void;
  vote: (
    {
      title,
      prvBurnAmount,
      fee,
      requestSignTransaction,
      proposalId,
      voteOption,
    }: {
      title: string;
      prvBurnAmount: number;
      fee?: Fee;
      requestSignTransaction: (payload: any) => void;
      proposalId: string;
      voteOption: number;
    },
    callback?: (data: any) => void
  ) => void;
};

const operations: Operations = {
  getProposals,
  getProposalDetail,
  burnPRVToken,
  createProposal,
  vote,
};

export { burnPRVToken, createProposal, getProposalDetail, getProposals, operations, vote };
export type { Operations };
