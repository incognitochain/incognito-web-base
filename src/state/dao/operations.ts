//@ts-nocheck
import INC_DAO_ABI from 'abis/inc-dao.json';
import { getIncognitoInject } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { PRV } from 'constants/token';
import { getTokenPayments } from 'pages/Swap/features/FormUnshield/FormUnshield.utils';
// eslint-disable-next-line no-restricted-imports
import { Dispatch } from 'redux';
import { fetchProposalDetail, fetchProposals, submitCreateProposal, submitVote } from 'services/rpcClient';
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
const { ACCOUNT_CONSTANT } = require('incognito-chain-web-js/build/wallet');

const NETWORK_FEE = ACCOUNT_CONSTANT.MAX_FEE_PER_TX;
const INC_CONTRACT_ADDRESS = '0x01f6549BeF494C8b0B00C2790577AcC1A3Fa0Bd0';

const { BurningPRVRequestMeta } = require('incognito-chain-web-js/build/web/wallet');

const getProposalInfoViaChain = async (proposalId: any) => {
  try {
    const web3 = new Web3('https://goerli.infura.io/v3/827ed2f82fb3442da6d516c8b5e5bd16');
    const CONTRACT_ABI = INC_DAO_ABI as any;
    const instance = new web3.eth.Contract(CONTRACT_ABI, INC_CONTRACT_ADDRESS);
    const proposalDetail: ProposalCallResult = await instance.methods.proposals(web3.utils.toBN(proposalId)).call();
    return proposalDetail;
  } catch (error) {
    console.log(error);
  }
};

const getVotingDelay = async () => {
  try {
    const web3 = new Web3('https://goerli.infura.io/v3/827ed2f82fb3442da6d516c8b5e5bd16');
    const CONTRACT_ABI = INC_DAO_ABI as any;
    const instance = new web3.eth.Contract(CONTRACT_ABI, INC_CONTRACT_ADDRESS);
    const blockDelay = await instance.methods.votingDelay().call();
    return web3.utils.toBN(blockDelay).toNumber();
  } catch (error) {
    console.log(error);
  }
};

const getProposalStatus = async (proposalId: any) => {
  try {
    const web3 = new Web3('https://goerli.infura.io/v3/827ed2f82fb3442da6d516c8b5e5bd16');
    const CONTRACT_ABI = INC_DAO_ABI as any;
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
      const proposals: ProposalAPIResponse[] = await fetchProposals();
      const promises = proposals.map(async (proposal) => {
        let proposalDetail: any = {};
        let proposalStatus: any = proposal?.Status;
        let quorumVotes = 0;
        let votingDelay: any = '';

        if (proposalStatus === ProposalStatusBackEnd.outchain_success) {
          proposalDetail = await getProposalInfoViaChain(proposal?.ProposalID);
          proposalStatus = await getProposalStatus(proposal?.ProposalID);
          votingDelay = await getVotingDelay();
          quorumVotes =
            parseInt(proposalDetail?.againstVotes?.toString() ?? '0') +
            parseInt(proposalDetail?.forVotes?.toString() ?? '0') +
            parseInt(proposalDetail?.abstainVotes?.toString() ?? '0');
        } else if (proposalStatus === ProposalStatusBackEnd.submit_failed) {
          proposalStatus = ProposalStatus.CANCELLED;
        } else {
          proposalStatus = ProposalStatus.PENDING;
        }

        return {
          id: proposal?.id.toString(),
          proposalId: proposalDetail?.id?.toString(),
          title: proposal?.Title || '',
          description: proposal?.Description ?? 'No description.',
          proposer: proposalDetail?.proposer || '',
          status: proposalStatus,
          forCount: parseInt(proposalDetail?.forVotes?.toString() ?? '0'),
          againstCount: parseInt(proposalDetail?.againstVotes?.toString() ?? '0'),
          abstainCount: parseInt(proposalDetail?.abstainVotes?.toString() ?? '0'),
          createdBlock: 0,
          startBlock: parseInt(proposalDetail?.startBlock?.toString() ?? ''),
          endBlock: parseInt(proposalDetail?.endBlock?.toString() ?? ''),
          quorumVotes,
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
      let proposalViaChainInfo: any = {};
      let proposalStatus: any = proposalDetailResponse?.Status;
      let quorumVotes = 0;
      if (proposalStatus === ProposalStatusBackEnd.outchain_success) {
        proposalViaChainInfo = await getProposalInfoViaChain(proposalDetailResponse?.ProposalID);
        proposalStatus = await getProposalStatus(proposalDetailResponse?.ProposalID);
        quorumVotes =
          parseInt(proposalViaChainInfo?.againstVotes?.toString() ?? '0') +
          parseInt(proposalViaChainInfo?.forVotes?.toString() ?? '0') +
          parseInt(proposalViaChainInfo?.abstainVotes?.toString() ?? '0');
      } else if (proposalStatus === ProposalStatusBackEnd.submit_failed) {
        proposalStatus = ProposalStatus.CANCELLED;
      } else {
        proposalStatus = ProposalStatus.PENDING;
      }
      const proposalDetail: Proposal = {
        id: proposalDetailResponse?.id.toString(),
        proposalId: proposalDetailResponse?.ProposalID.toString(),
        title: proposalDetailResponse.Title || '',
        description: proposalDetailResponse.Description ?? 'No description.',
        proposer: proposalViaChainInfo?.proposer,
        status: proposalStatus,
        forCount: parseInt(proposalViaChainInfo?.forVotes?.toString() ?? '0'),
        againstCount: parseInt(proposalViaChainInfo?.againstVotes?.toString() ?? '0'),
        abstainCount: parseInt(proposalViaChainInfo?.abstainVotes?.toString() ?? '0'),
        createdBlock: 0,
        startBlock: parseInt(proposalViaChainInfo?.startBlock?.toString() ?? ''),
        endBlock: parseInt(proposalViaChainInfo?.endBlock?.toString() ?? ''),
        quorumVotes,
      };
      if (callback) return callback(proposalDetail);
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
      const feeAmount = fee?.feeAmount;
      let prvPayments: { PaymentAddress: any; Amount: string; Message: string }[] = await getTokenPayments({
        data: [
          {
            paymentAddress: fee?.feeAddress,
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
              description: title,
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
          description: title,
        };
      }
      console.log('=============', payload);
      const tx = await requestSignTransaction(payload);
      console.log(tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };
};

const genProposalId = (payload: any) => {
  const web3 = new Web3();
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
        description: title,
      });

      const submitProposalResponse = await submitCreateProposal({
        Txhash: txHash,
        TxRaw: rawData,
        Description: description,
        Title: title,
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