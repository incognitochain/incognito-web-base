/* eslint-disable react/no-children-prop */

import { i18n } from '@lingui/core';
import { notification } from 'antd';
import { useIncognitoWallet } from 'components/Core/IncognitoWallet/IncongitoWallet.useContext';
import { PRV } from 'constants/token';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProposalFee } from 'services/rpcDao';
import { getProposalDetail, vote } from 'state/dao/operations';
import { Fee, Proposal, ProposalStatus } from 'state/dao/types';
import styled, { DefaultTheme } from 'styled-components/macro';
import format from 'utils/format';
import Web3 from 'web3';

import HeaderBox from './components/HeaderBpx';
import InfoBox from './components/InfoBox';
import { ModalVote } from './components/ModalVote';
import ProposalContent from './components/ProposalContent';

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

  const [selectedVote, setSelectedVote] = useState<1 | 2>(1);

  const [isFetchingFee, setIsFetchingFee] = useState<boolean>(false);
  const [fee, setFee] = useState<Fee>();

  const [amount, setAmount] = useState();

  const { requestSignTransaction, isIncognitoInstalled, requestIncognitoAccount } = useIncognitoWallet();

  let { id }: any = useParams();

  const dispatch = useDispatch();

  const getBlockNumber = async () => {
    try {
      const web3 = new Web3('https://goerli.infura.io/v3/827ed2f82fb3442da6d516c8b5e5bd16');
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

  const endDate =
    proposalDetail && proposalDetail.status && timestamp && currentBlock
      ? dayjs(timestamp).add(AVERAGE_BLOCK_TIME_IN_SECS * (proposalDetail.endBlock - currentBlock), 'seconds')
      : undefined;
  const now = dayjs();

  const startOrEndTimeCopy = () => {
    if (startDate?.isBefore(now) && endDate?.isAfter(now)) {
      return 'Ends';
    }
    if (endDate?.isBefore(now)) {
      return 'Ended';
    }
    return 'Starts';
  };

  const titleDate = startOrEndTimeCopy();

  const startOrEndTimeTime = () => {
    if (!startDate?.isBefore(now)) {
      return startDate;
    }
    return endDate;
  };

  let rightTitleDate = '';
  let rightTitleDateValue = '';
  if (proposalDetail?.status) {
    rightTitleDate = i18n.date(new Date(startOrEndTimeTime()?.toISOString() || 0), {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
    rightTitleDateValue = i18n.date(new Date(startOrEndTimeTime()?.toISOString() || 0), {
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

  const handleChooseVoteOption = (option: 1 | 2) => {
    setSelectedVote(option);
  };

  const [api, contextHolder] = notification.useNotification();

  const prvVote = format.amountVer2({
    originalAmount: proposalDetail?.quorumVotes || 0,
    decimals: PRV.pDecimals,
  });

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
      showSubmitVotePopupMessage('error', 'Failed', 'Submit vote fail');
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

  useEffect(() => {
    fetchProposalDetail();
    getBlockNumber();
  }, []);

  const isDisabledButtonVote: boolean = isFetchingProposalDetail || proposalDetail?.status !== ProposalStatus.PENDING;

  return (
    <div className="default-max-width-2" style={{ width: '100%', paddingBottom: 40 }}>
      <>
        {contextHolder}
        <HeaderBox
          proposal={proposalDetail}
          isDisabledButtonVote={isDisabledButtonVote}
          isLoading={isFetchingProposalDetail}
          onClickVoteButton={getFee}
        />
        <InfoBoxContainer>
          <InfoBox
            isLoading={isFetchingProposalDetail}
            leftTitle="Threshold"
            rightTitle="Current Quorum"
            rightValue={`${prvVote} votes`}
          />
          <div style={{ width: 24 }} />
          <InfoBox
            isLoading={isFetchingProposalDetail}
            leftTitle={titleDate}
            rightTitle={rightTitleDate}
            rightValue={rightTitleDateValue || 'Updating'}
          />
          <div style={{ width: 24 }} />
          <InfoBox
            isLoading={isFetchingProposalDetail}
            leftTitle="Snapshot"
            rightTitle="Taken at block"
            rightValue={proposalDetail?.startBlock || 'Updating'}
          />
        </InfoBoxContainer>
        <DescriptionBox>
          <ProposalContent proposal={proposalDetail} isLoading={isFetchingProposalDetail} />
        </DescriptionBox>
        <ModalVote
          isOpen={modalConfirmVisible}
          fee={fee}
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
