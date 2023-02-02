/* eslint-disable react/no-children-prop */

import { i18n } from '@lingui/core';
import { notification } from 'antd';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { isMainnet } from 'config';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProposalFee } from 'services/rpcDao';
import { getProposalDetail, vote } from 'state/dao/operations';
import { Fee, Proposal, ProposalStatus } from 'state/dao/types';
import styled, { DefaultTheme } from 'styled-components/macro';
import Web3 from 'web3';

import HeaderBox from './components/HeaderBpx';
import InfoBox from './components/InfoBox';
import { ModalVote } from './components/ModalVote';
import ProposalContent from './components/ProposalContent';
import VoteInfoBox from './components/VoteInfoBox';

const InfoBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `}
`;

const DescriptionBox = styled.div`
  margin-top: 40px;
`;

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ProposalDetail = () => {
  const [modalConfirmVisible, setModalConfirmVisible] = useState<boolean>(false);
  const [isFetchingProposalDetail, setIsFetchingProposalDetail] = useState<boolean>(false);
  const [proposalDetail, setProposalDetail] = useState<Proposal>();
  const [currentBlock, setCurrentBlock] = useState<any>(0);
  const [createdBlockTimestamp, setCreatedBlockTimestamp] = useState<any>(0);

  const [selectedVote, setSelectedVote] = useState<0 | 1>(1);

  const [isFetchingFee, setIsFetchingFee] = useState<boolean>(false);
  const [fee, setFee] = useState<Fee>();

  const [amount, setAmount] = useState();

  const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();

  let { id }: any = useParams();

  const dispatch = useDispatch();

  const getBlockNumber = async () => {
    try {
      const web3 = new Web3(isMainnet ? 'https://eth-fullnode.incognito.org' : 'https://eth-goerli.public.blastapi.io');
      const block = await web3.eth.getBlockNumber();
      setCurrentBlock(block);
    } catch (error) {
      console.log(error);
    }
  };

  const AVERAGE_BLOCK_TIME_IN_SECS = 12;
  const timestamp = Date.now();

  const startDate =
    proposalDetail && proposalDetail.status && timestamp && currentBlock
      ? dayjs(timestamp).add(AVERAGE_BLOCK_TIME_IN_SECS * (proposalDetail.startBlock - currentBlock), 'seconds')
      : undefined;

  let snapshotTime = '';
  let snapshotDate = '';
  if (proposalDetail?.status && startDate) {
    snapshotTime = i18n.date(new Date(startDate?.toISOString() || 0), {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
    snapshotDate = i18n.date(new Date(startDate?.toISOString() || 0), {
      dateStyle: 'long',
    });
  }

  let createdTime = '';
  let createdDate = '';

  if (proposalDetail?.status && createdBlockTimestamp) {
    createdTime = i18n.date(new Date(createdBlockTimestamp * 1000 || 0), {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
    createdDate = i18n.date(new Date(createdBlockTimestamp * 1000 || 0), {
      dateStyle: 'long',
    });
  }

  const getFee = async () => {
    try {
      setIsFetchingFee(true);
      const feeResponse: Fee = await fetchProposalFee(2);
      setIsFetchingFee(false);
      setFee(feeResponse);
      setModalConfirmVisible(true);
    } catch (error) {
      setIsFetchingFee(false);
    }
  };

  const fetchProposalDetail = async () => {
    try {
      setIsFetchingProposalDetail(true);
      dispatch(
        getProposalDetail(id, (data) => {
          setProposalDetail(data);
          setIsFetchingProposalDetail(false);
        })
      );
    } catch (error) {
      setIsFetchingProposalDetail(false);
    }
  };

  const handleChooseVoteOption = (option: 0 | 1) => {
    setSelectedVote(option);
  };

  const [api, contextHolder] = notification.useNotification();

  const handleSubmitVote = async (prvBurnAmount: number) => {
    try {
      await dispatch(
        vote(
          {
            title: proposalDetail?.title || '',
            prvBurnAmount,
            fee,
            requestSignTransaction,
            proposalId: proposalDetail?.proposalId || '',
            voteOption: selectedVote,
          },
          (data: any) => {
            if (data) {
              showSubmitVotePopupMessage('success', 'Success', 'Submit vote success');
            }
          }
        )
      );
    } catch (error) {
      showSubmitVotePopupMessage('error', 'Failed', typeof error === 'string' ? error : 'Submit vote failed');
    }
  };

  const showSubmitVotePopupMessage = (type: NotificationType, title: string, message: string) => {
    api[type]({
      message: title,
      description: message,
    });
  };

  const handleChangeAmount = useCallback(
    (amount: any) => {
      setAmount(amount);
    },
    [setAmount]
  );

  const getCreatedProposalBlockNumber = async () => {
    try {
      const web3 = new Web3(isMainnet ? 'https://eth-fullnode.incognito.org' : 'https://eth-goerli.public.blastapi.io');
      if (proposalDetail && proposalDetail?.submitProposalTx) {
        const receipt = await web3.eth.getTransactionReceipt(proposalDetail?.submitProposalTx);
        const blockInfo = await web3.eth.getBlock(receipt?.blockNumber);
        console.log(blockInfo);
        setCreatedBlockTimestamp(blockInfo?.timestamp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProposalDetail();
    getBlockNumber();
  }, []);

  useEffect(() => {
    getCreatedProposalBlockNumber();
  }, [proposalDetail]);

  const isDisabledButtonVote: boolean = isFetchingProposalDetail || proposalDetail?.status !== ProposalStatus.PENDING;

  return (
    <div className="default-max-width-2" style={{ width: '100%', paddingBottom: 40, minHeight: '100vh' }}>
      <>
        {contextHolder}
        <HeaderBox
          proposal={proposalDetail}
          isDisabledButtonVote={isDisabledButtonVote}
          isLoading={isFetchingProposalDetail}
          onClickVoteButton={getFee}
        />
        <VoteInfoBox isLoading={isFetchingProposalDetail} proposalDetail={proposalDetail} />
        <InfoBoxContainer>
          <InfoBox
            isLoading={isFetchingProposalDetail}
            leftTitle="Threshold"
            rightTitle="Current Quorum"
            rightValue="20,000 PRV"
          />
          <div style={{ width: 24 }} />
          <InfoBox
            isLoading={isFetchingProposalDetail}
            leftTitle={'Starts'}
            rightTitle={createdTime}
            rightValue={createdDate || 'Updating'}
          />
          <div style={{ width: 24 }} />
          <InfoBox
            isLoading={isFetchingProposalDetail}
            leftTitle="Snapshot"
            rightTitle={snapshotTime}
            rightValue={snapshotDate || 'Updating'}
          />
        </InfoBoxContainer>
        <DescriptionBox>
          <ProposalContent proposal={proposalDetail} isLoading={isFetchingProposalDetail} />
        </DescriptionBox>
        <ModalVote
          isOpen={modalConfirmVisible}
          fee={fee}
          proposal={proposalDetail}
          amount={amount}
          onChangeAmount={handleChangeAmount}
          onCancel={() => setModalConfirmVisible(false)}
          onChooseVoteOption={handleChooseVoteOption}
          onSubmitVote={(prvBurnAmount: number) => {
            setModalConfirmVisible(false);
            handleSubmitVote(prvBurnAmount);
          }}
          selectedVote={selectedVote}
        />
      </>
    </div>
  );
};
export default ProposalDetail;
